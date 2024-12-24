import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  Bell,
  Shield,
  Palette,
  Gauge,
  Users,
  Wifi,
  Mail,
  Cloud,
  Database,
} from "lucide-react";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

interface SystemSetting {
  id: string;
  title: string;
  value: string;
  type: "text" | "select" | "number";
  options?: string[];
}

const defaultNotifications: NotificationSetting[] = [
  {
    id: "health-alerts",
    title: "Health Alerts",
    description:
      "Receive notifications for critical health issues and emergencies",
    enabled: true,
  },
  {
    id: "task-updates",
    title: "Task Updates",
    description: "Get notified when tasks are assigned, completed, or modified",
    enabled: true,
  },
  {
    id: "inventory-alerts",
    title: "Inventory Alerts",
    description: "Alerts for low stock and inventory management",
    enabled: false,
  },
  {
    id: "system-updates",
    title: "System Updates",
    description: "Notifications about system maintenance and updates",
    enabled: true,
  },
];

const defaultSettings: SystemSetting[] = [
  {
    id: "farm-name",
    title: "Farm Name",
    value: "Agrevanna Dairy Farm",
    type: "text",
  },
  {
    id: "time-zone",
    title: "Time Zone",
    value: "UTC-5",
    type: "select",
    options: ["UTC-8", "UTC-7", "UTC-6", "UTC-5", "UTC-4", "UTC-3"],
  },
  {
    id: "language",
    title: "Language",
    value: "English",
    type: "select",
    options: ["English", "Spanish", "French"],
  },
  {
    id: "data-retention",
    title: "Data Retention (days)",
    value: "90",
    type: "number",
  },
];

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(defaultNotifications);
  const [settings, setSettings] = useState(defaultSettings);
  const [activeTab, setActiveTab] = useState("general");

  const handleNotificationToggle = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, enabled: !notification.enabled }
          : notification,
      ),
    );
  };

  const handleSettingChange = (id: string, value: string) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, value } : setting,
      ),
    );
  };

  const handleSaveChanges = () => {
    // Here you would typically save the settings to your backend
    console.log("Saving settings:", { notifications, settings });
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500">
          Manage your farm system preferences and configurations
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start h-11 bg-white overflow-x-auto flex-nowrap">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" /> General
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="w-4 h-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" /> Security
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Gauge className="w-4 h-4" /> System
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="general">
            <Card className="p-6">
              <div className="space-y-6">
                {settings.map((setting) => (
                  <div key={setting.id} className="space-y-2">
                    <Label htmlFor={setting.id}>{setting.title}</Label>
                    {setting.type === "select" ? (
                      <Select
                        value={setting.value}
                        onValueChange={(value) =>
                          handleSettingChange(setting.id, value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {setting.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={setting.id}
                        type={setting.type}
                        value={setting.value}
                        onChange={(e) =>
                          handleSettingChange(setting.id, e.target.value)
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="p-6">
              <div className="space-y-6">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-center justify-between space-x-4"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{notification.title}</p>
                        {notification.enabled && (
                          <Badge variant="secondary" className="text-xs">
                            Enabled
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {notification.description}
                      </p>
                    </div>
                    <Switch
                      checked={notification.enabled}
                      onCheckedChange={() =>
                        handleNotificationToggle(notification.id)
                      }
                    />
                  </div>
                ))}

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="font-medium">Notification Channels</h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Card className="p-4 flex items-center gap-4">
                      <Mail className="w-5 h-5 text-blue-500" />
                      <div className="flex-1">
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-gray-500">
                          farm@example.com
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </Card>
                    <Card className="p-4 flex items-center gap-4">
                      <Wifi className="w-5 h-5 text-green-500" />
                      <div className="flex-1">
                        <p className="font-medium">Push</p>
                        <p className="text-sm text-gray-500">Web & Mobile</p>
                      </div>
                      <Switch defaultChecked />
                    </Card>
                    <Card className="p-4 flex items-center gap-4">
                      <Cloud className="w-5 h-5 text-purple-500" />
                      <div className="flex-1">
                        <p className="font-medium">SMS</p>
                        <p className="text-sm text-gray-500">
                          +1 (555) 123-4567
                        </p>
                      </div>
                      <Switch />
                    </Card>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Two-Factor Authentication</Label>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">
                        Enhance your account security
                      </p>
                      <p className="text-sm text-gray-500">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Session Management</Label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">Auto Logout</p>
                        <p className="text-sm text-gray-500">
                          Automatically log out after inactivity
                        </p>
                      </div>
                      <Select defaultValue="30">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label>System Status</Label>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <Card className="p-4">
                        <div className="flex items-center gap-4">
                          <Database className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="font-medium">Database</p>
                            <p className="text-sm text-green-600">Connected</p>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="flex items-center gap-4">
                          <Cloud className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="font-medium">Cloud Sync</p>
                            <p className="text-sm text-blue-600">Active</p>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="flex items-center gap-4">
                          <Users className="w-5 h-5 text-purple-500" />
                          <div>
                            <p className="font-medium">Users</p>
                            <p className="text-sm text-purple-600">12 Active</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>System Maintenance</Label>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full sm:w-auto">
                        Clear Cache
                      </Button>
                      <p className="text-sm text-gray-500">
                        Last cache clear: 3 days ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </div>
    </div>
  );
};

export default SettingsPage;
