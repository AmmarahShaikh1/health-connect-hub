import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Video, MapPin, FileText, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const appointments = {
  today: [
    { id: 1, patient: 'John Doe', time: '9:00 AM', type: 'Video', reason: 'Follow-up consultation', status: 'upcoming' },
    { id: 2, patient: 'Jane Smith', time: '10:30 AM', type: 'In-Person', reason: 'Annual checkup', status: 'in-progress' },
    { id: 3, patient: 'Robert Johnson', time: '2:00 PM', type: 'Video', reason: 'Lab results review', status: 'upcoming' },
    { id: 4, patient: 'Emily Davis', time: '3:30 PM', type: 'In-Person', reason: 'New patient consultation', status: 'upcoming' },
  ],
  upcoming: [
    { id: 5, patient: 'Michael Wilson', date: '2024-12-06', time: '10:00 AM', type: 'Video', reason: 'Prescription renewal' },
    { id: 6, patient: 'Sarah Johnson', date: '2024-12-06', time: '2:30 PM', type: 'In-Person', reason: 'Follow-up' },
    { id: 7, patient: 'David Brown', date: '2024-12-07', time: '11:00 AM', type: 'Video', reason: 'Consultation' },
  ],
};

export default function DoctorAppointments() {
  const { toast } = useToast();

  const handleComplete = (id: number) => {
    toast({ title: 'Appointment completed', description: 'The appointment has been marked as complete.' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">My Appointments</h1>
        <p className="text-muted-foreground">Manage your scheduled appointments</p>
      </div>

      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { label: 'Today', value: appointments.today.length },
          { label: 'This Week', value: '24' },
          { label: 'Completed Today', value: '3' },
          { label: 'No-Shows', value: '0' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="today">
        <TabsList>
          <TabsTrigger value="today">Today ({appointments.today.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({appointments.upcoming.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-6 space-y-4">
          {appointments.today.map((apt) => (
            <Card key={apt.id}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Avatar className="h-12 w-12 shrink-0">
                    <AvatarFallback className="bg-accent text-accent-foreground">
                      {apt.patient.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{apt.patient}</h3>
                        <p className="text-sm text-muted-foreground">{apt.reason}</p>
                      </div>
                      <Badge variant={apt.status === 'in-progress' ? 'default' : 'secondary'}>
                        {apt.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                      </Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />{apt.time}
                      </span>
                      <span className="flex items-center gap-1">
                        {apt.type === 'Video' ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                        {apt.type}
                      </span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      {apt.type === 'Video' && apt.status === 'upcoming' && (
                        <Button size="sm"><Video className="mr-2 h-4 w-4" />Start Call</Button>
                      )}
                      <Button size="sm" variant="outline"><FileText className="mr-2 h-4 w-4" />View History</Button>
                      {apt.status === 'in-progress' && (
                        <Button size="sm" variant="outline" onClick={() => handleComplete(apt.id)}>
                          <CheckCircle2 className="mr-2 h-4 w-4" />Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6 space-y-4">
          {appointments.upcoming.map((apt) => (
            <Card key={apt.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-accent text-accent-foreground">
                      {apt.patient.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{apt.patient}</h3>
                    <p className="text-sm text-muted-foreground">{apt.reason}</p>
                    <div className="mt-1 flex gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />{new Date(apt.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />{apt.time}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline">{apt.type}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
