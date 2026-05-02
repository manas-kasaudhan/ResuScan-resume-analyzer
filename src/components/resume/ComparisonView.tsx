import { cn } from '@/utils/cn';
import Card from '@/components/ui/Card';

interface DiffSection {
  id: string;
  title: string;
  original: string;
  improved: string;
}

interface ComparisonViewProps {
  sections: DiffSection[];
  className?: string;
}

function highlightDifferences(original: string, improved: string) {
  const origWords = original.split(' ');
  const imprWords = improved.split(' ');

  return {
    originalRender: origWords.map((word, i) => {
      const isRemoved = !imprWords.includes(word);
      return (
        <span
          key={i}
          className={cn(
            isRemoved && 'bg-red-100 text-red-700 line-through rounded px-0.5'
          )}
        >
          {word}{' '}
        </span>
      );
    }),
    improvedRender: imprWords.map((word, i) => {
      const isAdded = !origWords.includes(word);
      return (
        <span
          key={i}
          className={cn(
            isAdded && 'bg-green-100 text-green-700 rounded px-0.5 font-medium'
          )}
        >
          {word}{' '}
        </span>
      );
    }),
  };
}

export default function ComparisonView({
  sections,
  className,
}: ComparisonViewProps) {
  if (sections.length === 0) {
    return (
      <Card className={cn('text-center py-12', className)}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <p className="text-gray-500">No improvements generated yet</p>
        </div>
      </Card>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {sections.map((section, index) => {
        const { originalRender, improvedRender } = highlightDifferences(
          section.original,
          section.improved
        );

        return (
          <Card
            key={section.id}
            className={cn('animate-fade-in-up', `stagger-${index + 1}`)}
            padding="none"
          >
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl">
              <h4 className="text-sm font-semibold text-dark" style={{ fontFamily: 'Poppins' }}>
                {section.title}
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {/* Original */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-error" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Original
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {originalRender}
                </p>
              </div>

              {/* Improved */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Improved
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {improvedRender}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
