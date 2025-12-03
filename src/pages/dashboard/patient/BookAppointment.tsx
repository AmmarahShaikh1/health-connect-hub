import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Search, Star, Video, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const doctors = [
  { id: 1, name: 'Dr. Sarah Smith', specialty: 'Cardiologist', rating: 4.9, experience: '15 years', fee: 150, available: ['9:00 AM', '10:00 AM', '2:00 PM'], location: 'Downtown Medical Center', video: true },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'General Physician', rating: 4.8, experience: '12 years', fee: 80, available: ['11:00 AM', '3:00 PM', '4:00 PM'], location: 'City Health Clinic', video: true },
  { id: 3, name: 'Dr. Emily Wilson', specialty: 'Dermatologist', rating: 4.9, experience: '10 years', fee: 120, available: ['9:30 AM', '1:00 PM'], location: 'Skin Care Center', video: true },
  { id: 4, name: 'Dr. James Brown', specialty: 'Orthopedist', rating: 4.7, experience: '18 years', fee: 140, available: ['10:00 AM', '2:30 PM', '5:00 PM'], location: 'Sports Medicine Clinic', video: false },
  { id: 5, name: 'Dr. Lisa Anderson', specialty: 'Neurologist', rating: 4.8, experience: '14 years', fee: 160, available: ['8:30 AM', '12:00 PM'], location: 'Brain & Spine Institute', video: true },
];

const specialties = ['All', 'Cardiologist', 'General Physician', 'Dermatologist', 'Orthopedist', 'Neurologist'];

export default function BookAppointment() {
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState<'video' | 'in-person'>('in-person');
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) || 
                         doc.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty = specialty === 'All' || doc.specialty === specialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleBooking = () => {
    toast({
      title: 'Appointment Booked!',
      description: `Your appointment with ${selectedDoctor?.name} is confirmed for ${selectedDate?.toLocaleDateString()} at ${selectedTime}.`,
    });
    setShowDialog(false);
    setSelectedDoctor(null);
    setSelectedDate(undefined);
    setSelectedTime('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Book Appointment</h1>
        <p className="text-muted-foreground">Find and schedule appointments with top doctors</p>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search doctors or specialties..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Doctor List */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {doctor.name.split(' ').slice(1).map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <span>{doctor.experience}</span>
                    <span>•</span>
                    <span>${doctor.fee}/visit</span>
                    {doctor.video && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Video className="h-3 w-3" /> Video
                        </span>
                      </>
                    )}
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {doctor.location}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setAppointmentType('in-person');
                        setShowDialog(true);
                      }}
                    >
                      Book Visit
                    </Button>
                    {doctor.video && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedDoctor(doctor);
                          setAppointmentType('video');
                          setShowDialog(true);
                        }}
                      >
                        <Video className="mr-2 h-4 w-4" />
                        Video Call
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Booking Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>
              Schedule your {appointmentType === 'video' ? 'video consultation' : 'in-person visit'} with {selectedDoctor?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <p className="text-sm font-medium mb-2">Select Date</p>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date.getDay() === 0}
                className="rounded-md border"
              />
            </div>
            {selectedDate && (
              <div>
                <p className="text-sm font-medium mb-2">Available Times</p>
                <div className="flex flex-wrap gap-2">
                  {selectedDoctor?.available.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                    >
                      <Clock className="mr-2 h-3 w-3" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={handleBooking} disabled={!selectedDate || !selectedTime}>
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
