import Link from "next/link";
import Nav from "@/components/Nav";

const engines = [
  {
    tag: "Prevent",
    title: "Risk Map",
    body: "A historical risk surface learned from 7,700+ incidents. See where congestion builds — before it happens — and pre-position resources by the hour.",
  },
  {
    tag: "React",
    title: "Live Feed",
    body: "Unplanned incidents stream in real time. Each one is instantly graded for severity, clearance time, and routed around with real road-network diversions.",
  },
  {
    tag: "Prepare",
    title: "Forecast",
    body: "Model the traffic impact of a planned event days ahead — peak windows, affected corridors, and an optimal deployment plan.",
  },
];

const stack = [
  ["Gradient Boosting", "Severity & clearance prediction"],
  ["OSMnx + NetworkX", "Road graph · Dijkstra · A* · Yen's K"],
  ["FastAPI", "Real-time inference gateway"],
  ["Mappls", "MapmyIndia spatial layer"],
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Nav />

      {/* ---------------- HERO ---------------- */}
      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        {/* single soft focal glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.08] blur-[120px]" />

        <div className="animate-fade-in mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-white/60 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Flipkart GRID · Theme 2 · Event-Driven Congestion
        </div>

        <h1 className="animate-fade-up text-balance text-5xl font-semibold leading-[1.02] tracking-tightest text-white sm:text-7xl md:text-[5.5rem]">
          Traffic intelligence
          <br />
          <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            that sees ahead.
          </span>
        </h1>

        <p className="animate-fade-up mt-7 max-w-xl text-pretty text-base leading-relaxed text-white/55 sm:text-lg [animation-delay:120ms]">
          The moment an incident occurs, Gridlock predicts how severe it is, how
          long until it clears, and the fastest way around it — while a living
          risk map tells the city where to be before anything happens.
        </p>

        <div className="animate-fade-up mt-10 flex flex-col items-center gap-3 sm:flex-row [animation-delay:240ms]">
          <Link href="/dashboard" className="btn-accent">
            Launch the Console
          </Link>
          <a href="#engines" className="btn-ghost">
            Explore the system
          </a>
        </div>

        {/* minimal supporting metrics */}
        <div className="animate-fade-up mt-20 grid w-full max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-3xl border border-white/[0.06] [animation-delay:360ms]">
          {[
            ["7,700+", "incidents learned"],
            ["3.8 min", "median diversion"],
            ["Real-time", "city-scale replay"],
          ].map(([k, v]) => (
            <div key={v} className="bg-white/[0.02] px-4 py-6">
              <div className="text-2xl font-semibold tracking-tight text-white">{k}</div>
              <div className="mt-1 text-xs text-white/45">{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- ENGINES ---------------- */}
      <section id="engines" className="relative mx-auto max-w-6xl px-6 py-28">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-medium text-accent-soft">Three engines, one canvas</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Prevent. React. Prepare.
          </h2>
          <p className="mt-4 text-white/50">
            A system that only reacts is half a solution. Gridlock layers a
            proactive risk surface beneath a live response engine.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {engines.map((e) => (
            <div
              key={e.title}
              className="card group p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.05]"
            >
              <span className="inline-block rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1 text-xs font-medium text-accent-soft">
                {e.tag}
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">
                {e.title}
              </h3>
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
              <p className="mb-3 text-sm font-medium text-accent-soft">The pipeline</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                From a single incident to an action plan — in one call.
              </h2>
              <p className="mt-4 text-white/50">
                Each incident is enriched the instant it arrives: severity and
                closure probability, predicted clearance time, the junctions it
                will choke, and three real road-network diversions ranked by ETA.
              </p>
            </div>
            <ol className="space-y-1">
              {[
                ["Detect", "Incident streams in with location, cause, time"],
                ["Grade", "Severity · closure probability · clearance ETA"],
                ["Spread", "Nearby junctions ranked by predicted risk"],
                ["Route", "Dijkstra · A* · Yen's K around the blockage"],
              ].map(([k, v], i) => (
                <li
                  key={k}
                  className="flex items-start gap-4 rounded-2xl px-4 py-3.5 transition hover:bg-white/[0.03]"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-xs text-white/50">
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

      {/* ---------------- STACK ---------------- */}
      <section id="stack" className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Built on a serious stack
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map(([k, v]) => (
            <div key={k} className="card p-6 transition hover:bg-white/[0.05]">
              <div className="text-base font-medium text-white">{k}</div>
              <div className="mt-2 text-xs text-white/45">{v}</div>
            </div>
          ))}
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
                POST broadcast · /api/fleet/quarantines
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

      {/* ---------------- CTA ---------------- */}
      <section className="relative mx-auto max-w-6xl px-6 py-28">
        <div className="relative overflow-hidden rounded-4xl border border-white/[0.07] bg-white/[0.02] px-8 py-20 text-center">
          <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/[0.10] blur-[100px]" />
          <h2 className="mx-auto max-w-2xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            See the city think.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-white/50">
            Open the live operations console and watch real Bengaluru incidents
            resolve in real time.
          </p>
          <Link href="/dashboard" className="btn-accent mt-9">
            Launch Console
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] py-10 text-center text-xs text-white/30">
        Gridlock · Event-Driven Congestion Intelligence · Flipkart GRID
      </footer>
    </main>
  );
}
