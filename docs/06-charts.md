# Charts

Lira has two distinct chart vocabularies. Don't mix them.

## Consumer charts (Women)

Used in the mobile app — sparklines for energy, weekly mood overview, simple trend lines. Optimized for *quick glance reassurance*, not analytical depth.

```tsx
const t = tokens.chart.consumer;
//   t.stroke  →  brand green   #5A9E78
//   t.area    →  green/100 fill #DDF1E6
//   t.grid    →  warm-200      #E9E0D6
//   t.axis    →  warm-500      #8A7A6A
//   t.label   →  warm-500
```

Rules:

- One series per chart. Always green.
- No gridlines in casual contexts. If you need a baseline, use a single warm-200 horizontal line.
- Soft curves are welcome — use `buildSmoothPath` from `@lira/design-system/chart-utils`.
- Y-axis labels stay subtle (`secondary` text tone).
- Numbers stay calm — never red/critical framing in the consumer app.

## Clinical charts (Professionals)

Used in `lira-clinical-protocol`. Multi-series radar charts, dimensional profiles, criteria coverage. Optimized for *clinical reading rigor*.

```tsx
const t = tokens.chart.clinical;
//   t.axis      →  #C8D2CD
//   t.grid      →  #E3E8E5
//   t.label     →  cool-500   #5F6B64
//   t.seriesA   →  data-clinical green   #52766A
//   t.seriesB   →  data-clinical plum    #7A6578
//   t.seriesC   →  data-clinical slate   #5F6B73
//   t.seriesD   →  data-clinical teal    #4F7F82
//   t.seriesE   →  data-clinical sand    #C7B99D
//   t.dataBlue  →  #426B9A   (additional series — never UI)
```

Rules:

- Up to 5 default series; add more by reusing `dataBlue` for cross-comparison overlays only.
- Gridlines visible. Axis labels visible. We optimize for accuracy, not minimalism.
- Use the same `seriesA → seriesE` order across the product so clinicians can develop pattern recognition.
- Never use any of these clinical colors for UI buttons / actions / chrome. They're chart-only.

## Shared utilities

```tsx
import {
  normalizeValues,
  pointsFromValues,
  buildPolylinePath,
  buildSmoothPath,
} from '@lira/design-system/chart-utils';

const norm = normalizeValues(values, 0, 10);
const points = pointsFromValues(norm, 240, 80, 8);
const d = buildSmoothPath(points);

return <Path d={d} stroke="var(--chart-consumer-stroke)" fill="none" />;
```

Use these instead of bespoke math — they keep the chart family visually consistent.

## Hard rule

**`color.data.blue` is reserved for clinical chart series.** Never as an action color, link color, focus ring, accent, badge, or anything UI-shaped. The Lira brand has no blue.
