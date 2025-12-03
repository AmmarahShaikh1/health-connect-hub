import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Stethoscope, Calendar, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

const pendingApprovals = [
  { id: 1, name: 'Dr. Amanda Lee', specialty: 'Pediatrician', date: '2024-12-01' },
  { id: 2, name: 'Dr. Kevin Park', specialty: 'Orthopedist', date: '2024-11-30' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">System overview and management</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Patients', value: '12,458', icon: Users, change: '+12%' },
          { label: 'Active Doctors', value: '156', icon: Stethoscope, change: '+5%' },
          { label: 'Appointments Today', value: '342', icon: Calendar, change: '+8%' },
          { label: 'Revenue (MTD)', value: '$45,230', icon: DollarSign, change: '+15%' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />{stat.change}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Doctor registrations awaiting review</CardDescription>
            </div>
            <Badge variant="destructive">{pendingApprovals.length}</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingApprovals.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">{doc.specialty}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Approve</Button>
                  <Button size="sm" variant="outline">Review</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { message: '3 appointments cancelled today', type: 'warning' },
              { message: 'Database backup completed', type: 'success' },
              { message: '2 payment failures need attention', type: 'error' },
            ].map((alert, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                <AlertCircle className={`h-5 w-5 ${alert.type === 'error' ? 'text-destructive' : alert.type === 'warning' ? 'text-warning' : 'text-success'}`} />
                <span className="text-sm">{alert.message}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
