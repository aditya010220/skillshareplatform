import React, { useState } from 'react';
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

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Aarav Kumar',
    email: 'aarav.kumar@example.com',
    bio: 'Passionate learner and teacher. Love sharing knowledge and discovering new skills!',
    location: 'Mumbai, India',
    phone: '+91',
    timezone: 'Asia/Kolkata'
  });
  
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    matchNotifications: true,
    messageNotifications: true,
    sessionReminders: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showLocation: true,
    allowMessages: true
  });

  const settingSections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: isDarkMode ? Moon : Sun },
    { id: 'account', label: 'Account', icon: Lock },
  ];

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  const handleDeleteAccount = () => {
    toast.error('Account deletion feature coming soon');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and settings</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <motion.div
          className="lg:col-span-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
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

        {/* Settings Content */}
        <motion.div
          className="lg:col-span-3"
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Profile Settings */}
          {activeSection === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription>
                  Update your profile information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=john" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm" className="mb-2">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-gray-500">
                      Recommended: Square JPG, PNG, or GIF, at least 200x200 pixels
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      placeholder="Tell others about yourself..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={profileData.timezone} onValueChange={(value) => setProfileData({...profileData, timezone: value})}>
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

                <Button onClick={handleSave} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Notifications Settings */}
          {activeSection === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>
                  Choose how you want to be notified about activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications" className="text-base font-medium">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushNotifications" className="text-base font-medium">
                        Push Notifications
                      </Label>
                      <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => setNotifications({...notifications, pushNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="matchNotifications" className="text-base font-medium">
                        New Matches
                      </Label>
                      <p className="text-sm text-gray-500">Get notified when you have new skill matches</p>
                    </div>
                    <Switch
                      id="matchNotifications"
                      checked={notifications.matchNotifications}
                      onCheckedChange={(checked) => setNotifications({...notifications, matchNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="messageNotifications" className="text-base font-medium">
                        Messages
                      </Label>
                      <p className="text-sm text-gray-500">Get notified about new messages</p>
                    </div>
                    <Switch
                      id="messageNotifications"
                      checked={notifications.messageNotifications}
                      onCheckedChange={(checked) => setNotifications({...notifications, messageNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sessionReminders" className="text-base font-medium">
                        Session Reminders
                      </Label>
                      <p className="text-sm text-gray-500">Reminders for upcoming learning sessions</p>
                    </div>
                    <Switch
                      id="sessionReminders"
                      checked={notifications.sessionReminders}
                      onCheckedChange={(checked) => setNotifications({...notifications, sessionReminders: checked})}
                    />
                  </div>
                </div>

                <Button onClick={handleSave} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Privacy Settings */}
          {activeSection === 'privacy' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Privacy & Security</span>
                </CardTitle>
                <CardDescription>
                  Control your privacy and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="profileVisibility" className="text-base font-medium">
                    Profile Visibility
                  </Label>
                  <Select value={privacy.profileVisibility} onValueChange={(value) => setPrivacy({...privacy, profileVisibility: value})}>
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
                      <Label htmlFor="showEmail" className="text-base font-medium">
                        Show Email Address
                      </Label>
                      <p className="text-sm text-gray-500">Allow others to see your email address</p>
                    </div>
                    <Switch
                      id="showEmail"
                      checked={privacy.showEmail}
                      onCheckedChange={(checked) => setPrivacy({...privacy, showEmail: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showLocation" className="text-base font-medium">
                        Show Location
                      </Label>
                      <p className="text-sm text-gray-500">Display your location on your profile</p>
                    </div>
                    <Switch
                      id="showLocation"
                      checked={privacy.showLocation}
                      onCheckedChange={(checked) => setPrivacy({...privacy, showLocation: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allowMessages" className="text-base font-medium">
                        Allow Messages
                      </Label>
                      <p className="text-sm text-gray-500">Let other members send you messages</p>
                    </div>
                    <Switch
                      id="allowMessages"
                      checked={privacy.allowMessages}
                      onCheckedChange={(checked) => setPrivacy({...privacy, allowMessages: checked})}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Security</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Two-Factor Authentication
                    </Button>
                  </div>
                </div>

                <Button onClick={handleSave} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Appearance Settings */}
          {activeSection === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  <span>Appearance</span>
                </CardTitle>
                <CardDescription>
                  Customize how SkillSwap looks for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-4 block">Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <motion.button
                      className="p-4 border rounded-lg text-center hover:bg-gray-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Sun className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-sm font-medium">Light</span>
                    </motion.button>
                    <motion.button
                      className="p-4 border rounded-lg text-center hover:bg-gray-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Moon className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-sm font-medium">Dark</span>
                    </motion.button>
                    <motion.button
                      className="p-4 border rounded-lg text-center hover:bg-gray-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Monitor className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-sm font-medium">System</span>
                    </motion.button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="language" className="text-base font-medium">
                    Language
                  </Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSave} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Appearance
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Account Settings */}
          {activeSection === 'account' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Account Settings</span>
                </CardTitle>
                <CardDescription>
                  Manage your account and data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Account Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Export My Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
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
                    <p className="text-sm text-red-600 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteAccount}
                      className="w-full"
                    >
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
