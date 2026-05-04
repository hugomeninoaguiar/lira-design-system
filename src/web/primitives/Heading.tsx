import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const headingVariants = cva('text-[var(--semantic-text-primary)]', {
  variants: {
    level: {
      display: 'text-5xl font-bold leading-tight tracking-tight',
      h1: 'text-4xl font-bold leading-tight tracking-tight',
      h2: 'text-3xl font-bold leading-snug tracking-tight',
      h3: 'text-2xl font-semibold leading-snug',
      h4: 'text-xl font-semibold leading-snug',
      h5: 'text-lg font-semibold leading-snug',
    },
  },
  defaultVariants: { level: 'h2' },
});

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /** Override the rendered element. Defaults to the matching tag for `level`. */
  as?: HeadingTag;
}

const levelToTag: Record<NonNullable<VariantProps<typeof headingVariants>['level']>, HeadingTag> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 'h2', as, ...props }, ref) => {
    const Tag = (as ?? levelToTag[level]) as HeadingTag;
    return React.createElement(Tag, {
      ref,
      className: cn(headingVariants({ level }), className),
      ...props,
    });
  },
);
Heading.displayName = 'Heading';
