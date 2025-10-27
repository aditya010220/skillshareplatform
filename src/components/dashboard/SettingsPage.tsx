import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Bell,
  Shield,
  Globe,
  Moon,
  Sun,
  Monitor,
  Mail,
  Lock,
  Smartphone,
  Eye,
  EyeOff,
  Save,
  Trash2,
  Camera,
  Edit3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Utility: theme handling
const applyTheme = (theme: 'light' | 'dark' | 'system') => {
  const root = document.documentElement;
  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.toggle('dark', prefersDark);
  } else {
    root.classList.toggle('dark', theme === 'dark');
  }
  try { localStorage.setItem('ss_theme', theme); } catch {}
};

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<{ full_name: string | null; bio: string | null; avatar_url: string | null } | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    bio: '',
    location: '',
    phone: '+91',
    timezone: 'Asia/Kolkata',
    language: 'en-IN',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    matchNotifications: true,
    messageNotifications: true,
    sessionReminders: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showLocation: true,
    allowMessages: true,
  });

  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    try { return (localStorage.getItem('ss_theme') as any) || 'system'; } catch { return 'system'; }
  });

  const settingSections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: theme === 'dark' ? Moon : Sun },
    { id: 'account', label: 'Account', icon: Lock },
  ];

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const { data: { user: u } } = await supabase.auth.getUser();
        if (!mounted) return;
        if (!u) {
          setLoadingUser(false);
          return;
        }
        setUser(u);
        // Load profile
        const { data: prof, error } = await supabase
          .from('profiles')
          .select('full_name, bio, avatar_url')
          .eq('id', u.id)
          .single();
        if (error && error.code !== 'PGRST116') {
          // Non "row not found" error
          console.error('Load profile error', error);
        }
        const initialProfile = prof || {
          full_name: u.user_metadata?.full_name || null,
          bio: '',
          avatar_url: u.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.email}`,
        };
        setProfile(initialProfile);
        setAvatarUrl(initialProfile.avatar_url || null);
        setProfileData((d) => ({
          ...d,
          fullName: initialProfile.full_name || '',
          email: u.email || '',
          bio: initialProfile.bio || '',
        }));

        // Load saved local preferences
        try {
          const n = localStorage.getItem('ss_notifications');
          if (n) setNotifications(JSON.parse(n));
          const p = localStorage.getItem('ss_privacy');
          if (p) setPrivacy(JSON.parse(p));
        } catch {}
      } catch (e) {
        console.error('Failed to init settings', e);
      } finally {
        if (mounted) setLoadingUser(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const handleSaveProfile = async () => {
    if (!user) return toast.error('Not signed in');
    try {
      // Update profiles table
      const updates: any = {
        full_name: profileData.fullName || null,
        bio: profileData.bio || null,
        avatar_url: avatarUrl || null,
      };
      const { error } = await supabase
        .from('profiles')
        .upsert({ id: user.id, ...updates })
        .eq('id', user.id);
      if (error) throw error;

      // Update email if changed
      if (profileData.email && profileData.email !== user.email) {
        const { error: emailErr } = await supabase.auth.updateUser({ email: profileData.email });
        if (emailErr) {
          console.warn('Email update failed', emailErr);
          toast.error('Email update failed');
        } else {
          toast.info('Verification email sent to confirm email change');
        }
      }

      setProfile((p) => p ? { ...p, full_name: updates.full_name, bio: updates.bio, avatar_url: updates.avatar_url } : p);
      toast.success('Profile saved');
    } catch (e: any) {
      console.error('Save profile error', e);
      toast.error(e?.message || 'Failed to save profile');
    }
  };

  const handleSavePreferences = () => {
    try {
      localStorage.setItem('ss_notifications', JSON.stringify(notifications));
      localStorage.setItem('ss_privacy', JSON.stringify(privacy));
      toast.success('Preferences saved');
    } catch (e) {
      toast.error('Failed to save preferences');
    }
  };

  // Password change
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const updatePassword = async () => {
    if (!user) return toast.error('Not signed in');
    if (!newPassword || newPassword.length < 8) return toast.error('Password must be at least 8 characters');
    if (newPassword !== confirmPassword) return toast.error('Passwords do not match');
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast.success('Password updated');
      setNewPassword('');
      setConfirmPassword('');
      setShowPassword(false);
    } catch (e: any) {
      console.error('Password update error', e);
      toast.error(e?.message || 'Failed to update password');
    }
  };

  // Two-Factor Authentication (TOTP)
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [mfaFactorId, setMfaFactorId] = useState<string | null>(null);
  const [mfaQr, setMfaQr] = useState<string | null>(null);
  const [mfaCode, setMfaCode] = useState('');
  useEffect(() => {
    // Load factors to reflect current state
    const checkFactors = async () => {
      try {
        const res: any = await (supabase as any).auth.mfa.listFactors();
        const totp = res?.data?.totp ?? [];
        const first = Array.isArray(totp) && totp.length ? totp[0] : null;
        setMfaEnabled(!!first);
        setMfaFactorId(first?.id || null);
      } catch (e) {
        // MFA might not be enabled on project; ignore
      }
    };
    checkFactors();
  }, []);

  const startEnableMfa = async () => {
    try {
      const enroll: any = await (supabase as any).auth.mfa.enroll({ factorType: 'totp' });
      const id = enroll?.data?.id;
      const qr = enroll?.data?.totp?.qr_code;
      if (!id || !qr) throw new Error('Failed to start 2FA enrollment');
      setMfaFactorId(id);
      setMfaQr(qr);
      toast.message('Scan the QR with your authenticator app and enter the 6-digit code');
    } catch (e: any) {
      toast.error(e?.message || 'Failed to start 2FA');
    }
  };

  const verifyEnableMfa = async () => {
    try {
      if (!mfaFactorId) throw new Error('Missing factor');
      await (supabase as any).auth.mfa.challenge({ factorId: mfaFactorId });
      const { error } = await (supabase as any).auth.mfa.verify({ factorId: mfaFactorId, code: mfaCode });
      if (error) throw error;
      setMfaEnabled(true);
      setMfaQr(null);
      setMfaCode('');
      toast.success('Two-factor authentication enabled');
    } catch (e: any) {
      toast.error(e?.message || '2FA verification failed');
    }
  };

  const disableMfa = async () => {
    try {
      if (!mfaFactorId) return;
      const { error } = await (supabase as any).auth.mfa.unenroll({ factorId: mfaFactorId });
      if (error) throw error;
      setMfaEnabled(false);
      setMfaFactorId(null);
      setMfaQr(null);
      setMfaCode('');
      toast.success('Two-factor authentication disabled');
    } catch (e: any) {
      toast.error(e?.message || 'Failed to disable 2FA');
    }
  };

  // Photo upload
  const triggerPhotoPicker = () => fileInputRef.current?.click();
  const onPhotoSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!user) return toast.error('Not signed in');
    try {
      const filePath = `${user.id}/${Date.now()}_${file.name}`;
      const { error: upErr } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      const publicUrl = data?.publicUrl;
      if (!publicUrl) throw new Error('Failed to get public URL');
      setAvatarUrl(publicUrl);
      // Persist immediately to profile
      const { error } = await supabase.from('profiles').upsert({ id: user.id, avatar_url: publicUrl }).eq('id', user.id);
      if (error) throw error;
      toast.success('Profile photo updated');
    } catch (e: any) {
      console.error('Upload avatar error', e);
      toast.error(e?.message || 'Failed to upload photo. Ensure an "avatars" public bucket exists.');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleExportData = async () => {
    if (!user) return toast.error('Not signed in');
    try {
      const results: Record<string, any> = {};
      const tables = [
        { key: 'profile', query: supabase.from('profiles').select('*').eq('id', user.id).single() },
        { key: 'swap_requests_mine', query: supabase.from('swap_requests').select('*').or(`requester_id.eq.${user.id},recipient_id.eq.${user.id}`) },
        { key: 'ratings_mine', query: supabase.from('ratings').select('*').or(`rater_id.eq.${user.id},rated_id.eq.${user.id}`) },
        { key: 'notifications_mine', query: supabase.from('notifications').select('*').eq('user_id', user.id) },
      ];
      for (const t of tables) {
        try {
          const { data, error }: any = await (t.query as any);
          if (!error) results[t.key] = data;
        } catch {}
      }
      const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'skillSwap-export.json';
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Export ready');
    } catch (e) {
      toast.error('Failed to export data');
    }
  };

  const handleDownloadArchive = async () => {
    // For now, same as export but different filename
    await handleExportData();
  };

  const handleDeleteAccount = () => {
    // Deleting auth users requires service role and cannot be done from the client safely
    toast.error('Account deletion requires admin action. Please contact support.');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  if (loadingUser) {
    return (
      <div className="p-6">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and settings</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <motion.div className="lg:col-span-1" variants={containerVariants} initial="hidden" animate="visible">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {settingSections.map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <section.icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </motion.button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="lg:col-span-3" key={activeSection} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          {activeSection === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription>Update your profile information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={avatarUrl || undefined} />
                    <AvatarFallback>{(profileData.fullName || 'U').charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onPhotoSelected} />
                    <Button variant="outline" size="sm" className="mb-2" onClick={triggerPhotoPicker}>
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-gray-500">Recommended: Square JPG/PNG/GIF, at least 200x200px</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" value={profileData.fullName} onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea id="bio" className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={profileData.bio} onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })} placeholder="Tell others about yourself..." />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" value={profileData.location} onChange={(e) => setProfileData({ ...profileData, location: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} placeholder="+91" />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={profileData.timezone} onValueChange={(value) => setProfileData({ ...profileData, timezone: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kolkata">India Standard Time (IST)</SelectItem>
                        <SelectItem value="Asia/Yekaterinburg">Yekaterinburg Time</SelectItem>
                        <SelectItem value="Europe/London">GMT / BST</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleSaveProfile} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          )}

          {activeSection === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>Choose how you want to be notified about activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications" className="text-base font-medium">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch id="emailNotifications" checked={notifications.emailNotifications} onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushNotifications" className="text-base font-medium">Push Notifications</Label>
                      <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                    </div>
                    <Switch id="pushNotifications" checked={notifications.pushNotifications} onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="matchNotifications" className="text-base font-medium">New Matches</Label>
                      <p className="text-sm text-gray-500">Get notified when you have new skill matches</p>
                    </div>
                    <Switch id="matchNotifications" checked={notifications.matchNotifications} onCheckedChange={(checked) => setNotifications({ ...notifications, matchNotifications: checked })} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="messageNotifications" className="text-base font-medium">Messages</Label>
                      <p className="text-sm text-gray-500">Get notified about new messages</p>
                    </div>
                    <Switch id="messageNotifications" checked={notifications.messageNotifications} onCheckedChange={(checked) => setNotifications({ ...notifications, messageNotifications: checked })} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sessionReminders" className="text-base font-medium">Session Reminders</Label>
                      <p className="text-sm text-gray-500">Reminders for upcoming learning sessions</p>
                    </div>
                    <Switch id="sessionReminders" checked={notifications.sessionReminders} onCheckedChange={(checked) => setNotifications({ ...notifications, sessionReminders: checked })} />
                  </div>
                </div>

                <Button onClick={handleSavePreferences} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          )}

          {activeSection === 'privacy' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Privacy & Security</span>
                </CardTitle>
                <CardDescription>Control your privacy and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="profileVisibility" className="text-base font-medium">Profile Visibility</Label>
                  <Select value={privacy.profileVisibility} onValueChange={(value) => setPrivacy({ ...privacy, profileVisibility: value })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Anyone can find me</SelectItem>
                      <SelectItem value="members">Members Only - Only SkillSwap members</SelectItem>
                      <SelectItem value="private">Private - Only my connections</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showEmail" className="text-base font-medium">Show Email Address</Label>
                      <p className="text-sm text-gray-500">Allow others to see your email address</p>
                    </div>
                    <Switch id="showEmail" checked={privacy.showEmail} onCheckedChange={(checked) => setPrivacy({ ...privacy, showEmail: checked })} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showLocation" className="text-base font-medium">Show Location</Label>
                      <p className="text-sm text-gray-500">Display your location on your profile</p>
                    </div>
                    <Switch id="showLocation" checked={privacy.showLocation} onCheckedChange={(checked) => setPrivacy({ ...privacy, showLocation: checked })} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allowMessages" className="text-base font-medium">Allow Messages</Label>
                      <p className="text-sm text-gray-500">Let other members send you messages</p>
                    </div>
                    <Switch id="allowMessages" checked={privacy.allowMessages} onCheckedChange={(checked) => setPrivacy({ ...privacy, allowMessages: checked })} />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Security</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Lock className="w-4 h-4 mr-2" />
                          <span className="font-medium">Change Password</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setShowPassword((s) => !s)}>
                          {showPassword ? 'Close' : 'Change'}
                        </Button>
                      </div>
                      {showPassword && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="md:col-span-1">
                            <Label htmlFor="new_password">New Password</Label>
                            <Input id="new_password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                          </div>
                          <div className="md:col-span-1">
                            <Label htmlFor="confirm_password">Confirm Password</Label>
                            <Input id="confirm_password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                          </div>
                          <div className="md:col-span-1 flex items-end">
                            <Button className="w-full" onClick={updatePassword}>Update Password</Button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Smartphone className="w-4 h-4 mr-2" />
                          <span className="font-medium">Two-Factor Authentication</span>
                        </div>
                        {!mfaEnabled ? (
                          <Button variant="outline" size="sm" onClick={startEnableMfa}>Enable</Button>
                        ) : (
                          <Button variant="destructive" size="sm" onClick={disableMfa}>Disable</Button>
                        )}
                      </div>
                      {mfaQr && !mfaEnabled && (
                        <div className="mt-4">
                          <div className="mb-3 text-sm text-gray-600">Scan this QR code in your authenticator app, then enter the 6-digit code below.</div>
                          <img src={mfaQr} alt="2FA QR Code" className="w-40 h-40 border rounded" />
                          <div className="mt-3 flex gap-2">
                            <Input placeholder="123456" value={mfaCode} onChange={(e) => setMfaCode(e.target.value)} />
                            <Button onClick={verifyEnableMfa}>Verify</Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Button onClick={handleSavePreferences} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          )}

          {activeSection === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  <span>Appearance</span>
                </CardTitle>
                <CardDescription>Customize how SkillSwap looks for you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-4 block">Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <motion.button className={`p-4 border rounded-lg text-center hover:bg-gray-50 ${theme === 'light' ? 'ring-2 ring-blue-500' : ''}`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setTheme('light')}>
                      <Sun className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-sm font-medium">Light</span>
                    </motion.button>
                    <motion.button className={`p-4 border rounded-lg text-center hover:bg-gray-50 ${theme === 'dark' ? 'ring-2 ring-blue-500' : ''}`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setTheme('dark')}>
                      <Moon className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-sm font-medium">Dark</span>
                    </motion.button>
                    <motion.button className={`p-4 border rounded-lg text-center hover:bg-gray-50 ${theme === 'system' ? 'ring-2 ring-blue-500' : ''}`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setTheme('system')}>
                      <Monitor className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-sm font-medium">System</span>
                    </motion.button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="language" className="text-base font-medium">Language</Label>
                  <Select value={profileData.language || 'en-IN'} onValueChange={(value) => setProfileData({ ...profileData, language: value })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-IN">English (India)</SelectItem>
                      <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={() => { try { localStorage.setItem('ss_language', profileData.language); } catch {}; toast.success('Appearance saved'); }} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Appearance
                </Button>
              </CardContent>
            </Card>
          )}

          {activeSection === 'account' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Account Settings</span>
                </CardTitle>
                <CardDescription>Manage your account and data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Account Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" onClick={handleExportData}>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Export My Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={handleDownloadArchive}>
                      <Eye className="w-4 h-4 mr-2" />
                      Download Account Archive
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
                    <p className="text-sm text-red-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                    <Button variant="destructive" onClick={handleDeleteAccount} className="w-full">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete My Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
