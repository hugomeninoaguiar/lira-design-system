import * as React from 'react';
import { View, StyleSheet, type ViewProps } from 'react-native';
import { useLiraTheme } from '../theme/ThemeProvider';
import { AppText } from './AppText';

export type AppCalloutTone = 'info' | 'success' | 'error' | 'accent';

export interface AppCalloutProps extends ViewProps {
  tone?: AppCalloutTone;
  title?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function AppCallout({
  tone = 'info',
  title,
  icon,
  style,
  children,
  ...props
}: AppCalloutProps) {
  const theme = useLiraTheme();

  const toneMap: Record<AppCalloutTone, { bg: string; fg: string; border: string }> = {
    info:    { bg: theme.semantic.feedback.info.bg,    fg: theme.semantic.feedback.info.fg,    border: 'transparent' },
    success: { bg: theme.semantic.feedback.success.bg, fg: theme.semantic.feedback.success.fg, border: 'transparent' },
    error:   { bg: theme.semantic.feedback.error.bg,   fg: theme.semantic.feedback.error.fg,   border: 'transparent' },
    accent:  { bg: theme.semantic.accent.subtle,       fg: theme.semantic.text.primary,         border: theme.semantic.accent.primary },
  };

  const t = toneMap[tone];

  return (
    <View
      style={[
        styles.row,
        {
          backgroundColor: t.bg,
          borderColor: t.border,
          borderWidth: t.border === 'transparent' ? 0 : 1,
          borderRadius: theme.radius.md ?? 16,
          padding: theme.space[4] ?? 16,
        },
        style,
      ]}
      {...props}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <View style={styles.body}>
        {title ? <AppText variant="bodySmall" weight="semibold" color={t.fg}>{title}</AppText> : null}
        {typeof children === 'string' ? (
          <AppText variant="bodySmall" color={t.fg}>{children}</AppText>
        ) : (
          children
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  icon: { marginRight: 12, marginTop: 2 },
  body: { flex: 1, gap: 2 },
});
