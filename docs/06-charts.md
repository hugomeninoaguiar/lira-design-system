# Charts

Chart tokens and utilities for the Lira for Women mobile app.

## Consumer charts (Women)

Used in the mobile app for sparklines, weekly mood overview, and simple trend lines. Optimized for *quick-glance reassurance*, not analytical depth.

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

**`color.data.blue` is reserved for data visualization only.** Never as an action color, link color, focus ring, accent, badge, or any UI chrome.
