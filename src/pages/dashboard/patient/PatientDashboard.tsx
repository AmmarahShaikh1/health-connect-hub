import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Clock, Video, FileText, ArrowRight, Stethoscope } from 'lucide-react';

const upcomingAppointments = [
  {
    id: 1,
    doctor: 'Dr. Sarah Smith',
    specialty: 'Cardiologist',
    date: 'Dec 5, 2024',
    time: '10:00 AM',
    type: 'Video',
  },
  {
    id: 2,
    doctor: 'Dr. Michael Chen',
    specialty: 'General Physician',
    date: 'Dec 8, 2024',
    time: '2:30 PM',
    type: 'In-Person',
  },
];

const suggestedDoctors = [
  { id: 1, name: 'Dr. Emily Wilson', specialty: 'Dermatologist', rating: 4.9, available: true },
  { id: 2, name: 'Dr. James Brown', specialty: 'Orthopedist', rating: 4.8, available: true },
  { id: 3, name: 'Dr. Lisa Anderson', specialty: 'Neurologist', rating: 4.7, available: false },
];

export default function PatientDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's an overview of your health journey</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/patient/book">
            <Calendar className="mr-2 h-4 w-4" />
            Book Appointment
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Upcoming Appointments', value: '2', icon: Calendar, color: 'text-primary' },
          { label: 'Active Prescriptions', value: '3', icon: FileText, color: 'text-success' },
          { label: 'Video Consultations', value: '5', icon: Video, color: 'text-warning' },
          { label: 'Medical Records', value: '12', icon: FileText, color: 'text-primary' },
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled visits</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/patient/appointments">
                View all <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className="flex items-center gap-4 p-4 rounded-lg border">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {apt.doctor.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{apt.doctor}</p>
                  <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{apt.date}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {apt.time}
                  </div>
                </div>
                <Badge variant={apt.type === 'Video' ? 'default' : 'secondary'}>
                  {apt.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Suggested Doctors */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recommended Doctors</CardTitle>
              <CardDescription>Based on your health profile</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/patient/book">
                Browse all <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestedDoctors.map((doctor) => (
              <div key={doctor.id} className="flex items-center gap-4 p-4 rounded-lg border">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    <Stethoscope className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{doctor.name}</p>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">★ {doctor.rating}</p>
                  <Badge variant={doctor.available ? 'default' : 'secondary'}>
                    {doctor.available ? 'Available' : 'Busy'}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Book Appointment', icon: Calendar, path: '/dashboard/patient/book' },
              { label: 'Start Video Call', icon: Video, path: '/dashboard/patient/telemedicine' },
              { label: 'View Records', icon: FileText, path: '/dashboard/patient/records' },
              { label: 'Manage Payments', icon: Calendar, path: '/dashboard/patient/payments' },
            ].map((action) => (
              <Button key={action.label} variant="outline" className="h-auto py-4" asChild>
                <Link to={action.path} className="flex flex-col items-center gap-2">
                  <action.icon className="h-6 w-6 text-primary" />
                  <span>{action.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
