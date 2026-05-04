import * as React from 'react';
import { themes, type LiraTheme, type LiraThemeName } from '../../../dist/react-native/theme';

interface LiraThemeContextValue {
  themeName: LiraThemeName;
  theme: LiraTheme;
}

const LiraThemeContext = React.createContext<LiraThemeContextValue>({
  themeName: 'women',
  theme: themes.women as LiraTheme,
});

interface LiraThemeProviderProps {
  themeName?: LiraThemeName;
  children: React.ReactNode;
}

/**
 * Wrap the app root with this provider. Defaults to 'women' (the Lira home base).
 * Set themeName="professionals" if hosting the Professionals product as a mobile app.
 *
 *   <LiraThemeProvider>
 *     <App />
 *   </LiraThemeProvider>
 */
export function LiraThemeProvider({ themeName = 'women', children }: LiraThemeProviderProps) {
  const value = React.useMemo<LiraThemeContextValue>(
    () => ({ themeName, theme: themes[themeName] as LiraTheme }),
    [themeName],
  );
  return <LiraThemeContext.Provider value={value}>{children}</LiraThemeContext.Provider>;
}

/** Read the active Lira theme inside any component below LiraThemeProvider. */
export function useLiraTheme(): LiraTheme {
  return React.useContext(LiraThemeContext).theme;
}

/** Read just the active theme name. */
export function useLiraThemeName(): LiraThemeName {
  return React.useContext(LiraThemeContext).themeName;
}
