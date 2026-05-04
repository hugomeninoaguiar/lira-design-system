import * as React from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';
import { useLiraTheme } from '../theme/ThemeProvider';

export type AppCardTone = 'default' | 'subtle' | 'accent';
export type AppCardElevation = 'flat' | 'soft' | 'lifted';
export type AppCardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface AppCardProps extends ViewProps {
  tone?: AppCardTone;
  elevation?: AppCardElevation;
  padding?: AppCardPadding;
}

export function AppCard({
  tone = 'default',
  elevation = 'soft',
  padding = 'md',
  style,
  children,
  ...props
}: AppCardProps) {
  const theme = useLiraTheme();
  const shadowColor = theme.shadow.color;

  const toneBg: Record<AppCardTone, string> = {
    default: theme.semantic.background.surface,
    subtle:  theme.semantic.background.surfaceSubtle,
    accent:  theme.semantic.accent.mintSoft,
  };
  const toneBorder: Record<AppCardTone, string> = {
    default: theme.semantic.border.subtle,
    subtle:  theme.semantic.border.subtle,
    accent:  theme.semantic.accent.mint,
  };

  const paddingMap: Record<AppCardPadding, number> = {
    none: 0,
    sm: theme.space[4] ?? 16,
    md: theme.space[5] ?? 20,
    lg: theme.space[6] ?? 24,
  };

  const elevationStyle =
    elevation === 'flat'
      ? null
      : elevation === 'soft'
        ? { shadowColor, shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 1 }
        : { shadowColor, shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 4 };

  return (
    <View
      style={[
        {
          backgroundColor: toneBg[tone],
          borderColor: toneBorder[tone],
          borderWidth: StyleSheet.hairlineWidth,
          borderRadius: theme.radius.lg ?? 16,
          padding: paddingMap[padding],
        },
        elevationStyle,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
