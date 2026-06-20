"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import { getFleetQuarantines } from "@/lib/api";
import type { QuarantineResponse } from "@/lib/types";

/* ---- static example, also the offline fallback for "Try it" ---- */
const EXAMPLE: QuarantineResponse = {
  endpoint: "/api/fleet/quarantines",
  generated_at: "2024-03-01T11:00:00+00:00",
  next_since: "2024-03-01T13:00:00+00:00",
  count: 1,
  estimated_total_volume_removed_pct: 22,
  zones: [
    {
      quarantine_id: "QZ-FKID005762",
      version: "1.0",
      issued_at: "2024-03-01T11:00:00+00:00",
      expires_at: "2024-03-01T11:50:00+00:00",
      severity: "severe",
      status: "active",
      reason: { cause: "accident", corridor: "ORR", closure_probability: 0.62 },
      geofence: {
        type: "circle",
        center: { lat: 12.978, lng: 77.641 },
        radius_m: 625,
        polygon: [
          [12.98362, 77.641], [12.98162, 77.64674], [12.978, 77.64912],
          [12.97438, 77.64674], [12.97238, 77.641], [12.97438, 77.63526],
          [12.978, 77.63288], [12.98162, 77.63526], [12.98362, 77.641],
        ],
      },
      action: "avoid",
      advisory: "Severe accident on ORR — reroute commercial fleet away from this zone until ~11:50.",
      estimated_volume_removed_pct: 22,
      affected_fleets: ["Flipkart", "Swiggy", "Zepto", "Amazon", "Rapido"],
      alternate_routes: [
        { rank: 1, distance_m: 1607, eta_min: 3.8, summary: "alternate route 1" },
        { rank: 2, distance_m: 1640, eta_min: 3.9, summary: "alternate route 2" },
      ],
    },
  ],
};

const CURL = `curl -s 'https://api.gridlock.city/api/fleet/quarantines?active_only=true' \\
  -H 'X-API-Key: demo-fleet-key'`;

const JS = `const res = await fetch(
  "https://api.gridlock.city/api/fleet/quarantines?active_only=true",
  { headers: { "X-API-Key": process.env.GRIDLOCK_KEY } }
);
const { zones } = await res.json();

// keep drivers out of every active quarantine zone
for (const z of zones) {
  fleet.addAvoidZone({
    id: z.quarantine_id,
    center: z.geofence.center,
    radiusM: z.geofence.radius_m,
    expiresAt: z.expires_at,
  });
}`;

const PY = `import requests

r = requests.get(
    "https://api.gridlock.city/api/fleet/quarantines",
    params={"active_only": "true"},
    headers={"X-API-Key": GRIDLOCK_KEY},
)
for z in r.json()["zones"]:
    fleet.add_avoid_zone(
        zone_id=z["quarantine_id"],
        center=z["geofence"]["center"],
        radius_m=z["geofence"]["radius_m"],
        expires_at=z["expires_at"],
    )`;

const SCHEMA: [string, string, string][] = [
  ["quarantine_id", "string", "Stable id for the zone (dedupe / upsert on this)."],
  ["severity", "string", "severe · high · elevated."],
  ["status", "string", "active while in effect; derive lifecycle from issued_at/expires_at."],
  ["action", "string", "avoid — do not route or assign new orders inside the fence."],
  ["geofence.center", "{lat,lng}", "Centre of the circular quarantine zone."],
  ["geofence.radius_m", "number", "Radius in metres. Also a polygon[] octagon ring is supplied."],
  ["estimated_volume_removed_pct", "number", "Modelled share of fleet volume kept out of the choke point."],
  ["affected_fleets", "string[]", "Operators the broadcast targets."],
  ["expires_at", "ISO 8601", "When to drop the zone (incident clearance + buffer)."],
  ["alternate_routes", "object[]", "Ranked alternates (rank, distance_m, eta_min) — no geometry."],
];

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative rounded-2xl border border-white/[0.08] bg-ink-900/80 shadow-soft">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2">
        <span className="text-[11px] uppercase tracking-wide text-white/40">{lang}</span>
        <button
          onClick={() => {
            navigator.clipboard?.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
          className="text-[11px] text-white/45 transition hover:text-white"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-white/75">{code}</pre>
    </div>
  );
}

export default function FleetApiDocs() {
  const [result, setResult] = useState<QuarantineResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [live, setLive] = useState<boolean | null>(null);

  async function tryIt() {
    setLoading(true);
    try {
      const data = await getFleetQuarantines({ activeOnly: true });
      setResult(data);
      setLive(true);
    } catch {
      setResult(EXAMPLE); // graceful fallback when the backend is down
      setLive(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen">
      <Nav />

      <div className="mx-auto max-w-5xl px-6 pb-28 pt-32">
        {/* header */}
        <span className="inline-block rounded-full border border-[#ff9f0a]/30 bg-[#ff9f0a]/[0.08] px-3 py-1 text-xs font-medium text-[#ffce8a]">
          Developer Docs · B2B Broadcast
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Fleet Quarantine API
        </h1>
        <p className="mt-4 max-w-2xl text-white/55">
          A real-time feed of geo-fence quarantine zones. Poll it from your dispatch /
          routing layer to keep delivery drivers out of severe choke points the moment they
          form — removing ~20% of vehicle volume before it ever reaches the jam.
        </p>

        {/* quickfacts */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            ["Base URL", "https://api.gridlock.city"],
            ["Auth", "X-API-Key header"],
            ["Format", "JSON · poll every 30–60s"],
          ].map(([k, v]) => (
            <div key={k} className="card px-5 py-4">
              <div className="text-xs uppercase tracking-wide text-white/40">{k}</div>
              <div className="mt-1 font-mono text-sm text-white/80">{v}</div>
            </div>
          ))}
        </div>

        {/* endpoint */}
        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-white">Endpoint</h2>
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4">
            <span className="rounded-md bg-[#34c759]/15 px-2.5 py-1 text-xs font-semibold text-[#7ee29a]">GET</span>
            <code className="font-mono text-sm text-white/85">/api/fleet/quarantines</code>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/[0.07]">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-white/40">
                <tr>
                  <th className="px-5 py-3 font-medium">Query param</th>
                  <th className="px-5 py-3 font-medium">Default</th>
                  <th className="px-5 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="text-white/65">
                {[
                  ["active_only", "true", "Return only zones currently in effect."],
                  ["since", "sim start", "ISO time — return zones issued after this instant."],
                  ["window", "120", "Look-ahead window in minutes."],
                ].map(([p, d, desc]) => (
                  <tr key={p} className="border-t border-white/[0.05]">
                    <td className="px-5 py-3 font-mono text-white/85">{p}</td>
                    <td className="px-5 py-3 font-mono text-white/45">{d}</td>
                    <td className="px-5 py-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-white/40">
            Auth is illustrative for this prototype — send <code className="font-mono text-white/60">X-API-Key: demo-fleet-key</code>; the demo backend accepts any key.
          </p>
        </section>

        {/* try it */}
        <section className="mt-14">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight text-white">Try it</h2>
            <button onClick={tryIt} disabled={loading} className="btn-accent !px-5 !py-2 text-[13px] disabled:opacity-50">
              {loading ? "Calling…" : "Send request"}
            </button>
          </div>
          {result && (
            <div className="mt-4">
              <div className="mb-2 text-xs text-white/45">
                {live
                  ? `Live response · ${result.count} active zone(s) · ~${result.estimated_total_volume_removed_pct}% volume removed`
                  : "Backend offline — showing a representative example payload."}
              </div>
              <div className="max-h-[26rem] overflow-auto rounded-2xl border border-white/[0.08] bg-ink-900/80 p-4 shadow-soft">
                <pre className="font-mono text-[12px] leading-relaxed text-white/75">{JSON.stringify(result, null, 2)}</pre>
              </div>
            </div>
          )}
          {!result && (
            <p className="mt-4 text-sm text-white/40">
              Click <span className="text-white/70">Send request</span> to call the live demo backend (falls back to a sample payload if it&apos;s offline).
            </p>
          )}
        </section>

        {/* schema */}
        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-white">Zone payload</h2>
          <p className="mt-2 text-sm text-white/50">Each item in <code className="font-mono text-white/70">zones[]</code> is a quarantine zone:</p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/[0.07]">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-white/40">
                <tr>
                  <th className="px-5 py-3 font-medium">Field</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody className="text-white/65">
                {SCHEMA.map(([f, t, n]) => (
                  <tr key={f} className="border-t border-white/[0.05] align-top">
                    <td className="px-5 py-3 font-mono text-white/85">{f}</td>
                    <td className="px-5 py-3 font-mono text-accent-soft/80">{t}</td>
                    <td className="px-5 py-3">{n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* code samples */}
        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-white">Integrate</h2>
          <p className="mt-2 text-sm text-white/50">
            Poll on a 30–60s interval, upsert zones by <code className="font-mono text-white/70">quarantine_id</code>, and drop them at <code className="font-mono text-white/70">expires_at</code>.
          </p>
          <div className="mt-5 grid gap-5">
            <CodeBlock lang="cURL" code={CURL} />
            <CodeBlock lang="JavaScript" code={JS} />
            <CodeBlock lang="Python" code={PY} />
          </div>
        </section>

        <footer className="mt-20 border-t border-white/[0.06] pt-8 text-xs text-white/30">
          Gridlock · Fleet Quarantine API · Flipkart GRID — prototype. Endpoints are mock/demo.
        </footer>
      </div>
    </main>
  );
}
