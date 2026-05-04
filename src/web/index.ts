/**
 * Lira Design System — Web entry.
 *
 * Import from '@lira/design-system/web' in Next.js / React apps.
 * Pair with these CSS imports in your global stylesheet:
 *
 *   @import "@lira/design-system/tokens.css";   // CSS variables (themes)
 *   @import "@lira/design-system/tailwind";     // Tailwind v4 @theme preset
 *   @import "tailwindcss";
 *
 * Then set [data-theme] either via <LiraThemeProvider> or directly on <html>.
 */

export * from './primitives';
export { LiraThemeProvider, useLiraSurface, type LiraSurface } from './theme/ThemeProvider';
export { cn } from './lib/cn';
