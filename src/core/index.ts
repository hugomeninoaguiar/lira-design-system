/**
 * Core entry — exposes the platform-agnostic token object.
 *
 *   import tokens from '@lira/design-system';
 *   tokens.color.green[500]              // "#5A9E78"
 *   tokens.semantic.action.primary       // "#5A9E78"   (Women defaults)
 *   tokens.space[4]                      // 16
 *
 * For the Professionals theme as a JS object, import from `/react-native/theme`:
 *   import { professionalsTheme } from '@lira/design-system/react-native/theme';
 */
export { tokens, default } from '../../dist/js/tokens.esm.js';
