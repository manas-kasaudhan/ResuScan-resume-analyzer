import { useState, useCallback, useRef } from 'react';
import { cn } from '@/utils/cn';

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
  isUploading?: boolean;
  error?: string | null;
  className?: string;
}

export default function UploadBox({
  onFileSelect,
  accept = '.pdf,.doc,.docx',
  maxSizeMB = 10,
  isUploading = false,
  error = null,
  className,
}: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSelect = useCallback(
    (file: File) => {
      const maxSize = maxSizeMB * 1024 * 1024;
      if (file.size > maxSize) {
        return;
      }
      onFileSelect(file);
    },
    [maxSizeMB, onFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) validateAndSelect(file);
    },
    [validateAndSelect]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) validateAndSelect(file);
    },
    [validateAndSelect]
  );

  return (
    <div className={cn('w-full', className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && inputRef.current?.click()}
        className={cn(
          'relative flex flex-col items-center justify-center w-full min-h-[280px] rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer',
          isDragging
            ? 'border-primary bg-primary-50 scale-[1.02]'
            : 'border-gray-300 bg-white hover:border-primary/50 hover:bg-gray-50',
          isUploading && 'pointer-events-none opacity-70',
          error && 'border-error bg-error-light'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-primary animate-spin" />
            <p className="text-sm font-medium text-gray-600">Uploading your resume...</p>
          </div>
        ) : (
          <>
            <div
              className={cn(
                'w-20 h-20 rounded-2xl flex items-center justify-center mb-4 transition-colors',
                isDragging
                  ? 'bg-primary/20'
                  : 'bg-primary-50'
              )}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isDragging ? '#FF7A59' : '#FF7A5980'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>

            <p className="text-base font-semibold text-dark mb-1">
              {isDragging ? 'Drop your file here' : 'Drag & drop your resume'}
            </p>
            <p className="text-sm text-gray-500 mb-4">or click to browse files</p>

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="px-2 py-1 bg-gray-100 rounded font-medium">PDF</span>
              <span className="px-2 py-1 bg-gray-100 rounded font-medium">DOC</span>
              <span className="px-2 py-1 bg-gray-100 rounded font-medium">DOCX</span>
              <span className="text-gray-300">|</span>
              <span>Max {maxSizeMB}MB</span>
            </div>
          </>
        )}
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-error">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
