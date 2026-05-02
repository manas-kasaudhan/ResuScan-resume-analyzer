import { cn } from '@/utils/cn';
import Badge from '@/components/ui/Badge';
import type { Suggestion } from '@/hooks/useResume';

interface SuggestionsListProps {
  suggestions: Suggestion[];
  className?: string;
}

const categoryConfig: Record<
  string,
  { label: string; variant: 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'primary' }
> = {
  content: { label: 'Content', variant: 'info' },
  formatting: { label: 'Formatting', variant: 'warning' },
  keywords: { label: 'Keywords', variant: 'primary' },
  structure: { label: 'Structure', variant: 'success' },
};

const priorityConfig: Record<string, { label: string; className: string }> = {
  high: { label: 'High', className: 'bg-error-light text-error border border-red-200' },
  medium: { label: 'Medium', className: 'bg-warning-light text-warning border border-amber-200' },
  low: { label: 'Low', className: 'bg-info-light text-info border border-blue-200' },
};

export default function SuggestionsList({
  suggestions,
  className,
}: SuggestionsListProps) {
  if (suggestions.length === 0) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className="text-gray-500">No suggestions available</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      {suggestions.map((suggestion, index) => {
        const category = categoryConfig[suggestion.category] || categoryConfig.content;
        const priority = priorityConfig[suggestion.priority] || priorityConfig.medium;

        return (
          <div
            key={suggestion.id}
            className={cn(
              'flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md animate-fade-in-up',
              `stagger-${Math.min(index + 1, 6)}`
            )}
          >
            {/* Priority indicator */}
            <div className="flex-shrink-0 mt-1">
              <span className={cn('w-2.5 h-2.5 rounded-full block', suggestion.priority === 'high' ? 'bg-error' : suggestion.priority === 'medium' ? 'bg-warning' : 'bg-info')} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800 leading-relaxed">
                {suggestion.text}
              </p>
              {suggestion.original && (
                <div className="mt-2 flex items-start gap-2">
                  <span className="text-xs text-red-500 mt-0.5 flex-shrink-0">Was:</span>
                  <span className="text-xs text-gray-500 line-through">{suggestion.original}</span>
                </div>
              )}
              {suggestion.improved && (
                <div className="mt-1 flex items-start gap-2">
                  <span className="text-xs text-green-600 mt-0.5 flex-shrink-0">Now:</span>
                  <span className="text-xs text-green-700 font-medium">{suggestion.improved}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge variant={category.variant}>{category.label}</Badge>
              <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full uppercase', priority.className)}>
                {priority.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
