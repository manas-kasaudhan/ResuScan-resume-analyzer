import { cn } from '@/utils/cn';
import Card from '@/components/ui/Card';
import { formatFileSize } from '@/utils/helpers';

interface ResumePreviewProps {
  fileName: string;
  fileSize: number;
  fileType: string;
  className?: string;
  onRemove?: () => void;
}

const iconMap: Record<string, { color: string; bg: string }> = {
  'application/pdf': { color: '#EF4444', bg: '#FEF2F2' },
  'application/msword': { color: '#3B82F6', bg: '#EFF6FF' },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    color: '#3B82F6',
    bg: '#EFF6FF',
  },
};

export default function ResumePreview({
  fileName,
  fileSize,
  fileType,
  className,
  onRemove,
}: ResumePreviewProps) {
  const icon = iconMap[fileType] || { color: '#6B7280', bg: '#F3F4F6' };
  const ext = fileName.split('.').pop()?.toUpperCase() || 'FILE';

  return (
    <Card className={cn('animate-fade-in-up', className)} padding="sm">
      <div className="flex items-center gap-4">
        {/* File icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: icon.bg }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke={icon.color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>

        {/* File info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-dark truncate">{fileName}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500">{formatFileSize(fileSize)}</span>
            <span className="text-xs text-gray-300">•</span>
            <span className="text-xs font-medium px-1.5 py-0.5 rounded" style={{ backgroundColor: icon.bg, color: icon.color }}>
              {ext}
            </span>
          </div>
        </div>

        {/* Remove button */}
        {onRemove && (
          <button
            onClick={onRemove}
            className="p-2 rounded-lg text-gray-400 hover:text-error hover:bg-error-light transition-colors cursor-pointer"
            aria-label="Remove file"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </Card>
  );
}
