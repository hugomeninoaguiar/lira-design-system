import * as React from 'react';
import { cn } from '../lib/cn';

type Width = 'sm' | 'md' | 'lg' | 'xl' | 'prose' | 'full';

const widths: Record<Width, string> = {
  sm: 'max-w-2xl',     // 672px — narrow content (forms, single column)
  md: 'max-w-4xl',     // 896px — short docs
  lg: 'max-w-5xl',     // 1024px — marketing default
  xl: 'max-w-7xl',     // 1280px — wide marketing
  prose: 'max-w-prose',// optimized for reading
  full: 'max-w-none',
};

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: Width;
  /** Horizontal padding. Defaults to responsive 6/8/10. */
  paddingX?: boolean;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ width = 'lg', paddingX = true, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'w-full mx-auto',
        widths[width],
        paddingX && 'px-6 md:px-8 lg:px-10',
        className,
      )}
      {...props}
    />
  ),
);
Container.displayName = 'Container';
