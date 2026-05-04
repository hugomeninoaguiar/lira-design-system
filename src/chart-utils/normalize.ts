/**
 * Map an array of values into the [0, 1] domain, optionally clamped to a fixed
 * min/max so charts share a stable y-axis across re-renders.
 */
export function normalizeValues(values: number[], min?: number, max?: number): number[] {
  if (!values.length) return [];
  const low = min ?? Math.min(...values);
  const high = max ?? Math.max(...values);
  if (high === low) return values.map(() => 0.5);
  return values.map((value) => (value - low) / (high - low));
}
