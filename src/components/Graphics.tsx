import { useState } from 'react';
import { Plus, Search, Filter, Image, Edit3, Trash2, X, Save, Download } from 'lucide-react';
import { ContentItem, ContentStatus } from '../types';

interface GraphicsProps {
  graphics: ContentItem[];
  onUpdate: (graphics: ContentItem[]) => void;
  onNavigate: (page: string) => void;
  onToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const emptyGraphic: ContentItem = {
  id: '',
  title: '',
  type: 'graphic',
  status: 'draft',
  author: '',
  createdAt: new Date().toISOString().split('T')[0],
  updatedAt: new Date().toISOString().split('T')[0],
  description: '',
  tags: [],
  category: '',
};

export default function Graphics({ graphics, onUpdate, onNavigate, onToast }: GraphicsProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingGraphic, setEditingGraphic] = useState<ContentItem | null>(null);
  const [formData, setFormData] = useState<ContentItem>(emptyGraphic);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = graphics.filter(g => {
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase()) || g.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || g.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusBadge = (status: ContentStatus) => {
    const styles: Record<string, string> = {
      published: 'bg-emerald-100 text-emerald-700',
      draft: 'bg-amber-100 text-amber-700',
      review: 'bg-purple-100 text-purple-700',
      archived: 'bg-slate-100 text-slate-700',
    };
    return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>{status === 'review' ? 'In Review' : status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  const openCreate = () => {
    setEditingGraphic(null);
    setFormData({ ...emptyGraphic, id: `g${Date.now()}`, thumbnail: `https://picsum.photos/seed/new${Date.now()}/400/250`, createdAt: new Date().toISOString().split('T')[0], updatedAt: new Date().toISOString().split('T')[0] });
    setShowModal(true);
  };

  const openEdit = (graphic: ContentItem) => {
    setEditingGraphic(graphic);
    setFormData({ ...graphic, updatedAt: new Date().toISOString().split('T')[0] });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.title.trim()) { onToast('Title is required', 'error'); return; }
    if (editingGraphic) {
      onUpdate(graphics.map(g => g.id === editingGraphic.id ? formData : g));
      onToast('Graphic updated successfully', 'success');
    } else {
      onUpdate([formData, ...graphics]);
      onToast('Graphic created successfully', 'success');
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    onUpdate(graphics.filter(g => g.id !== id));
    onToast('Graphic deleted', 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Image className="text-teal-500" size={28} />
            Graphics
          </h1>
          <p className="text-slate-500 mt-1">{graphics.length} graphic assets in your library</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onNavigate('editor')} className="inline-flex items-center gap-2 bg-teal-50 hover:bg-teal-100 text-teal-700 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors border border-teal-200">
            <Edit3 size={16} /> Open Editor
          </button>
          <button onClick={openCreate} className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm">
            <Plus size={18} /> New Graphic
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search graphics..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 bg-white" />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="pl-9 pr-8 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 bg-white appearance-none cursor-pointer">
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="review">In Review</option>
          </select>
        </div>
        <div className="flex bg-slate-100 rounded-lg p-0.5">
          <button onClick={() => setViewMode('grid')} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>Grid</button>
          <button onClick={() => setViewMode('list')} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>List</button>
        </div>
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <Image size={48} className="mx-auto text-slate-300" />
          <p className="mt-4 text-slate-500 font-medium">No graphics found</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(graphic => (
            <div key={graphic.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all group">
              <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden">
                {graphic.thumbnail ? (
                  <img src={graphic.thumbnail} alt={graphic.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Image size={40} className="text-slate-300" />
                  </div>
                )}
                <div className="absolute top-3 right-3">{statusBadge(graphic.status)}</div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 text-sm line-clamp-1">{graphic.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{graphic.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-slate-400">{graphic.author}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(graphic)} className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-teal-600"><Edit3 size={14} /></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-blue-600"><Download size={14} /></button>
                    <button onClick={() => handleDelete(graphic.id)} className="p-1.5 hover:bg-red-50 rounded text-slate-400 hover:text-red-600"><Trash2 size={14} /></button>
                  </div>
                </div>
                {graphic.tags.length > 0 && (
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {graphic.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-1.5 py-0.5 bg-teal-50 text-teal-600 rounded text-[10px] font-medium">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(graphic => (
            <div key={graphic.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all group flex items-center gap-4">
              <div className="w-20 h-14 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                {graphic.thumbnail ? <img src={graphic.thumbnail} alt={graphic.title} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full"><Image size={20} className="text-slate-300" /></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2"><h3 className="font-medium text-sm text-slate-900 truncate">{graphic.title}</h3>{statusBadge(graphic.status)}</div>
                <p className="text-xs text-slate-400 mt-0.5">{graphic.author} · {graphic.category} · {graphic.updatedAt}</p>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(graphic)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-teal-600"><Edit3 size={16} /></button>
                <button onClick={() => handleDelete(graphic.id)} className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600"><Trash2 size={16} /></button>
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
              <h2 className="text-lg font-semibold text-slate-900">{editingGraphic ? 'Edit Graphic' : 'Create New Graphic'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-slate-100 rounded-lg"><X size={18} className="text-slate-500" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" placeholder="Graphic title..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Author</label>
                  <input type="text" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <input type="text" value={formData.category || ''} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as ContentStatus })} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400">
                  <option value="draft">Draft</option>
                  <option value="review">In Review</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tags (comma-separated)</label>
                <input type="text" value={formData.tags.join(', ')} onChange={e => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 sticky bottom-0 bg-white rounded-b-2xl">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100">Cancel</button>
              <button onClick={handleSave} className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"><Save size={16} />{editingGraphic ? 'Update' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
