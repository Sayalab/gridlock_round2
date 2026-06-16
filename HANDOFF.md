# 👋 START HERE — Frontend Handoff

Hey! This is everything you need to start the **Next.js frontend**. You are **not blocked**
on the backend — build against the sample JSON files first, connect live at the end.

---

## 1. What we're building (30-sec version)

Theme 2: **Event-Driven Congestion** for Flipkart GRID. Focus = **unplanned** traffic incidents
in Bengaluru. A live operations dashboard with a **Mappls (MapmyIndia) map** that shows:
- **Live incidents** popping in real time (breakdowns, accidents…) with diversion routes — the HERO.
- A **baseline risk heatmap + time slider** (where is risk high, by hour).
- A **planned-event forecast** mode.

Full details are in **`PROJECT_PLAN.md`** (read Sections 6, 7, 9, 10). Your deliverables = **D12–D18**.

---

## 2. The 3 things to know

1. **The API has 3 endpoints. Each has a ready sample file — build against these.**
   | Endpoint | Sample file | Screen it drives |
   |----------|-------------|------------------|
   | `GET /api/live-feed?since=<iso>` | `sample_response.json` | Live dashboard (HERO) |
   | `GET /api/risk-map?datetime=<iso>` | `sample_risk_map.json` | Heatmap + time slider |
   | `POST /api/forecast` | `sample_forecast.json` | Planned-event forecast |

2. **Everything you draw is already in the JSON.** Every zone = `{zone_id, risk_score, color, radius_m}`
   (+ `name, lat, lng`). Colors are pre-computed — never reinvent thresholds. Diversion routes are
   `polyline: [[lat,lng], ...]` — draw directly. Use the same `legend[]` everywhere.

3. **Use the mock toggle so you can work offline today.** Set `NEXT_PUBLIC_USE_MOCK=1` and use the
   `lib/api.ts` helper (code in `PROJECT_PLAN.md` Section 9). When the backend is live, set
   `ML_API_URL` + unset the mock flag → **zero component changes**.

---

## 3. Do these first (day 1)

- [ ] `npx create-next-app` (App Router, TypeScript).
- [ ] Get a **Mappls/MapmyIndia API key** → https://apis.mapmyindia.com (can take time to activate — do it now).
- [ ] Copy the 3 sample JSONs into the project (e.g. `/mocks`), wire up `lib/api.ts` with `USE_MOCK`.
- [ ] Create the 3 gateway routes: `app/api/live-feed/route.ts`, `risk-map/route.ts`, `forecast/route.ts`
      (code in `PROJECT_PLAN.md` Section 9).
- [ ] Render the Mappls map + plot `baseline_zones` from `sample_risk_map.json` as colored circles.

---

## 4. Component map (suggested)

| Component | Reads | Notes |
|-----------|-------|-------|
| `LiveMap` | zone arrays | the ONE map, reused by all 3 views. Circle color/radius from JSON. |
| `LiveFeed` | `new_incidents[]` | side cards: cause, priority, closure %, clearance countdown |
| `SimClock` | — | play/pause/speed; advances `since` using `next_since` from each response |
| `DiversionRoutes` | `recommendation.diversion.routes[]` | draw `polyline` per route; route 1 green, alternates amber |
| `RiskHeatmap` | `baseline_zones[]` | default background layer |
| `TimelineSlider` | `risk_timeline[]` | slider index → `risk_timeline[i].zones` → recolor map. Merge by `zone_id` (coords live in `baseline_zones`). |

---

## 5. How the live feed "streams"

The backend replays 5 months of real incidents. Poll `GET /api/live-feed?since=<iso>`; the response
gives `next_since` — use it as the next `?since=`. The `SimClock` just keeps advancing it (speed up:
1 sec = 1 hr). New incidents pop on the map + slide into the feed with a clearance countdown.

---

## 6. Time slider logic (the bit people overthink)

```
slider position i  →  step = risk_timeline[i]
for each zone in step.zones:
    find its lat/lng from baseline_zones (match by zone_id)
    recolor/resize the map circle using step.zones[i].{color, radius_m}
```
No re-fetch while sliding — the whole timeline is already in the response.

---

## 7. Running the backend (only when you want LIVE data)

```bash
cd backend
python -m pip install -r requirements.txt
python train.py                       # required (~10s)
python road_network.py --build        # optional: real diversion routes (slow, one-time)
uvicorn app:app --reload --port 8000  # docs at http://localhost:8000/docs
```
Then in the frontend: `ML_API_URL=http://localhost:8000` and remove `NEXT_PUBLIC_USE_MOCK`.

---

## 8. Gotchas

- **Don't commit `backend/models/bengaluru_graph.pkl`** (~150k nodes, huge). Add to `.gitignore`; rebuild with the command above.
- Diversions work even **without** the road graph (synthetic fallback) — so demos never break.
- Mappls SDK loads via a script tag with your key; render the map only after it's loaded (client component).

Ping me (ML/backend) if any JSON field is unclear. Let's lock the look first, then connect live. 🚀
