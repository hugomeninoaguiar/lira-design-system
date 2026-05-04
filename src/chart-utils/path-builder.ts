export type Point = { x: number; y: number };

/** Build an SVG `d` attribute from an ordered list of points (move-to + line-to). */
export function buildPolylinePath(points: Point[]): string {
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');
}

/**
 * Build a smoothed Catmull-Rom-ish curve. Optional, useful for soft sparklines
 * matching the Lira-for-Women aesthetic.
 */
export function buildSmoothPath(points: Point[], tension = 0.4): string {
  if (points.length < 2) return buildPolylinePath(points);
  const segs: string[] = [`M ${points[0].x} ${points[0].y}`];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? points[i + 1];
    const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension * 2;
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension * 2;
    const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension * 2;
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension * 2;
    segs.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`);
  }
  return segs.join(' ');
}

/** Map normalized [0, 1] values into a coordinate space inside `width × height`. */
export function pointsFromValues(values: number[], width: number, height: number, padding = 0): Point[] {
  if (values.length === 0) return [];
  const innerWidth = Math.max(width - padding * 2, 0);
  const innerHeight = Math.max(height - padding * 2, 0);
  const step = values.length === 1 ? 0 : innerWidth / (values.length - 1);
  return values.map((value, index) => ({
    x: padding + index * step,
    y: padding + (1 - value) * innerHeight,
  }));
}
