import { Palette, Type, Image as ImageIcon, MessageSquare, Shield, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { BrandGuideline } from '../types';

interface BrandingProps {
  guidelines: BrandGuideline[];
}

export default function Branding({ guidelines }: BrandingProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sections = [...new Set(guidelines.map(g => g.section))];

  const sectionIcon = (section: string) => {
    switch (section) {
      case 'Colors': return <Palette size={20} className="text-blue-500" />;
      case 'Typography': return <Type size={20} className="text-teal-500" />;
      case 'Logo Usage': return <Shield size={20} className="text-purple-500" />;
      case 'Imagery': return <ImageIcon size={20} className="text-amber-500" />;
      case 'Voice & Tone': return <MessageSquare size={20} className="text-rose-500" />;
      default: return <Palette size={20} />;
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <Palette className="text-indigo-500" size={28} />
          Brand Guidelines
        </h1>
        <p className="text-slate-500 mt-1">Organizational branding standards and guidelines for visual consistency</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {sections.map(section => (
          <div key={section} className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-2">{sectionIcon(section)}</div>
            <p className="text-sm font-semibold text-slate-900">{section}</p>
            <p className="text-xs text-slate-400 mt-0.5">{guidelines.filter(g => g.section === section).length} guidelines</p>
          </div>
        ))}
      </div>

      {/* Color Palette Preview */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Palette size={18} className="text-blue-500" />
          Color Palette
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {guidelines.filter(g => g.color).map(g => (
            <div key={g.id} className="group">
              <div className="relative h-24 rounded-xl overflow-hidden cursor-pointer shadow-sm" style={{ backgroundColor: g.color!.hex }}>
                <button
                  onClick={() => copyToClipboard(g.color!.hex, g.id)}
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
                >
                  {copiedId === g.id ? (
                    <Check size={20} className="text-white" />
                  ) : (
                    <Copy size={20} className="text-white" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-sm font-medium text-slate-900">{g.color!.name}</p>
              <p className="text-xs text-slate-400 font-mono">{g.color!.hex}</p>
              <p className="text-[10px] text-slate-400">RGB({g.color!.rgb})</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Guidelines */}
      {sections.map(section => (
        <div key={section} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
            {sectionIcon(section)}
            <h2 className="text-lg font-semibold text-slate-900">{section}</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {guidelines.filter(g => g.section === section).map(g => (
              <div key={g.id} className="p-6">
                <h3 className="font-semibold text-slate-900">{g.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{g.description}</p>
                
                {g.font && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{g.font.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-mono">{g.font.family}</span>
                        <button onClick={() => copyToClipboard(g.font!.family, `font-${g.id}`)} className="p-1 hover:bg-slate-200 rounded">
                          {copiedId === `font-${g.id}` ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} className="text-slate-400" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl text-slate-800" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 700 }}>The Quick Brown Fox Jumps</p>
                      <p className="text-base text-slate-600" style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400 }}>abcdefghijklmnopqrstuvwxyz 0123456789</p>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">Weight range: {g.font.weight}</p>
                  </div>
                )}

                {g.values && (
                  <div className="mt-4 space-y-2">
                    {g.values.map((value, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={12} className="text-emerald-600" />
                        </div>
                        <p className="text-sm text-slate-700">{value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Brand Compliance Checklist */}
      <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl p-6 text-white">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Shield size={20} />
          Brand Compliance Checklist
        </h2>
        <p className="text-blue-200 text-sm mt-1 mb-4">Verify your content aligns with organizational standards</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            'Colors match approved brand palette',
            'Typography uses approved typefaces',
            'Logo maintains minimum clear space',
            'Images follow photography style guide',
            'Messaging aligns with brand voice',
            'All visual layouts follow grid system',
            'Color contrast meets accessibility standards',
            'File naming follows convention',
          ].map((item, i) => (
            <label key={i} className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3 cursor-pointer hover:bg-white/20 transition-colors">
              <input type="checkbox" className="w-4 h-4 rounded border-white/50 text-blue-300 accent-white" />
              <span className="text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
