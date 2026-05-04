import * as React from 'react';
import { Pressable, View, StyleSheet, type PressableProps } from 'react-native';
import { useLiraTheme } from '../theme/ThemeProvider';
import { AppText } from './AppText';

export interface AppListRowProps extends Omit<PressableProps, 'children'> {
  title: string;
  description?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  selected?: boolean;
}

/** A standard tappable list row — used for settings, choices, navigation. */
export function AppListRow({
  title,
  description,
  leftSlot,
  rightSlot,
  selected,
  ...props
}: AppListRowProps) {
  const theme = useLiraTheme();

  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: selected
            ? theme.semantic.action.primarySoft
            : pressed
              ? theme.semantic.action.ghostHover
              : theme.semantic.background.surface,
          borderColor: selected ? theme.semantic.action.primary : theme.semantic.border.subtle,
          borderRadius: theme.radius.md ?? 12,
          paddingHorizontal: theme.space[4] ?? 16,
          paddingVertical: theme.space[3] ?? 12,
          minHeight: 56,
        },
      ]}
      {...props}
    >
      {leftSlot ? <View style={styles.left}>{leftSlot}</View> : null}
      <View style={styles.body}>
        <AppText variant="title" weight="medium">{title}</AppText>
        {description ? <AppText variant="bodySmall" tone="secondary">{description}</AppText> : null}
      </View>
      {rightSlot ? <View style={styles.right}>{rightSlot}</View> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', borderWidth: StyleSheet.hairlineWidth },
  left: { marginRight: 12 },
  body: { flex: 1, gap: 2 },
  right: { marginLeft: 12 },
});
