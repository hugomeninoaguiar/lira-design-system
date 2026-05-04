import * as React from 'react';
import {
  ScrollView,
  type ScrollViewProps,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import { useLiraTheme } from '../theme/ThemeProvider';

export interface AppScreenProps extends ScrollViewProps {
  /** When true (default) renders a ScrollView. Set false for static / list screens. */
  scrollable?: boolean;
  /** Padding around screen content. Defaults to space-5 (20). */
  paddingX?: number;
  paddingY?: number;
  containerStyle?: ViewStyle;
}

/**
 * Top-level screen container. Applies the active theme's app background
 * and consistent horizontal padding.
 */
export function AppScreen({
  scrollable = true,
  paddingX,
  paddingY,
  containerStyle,
  contentContainerStyle,
  style,
  children,
  ...props
}: AppScreenProps) {
  const theme = useLiraTheme();
  const px = paddingX ?? theme.space[5] ?? 20;
  const py = paddingY ?? theme.space[5] ?? 20;
  const bg = theme.semantic.background.app;

  if (!scrollable) {
    return (
      <View style={[{ flex: 1, backgroundColor: bg, paddingHorizontal: px, paddingVertical: py }, containerStyle]}>
        {children}
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: bg }, style]}
      contentContainerStyle={[{ paddingHorizontal: px, paddingVertical: py }, contentContainerStyle]}
      {...props}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
});
