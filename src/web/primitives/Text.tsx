import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const textVariants = cva('', {
  variants: {
    variant: {
      bodyLarge: 'text-lg leading-relaxed',
      body: 'text-base leading-normal',
      bodySmall: 'text-sm leading-normal',
      caption: 'text-xs leading-snug font-medium tracking-wide',
      label: 'text-sm leading-snug font-medium tracking-wide',
    },
    tone: {
      primary: 'text-[var(--semantic-text-primary)]',
      secondary: 'text-[var(--semantic-text-secondary)]',
      muted: 'text-[var(--semantic-text-muted)]',
      onBrand: 'text-[var(--semantic-text-onBrand)]',
      onAccent: 'text-[var(--semantic-text-onAccent)]',
      link: 'text-[var(--semantic-text-link)]',
      success: 'text-[var(--semantic-feedback-successFg)]',
      warning: 'text-[var(--semantic-feedback-warningFg)]',
      error: 'text-[var(--semantic-feedback-errorFg)]',
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'body',
    tone: 'primary',
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div' | 'small' | 'strong' | 'em';
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ as: Tag = 'p', className, variant, tone, weight, ...props }, ref) => {
    return React.createElement(Tag, {
      ref,
      className: cn(textVariants({ variant, tone, weight }), className),
      ...props,
    });
  },
);
Text.displayName = 'Text';
