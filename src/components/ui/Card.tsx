import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({
  children,
  className,
  hover = false,
  padding = 'md',
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-gray-100',
        hover &&
          'transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1',
        !hover && 'shadow-sm',
        paddingMap[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
