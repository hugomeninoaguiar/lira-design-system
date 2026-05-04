import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLiraTheme } from '../theme/ThemeProvider';

export interface AppStepperProps {
  total: number;
  /** Zero-indexed current step. */
  current: number;
}

/** Compact progress dots used in onboarding / multi-step flows. */
export function AppStepper({ total, current }: AppStepperProps) {
  const theme = useLiraTheme();
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => {
        const active = i === current;
        const past = i < current;
        return (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor:
                  active
                    ? theme.semantic.action.primary
                    : past
                      ? theme.semantic.action.primarySoft
                      : theme.semantic.background.surfaceMuted,
                width: active ? 20 : 8,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { height: 8, borderRadius: 4 },
});
