import * as React from 'react';

export type LiraSurface = 'women' | 'professionals';

interface LiraThemeContextValue {
  surface: LiraSurface;
}

const LiraThemeContext = React.createContext<LiraThemeContextValue>({ surface: 'women' });

interface LiraThemeProviderProps {
  surface?: LiraSurface;
  /** Wrap children in a div with `data-theme`. Set false to apply on `<html>` yourself. */
  asWrapper?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Provides the active Lira surface to descendants and (by default) renders a
 * wrapper div with `data-theme={surface}`. CSS variables under that scope swap
 * to the matching semantic palette.
 *
 * Two valid usage patterns:
 *
 *  1. Wrap the React tree:
 *       <LiraThemeProvider surface="professionals">…</LiraThemeProvider>
 *
 *  2. Apply on <html> in a Next.js layout and use the provider only for context:
 *       <html data-theme="professionals">
 *       <LiraThemeProvider surface="professionals" asWrapper={false}>…</LiraThemeProvider>
 */
export function LiraThemeProvider({
  surface = 'women',
  asWrapper = true,
  children,
  className,
}: LiraThemeProviderProps) {
  const value = React.useMemo(() => ({ surface }), [surface]);
  return (
    <LiraThemeContext.Provider value={value}>
      {asWrapper ? (
        <div data-theme={surface} className={className}>
          {children}
        </div>
      ) : (
        children
      )}
    </LiraThemeContext.Provider>
  );
}

export function useLiraSurface(): LiraSurface {
  return React.useContext(LiraThemeContext).surface;
}
