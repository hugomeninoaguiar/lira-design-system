import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '../lib/cn';

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-5 w-5 shrink-0 rounded-xs',
      'border border-[var(--semantic-border-default)]',
      'bg-[var(--semantic-background-surface)]',
      'transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-border-focus)] focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-60',
      'data-[state=checked]:bg-[var(--semantic-action-primary)]',
      'data-[state=checked]:border-[var(--semantic-action-primary)]',
      'data-[state=checked]:text-[var(--semantic-action-primaryFg)]',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <svg
        viewBox="0 0 16 16"
        fill="none"
        className="h-3 w-3"
        aria-hidden="true"
      >
        <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = 'Checkbox';
