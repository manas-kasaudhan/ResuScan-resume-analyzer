import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

const variants = {
  success: 'bg-success-light text-green-700 border-green-200',
  error: 'bg-error-light text-red-700 border-red-200',
  warning: 'bg-warning-light text-amber-700 border-amber-200',
  info: 'bg-info-light text-blue-700 border-blue-200',
  neutral: 'bg-gray-50 text-gray-700 border-gray-200',
  primary: 'bg-primary-50 text-primary-dark border-primary-100',
};

interface BadgeProps {
  children: ReactNode;
  variant?: keyof typeof variants;
  dot?: boolean;
  className?: string;
}

export default function Badge({
  children,
  variant = 'neutral',
  dot = false,
  className,
}: BadgeProps) {
  const dotColors: Record<string, string> = {
    success: 'bg-success',
    error: 'bg-error',
    warning: 'bg-warning',
    info: 'bg-info',
    neutral: 'bg-gray-400',
    primary: 'bg-primary',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border whitespace-nowrap',
        variants[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])}
        />
      )}
      {children}
    </span>
  );
}
