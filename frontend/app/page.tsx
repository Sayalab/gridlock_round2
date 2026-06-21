import type { ReactNode } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";

/* ---------- small inline icons (stroke = currentColor) ---------- */
function Icon({ path, className = "" }: { path: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
      className={`h-5 w-5 ${className}`}>
      {path}
    </svg>
  );
}
const IconRadar = <><path d="M12 12 19 5" stroke="currentColor" /><path d="M12 3a9 9 0 1 0 9 9" stroke="currentColor" /><path d="M12 8a4 4 0 1 0 4 4" stroke="currentColor" /></>;
const IconBolt = <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" stroke="currentColor" />;
const IconCalendar = <><rect x="3" y="4" width="18" height="17" rx="2.5" stroke="currentColor" /><path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" /><path d="m8 14 2.5 2.5L16 11" stroke="currentColor" /></>;

const engines = [
  {
    tag: "Prevent",
    title: "Risk Map",
    icon: IconRadar,
    body: "A historical risk surface learned from 7,700+ incidents. See where congestion builds — before it happens — and pre-position resources by the hour.",
  },
  {
    tag: "React",
    title: "Live Feed",
    icon: IconBolt,
    body: "Unplanned incidents stream in real time. Each is instantly graded for severity, clearance time, and routed around with real road-network diversions.",
  },
  {
    tag: "Prepare",
    title: "Forecast",
    icon: IconCalendar,
    body: "Model the traffic impact of a planned event days ahead — peak windows, affected corridors, and an optimal deployment plan.",
  },
];

const stack = [
  ["Gradient Boosting", "Severity & clearance prediction"],
  ["OSMnx + NetworkX", "Road graph · Dijkstra · A* · Yen's K"],
  ["FastAPI", "Real-time inference gateway"],
  ["Mappls", "MapmyIndia spatial layer"],
];

const fleets = ["Flipkart", "Swiggy", "Zepto", "Amazon", "Rapido", "Dunzo", "BigBasket", "Blinkit"];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Nav />

      {/* ---------------- HERO ---------------- */}
      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pt-28 pb-16 text-center">
        {/* atmospheric layers */}
        <div className="grid-overlay pointer-events-none absolute inset-0 -z-10" />
        <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.10] blur-[130px]" />

        <div className="animate-fade-in mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-white/60 backdrop-blur-md">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Flipkart GRID · Theme 2 · Event-Driven Congestion
        </div>

        <h1 className="animate-fade-up max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-tightest text-white sm:text-7xl md:text-[5.25rem]">
          The city&apos;s nervous system
          <br />
          <span className="text-gradient">for traffic that hasn&apos;t happened yet.</span>
        </h1>

        <p className="animate-fade-up mt-7 max-w-xl text-pretty text-base leading-relaxed text-white/55 sm:text-lg [animation-delay:120ms]">
          The instant an incident occurs, Gridlock predicts how severe it is, how long
          until it clears, and the fastest way around it — then broadcasts a quarantine to
          delivery fleets so 20% of the volume never arrives.
        </p>

        <div className="animate-fade-up mt-9 flex flex-col items-center gap-3 sm:flex-row [animation-delay:240ms]">
          <Link href="/dashboard" className="btn-accent">
            Launch the Console
          </Link>
          <Link href="/fleet-api" className="btn-ghost">
            Read the API docs
          </Link>
        </div>

        {/* ---- product console preview ---- */}
        <div className="animate-fade-up relative mt-16 w-full max-w-5xl [animation-delay:360ms]">
          <div className="pointer-events-none absolute -inset-x-10 -top-6 bottom-0 -z-10 rounded-[2.5rem] bg-gradient-to-b from-accent/[0.12] to-transparent blur-2xl" />
          <ConsolePreview />
        </div>

        {/* ---- fleet trust strip ---- */}
        <div className="animate-fade-up mt-16 w-full [animation-delay:480ms]">
          <p className="text-xs uppercase tracking-[0.2em] text-white/30">
            Built for the fleets that move the city
          </p>
          <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="marquee-track flex w-max gap-12">
              {[...fleets, ...fleets].map((f, i) => (
                <span key={i} className="text-lg font-semibold tracking-tight text-white/35">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- ENGINES ---------------- */}
      <section id="engines" className="relative mx-auto max-w-6xl px-6 py-28">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow mb-4">Three engines · one canvas</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Prevent. React. Prepare.
          </h2>
          <p className="mt-4 text-white/50">
            A system that only reacts is half a solution. Gridlock layers a proactive risk
            surface beneath a live response engine — and an event forecaster on top.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {engines.map((e) => (
            <div
              key={e.title}
              className="card group relative overflow-hidden p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/20 hover:bg-white/[0.05]"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/[0.08] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/20 bg-accent/[0.08] text-accent-soft">
                  <Icon path={e.icon} />
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/55">
                  {e.tag}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-white">{e.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">{e.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- HOW ---------------- */}
      <section id="how" className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="card overflow-hidden p-10 sm:p-14">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="eyebrow mb-4">The pipeline</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                From a single incident to an action plan — in one call.
              </h2>
              <p className="mt-4 text-white/50">
                Each incident is enriched the instant it arrives: severity and closure
                probability, predicted clearance time, the junctions it will choke, and
                three real road-network diversions ranked by ETA.
              </p>
            </div>
            <ol className="relative space-y-1 before:absolute before:left-[1.4rem] before:top-4 before:bottom-4 before:w-px before:bg-gradient-to-b before:from-accent/40 before:via-white/10 before:to-transparent">
              {[
                ["Detect", "Incident streams in with location, cause, time"],
                ["Grade", "Severity · closure probability · clearance ETA"],
                ["Spread", "Nearby junctions ranked by predicted risk"],
                ["Route", "Dijkstra · A* · Yen's K around the blockage"],
              ].map(([k, v], i) => (
                <li
                  key={k}
                  className="relative flex items-start gap-4 rounded-2xl px-4 py-3.5 transition hover:bg-white/[0.03]"
                >
                  <span className="relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-ink-900 text-xs font-medium text-accent-soft">
                    {i + 1}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-white">{k}</div>
                    <div className="text-sm text-white/45">{v}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------------- FLEET QUARANTINE API ---------------- */}
      <section id="fleet" className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="card overflow-hidden p-10 sm:p-14">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <span className="inline-block rounded-full border border-[#ff9f0a]/30 bg-[#ff9f0a]/[0.08] px-3 py-1 text-xs font-medium text-[#ffce8a]">
                B2B Broadcast API
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Quarantine the choke point — before fleets drive into it.
              </h2>
              <p className="mt-4 text-white/50">
                20–30% of city traffic is delivery fleets. The instant Gridlock detects a
                severe closure, it broadcasts a <span className="text-white/75">Geo-Fence Quarantine</span> to
                commercial operators — so Flipkart, Swiggy, Zepto, Amazon and Rapido route
                their drivers away automatically, pulling ~20% of volume out of the jam at the source.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/fleet-api" className="btn-accent">
                  Read the API docs
                </Link>
                <Link href="/dashboard" className="btn-ghost">
                  See it in the console
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.06]">
                {[
                  ["~20%", "volume removed"],
                  ["5", "fleet partners"],
                  ["Geo-fence", "JSON payload"],
                ].map(([k, v]) => (
                  <div key={v} className="bg-white/[0.02] px-4 py-5">
                    <div className="text-xl font-semibold tracking-tight text-white">{k}</div>
                    <div className="mt-1 text-[11px] text-white/45">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* payload preview */}
            <div className="rounded-2xl border border-white/[0.08] bg-ink-900/80 p-5 font-mono text-[11px] leading-relaxed shadow-soft">
              <div className="mb-3 flex items-center gap-2 text-white/40">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff9f0a]" />
                GET broadcast · /api/fleet/quarantines
                <span className="ml-auto rounded bg-[#34c759]/15 px-1.5 py-0.5 text-[10px] text-[#7ee29a]">200 OK</span>
              </div>
              <pre className="overflow-x-auto text-white/70">
{`{
  "quarantine_id": "QZ-FKID005762",
  "severity": "severe",
  "status": "active",
  "action": "avoid",
  "geofence": {
    "type": "circle",
    "center": { "lat": 12.978, "lng": 77.641 },
    "radius_m": 625
  },
  "estimated_volume_removed_pct": 22,
  "affected_fleets": [
    "Flipkart", "Swiggy", "Zepto", "Amazon", "Rapido"
  ],
  "expires_at": "2024-03-01T11:50:00+00:00"
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- STACK ---------------- */}
      <section id="stack" className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-4">Under the hood</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Built on a serious stack.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map(([k, v]) => (
            <div key={k} className="card p-6 transition hover:border-accent/20 hover:bg-white/[0.05]">
              <div className="text-base font-medium text-white">{k}</div>
              <div className="mt-2 text-xs leading-relaxed text-white/45">{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative mx-auto max-w-6xl px-6 py-28">
        <div className="relative overflow-hidden rounded-4xl border border-white/[0.07] bg-white/[0.02] px-8 py-20 text-center">
          <div className="grid-overlay pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/[0.12] blur-[100px]" />
          <h2 className="relative mx-auto max-w-2xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            See the city think.
          </h2>
          <p className="relative mx-auto mt-5 max-w-md text-white/50">
            Open the live operations console and watch real Bengaluru incidents resolve in
            real time.
          </p>
          <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/dashboard" className="btn-accent">
              Launch Console
            </Link>
            <Link href="/fleet-api" className="btn-ghost">
              Explore the Fleet API
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] py-10 text-center text-xs text-white/30">
        Gridlock · Event-Driven Congestion Intelligence · Flipkart GRID
      </footer>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Stylized, static preview of the operations console (decorative)    */
/* ------------------------------------------------------------------ */
function ConsolePreview() {
  const incidents = [
    ["Accident", "Outer Ring Road", "Severe", "#e0301e"],
    ["Waterlogging", "Silk Board", "High", "#ff9f0a"],
    ["Pot holes", "Thanisandra Rd", "High", "#ff9f0a"],
    ["Stalled truck", "Marathahalli", "Elevated", "#4f8bff"],
  ];
  return (
    <div className="overflow-hidden rounded-3xl border border-white/[0.09] bg-ink-900/70 shadow-glass backdrop-blur-xl">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
        <span className="ml-3 text-[11px] text-white/40">Gridlock · Live Operations Console</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-[#34c759]/25 bg-[#34c759]/[0.08] px-2.5 py-1 text-[10px] font-medium text-[#7ee29a]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#34c759]" /> LIVE
        </span>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_1.6fr] text-left">
        {/* incident list */}
        <div className="border-r border-white/[0.06] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] font-medium text-white/55">Incoming incidents</span>
            <span className="text-[10px] text-white/30">live feed</span>
          </div>
          <div className="space-y-2">
            {incidents.map(([cause, road, sev, color]) => (
              <div key={road} className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-medium text-white/85">{cause}</span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[9px] font-semibold"
                    style={{ background: `${color}22`, color }}
                  >
                    {sev}
                  </span>
                </div>
                <div className="mt-0.5 text-[10px] text-white/40">{road}</div>
              </div>
            ))}
          </div>
        </div>

        {/* faux map */}
        <div className="relative min-h-[20rem] overflow-hidden bg-ink-950">
          {/* roads */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#4f8bff" />
                <stop offset="1" stopColor="#34c759" />
              </linearGradient>
            </defs>
            {/* base road grid */}
            <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
              <path d="M0 70 H400 M0 150 H400 M0 230 H400" />
              <path d="M90 0 V320 M200 0 V320 M310 0 V320" />
            </g>
            {/* congested corridor */}
            <path d="M40 250 C 120 220, 150 120, 250 110" stroke="#e0301e" strokeWidth="4" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            {/* diversion route (animated) */}
            <path
              d="M40 250 C 110 280, 230 250, 250 110"
              stroke="url(#routeGrad)"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="10 8"
              className="dash-flow"
            />
          </svg>

          {/* risk circles */}
          <span className="absolute left-[58%] top-[28%] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e0301e]/25 blur-md" />
          <span className="absolute left-[30%] top-[72%] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff9f0a]/25 blur-md" />
          <span className="absolute left-[58%] top-[28%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0a0a0c] bg-[#e0301e]" />
          <span className="absolute left-[30%] top-[72%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0a0a0c] bg-[#34c759]" />

          {/* quarantine geofence chip */}
          <div className="absolute right-4 top-4 rounded-xl border border-[#ff9f0a]/30 bg-ink-900/85 px-3 py-2 backdrop-blur">
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#ffce8a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff9f0a]" /> Fleet quarantine active
            </div>
            <div className="mt-0.5 text-[9px] text-white/45">~22% volume removed</div>
          </div>

          {/* stat chips */}
          <div className="absolute inset-x-3 bottom-3 grid grid-cols-3 gap-2">
            {[
              ["4", "active"],
              ["2", "high priority"],
              ["3.8m", "median reroute"],
            ].map(([k, v]) => (
              <div key={v} className="rounded-xl border border-white/[0.06] bg-ink-900/80 px-3 py-2 backdrop-blur">
                <div className="text-[13px] font-semibold text-white">{k}</div>
                <div className="text-[9px] text-white/40">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
