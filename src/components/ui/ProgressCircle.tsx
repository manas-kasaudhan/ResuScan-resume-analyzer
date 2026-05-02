import { cn } from '@/utils/cn';

interface ProgressCircleProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
  colorOverride?: string;
  animate?: boolean;
}

export default function ProgressCircle({
  value,
  max = 100,
  size = 160,
  strokeWidth = 12,
  label,
  className,
  colorOverride,
  animate = true,
}: ProgressCircleProps) {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (colorOverride) return colorOverride;
    if (percentage >= 80) return '#22C55E';
    if (percentage >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getLabel = () => {
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Good';
    if (percentage >= 40) return 'Fair';
    return 'Needs Work';
  };

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getColor()}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={animate ? 'transition-all duration-1000 ease-out' : ''}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-bold text-dark leading-none"
            style={{ fontFamily: 'Poppins', fontSize: size * 0.22 }}
          >
            {percentage}
          </span>
          <span className="text-xs text-gray-400 mt-1">/ 100</span>
        </div>
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-600">{label}</span>
      )}
      {!label && (
        <span
          className="text-sm font-semibold px-3 py-1 rounded-full"
          style={{
            color: getColor(),
            backgroundColor: `${getColor()}15`,
          }}
        >
          {getLabel()}
        </span>
      )}
    </div>
  );
}
