import * as React from 'react';
import { cn } from '../lib/cn';

type Gap = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12';
type Direction = 'row' | 'col';
type Align = 'start' | 'center' | 'end' | 'stretch';
type Justify = 'start' | 'center' | 'end' | 'between';

const gapMap: Record<Gap, string> = {
  '0': 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-5',
  '6': 'gap-6',
  '8': 'gap-8',
  '10': 'gap-10',
  '12': 'gap-12',
};

const alignMap: Record<Align, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyMap: Record<Justify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
};

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: Direction;
  gap?: Gap;
  align?: Align;
  justify?: Justify;
  wrap?: boolean;
  asChild?: boolean;
}

/**
 * Layout primitive — flex column by default. Use for consistent spacing
 * between children. `gap` maps to spacing tokens.
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ direction = 'col', gap = '4', align, justify, wrap, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex',
        direction === 'col' ? 'flex-col' : 'flex-row',
        wrap && 'flex-wrap',
        gapMap[gap],
        align && alignMap[align],
        justify && justifyMap[justify],
        className,
      )}
      {...props}
    />
  ),
);
Stack.displayName = 'Stack';
