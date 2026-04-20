import { useState } from 'react';
import { Plus, Search, Filter, Video, Edit3, Trash2, Play, X, Save, Clock, User } from 'lucide-react';
import { ContentItem, ContentStatus } from '../types';

interface VideosProps {
  videos: ContentItem[];
  onUpdate: (videos: ContentItem[]) => void;
  onToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const emptyVideo: ContentItem = {
  id: '',
  title: '',
  type: 'video',
  status: 'draft',
  author: '',
  createdAt: new Date().toISOString().split('T')[0],
  updatedAt: new Date().toISOString().split('T')[0],
  description: '',
  tags: [],
  category: '',
};

export default function Videos({ videos, onUpdate, onToast }: VideosProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState<ContentItem | null>(null);
  const [formData, setFormData] = useState<ContentItem>(emptyVideo);

  const filtered = videos.filter(v => {
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase()) || v.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || v.status === statusFilter;
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
    setEditingVideo(null);
    setFormData({ ...emptyVideo, id: `v${Date.now()}`, thumbnail: `https://picsum.photos/seed/vidnew${Date.now()}/400/250`, createdAt: new Date().toISOString().split('T')[0], updatedAt: new Date().toISOString().split('T')[0] });
    setShowModal(true);
  };

  const openEdit = (video: ContentItem) => {
    setEditingVideo(video);
    setFormData({ ...video, updatedAt: new Date().toISOString().split('T')[0] });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.title.trim()) { onToast('Title is required', 'error'); return; }
    if (editingVideo) {
      onUpdate(videos.map(v => v.id === editingVideo.id ? formData : v));
      onToast('Video updated successfully', 'success');
    } else {
      onUpdate([formData, ...videos]);
      onToast('Video created successfully', 'success');
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    onUpdate(videos.filter(v => v.id !== id));
    onToast('Video deleted', 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Video className="text-purple-500" size={28} />
            Videos
          </h1>
          <p className="text-slate-500 mt-1">{videos.length} videos in your library</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm">
          <Plus size={18} /> New Video
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search videos..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 bg-white" />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="pl-9 pr-8 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 bg-white appearance-none cursor-pointer">
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="review">In Review</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <Video size={48} className="mx-auto text-slate-300" />
          <p className="mt-4 text-slate-500 font-medium">No videos found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(video => (
            <div key={video.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group">
              <div className="relative h-44 bg-gradient-to-br from-purple-50 to-slate-100 overflow-hidden">
                {video.thumbnail ? (
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="flex items-center justify-center h-full"><Video size={40} className="text-slate-300" /></div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100 shadow-lg">
                    <Play size={24} className="text-purple-600 ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute top-3 left-3">{statusBadge(video.status)}</div>
                {video.category && (
                  <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 text-white rounded text-xs font-medium">{video.category}</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 line-clamp-1">{video.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{video.description}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><User size={12} /> {video.author}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {video.updatedAt}</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <div className="flex gap-1 flex-wrap">
                    {video.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded text-[10px] font-medium">#{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => openEdit(video)} className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-purple-600 transition-colors"><Edit3 size={14} /></button>
                    <button onClick={() => handleDelete(video.id)} className="p-1.5 hover:bg-red-50 rounded text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                  </div>
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
              <h2 className="text-lg font-semibold text-slate-900">{editingVideo ? 'Edit Video' : 'Add New Video'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-slate-100 rounded-lg"><X size={18} className="text-slate-500" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400" placeholder="Video title..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Author</label>
                  <input type="text" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <input type="text" value={formData.category || ''} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as ContentStatus })} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400">
                  <option value="draft">Draft</option>
                  <option value="review">In Review</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tags (comma-separated)</label>
                <input type="text" value={formData.tags.join(', ')} onChange={e => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 sticky bottom-0 bg-white rounded-b-2xl">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100">Cancel</button>
              <button onClick={handleSave} className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"><Save size={16} />{editingVideo ? 'Update' : 'Add Video'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
