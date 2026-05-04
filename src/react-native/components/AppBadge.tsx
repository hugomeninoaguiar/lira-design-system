import * as React from 'react';
import { View, StyleSheet, type ViewProps } from 'react-native';
import { useLiraTheme } from '../theme/ThemeProvider';
import { AppText } from './AppText';

export type AppBadgeTone = 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info';

export interface AppBadgeProps extends ViewProps {
  label: string;
  tone?: AppBadgeTone;
}

export function AppBadge({ label, tone = 'neutral', style, ...props }: AppBadgeProps) {
  const theme = useLiraTheme();

  const map: Record<AppBadgeTone, { bg: string; fg: string; border?: string }> = {
    neutral: { bg: theme.semantic.background.surfaceSubtle, fg: theme.semantic.text.secondary, border: theme.semantic.border.subtle },
    brand:   { bg: theme.semantic.accent.mintSoft, fg: theme.semantic.text.onAccent, border: theme.semantic.accent.mint },
    success: { bg: theme.semantic.feedback.successBg, fg: theme.semantic.feedback.successFg },
    warning: { bg: theme.semantic.feedback.warningBg, fg: theme.semantic.feedback.warningFg },
    error:   { bg: theme.semantic.feedback.errorBg, fg: theme.semantic.feedback.errorFg },
    info:    { bg: theme.semantic.feedback.infoBg, fg: theme.semantic.feedback.infoFg },
  };
  const t = map[tone];

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: t.bg,
          borderColor: t.border ?? 'transparent',
          borderWidth: t.border ? StyleSheet.hairlineWidth : 0,
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
