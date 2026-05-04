import * as React from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { useLiraTheme } from '../theme/ThemeProvider';
import { AppText } from './AppText';

export interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  style?: ViewStyle;
}

/** Top-of-screen title bar. Sits inside AppScreen. */
export function AppHeader({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  style,
}: AppHeaderProps) {
  const theme = useLiraTheme();

  return (
    <View style={[styles.row, { paddingVertical: theme.space[3] ?? 12 }, style]}>
      <Pressable
        accessibilityRole="button"
        onPress={onLeftPress}
        hitSlop={8}
        style={styles.iconSlot}
        disabled={!onLeftPress}
      >
        {leftIcon}
      </Pressable>
      <View style={styles.center}>
        {title ? <AppText variant="title" weight="semibold">{title}</AppText> : null}
        {subtitle ? <AppText variant="bodySmall" tone="secondary">{subtitle}</AppText> : null}
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={onRightPress}
        hitSlop={8}
        style={styles.iconSlot}
        disabled={!onRightPress}
      >
        {rightIcon}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  iconSlot: { minWidth: 40, alignItems: 'center', justifyContent: 'center' },
});
