import { useState } from 'react';
import { Search, Upload, Image, Video, FileText, Grid3X3, List, Download, Trash2, Tag, X, FolderOpen } from 'lucide-react';
import { MediaAsset } from '../types';

interface MediaLibraryProps {
  media: MediaAsset[];
  onUpdate: (media: MediaAsset[]) => void;
  onToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export default function MediaLibrary({ media, onUpdate, onToast }: MediaLibraryProps) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const filtered = media.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchType = typeFilter === 'all' || m.type === typeFilter;
    return matchSearch && matchType;
  });

  const typeIcon = (type: string, size: number = 20) => {
    switch (type) {
      case 'image': return <Image size={size} />;
      case 'video': return <Video size={size} />;
      case 'document': return <FileText size={size} />;
      default: return <FolderOpen size={size} />;
    }
  };

  const handleUpload = () => {
    const newAsset: MediaAsset = {
      id: `m${Date.now()}`,
      name: `uploaded-asset-${Date.now()}.${typeFilter === 'video' ? 'mp4' : 'png'}`,
      type: (typeFilter === 'video' ? 'video' : typeFilter === 'document' ? 'document' : 'image') as MediaAsset['type'],
      size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
      url: `https://picsum.photos/seed/upload${Date.now()}/400/300`,
      uploadedAt: new Date().toISOString().split('T')[0],
      dimensions: `${Math.floor(Math.random() * 2000 + 500)}×${Math.floor(Math.random() * 1500 + 300)}`,
      tags: ['uploaded'],
    };
    onUpdate([newAsset, ...media]);
    setShowUpload(false);
    onToast('File uploaded successfully', 'success');
  };

  const handleDelete = (id: string) => {
    onUpdate(media.filter(m => m.id !== id));
    if (selectedAsset?.id === id) setSelectedAsset(null);
    onToast('Asset deleted', 'info');
  };

  const typeCounts = {
    all: media.length,
    image: media.filter(m => m.type === 'image').length,
    video: media.filter(m => m.type === 'video').length,
    document: media.filter(m => m.type === 'document').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <FolderOpen className="text-orange-500" size={28} />
            Media Library
          </h1>
          <p className="text-slate-500 mt-1">{media.length} assets in your library</p>
        </div>
        <button onClick={() => setShowUpload(true)} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm">
          <Upload size={18} /> Upload Asset
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search by name or tag..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 bg-white" />
        </div>
        <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
          {(['all', 'image', 'video', 'document'] as const).map(type => (
            <button key={type} onClick={() => setTypeFilter(type)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${typeFilter === type ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              {type !== 'all' && typeIcon(type, 12)}
              {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)} ({typeCounts[type]})
            </button>
          ))}
        </div>
        <div className="flex bg-slate-100 rounded-lg p-0.5">
          <button onClick={() => setViewMode('grid')} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}><Grid3X3 size={14} /></button>
          <button onClick={() => setViewMode('list')} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}><List size={14} /></button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
              <FolderOpen size={48} className="mx-auto text-slate-300" />
              <p className="mt-4 text-slate-500 font-medium">No assets found</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map(asset => (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className={`bg-white rounded-xl border overflow-hidden cursor-pointer hover:shadow-md transition-all group ${selectedAsset?.id === asset.id ? 'border-orange-400 ring-2 ring-orange-100' : 'border-slate-200'}`}
                >
                  <div className="relative h-32 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                    {asset.type === 'image' ? (
                      <img src={asset.url} alt={asset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-400">
                        {typeIcon(asset.type, 32)}
                      </div>
                    )}
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-medium text-slate-900 truncate">{asset.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{asset.size} · {asset.uploadedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Size</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Date</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(asset => (
                    <tr key={asset.id} onClick={() => setSelectedAsset(asset)} className={`border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors ${selectedAsset?.id === asset.id ? 'bg-orange-50' : ''}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0">{typeIcon(asset.type, 14)}</div>
                          <span className="text-sm text-slate-900 truncate max-w-[200px]">{asset.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500 capitalize">{asset.type}</td>
                      <td className="px-4 py-3 text-xs text-slate-500">{asset.size}</td>
                      <td className="px-4 py-3 text-xs text-slate-500">{asset.uploadedAt}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-blue-600"><Download size={14} /></button>
                          <button onClick={(e) => { e.stopPropagation(); handleDelete(asset.id); }} className="p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-600"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selectedAsset && (
          <div className="w-72 flex-shrink-0 bg-white rounded-xl border border-slate-200 p-4 h-fit sticky top-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-slate-900">Asset Details</h3>
              <button onClick={() => setSelectedAsset(null)} className="p-1 hover:bg-slate-100 rounded"><X size={14} className="text-slate-400" /></button>
            </div>
            <div className="h-40 rounded-lg bg-slate-100 overflow-hidden mb-4">
              {selectedAsset.type === 'image' ? (
                <img src={selectedAsset.url} alt={selectedAsset.name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">{typeIcon(selectedAsset.type, 40)}</div>
              )}
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Filename</label>
                <p className="text-sm text-slate-900 font-medium break-all">{selectedAsset.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Type</label>
                  <p className="text-sm text-slate-700 capitalize">{selectedAsset.type}</p>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Size</label>
                  <p className="text-sm text-slate-700">{selectedAsset.size}</p>
                </div>
              </div>
              {selectedAsset.dimensions && (
                <div>
                  <label className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Dimensions</label>
                  <p className="text-sm text-slate-700">{selectedAsset.dimensions}</p>
                </div>
              )}
              <div>
                <label className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Uploaded</label>
                <p className="text-sm text-slate-700">{selectedAsset.uploadedAt}</p>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-medium uppercase tracking-wider flex items-center gap-1"><Tag size={10} /> Tags</label>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {selectedAsset.tags.map(tag => (
                    <span key={tag} className="px-1.5 py-0.5 bg-orange-50 text-orange-600 rounded text-[10px] font-medium">#{tag}</span>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <button className="flex-1 py-2 text-xs font-medium bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1">
                  <Download size={12} /> Download
                </button>
                <button onClick={() => handleDelete(selectedAsset.id)} className="py-2 px-3 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Upload Asset</h2>
              <button onClick={() => setShowUpload(false)} className="p-1.5 hover:bg-slate-100 rounded-lg"><X size={18} className="text-slate-500" /></button>
            </div>
            <div className="p-6">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-orange-400 hover:bg-orange-50/30 transition-colors cursor-pointer" onClick={handleUpload}>
                <Upload size={40} className="mx-auto text-slate-400" />
                <p className="mt-3 text-sm font-medium text-slate-700">Click to upload or drag & drop</p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG, SVG, MP4, PDF up to 50MB</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200">
              <button onClick={() => setShowUpload(false)} className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100">Cancel</button>
              <button onClick={handleUpload} className="px-4 py-2.5 rounded-lg text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white transition-colors">Simulate Upload</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
