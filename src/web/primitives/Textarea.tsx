import * as React from 'react';
import { cn } from '../lib/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'block w-full min-h-[88px] px-4 py-3',
        'bg-[var(--semantic-background-surface)] text-[var(--semantic-text-primary)]',
        'placeholder:text-[var(--semantic-text-muted)]',
        'border border-[var(--semantic-border-default)] rounded-md',
        'text-base leading-normal',
        'transition-colors',
        'focus:outline-none focus:border-[var(--semantic-border-focus)]',
        'focus:ring-2 focus:ring-[var(--semantic-border-focus)]/35',
        'disabled:bg-[var(--semantic-background-surfaceMuted)] disabled:cursor-not-allowed',
        'aria-[invalid=true]:border-[var(--semantic-feedback-errorFg)]',
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = 'Textarea';
