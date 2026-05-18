import React from 'react';
import { LucideIcon, User, ShoppingCart, DollarSign, AlertTriangle, Cpu } from 'lucide-react';
import { formatRelativeTime } from '../../utils/helpers';
import { cn } from '../../utils/helpers';

interface ActivityItemProps {
  type: 'user' | 'order' | 'payment' | 'system' | 'alert';
  message: string;
  user?: string;
  timestamp: string;
  key?: React.Key;
}

const typeIcons = {
  user: User,
  order: ShoppingCart,
  payment: DollarSign,
  system: Cpu,
  alert: AlertTriangle,
};

const typeColors = {
  user: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  order: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  payment: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
  system: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
  alert: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
};

export function ActivityItem({ type, message, user, timestamp }: ActivityItemProps) {
  const Icon = typeIcons[type];

  return (
    <div className="flex items-start gap-3 py-3">
      <div className={cn('p-2 rounded-lg flex-shrink-0', typeColors[type])}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white">
          {message}
          {user && <span className="font-medium"> - {user}</span>}
        </p>
        <p className="text-xs text-slate-400 mt-0.5">
          {formatRelativeTime(timestamp)}
        </p>
      </div>
    </div>
  );
}