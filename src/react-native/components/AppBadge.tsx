import * as React from 'react';
import { View, StyleSheet, type ViewProps } from 'react-native';
import { useLiraTheme } from '../theme/ThemeProvider';
import { AppText } from './AppText';

export type AppBadgeTone = 'neutral' | 'accent' | 'success' | 'error' | 'info';

export interface AppBadgeProps extends ViewProps {
  label: string;
  tone?: AppBadgeTone;
}

export function AppBadge({ label, tone = 'neutral', style, ...props }: AppBadgeProps) {
  const theme = useLiraTheme();

  const map: Record<AppBadgeTone, { bg: string; fg: string; border?: string }> = {
    neutral: { bg: theme.semantic.background.subtle, fg: theme.semantic.text.secondary, border: theme.semantic.border.default },
    accent:  { bg: theme.semantic.accent.subtle, fg: theme.semantic.text.primary, border: theme.semantic.accent.primary },
    success: { bg: theme.semantic.feedback.success.bg, fg: theme.semantic.feedback.success.fg },
    error:   { bg: theme.semantic.feedback.error.bg, fg: theme.semantic.feedback.error.fg },
    info:    { bg: theme.semantic.feedback.info.bg, fg: theme.semantic.feedback.info.fg },
  };
  const t = map[tone];

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: t.bg,
          borderColor: t.border ?? 'transparent',
          borderWidth: t.border ? 1 : 0,
          borderRadius: theme.radius.pill ?? 999,
        },
        style,
      ]}
      {...props}
    >
      <AppText variant="caption" color={t.fg}>{label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 2 },
});
