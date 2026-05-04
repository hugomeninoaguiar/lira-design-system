import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/**
 * Button — Lira's primary interactive primitive.
 *
 * Visual model:
 *   • Pill shape (radius-pill) — Lira leans soft and rounded.
 *   • Variants tied to semantic-action-* tokens, so the same component
 *     adapts to Women and Professionals themes via [data-theme].
 *   • Three sizes (sm, md, lg) follow component tokens.
 *
 * Accessibility:
 *   • Native <button> by default; pass `asChild` to compose with <Link> etc.
 *   • Always renders the focus ring via tokens.
 */
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium whitespace-nowrap select-none cursor-pointer',
    'rounded-pill transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'focus-visible:ring-[var(--semantic-border-focus)] focus-visible:ring-offset-[var(--semantic-background-app)]',
    'disabled:cursor-not-allowed disabled:opacity-60',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--semantic-action-primary)] text-[var(--semantic-text-onBrand)]',
          'hover:bg-[var(--semantic-action-primaryHover)]',
          'active:bg-[var(--semantic-action-primaryActive)]',
        ].join(' '),
        secondary: [
          'bg-[var(--semantic-action-primarySoft)] text-[var(--semantic-action-primarySoftFg)]',
          'hover:bg-[var(--semantic-action-primarySoftHover)]',
        ].join(' '),
        outline: [
          'bg-transparent text-[var(--semantic-text-primary)]',
          'border border-[var(--semantic-border-default)]',
          'hover:bg-[var(--semantic-action-ghostHover)]',
        ].join(' '),
        ghost: [
          'bg-transparent text-[var(--semantic-action-ghostFg)]',
          'hover:bg-[var(--semantic-action-ghostHover)]',
        ].join(' '),
        destructive: [
          'bg-[var(--semantic-action-destructive)] text-[var(--semantic-action-destructiveFg)]',
          'hover:bg-[var(--semantic-action-destructiveHover)]',
        ].join(' '),
        link: [
          'bg-transparent text-[var(--semantic-text-link)] underline-offset-4',
          'hover:underline hover:text-[var(--semantic-text-linkHover)]',
        ].join(' '),
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-5 text-base',
        lg: 'h-14 px-6 text-lg',
        icon: 'h-11 w-11 p-0',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as the child element, forwarding refs/props. Useful with <Link>. */
  asChild?: boolean;
  /** Show a spinner and disable interaction. */
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild, loading, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? <Spinner /> : null}
        {children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export { buttonVariants };
