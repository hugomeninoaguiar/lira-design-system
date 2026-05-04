import * as React from 'react';
import { TextInput, type TextInputProps, View, StyleSheet, type ViewStyle } from 'react-native';
import { useLiraTheme } from '../theme/ThemeProvider';
import { AppText } from './AppText';

export interface AppTextFieldProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  hint?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextInputProps['style'];
}

/** Themed text field with label, hint, and error states. */
export function AppTextField({
  label,
  hint,
  error,
  containerStyle,
  inputStyle,
  editable,
  onFocus,
  onBlur,
  ...props
}: AppTextFieldProps) {
  const theme = useLiraTheme();
  const [focused, setFocused] = React.useState(false);
  const isError = !!error;
  const isDisabled = editable === false;

  const borderColor = isError
    ? theme.semantic.feedback.errorFg
    : focused
      ? theme.semantic.border.focus
      : theme.semantic.border.default;

  return (
    <View style={[styles.field, containerStyle]}>
      {label ? <AppText variant="label">{label}</AppText> : null}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDisabled
              ? theme.semantic.background.surfaceMuted
              : theme.semantic.background.surface,
            borderColor,
            color: theme.semantic.text.primary,
            borderRadius: theme.radius.md ?? 12,
            paddingHorizontal: theme.space[4] ?? 16,
            fontSize: theme.fontSize[16] ?? 16,
            opacity: isDisabled ? 0.7 : 1,
          },
          inputStyle,
        ]}
        placeholderTextColor={theme.semantic.text.muted}
        editable={editable}
        onFocus={(e) => { setFocused(true); onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); onBlur?.(e); }}
        accessibilityLabel={label}
        {...props}
      />
      {hint && !error ? <AppText variant="caption" tone="secondary">{hint}</AppText> : null}
      {error ? <AppText variant="caption" tone="error">{error}</AppText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 6 },
  input: {
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
