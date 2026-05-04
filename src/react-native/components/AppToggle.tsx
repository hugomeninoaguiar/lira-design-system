import * as React from 'react';
import { Pressable, View, StyleSheet, Animated, type ViewStyle } from 'react-native';
import { useLiraTheme } from '../theme/ThemeProvider';

export interface AppToggleProps {
  value: boolean;
  onValueChange: (next: boolean) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: ViewStyle;
}

/** A simple animated switch tied to action.primary tokens. */
export function AppToggle({
  value,
  onValueChange,
  disabled,
  accessibilityLabel,
  style,
}: AppToggleProps) {
  const theme = useLiraTheme();
  const anim = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(anim, { toValue: value ? 1 : 0, duration: 180, useNativeDriver: false }).start();
  }, [anim, value]);

  const trackBg = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.semantic.background.surfaceMuted, theme.semantic.action.primary],
  });
  const knobX = anim.interpolate({ inputRange: [0, 1], outputRange: [2, 22] });

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled: !!disabled }}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      style={({ pressed }) => [styles.wrapper, pressed && { opacity: 0.85 }, style]}
    >
      <Animated.View style={[styles.track, { backgroundColor: trackBg, opacity: disabled ? 0.5 : 1 }]}>
        <Animated.View
          style={[
            styles.knob,
            {
              left: knobX,
              backgroundColor: theme.semantic.background.surface,
              shadowColor: theme.shadow.color,
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: { padding: 4 },
  track: { width: 44, height: 24, borderRadius: 12, justifyContent: 'center' },
  knob: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
});
