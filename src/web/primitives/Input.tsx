import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const inputVariants = cva(
  [
    'block w-full',
    'bg-[var(--semantic-background-surface)] text-[var(--semantic-text-primary)]',
    'placeholder:text-[var(--semantic-text-muted)]',
    'border border-[var(--semantic-border-default)] rounded-md',
    'transition-colors',
    'focus:outline-none focus:border-[var(--semantic-border-focus)]',
    'focus:ring-2 focus:ring-[var(--semantic-border-focus)]/35',
    'disabled:bg-[var(--semantic-background-surfaceMuted)]',
    'disabled:text-[var(--semantic-text-muted)] disabled:cursor-not-allowed',
    'aria-[invalid=true]:border-[var(--semantic-feedback-errorFg)]',
    'aria-[invalid=true]:focus:ring-[var(--semantic-feedback-errorFg)]/35',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-base',
        lg: 'h-14 px-5 text-lg',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(inputVariants({ size }), className)}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export { inputVariants };
