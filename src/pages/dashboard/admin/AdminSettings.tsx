import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Settings, Bell, Shield, Database, Mail, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminSettings() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: 'Settings saved', description: 'Your changes have been saved successfully.' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">System Settings</h1>
        <p className="text-muted-foreground">Configure system-wide settings</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general"><Settings className="mr-2 h-4 w-4" />General</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4" />Notifications</TabsTrigger>
          <TabsTrigger value="security"><Shield className="mr-2 h-4 w-4" />Security</TabsTrigger>
          <TabsTrigger value="email"><Mail className="mr-2 h-4 w-4" />Email</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>General platform configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Platform Name</Label>
                  <Input defaultValue="MediCare" />
                </div>
                <div className="space-y-2">
                  <Label>Support Email</Label>
                  <Input defaultValue="support@medicare.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select defaultValue="est">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="est">Eastern Time (EST)</SelectItem>
                    <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-muted-foreground">Temporarily disable access for users</p>
                </div>
                <Switch />
              </div>
              <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" />Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appointment Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Default Appointment Duration</Label>
                  <Select defaultValue="30">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Cancellation Window (hours)</Label>
                  <Input type="number" defaultValue="24" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Allow Same-Day Booking</p>
                  <p className="text-sm text-muted-foreground">Let patients book appointments for today</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" />Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { id: 'newPatient', label: 'New Patient Registration', desc: 'Notify admins when a new patient registers' },
                { id: 'newDoctor', label: 'New Doctor Application', desc: 'Notify admins when a doctor applies' },
                { id: 'appointmentCancel', label: 'Appointment Cancellations', desc: 'Notify when appointments are cancelled' },
                { id: 'paymentFailed', label: 'Failed Payments', desc: 'Alert on payment failures' },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
              <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" />Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Require 2FA for Admins</p>
                  <p className="text-sm text-muted-foreground">Enforce two-factor authentication</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Session Timeout</p>
                  <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Password Policy</Label>
                <Select defaultValue="strong">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (6+ characters)</SelectItem>
                    <SelectItem value="medium">Medium (8+ with numbers)</SelectItem>
                    <SelectItem value="strong">Strong (10+ with special chars)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" />Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>SMTP Host</Label>
                  <Input defaultValue="smtp.medicare.com" />
                </div>
                <div className="space-y-2">
                  <Label>SMTP Port</Label>
                  <Input defaultValue="587" />
                </div>
                <div className="space-y-2">
                  <Label>SMTP Username</Label>
                  <Input defaultValue="noreply@medicare.com" />
                </div>
                <div className="space-y-2">
                  <Label>SMTP Password</Label>
                  <Input type="password" defaultValue="••••••••" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Default From Name</Label>
                <Input defaultValue="MediCare Healthcare" />
              </div>
              <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" />Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
