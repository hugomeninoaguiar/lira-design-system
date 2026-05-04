import * as React from 'react';
import { View, StyleSheet, type ViewProps } from 'react-native';
import { useLiraTheme } from '../theme/ThemeProvider';
import { AppText } from './AppText';

export type AppCalloutTone = 'info' | 'success' | 'warning' | 'error' | 'brand';

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
    info:    { bg: theme.semantic.feedback.infoBg,    fg: theme.semantic.feedback.infoFg,    border: 'transparent' },
    success: { bg: theme.semantic.feedback.successBg, fg: theme.semantic.feedback.successFg, border: 'transparent' },
    warning: { bg: theme.semantic.feedback.warningBg, fg: theme.semantic.feedback.warningFg, border: 'transparent' },
    error:   { bg: theme.semantic.feedback.errorBg,   fg: theme.semantic.feedback.errorFg,   border: 'transparent' },
    brand:   { bg: theme.semantic.accent.mintSoft,    fg: theme.semantic.text.onAccent,      border: theme.semantic.accent.mint },
  };

  const t = toneMap[tone];

  return (
    <View
      style={[
        styles.row,
        {
          backgroundColor: t.bg,
          borderColor: t.border,
          borderWidth: t.border === 'transparent' ? 0 : StyleSheet.hairlineWidth,
          borderRadius: theme.radius.md ?? 12,
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
