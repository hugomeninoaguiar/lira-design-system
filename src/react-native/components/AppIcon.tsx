import * as React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useLiraTheme } from '../theme/ThemeProvider';

/**
 * AppIcon — Lira's icon component wrapper.
 *
 * This is a thin wrapper around Phosphor Icons that enforces our weight standards:
 * - Regular (default): For UI elements, navigation, actions
 * - Duotone: For moments where icons should feel emotional or branded
 *
 * Usage:
 *   import { AppIcon } from '@lira/design-system/react-native';
 *   import { Heart, Star } from '@phosphor-icons/react-native';
 *
 *   // Regular weight (default) — clean, functional
 *   <AppIcon icon={Heart} size={24} />
 *
 *   // Duotone — emotional, branded moments
 *   <AppIcon icon={Star} weight="duotone" size={32} />
 *
 * Install Phosphor:
 *   npm install @phosphor-icons/react-native
 */

export type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';

export interface AppIconProps {
  /**
   * The Phosphor icon component to render.
   * Import from '@phosphor-icons/react-native'
   */
  icon: React.ComponentType<{
    size?: number;
    color?: string;
    weight?: IconWeight;
    style?: ViewStyle;
  }>;

  /** Icon size in pixels. Default: 24 */
  size?: number;

  /**
   * Icon weight.
   * - 'regular' (default): Clean, functional UI
   * - 'duotone': Emotional, branded moments (Inner World, rewards, mood states)
   * - others: Use sparingly for hierarchy
   */
  weight?: IconWeight;

  /** Icon color. Defaults to theme's text.secondary */
  color?: string;

  /** Additional container styles */
  style?: ViewStyle;
}

/**
 * Standard icon sizes used across the app
 */
export const IconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
} as const;

export function AppIcon({
  icon: IconComponent,
  size = IconSizes.md,
  weight = 'regular',
  color,
  style,
}: AppIconProps) {
  const theme = useLiraTheme();
  const iconColor = color ?? theme.semantic.text.secondary;

  return (
    <View style={[{ justifyContent: 'center', alignItems: 'center' }, style]}>
      <IconComponent size={size} color={iconColor} weight={weight} />
    </View>
  );
}

/**
 * Pre-configured icon presets for common use cases
 */
export function createIconPreset(
  defaultWeight: IconWeight,
  defaultSize: number
) {
  return function PresetIcon(props: Omit<AppIconProps, 'weight' | 'size'>) {
    return <AppIcon {...props} weight={defaultWeight} size={defaultSize} />;
  };
}
