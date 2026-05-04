import * as React from 'react';
import { Text as RNText, type TextProps as RNTextProps, StyleSheet } from 'react-native';
import { useLiraTheme } from '../theme/ThemeProvider';

export type AppTextVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'title'
  | 'bodyLarge'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'label';

export type AppTextTone =
  | 'primary'
  | 'secondary'
  | 'onPrimary'
  | 'success'
  | 'info'
  | 'error';

export interface AppTextProps extends RNTextProps {
  variant?: AppTextVariant;
  tone?: AppTextTone;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold' | 'heavy';
  /** Override the resolved color outright. */
  color?: string;
  /** Explicit children declaration required for React 19 compatibility. */
  children?: React.ReactNode;
}

export function AppText({
  variant = 'body',
  tone = 'primary',
  weight,
  color,
  style,
  ...props
}: AppTextProps) {
  const theme = useLiraTheme();

  const sizeMap: Record<AppTextVariant, { fontSize: number; lineHeight: number; fontWeight: '400' | '500' | '600' | '700' }> = {
    display:    { fontSize: theme.fontSize[48] ?? 48, lineHeight: 56, fontWeight: '700' },
    h1:         { fontSize: theme.fontSize[40] ?? 40, lineHeight: 46, fontWeight: '700' },
    h2:         { fontSize: theme.fontSize[32] ?? 32, lineHeight: 40, fontWeight: '700' },
    h3:         { fontSize: theme.fontSize[24] ?? 24, lineHeight: 32, fontWeight: '600' },
    h4:         { fontSize: theme.fontSize[20] ?? 20, lineHeight: 28, fontWeight: '600' },
    title:      { fontSize: theme.fontSize[18] ?? 18, lineHeight: 24, fontWeight: '600' },
    bodyLarge:  { fontSize: theme.fontSize[18] ?? 18, lineHeight: 28, fontWeight: '400' },
    body:       { fontSize: theme.fontSize[16] ?? 16, lineHeight: 24, fontWeight: '400' },
    bodySmall:  { fontSize: theme.fontSize[14] ?? 14, lineHeight: 20, fontWeight: '400' },
    caption:    { fontSize: theme.fontSize[12] ?? 12, lineHeight: 16, fontWeight: '500' },
    label:      { fontSize: theme.fontSize[14] ?? 14, lineHeight: 18, fontWeight: '500' },
  };

  const toneMap: Record<AppTextTone, string> = {
    primary:   theme.semantic.text.primary,
    secondary: theme.semantic.text.secondary,
    onPrimary: theme.semantic.text.onPrimary,
    success:   theme.semantic.feedback.success.fg,
    info:      theme.semantic.feedback.info.fg,
    error:     theme.semantic.feedback.error.fg,
  };

  const weightMap = { regular: '400', medium: '500', semibold: '600', bold: '700', heavy: '800' } as const;

  const sized = sizeMap[variant];
  const resolvedColor = color ?? toneMap[tone];
  const resolvedWeight = weight ? weightMap[weight] : sized.fontWeight;

  return (
    <RNText
      style={[
        { fontSize: sized.fontSize, lineHeight: sized.lineHeight, fontWeight: resolvedWeight, color: resolvedColor },
        style,
      ]}
      {...props}
    />
  );
}

export const __AppText_styles = StyleSheet.create({});
