import { FileText, Image, Video, TrendingUp, Eye, Clock, CheckCircle, AlertCircle, FilePen, BarChart3 } from 'lucide-react';
import { ContentItem, Page } from '../types';

interface DashboardProps {
  articles: ContentItem[];
  graphics: ContentItem[];
  videos: ContentItem[];
  onNavigate: (page: Page) => void;
}

export default function Dashboard({ articles, graphics, videos, onNavigate }: DashboardProps) {
  const allContent = [...articles, ...graphics, ...videos];
  const published = allContent.filter(c => c.status === 'published').length;
  const drafts = allContent.filter(c => c.status === 'draft').length;
  const inReview = allContent.filter(c => c.status === 'review').length;

  const stats = [
    { label: 'Total Content', value: allContent.length, icon: <BarChart3 size={22} />, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
    { label: 'Published', value: published, icon: <CheckCircle size={22} />, color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-50', textColor: 'text-emerald-700' },
    { label: 'Drafts', value: drafts, icon: <FilePen size={22} />, color: 'from-amber-500 to-amber-600', bgColor: 'bg-amber-50', textColor: 'text-amber-700' },
    { label: 'In Review', value: inReview, icon: <AlertCircle size={22} />, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', textColor: 'text-purple-700' },
  ];

  const recentContent = [...allContent]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 6);

  const typeIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText size={16} />;
      case 'graphic': return <Image size={16} />;
      case 'video': return <Video size={16} />;
    }
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      published: 'bg-emerald-100 text-emerald-700',
      draft: 'bg-amber-100 text-amber-700',
      review: 'bg-purple-100 text-purple-700',
      archived: 'bg-slate-100 text-slate-700',
    };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles.archived}`}>
        {status === 'review' ? 'In Review' : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const quickActions = [
    { label: 'New Article', icon: <FileText size={20} />, page: 'articles' as Page, color: 'bg-blue-500 hover:bg-blue-600' },
    { label: 'New Graphic', icon: <Image size={20} />, page: 'graphics' as Page, color: 'bg-teal-500 hover:bg-teal-600' },
    { label: 'New Video', icon: <Video size={20} />, page: 'videos' as Page, color: 'bg-purple-500 hover:bg-purple-600' },
    { label: 'Open Editor', icon: <FilePen size={20} />, page: 'editor' as Page, color: 'bg-rose-500 hover:bg-rose-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's an overview of your content management system.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl ${stat.bgColor} flex items-center justify-center ${stat.textColor}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => onNavigate(action.page)}
              className={`${action.color} text-white rounded-xl px-4 py-3.5 flex items-center gap-3 transition-all duration-200 shadow-sm hover:shadow-md`}
            >
              {action.icon}
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Breakdown & Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content by Type */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={18} className="text-blue-500" />
            <h3 className="font-semibold text-slate-900">Content by Type</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Articles', count: articles.length, total: allContent.length, color: 'bg-blue-500' },
              { label: 'Graphics', count: graphics.length, total: allContent.length, color: 'bg-teal-500' },
              { label: 'Videos', count: videos.length, total: allContent.length, color: 'bg-purple-500' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-slate-600 font-medium">{item.label}</span>
                  <span className="text-slate-900 font-semibold">{item.count}</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${(item.count / item.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Status Overview */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Status Overview</h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-emerald-50 rounded-lg p-3">
                <div className="text-lg font-bold text-emerald-700">{published}</div>
                <div className="text-xs text-emerald-600">Published</div>
              </div>
              <div className="bg-amber-50 rounded-lg p-3">
                <div className="text-lg font-bold text-amber-700">{drafts}</div>
                <div className="text-xs text-amber-600">Drafts</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="text-lg font-bold text-purple-700">{inReview}</div>
                <div className="text-xs text-purple-600">Review</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Content */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-slate-400" />
              <h3 className="font-semibold text-slate-900">Recent Activity</h3>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Eye size={14} />
              <span>Last 30 days</span>
            </div>
          </div>
          <div className="space-y-3">
            {recentContent.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0 mt-0.5">
                  {typeIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-slate-900 truncate">{item.title}</p>
                    {statusBadge(item.status)}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    by {item.author} · Updated {item.updatedAt}
                  </p>
                </div>
                <div className="text-xs text-slate-400 flex-shrink-0">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
