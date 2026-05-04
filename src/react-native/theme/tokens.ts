/**
 * Re-exports the generated React Native theme.
 * Source of truth lives in `tokens/` — see `dist/react-native/theme.ts`.
 */
export {
  womenTheme,
  themes,
  type LiraTheme,
  type LiraThemeName,
} from '../../../dist/react-native/theme';

import { womenTheme } from '../../../dist/react-native/theme';

// Backwards-compatible flat exports for existing call sites.
// Prefer `useLiraTheme()` in new code; these are stable shortcuts.
export const colors = womenTheme.color;
export const semantic = womenTheme.semantic;
export const space = womenTheme.space;
export const radius = womenTheme.radius;
export const fontSize = womenTheme.fontSize;
export const fontWeight = womenTheme.fontWeight;
export const lineHeight = womenTheme.lineHeight;
export const shadow = womenTheme.shadow;
