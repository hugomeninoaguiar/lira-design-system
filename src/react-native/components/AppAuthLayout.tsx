import * as React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { AppCard, type AppCardPadding } from './AppCard';
import { AppScreen } from './AppScreen';
import { AppText } from './AppText';
import { useLiraTheme } from '../theme/ThemeProvider';

export interface AppAuthLayoutProps {
  title?: string;
  subtitle?: string;
  logo?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  scrollable?: boolean;
  centerCard?: boolean;
  maxCardWidth?: number;
  paddingX?: number;
  paddingY?: number;
  cardPadding?: AppCardPadding;
  containerStyle?: ViewStyle;
  cardStyle?: ViewStyle;
  contentStyle?: ViewStyle;
}

/**
 * Standard auth screen layout.
 *
 * Enforces card-first composition and neutral structure:
 * - app background on the outer screen
 * - centered white card surface for auth content
 * - no decorative curves/shapes
 */
export function AppAuthLayout({
  title,
  subtitle,
  logo,
  footer,
  children,
  scrollable = true,
  centerCard = true,
  maxCardWidth = 420,
  paddingX,
  paddingY,
  cardPadding = 'lg',
  containerStyle,
  cardStyle,
  contentStyle,
}: AppAuthLayoutProps) {
  const theme = useLiraTheme();
  const px = paddingX ?? theme.space[4] ?? 16;
  const py = paddingY ?? theme.space[6] ?? 24;

  return (
    <AppScreen
      scrollable={scrollable}
      paddingX={px}
      paddingY={py}
      contentContainerStyle={[
        styles.screenContent,
        { justifyContent: centerCard ? 'center' : 'flex-start' },
        containerStyle,
      ]}
    >
      <View style={[styles.cardShell, { maxWidth: maxCardWidth }]}> 
        <AppCard tone="default" elevation="soft" padding={cardPadding} style={[styles.card, cardStyle]}>
          {logo ? <View style={styles.logo}>{logo}</View> : null}

          {(title || subtitle) ? (
            <View style={[styles.header, { marginBottom: theme.space[4] ?? 16 }]}>
              {title ? <AppText variant="h3">{title}</AppText> : null}
              {subtitle ? <AppText variant="body" tone="secondary">{subtitle}</AppText> : null}
            </View>
          ) : null}

          <View style={[styles.body, contentStyle]}>{children}</View>

          {footer ? <View style={[styles.footer, { marginTop: theme.space[4] ?? 16 }]}>{footer}</View> : null}
        </AppCard>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  cardShell: {
    width: '100%',
  },
  card: {
    width: '100%',
  },
  logo: {
    marginBottom: 16,
  },
  header: {
    gap: 8,
  },
  body: {
    gap: 8,
  },
  footer: {
    gap: 8,
  },
});
