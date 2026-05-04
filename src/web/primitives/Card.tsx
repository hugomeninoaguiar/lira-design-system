import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const cardVariants = cva(
  [
    'bg-[var(--semantic-background-surface)]',
    'text-[var(--semantic-text-primary)]',
    'border border-[var(--semantic-border-subtle)]',
    'rounded-lg',
  ].join(' '),
  {
    variants: {
      tone: {
        default: '',
        subtle:
          'bg-[var(--semantic-background-surfaceSubtle)] border-[var(--semantic-border-subtle)]',
        accent:
          'bg-[var(--semantic-accent-mintSoft)] border-[var(--semantic-accent-mint)]',
      },
      elevation: {
        flat: 'shadow-none',
        soft: 'shadow-soft',
        lifted: 'shadow-lifted',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      tone: 'default',
      elevation: 'soft',
      padding: 'md',
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, tone, elevation, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ tone, elevation, padding }), className)}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-1 mb-4', className)} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold leading-snug text-[var(--semantic-text-primary)]', className)}
      {...props}
    />
  ),
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-[var(--semantic-text-secondary)]', className)}
      {...props}
    />
  ),
);
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-base text-[var(--semantic-text-primary)]', className)} {...props} />
  ),
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-3 mt-6', className)} {...props} />
  ),
);
CardFooter.displayName = 'CardFooter';

export { cardVariants };
