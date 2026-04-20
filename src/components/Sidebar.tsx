import { LayoutDashboard, FileText, Image, Video, FolderOpen, Palette, Settings, ChevronLeft, ChevronRight, PenTool } from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const navItems: { page: Page; label: string; icon: React.ReactNode }[] = [
  { page: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { page: 'articles', label: 'Articles', icon: <FileText size={20} /> },
  { page: 'graphics', label: 'Graphics', icon: <Image size={20} /> },
  { page: 'videos', label: 'Videos', icon: <Video size={20} /> },
  { page: 'media', label: 'Media Library', icon: <FolderOpen size={20} /> },
  { page: 'editor', label: 'Image Editor', icon: <PenTool size={20} /> },
  { page: 'branding', label: 'Branding', icon: <Palette size={20} /> },
  { page: 'settings', label: 'Settings', icon: <Settings size={20} /> },
];

export default function Sidebar({ currentPage, onNavigate, collapsed, onToggle }: SidebarProps) {
  return (
    <aside className={`fixed left-0 top-0 h-screen bg-slate-900 text-white transition-all duration-300 z-40 flex flex-col ${collapsed ? 'w-[68px]' : 'w-[250px]'}`}>
      <div className="flex items-center justify-between px-4 h-16 border-b border-slate-700/50">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center font-bold text-sm">
              C
            </div>
            <span className="font-bold text-lg tracking-tight">ContentOS</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center font-bold text-sm mx-auto">
            C
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
              currentPage === item.page
                ? 'bg-blue-600/20 text-blue-400 shadow-sm'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
            title={collapsed ? item.label : undefined}
          >
            <span className={`flex-shrink-0 ${currentPage === item.page ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
              {item.icon}
            </span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <button
        onClick={onToggle}
        className="flex items-center justify-center h-10 border-t border-slate-700/50 text-slate-500 hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}
