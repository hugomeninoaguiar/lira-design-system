import * as React from 'react';
import { cn } from '../lib/cn';
import { Label } from './Label';

export interface FieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  className?: string;
  children: React.ReactElement;
}

/**
 * Composed form field: Label + control + hint/error.
 * Pass an Input/Textarea/Checkbox as the single child — Field clones it
 * to wire up the id and aria-describedby.
 */
export function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  className,
  children,
}: FieldProps) {
  const reactId = React.useId();
  const id = htmlFor ?? reactId;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const child = React.cloneElement(children, {
    id,
    'aria-describedby': describedBy,
    'aria-invalid': error ? true : (children.props as { 'aria-invalid'?: boolean })['aria-invalid'],
  });

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <Label htmlFor={id}>
        {label}
        {required ? (
          <span className="text-[var(--semantic-feedback-errorFg)] ml-0.5" aria-hidden="true">*</span>
        ) : null}
      </Label>
      {child}
      {hint && !error ? (
        <p id={hintId} className="text-xs text-[var(--semantic-text-secondary)]">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-xs text-[var(--semantic-feedback-errorFg)]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
