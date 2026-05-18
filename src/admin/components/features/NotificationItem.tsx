import React from 'react';
import { Info, CheckCircle, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { formatRelativeTime } from '../../utils/helpers';
import { cn } from '../../utils/helpers';

interface NotificationItemProps {
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  onDismiss?: () => void;
  key?: React.Key;
}

const typeConfig = {
  info: {
    icon: Info,
    bg: 'bg-blue-900/20',
    iconBg: 'bg-blue-900/30',
    iconColor: 'text-blue-400',
    border: 'border-blue-800',
  },
  success: {
    icon: CheckCircle,
    bg: 'bg-emerald-900/20',
    iconBg: 'bg-emerald-900/30',
    iconColor: 'text-emerald-400',
    border: 'border-emerald-800',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-900/20',
    iconBg: 'bg-amber-900/30',
    iconColor: 'text-amber-400',
    border: 'border-amber-800',
  },
  error: {
    icon: AlertCircle,
    bg: 'bg-red-900/20',
    iconBg: 'bg-red-900/30',
    iconColor: 'text-red-400',
    border: 'border-red-800',
  },
};

export function NotificationItem({
  type,
  title,
  message,
  timestamp,
  read,
  onDismiss,
}: NotificationItemProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'p-4 rounded-lg border transition-all duration-200',
        config.bg,
        config.border,
        !read && 'ring-2 ring-indigo-500/20'
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn('p-2 rounded-lg flex-shrink-0', config.iconBg)}>
          <Icon className={cn('w-4 h-4', config.iconColor)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className={cn('font-medium text-sm', read ? 'text-slate-300' : 'text-white')}>
              {title}
            </p>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="p-1 rounded hover:bg-slate-700 text-slate-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <p className="text-sm text-slate-400 mt-1">{message}</p>
          <p className="text-xs text-slate-500 mt-2">
            {formatRelativeTime(timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
}