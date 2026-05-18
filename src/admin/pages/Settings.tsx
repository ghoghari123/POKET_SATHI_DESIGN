import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { useTheme } from '../hooks/useTheme';
import { Save, Shield, Bell, Palette, Globe, User } from 'lucide-react';
import { cn } from '../utils/helpers';

type TabId = 'general' | 'security' | 'notifications' | 'appearance';

const tabs = [
  { id: 'general', label: 'General', icon: Globe },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const { theme } = useTheme();

  const timezoneOptions = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { value: 'EST', label: 'EST (Eastern Standard Time)' },
    { value: 'PST', label: 'PST (Pacific Standard Time)' },
    { value: 'IST', label: 'IST (Indian Standard Time)' },
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Settings</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="lg:w-64 flex-shrink-0">
          <nav className="flex lg:flex-col gap-1 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabId)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200',
                  'lg:flex-col lg:items-start lg:text-sm',
                  activeTab === tab.id
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                )}
              >
                <tab.icon className="w-5 h-5 lg:w-4 lg:h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </Card>

        <div className="flex-1 space-y-6">
          {activeTab === 'general' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Manage your general account settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Site Name" defaultValue="Pocketsathi" />
                    <Input label="Admin Email" defaultValue="admin@pocketsathi.com" type="email" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      label="Timezone"
                      options={timezoneOptions}
                      value="UTC"
                      onChange={() => {}}
                    />
                    <Select
                      label="Language"
                      options={languageOptions}
                      value="en"
                      onChange={() => {}}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button leftIcon={<Save className="w-4 h-4" />}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'security' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">Two-Factor Authentication</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">Session Timeout</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Automatically log out after inactivity</p>
                      </div>
                      <select className="h-9 px-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm">
                        <option>15 minutes</option>
                        <option>30 minutes</option>
                        <option>1 hour</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">Password Requirements</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Minimum 8 characters with numbers</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'notifications' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose what notifications you receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: 'Email notifications', desc: 'Receive email updates about your account' },
                    { label: 'Push notifications', desc: 'Get push notifications on your device' },
                    { label: 'Order alerts', desc: 'Get notified about new orders' },
                    { label: 'User registrations', desc: 'Get notified about new user signups' },
                    { label: 'System updates', desc: 'Get notified about system maintenance' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">{item.label}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer dark:bg-slate-700 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white after:dark:bg-slate-400"></div>
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'appearance' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how the admin panel looks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                        <Palette className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">Theme</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Current: {theme === 'dark' ? 'Dark' : 'Light'} Mode</p>
                      </div>
                    </div>
                    <ThemeToggle />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={cn(
                      'p-4 rounded-lg border-2 cursor-pointer transition-all',
                      theme === 'light' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-200 dark:border-slate-700'
                    )}>
                      <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded mb-2" />
                      <p className="text-sm font-medium text-center">Light</p>
                    </div>
                    <div className={cn(
                      'p-4 rounded-lg border-2 cursor-pointer transition-all',
                      theme === 'dark' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-200 dark:border-slate-700'
                    )}>
                      <div className="h-20 bg-slate-800 rounded mb-2" />
                      <p className="text-sm font-medium text-center">Dark</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button leftIcon={<Save className="w-4 h-4" />}>Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}