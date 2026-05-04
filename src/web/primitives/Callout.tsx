import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const calloutVariants = cva(
  'flex gap-3 p-4 rounded-lg border',
  {
    variants: {
      tone: {
        info: 'bg-[var(--semantic-feedback-infoBg)] text-[var(--semantic-feedback-infoFg)] border-transparent',
        success: 'bg-[var(--semantic-feedback-successBg)] text-[var(--semantic-feedback-successFg)] border-transparent',
        warning: 'bg-[var(--semantic-feedback-warningBg)] text-[var(--semantic-feedback-warningFg)] border-transparent',
        error: 'bg-[var(--semantic-feedback-errorBg)] text-[var(--semantic-feedback-errorFg)] border-transparent',
        brand: 'bg-[var(--semantic-accent-mintSoft)] text-[var(--semantic-text-onAccent)] border-[var(--semantic-accent-mint)]',
      },
    },
    defaultVariants: { tone: 'info' },
  },
);

export interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
}

export const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, tone, icon, title, children, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      className={cn(calloutVariants({ tone }), className)}
      {...props}
    >
      {icon ? <div aria-hidden="true" className="shrink-0 mt-0.5">{icon}</div> : null}
      <div className="flex-1 text-sm leading-normal">
        {title ? <div className="font-semibold mb-0.5">{title}</div> : null}
        {children}
      </div>
    </div>
  ),
);
Callout.displayName = 'Callout';

export { calloutVariants };
