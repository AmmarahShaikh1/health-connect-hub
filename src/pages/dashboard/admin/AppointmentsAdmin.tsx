import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Search, Download, Filter } from 'lucide-react';

const appointments = [
  { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Smith', date: '2024-12-05', time: '10:00 AM', type: 'Video', status: 'Scheduled' },
  { id: 2, patient: 'Jane Smith', doctor: 'Dr. Michael Chen', date: '2024-12-05', time: '11:30 AM', type: 'In-Person', status: 'Completed' },
  { id: 3, patient: 'Robert Johnson', doctor: 'Dr. Sarah Smith', date: '2024-12-05', time: '2:00 PM', type: 'Video', status: 'In Progress' },
  { id: 4, patient: 'Emily Davis', doctor: 'Dr. Emily Wilson', date: '2024-12-04', time: '9:00 AM', type: 'In-Person', status: 'Completed' },
  { id: 5, patient: 'Michael Wilson', doctor: 'Dr. James Brown', date: '2024-12-04', time: '3:30 PM', type: 'In-Person', status: 'Cancelled' },
  { id: 6, patient: 'Sarah Johnson', doctor: 'Dr. Lisa Anderson', date: '2024-12-06', time: '10:30 AM', type: 'Video', status: 'Scheduled' },
];

export default function AppointmentsAdmin() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patient.toLowerCase().includes(search.toLowerCase()) ||
                         apt.doctor.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || apt.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Scheduled': return <Badge>Scheduled</Badge>;
      case 'In Progress': return <Badge variant="secondary" className="bg-warning/10 text-warning">In Progress</Badge>;
      case 'Completed': return <Badge variant="secondary">Completed</Badge>;
      case 'Cancelled': return <Badge variant="destructive">Cancelled</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Appointments Management</h1>
          <p className="text-muted-foreground">View and manage all system appointments</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { label: 'Today', value: '342', color: 'text-primary' },
          { label: 'Scheduled', value: '1,240', color: 'text-primary' },
          { label: 'Completed', value: '8,520', color: 'text-success' },
          { label: 'Cancelled', value: '245', color: 'text-destructive' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by patient or doctor..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell className="font-medium">{apt.patient}</TableCell>
                  <TableCell>{apt.doctor}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(apt.date).toLocaleDateString()} at {apt.time}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{apt.type}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(apt.status)}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
