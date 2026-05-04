/**
 * Lira Design System — React Native entry.
 *
 * Import in your Expo / React Native app:
 *
 *   import { LiraThemeProvider, AppButton, AppText } from '@lira/design-system/react-native';
 *
 *   function App() {
 *     return (
 *       <LiraThemeProvider>
 *         <YourApp />
 *       </LiraThemeProvider>
 *     );
 *   }
 *
 * To switch themes (e.g. for the Professionals app shell), pass `themeName="professionals"`.
 */

export * from './components';
export {
  LiraThemeProvider,
  useLiraTheme,
  useLiraThemeName,
} from './theme/ThemeProvider';
export {
  womenTheme,
  professionalsTheme,
  themes,
  colors,
  semantic,
  space,
  radius,
  fontSize,
  fontWeight,
  lineHeight,
  shadow,
  type LiraTheme,
  type LiraThemeName,
} from './theme/tokens';
