import { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Articles from './components/Articles';
import Graphics from './components/Graphics';
import Videos from './components/Videos';
import MediaLibrary from './components/MediaLibrary';
import ImageEditor from './components/ImageEditor';
import Branding from './components/Branding';
import Settings from './components/Settings';
import { Page, ContentItem, MediaAsset, Toast } from './types';
import { sampleArticles, sampleGraphics, sampleVideos, sampleMedia, brandGuidelines } from './data';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [articles, setArticles] = useState<ContentItem[]>(sampleArticles);
  const [graphics, setGraphics] = useState<ContentItem[]>(sampleGraphics);
  const [videos, setVideos] = useState<ContentItem[]>(sampleVideos);
  const [media, setMedia] = useState<MediaAsset[]>(sampleMedia);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard articles={articles} graphics={graphics} videos={videos} onNavigate={navigate} />;
      case 'articles':
        return <Articles articles={articles} onUpdate={setArticles} onToast={addToast} />;
      case 'graphics':
        return <Graphics graphics={graphics} onUpdate={setGraphics} onNavigate={(page) => navigate(page as Page)} onToast={addToast} />;
      case 'videos':
        return <Videos videos={videos} onUpdate={setVideos} onToast={addToast} />;
      case 'media':
        return <MediaLibrary media={media} onUpdate={setMedia} onToast={addToast} />;
      case 'editor':
        return <ImageEditor />;
      case 'branding':
        return <Branding guidelines={brandGuidelines} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard articles={articles} graphics={graphics} videos={videos} onNavigate={navigate} />;
    }
  };

  const pageTitle: Record<Page, string> = {
    dashboard: 'Dashboard',
    articles: 'Articles',
    graphics: 'Graphics',
    videos: 'Videos',
    media: 'Media Library',
    editor: 'Image Editor',
    branding: 'Brand Guidelines',
    settings: 'Settings',
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        currentPage={currentPage}
        onNavigate={navigate}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-[68px]' : 'ml-[250px]'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-slate-200/80">
          <div className="flex items-center justify-between px-6 h-14">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="text-slate-400">ContentOS</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-700 font-medium">{pageTitle[currentPage]}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white text-xs font-bold">
                  A
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {renderPage()}
        </div>
      </main>

      {/* Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium animate-slide-in ${
              toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
              toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' :
              'bg-blue-50 border-blue-200 text-blue-700'
            }`}
          >
            {toast.type === 'success' && <CheckCircle size={16} />}
            {toast.type === 'error' && <XCircle size={16} />}
            {toast.type === 'info' && <Info size={16} />}
            <span>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="ml-2 opacity-50 hover:opacity-100">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
