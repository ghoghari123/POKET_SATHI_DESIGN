import React from 'react';
import { cn } from '../../utils/helpers';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
  key?: React.Key;
}

export function Skeleton({
  className,
  variant = 'text',
  width,
  height,
}: SkeletonProps) {
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-slate-700',
        variants[variant],
        className
      )}
      style={{
        width: width || (variant === 'circular' ? height : undefined),
        height: height || (variant === 'text' ? undefined : '100%'),
      }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1">
          <Skeleton variant="text" width="60%" height={16} className="mb-2" />
          <Skeleton variant="text" width="40%" height={12} />
        </div>
      </div>
      <Skeleton variant="text" className="mb-2" />
      <Skeleton variant="text" width="80%" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={`header-${i}`} variant="text" height={20} />
        ))}
      </div>
      {[...Array(rows)].map((_, i) => (
        <div key={`row-${i}`} className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, j) => (
            <Skeleton key={`cell-${i}-${j}`} variant="text" height={16} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <Skeleton variant="text" width={120} height={20} className="mb-4" />
      <Skeleton variant="rectangular" height={200} />
    </div>
  );
}