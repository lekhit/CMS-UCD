import { Settings as SettingsIcon, User, Bell, Globe, Shield, Palette, Save } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'ContentOS',
    siteUrl: 'https://contentos.example.com',
    adminEmail: 'admin@contentos.com',
    timezone: 'UTC-5',
    language: 'en',
    theme: 'light',
    emailNotifications: true,
    pushNotifications: false,
    twoFactor: true,
    autoSave: true,
    autoSaveInterval: '30',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <SettingsIcon className="text-slate-500" size={28} />
          Settings
        </h1>
        <p className="text-slate-500 mt-1">Manage your CMS platform configuration</p>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 text-sm text-emerald-700 flex items-center gap-2">
          <Save size={16} /> Settings saved successfully!
        </div>
      )}

      <div className="space-y-6">
        {/* General */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <Globe size={18} className="text-blue-500" />
            <h2 className="font-semibold text-slate-900">General</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Site Name</label>
              <input type="text" value={settings.siteName} onChange={e => setSettings({ ...settings, siteName: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Site URL</label>
              <input type="text" value={settings.siteUrl} onChange={e => setSettings({ ...settings, siteUrl: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Language</label>
                <select value={settings.language} onChange={e => setSettings({ ...settings, language: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Timezone</label>
                <select value={settings.timezone} onChange={e => setSettings({ ...settings, timezone: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400">
                  <option value="UTC-5">UTC-5 (Eastern)</option>
                  <option value="UTC-6">UTC-6 (Central)</option>
                  <option value="UTC-7">UTC-7 (Mountain)</option>
                  <option value="UTC-8">UTC-8 (Pacific)</option>
                  <option value="UTC+0">UTC+0 (GMT)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <User size={18} className="text-teal-500" />
            <h2 className="font-semibold text-slate-900">Profile</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Admin Email</label>
              <input type="email" value={settings.adminEmail} onChange={e => setSettings({ ...settings, adminEmail: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input type="password" value="••••••••" readOnly className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm bg-slate-50" />
              <button className="text-xs text-blue-600 hover:text-blue-700 mt-1 font-medium">Change password</button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <Bell size={18} className="text-amber-500" />
            <h2 className="font-semibold text-slate-900">Notifications</h2>
          </div>
          <div className="p-6 space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">Email Notifications</p>
                <p className="text-xs text-slate-500">Receive updates about content status changes</p>
              </div>
              <input type="checkbox" checked={settings.emailNotifications} onChange={e => setSettings({ ...settings, emailNotifications: e.target.checked })} className="w-5 h-5 rounded text-blue-600" />
            </label>
            <label className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">Push Notifications</p>
                <p className="text-xs text-slate-500">Browser push notifications for real-time alerts</p>
              </div>
              <input type="checkbox" checked={settings.pushNotifications} onChange={e => setSettings({ ...settings, pushNotifications: e.target.checked })} className="w-5 h-5 rounded text-blue-600" />
            </label>
          </div>
        </div>

        {/* Editor Settings */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <Palette size={18} className="text-purple-500" />
            <h2 className="font-semibold text-slate-900">Editor</h2>
          </div>
          <div className="p-6 space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">Auto-save</p>
                <p className="text-xs text-slate-500">Automatically save drafts while editing</p>
              </div>
              <input type="checkbox" checked={settings.autoSave} onChange={e => setSettings({ ...settings, autoSave: e.target.checked })} className="w-5 h-5 rounded text-blue-600" />
            </label>
            {settings.autoSave && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Auto-save Interval (seconds)</label>
                <input type="number" value={settings.autoSaveInterval} onChange={e => setSettings({ ...settings, autoSaveInterval: e.target.value })} className="w-32 px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" min="10" max="300" />
              </div>
            )}
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <Shield size={18} className="text-rose-500" />
            <h2 className="font-semibold text-slate-900">Security</h2>
          </div>
          <div className="p-6 space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">Two-Factor Authentication</p>
                <p className="text-xs text-slate-500">Add an extra layer of security to your account</p>
              </div>
              <input type="checkbox" checked={settings.twoFactor} onChange={e => setSettings({ ...settings, twoFactor: e.target.checked })} className="w-5 h-5 rounded text-blue-600" />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={handleSave} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm">
            <Save size={16} /> Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
