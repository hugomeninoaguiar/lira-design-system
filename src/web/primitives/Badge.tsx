import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const badgeVariants = cva(
  'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-pill text-xs font-medium leading-snug',
  {
    variants: {
      tone: {
        neutral:
          'bg-[var(--semantic-background-surfaceSubtle)] text-[var(--semantic-text-secondary)] border border-[var(--semantic-border-subtle)]',
        brand:
          'bg-[var(--semantic-accent-mintSoft)] text-[var(--semantic-text-onAccent)] border border-[var(--semantic-accent-mint)]',
        success:
          'bg-[var(--semantic-feedback-successBg)] text-[var(--semantic-feedback-successFg)]',
        warning:
          'bg-[var(--semantic-feedback-warningBg)] text-[var(--semantic-feedback-warningFg)]',
        error:
          'bg-[var(--semantic-feedback-errorBg)] text-[var(--semantic-feedback-errorFg)]',
        info:
          'bg-[var(--semantic-feedback-infoBg)] text-[var(--semantic-feedback-infoFg)]',
      },
    },
    defaultVariants: { tone: 'neutral' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ tone }), className)} {...props} />
  ),
);
Badge.displayName = 'Badge';

export { badgeVariants };
