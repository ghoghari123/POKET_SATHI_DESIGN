import { Menu, Bell, Search } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

export function Header({ onMenuClick, title }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-slate-800 border-b border-slate-700 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-slate-700 lg:hidden"
        >
          <Menu className="w-5 h-5 text-slate-400" />
        </button>
        <h1 className="text-xl font-semibold text-white">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-700 rounded-lg">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm text-slate-300 placeholder:text-slate-500 w-40"
          />
        </div>

        <button className="p-2 rounded-lg hover:bg-slate-700 relative">
          <Bell className="w-5 h-5 text-slate-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-3 pl-2 border-l border-slate-700">
          <Avatar name={user?.username || 'Admin'} size="sm" />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white">
              {user?.username || 'Admin'}
            </p>
            <p className="text-xs text-slate-400">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}