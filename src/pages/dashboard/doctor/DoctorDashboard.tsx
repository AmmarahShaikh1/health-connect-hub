import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Users, Video, Clock, FileText, MessageSquare } from 'lucide-react';

const todayAppointments = [
  { id: 1, patient: 'John Doe', time: '9:00 AM', type: 'Video', reason: 'Follow-up', status: 'upcoming' },
  { id: 2, patient: 'Jane Smith', time: '10:30 AM', type: 'In-Person', reason: 'Consultation', status: 'in-progress' },
  { id: 3, patient: 'Robert Johnson', time: '2:00 PM', type: 'Video', reason: 'Check-up', status: 'upcoming' },
];

export default function DoctorDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, Dr. Smith!</h1>
        <p className="text-muted-foreground">Here's your schedule for today</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Appointments", value: '8', icon: Calendar, color: 'text-primary' },
          { label: 'Pending Requests', value: '5', icon: Clock, color: 'text-warning' },
          { label: 'Total Patients', value: '142', icon: Users, color: 'text-success' },
          { label: 'Unread Messages', value: '12', icon: MessageSquare, color: 'text-primary' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {todayAppointments.map((apt) => (
            <div key={apt.id} className="flex items-center gap-4 p-4 rounded-lg border">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-accent text-accent-foreground">
                  {apt.patient.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{apt.patient}</p>
                <p className="text-sm text-muted-foreground">{apt.reason}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{apt.time}</p>
                <Badge variant={apt.type === 'Video' ? 'default' : 'secondary'}>{apt.type}</Badge>
              </div>
              <Button size="sm">{apt.type === 'Video' ? 'Start Call' : 'View'}</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
