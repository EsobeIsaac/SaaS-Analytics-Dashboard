'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex@pulseboard.io');
  const [bio, setBio] = useState('Product admin at PulseBoard.');

  const [notifSettings, setNotifSettings] = useState({
    newOrders: true,
    lowStock: true,
    failedPayments: true,
    weeklyReport: false,
    productUpdates: false,
  marketingTips: false,
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({ title: 'Settings saved', description: 'Your changes have been saved successfully.' });
    }, 800);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your account and preferences." />

      <Tabs defaultValue="profile">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile Information</CardTitle>
              <CardDescription>Update your personal information and bio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-lg font-medium text-primary">AM</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">Change Avatar</Button>
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notification Preferences</CardTitle>
              <CardDescription>Choose what you want to be notified about.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {[
                { key: 'newOrders', label: 'New Orders', desc: 'Get notified when a new order is placed' },
                { key: 'lowStock', label: 'Low Stock Alerts', desc: 'Get notified when stock is running low' },
                { key: 'failedPayments', label: 'Failed Payments', desc: 'Get notified when a payment fails' },
                { key: 'weeklyReport', label: 'Weekly Reports', desc: 'Receive a weekly performance summary' },
                { key: 'productUpdates', label: 'Product Updates', desc: 'News about PulseBoard features' },
                { key: 'marketingTips', label: 'Marketing Tips', desc: 'Occasional tips to grow your store' },
              ].map((item, i) => (
                <div key={item.key}>
                  {i > 0 && <Separator />}
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notifSettings[item.key as keyof typeof notifSettings]}
                      onCheckedChange={(checked) =>
                        setNotifSettings((prev) => ({ ...prev, [item.key]: checked }))
                      }
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-4">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Preferences'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Security</CardTitle>
              <CardDescription>Manage your password and account security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : 'Update Password'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Appearance</CardTitle>
              <CardDescription>Customize how PulseBoard looks for you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'light', label: 'Light', icon: Sun },
                  { key: 'dark', label: 'Dark', icon: Moon },
                  { key: 'system', label: 'System', icon: Monitor },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setTheme(opt.key)}
                    className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                      theme === opt.key
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-accent'
                    }`}
                  >
                    <opt.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
