import * as React from 'react';
import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
  StyleSheet,
  type ViewStyle,
  View,
} from 'react-native';
import { useLiraTheme } from '../theme/ThemeProvider';
import { AppText } from './AppText';

export type AppButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type AppButtonSize = 'sm' | 'md' | 'lg';

export interface AppButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  label: string;
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  style?: ViewStyle;
}

export function AppButton({
  label,
  variant = 'primary',
  size = 'md',
  fullWidth = true,
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  style,
  ...props
}: AppButtonProps) {
  const theme = useLiraTheme();
  const isDisabled = disabled || loading;

  const sizeMap: Record<AppButtonSize, { height: number; paddingX: number; fontSize: number }> = {
    sm: { height: 40, paddingX: theme.space[4] ?? 16, fontSize: theme.fontSize[14] ?? 14 },
    md: { height: 48, paddingX: theme.space[6] ?? 24, fontSize: theme.fontSize[16] ?? 16 },
    lg: { height: 56, paddingX: theme.space[6] ?? 24, fontSize: theme.fontSize[18] ?? 18 },
  };

  const variantStyles = (pressed: boolean): { container: ViewStyle; textColor: string } => {
    const a = theme.semantic.action;
    switch (variant) {
      case 'primary':
        return {
          container: {
            backgroundColor: a.primary,
            opacity: pressed ? 0.9 : 1,
          },
          textColor: theme.semantic.text.onPrimary,
        };
      case 'secondary':
        return {
          container: {
            backgroundColor: a.primarySoft,
            opacity: pressed ? 0.9 : 1,
          },
          textColor: theme.semantic.text.primary,
        };
      case 'outline':
        return {
          container: {
            backgroundColor: pressed ? theme.semantic.background.subtle : 'transparent',
            borderWidth: 1,
            borderColor: theme.semantic.border.default,
          },
          textColor: theme.semantic.text.primary,
        };
      case 'ghost':
        return {
          container: {
            backgroundColor: pressed ? theme.semantic.background.subtle : 'transparent',
          },
          textColor: theme.semantic.text.primary,
        };
      case 'destructive':
        return {
          container: {
            backgroundColor: a.destructive,
            opacity: pressed ? 0.9 : 1,
          },
          textColor: theme.semantic.text.onPrimary,
        };
    }
  };

  const sized = sizeMap[size];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => {
        const v = variantStyles(pressed);
        return [
          styles.base,
          {
            height: sized.height,
            paddingHorizontal: sized.paddingX,
            borderRadius: theme.radius.pill ?? 999,
            opacity: isDisabled ? 0.6 : 1,
          },
          v.container,
          fullWidth ? styles.fullWidth : null,
          style,
        ];
      }}
      {...props}
    >
      {({ pressed }) => {
        const v = variantStyles(pressed);
        return (
          <View style={styles.contentRow}>
            {loading ? (
              <ActivityIndicator color={v.textColor} size="small" />
            ) : (
              <>
                {iconLeft ? <View style={styles.iconLeft}>{iconLeft}</View> : null}
                <AppText
                  variant={size === 'sm' ? 'bodySmall' : 'title'}
                  weight="semibold"
                  color={v.textColor}
                >
                  {label}
                </AppText>
                {iconRight ? <View style={styles.iconRight}>{iconRight}</View> : null}
              </>
            )}
          </View>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: { width: '100%' },
  contentRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconLeft: { marginRight: 4 },
  iconRight: { marginLeft: 4 },
});
