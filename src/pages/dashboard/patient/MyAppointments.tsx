import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Clock, Video, MapPin, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const appointments = [
  { id: 1, doctor: 'Dr. Sarah Smith', specialty: 'Cardiologist', date: '2024-12-05', time: '10:00 AM', type: 'Video', status: 'upcoming', location: 'Online' },
  { id: 2, doctor: 'Dr. Michael Chen', specialty: 'General Physician', date: '2024-12-08', time: '2:30 PM', type: 'In-Person', status: 'upcoming', location: 'City Health Clinic' },
  { id: 3, doctor: 'Dr. Emily Wilson', specialty: 'Dermatologist', date: '2024-11-28', time: '11:00 AM', type: 'Video', status: 'completed', location: 'Online' },
  { id: 4, doctor: 'Dr. James Brown', specialty: 'Orthopedist', date: '2024-11-20', time: '3:00 PM', type: 'In-Person', status: 'completed', location: 'Sports Medicine Clinic' },
  { id: 5, doctor: 'Dr. Lisa Anderson', specialty: 'Neurologist', date: '2024-11-15', time: '9:00 AM', type: 'In-Person', status: 'cancelled', location: 'Brain & Spine Institute' },
];

export default function MyAppointments() {
  const [cancelDialog, setCancelDialog] = useState<number | null>(null);
  const { toast } = useToast();

  const handleCancel = (id: number) => {
    toast({
      title: 'Appointment Cancelled',
      description: 'Your appointment has been cancelled successfully.',
    });
    setCancelDialog(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge>Upcoming</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const AppointmentCard = ({ appointment }: { appointment: typeof appointments[0] }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Avatar className="h-12 w-12 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary">
              {appointment.doctor.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="font-semibold">{appointment.doctor}</h3>
                <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
              </div>
              {getStatusBadge(appointment.status)}
            </div>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(appointment.date).toLocaleDateString('en-US', { 
                  weekday: 'short', month: 'short', day: 'numeric' 
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {appointment.time}
              </span>
              <span className="flex items-center gap-1">
                {appointment.type === 'Video' ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                {appointment.location}
              </span>
            </div>
            {appointment.status === 'upcoming' && (
              <div className="mt-4 flex gap-2">
                {appointment.type === 'Video' && (
                  <Button size="sm">
                    <Video className="mr-2 h-4 w-4" />
                    Join Call
                  </Button>
                )}
                <Button size="sm" variant="outline">Reschedule</Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-destructive hover:text-destructive"
                  onClick={() => setCancelDialog(appointment.id)}
                >
                  Cancel
                </Button>
              </div>
            )}
            {appointment.status === 'completed' && (
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline">View Summary</Button>
                <Button size="sm" variant="outline">Book Again</Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const upcomingAppointments = appointments.filter(a => a.status === 'upcoming');
  const pastAppointments = appointments.filter(a => a.status !== 'upcoming');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">My Appointments</h1>
        <p className="text-muted-foreground">Manage your scheduled and past appointments</p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingAppointments.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({pastAppointments.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4 mt-4">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((apt) => (
              <AppointmentCard key={apt.id} appointment={apt} />
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No upcoming appointments</p>
                <Button className="mt-4" asChild>
                  <a href="/dashboard/patient/book">Book an Appointment</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="past" className="space-y-4 mt-4">
          {pastAppointments.map((apt) => (
            <AppointmentCard key={apt.id} appointment={apt} />
          ))}
        </TabsContent>
      </Tabs>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialog !== null} onOpenChange={() => setCancelDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialog(null)}>Keep Appointment</Button>
            <Button variant="destructive" onClick={() => handleCancel(cancelDialog!)}>
              <X className="mr-2 h-4 w-4" />
              Cancel Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
