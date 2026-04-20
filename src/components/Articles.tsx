import { useState } from 'react';
import { Plus, Search, Filter, FileText, Edit3, Trash2, Eye, X, Save } from 'lucide-react';
import { ContentItem, ContentStatus } from '../types';

interface ArticlesProps {
  articles: ContentItem[];
  onUpdate: (articles: ContentItem[]) => void;
  onToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const emptyArticle: ContentItem = {
  id: '',
  title: '',
  type: 'article',
  status: 'draft',
  author: '',
  createdAt: new Date().toISOString().split('T')[0],
  updatedAt: new Date().toISOString().split('T')[0],
  description: '',
  tags: [],
  category: '',
  body: '',
};

export default function Articles({ articles, onUpdate, onToast }: ArticlesProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ContentItem | null>(null);
  const [formData, setFormData] = useState<ContentItem>(emptyArticle);

  const filtered = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusBadge = (status: ContentStatus) => {
    const styles: Record<string, string> = {
      published: 'bg-emerald-100 text-emerald-700',
      draft: 'bg-amber-100 text-amber-700',
      review: 'bg-purple-100 text-purple-700',
      archived: 'bg-slate-100 text-slate-700',
    };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
        {status === 'review' ? 'In Review' : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const openCreate = () => {
    setEditingArticle(null);
    setFormData({ ...emptyArticle, id: `a${Date.now()}`, createdAt: new Date().toISOString().split('T')[0], updatedAt: new Date().toISOString().split('T')[0] });
    setShowModal(true);
  };

  const openEdit = (article: ContentItem) => {
    setEditingArticle(article);
    setFormData({ ...article, updatedAt: new Date().toISOString().split('T')[0] });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      onToast('Title is required', 'error');
      return;
    }
    if (editingArticle) {
      onUpdate(articles.map(a => a.id === editingArticle.id ? formData : a));
      onToast('Article updated successfully', 'success');
    } else {
      onUpdate([formData, ...articles]);
      onToast('Article created successfully', 'success');
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    onUpdate(articles.filter(a => a.id !== id));
    onToast('Article deleted', 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <FileText className="text-blue-500" size={28} />
            Articles
          </h1>
          <p className="text-slate-500 mt-1">{articles.length} articles in your library</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm">
          <Plus size={18} /> New Article
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white"
          />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="pl-9 pr-8 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white appearance-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="review">In Review</option>
          </select>
        </div>
      </div>

      {/* Articles Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <FileText size={48} className="mx-auto text-slate-300" />
          <p className="mt-4 text-slate-500 font-medium">No articles found</p>
          <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map(article => (
            <div key={article.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-slate-900 text-lg">{article.title}</h3>
                    {statusBadge(article.status)}
                  </div>
                  <p className="text-slate-500 text-sm mt-1.5 line-clamp-2">{article.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                    <span>By {article.author}</span>
                    <span>Created {article.createdAt}</span>
                    <span>Updated {article.updatedAt}</span>
                    {article.category && (
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-600 font-medium">{article.category}</span>
                    )}
                  </div>
                  {article.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                      {article.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-medium">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(article)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-colors" title="Edit">
                    <Edit3 size={16} />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-emerald-600 transition-colors" title="Preview">
                    <Eye size={16} />
                  </button>
                  <button onClick={() => handleDelete(article.id)} className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition-colors" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white rounded-t-2xl">
              <h2 className="text-lg font-semibold text-slate-900">
                {editingArticle ? 'Edit Article' : 'Create New Article'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-slate-100 rounded-lg">
                <X size={18} className="text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  placeholder="Article title..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                    placeholder="Author name..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category || ''}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                    placeholder="Category..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value as ContentStatus })}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                >
                  <option value="draft">Draft</option>
                  <option value="review">In Review</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none"
                  placeholder="Brief description..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Body Content</label>
                <textarea
                  value={formData.body || ''}
                  onChange={e => setFormData({ ...formData, body: e.target.value })}
                  rows={6}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none font-mono"
                  placeholder="Write your article content here..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={e => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  placeholder="design, branding, tutorial..."
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 sticky bottom-0 bg-white rounded-b-2xl">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
                <Save size={16} /> {editingArticle ? 'Update Article' : 'Create Article'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
