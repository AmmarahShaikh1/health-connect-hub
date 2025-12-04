import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, XCircle, Clock, FileText, Mail, Phone, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const pendingDoctors = [
  { id: 1, name: 'Dr. Amanda Lee', email: 'amanda@email.com', phone: '+1 555-2001', specialty: 'Pediatrician', experience: '8 years', education: 'Harvard Medical School', appliedDate: '2024-12-01', documents: 5 },
  { id: 2, name: 'Dr. Kevin Park', email: 'kevin@email.com', phone: '+1 555-2002', specialty: 'Orthopedist', experience: '12 years', education: 'Stanford University', appliedDate: '2024-11-30', documents: 4 },
  { id: 3, name: 'Dr. Maria Garcia', email: 'maria@email.com', phone: '+1 555-2003', specialty: 'Psychiatrist', experience: '6 years', education: 'Johns Hopkins', appliedDate: '2024-11-28', documents: 5 },
];

const recentlyProcessed = [
  { id: 4, name: 'Dr. David Kim', specialty: 'ENT Specialist', status: 'Approved', processedDate: '2024-11-27' },
  { id: 5, name: 'Dr. Rachel Green', specialty: 'Dermatologist', status: 'Approved', processedDate: '2024-11-25' },
  { id: 6, name: 'Dr. Tom Wilson', specialty: 'Surgeon', status: 'Rejected', processedDate: '2024-11-24' },
];

export default function Approvals() {
  const [selectedDoctor, setSelectedDoctor] = useState<typeof pendingDoctors[0] | null>(null);
  const [rejectDialog, setRejectDialog] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const { toast } = useToast();

  const handleApprove = (id: number) => {
    toast({ title: 'Doctor Approved', description: 'The doctor has been approved and notified via email.' });
    setSelectedDoctor(null);
  };

  const handleReject = () => {
    toast({ title: 'Application Rejected', description: 'The applicant has been notified via email.' });
    setRejectDialog(null);
    setRejectReason('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Doctor Approvals</h1>
        <p className="text-muted-foreground">Review and approve doctor registrations</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-warning/10">
              <Clock className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingDoctors.length}</p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-success/10">
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">24</p>
              <p className="text-sm text-muted-foreground">Approved This Month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-destructive/10">
              <XCircle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Rejected This Month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingDoctors.length})</TabsTrigger>
          <TabsTrigger value="processed">Recently Processed</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6 space-y-4">
          {pendingDoctors.map((doctor) => (
            <Card key={doctor.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <Avatar className="h-16 w-16 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      {doctor.name.split(' ').slice(1).map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{doctor.name}</h3>
                        <p className="text-muted-foreground">{doctor.specialty}</p>
                      </div>
                      <Badge variant="secondary">
                        <Clock className="mr-1 h-3 w-3" />
                        Applied {new Date(doctor.appliedDate).toLocaleDateString()}
                      </Badge>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />{doctor.email}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />{doctor.phone}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="h-4 w-4" />{doctor.education}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />{doctor.experience} experience
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={() => handleApprove(doctor.id)}>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                      <Button variant="outline" onClick={() => setSelectedDoctor(doctor)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Review Documents ({doctor.documents})
                      </Button>
                      <Button variant="ghost" className="text-destructive" onClick={() => setRejectDialog(doctor.id)}>
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="processed" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentlyProcessed.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-muted">
                          {item.name.split(' ').slice(1).map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.specialty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={item.status === 'Approved' ? 'default' : 'destructive'}>
                        {item.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(item.processedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Reject Dialog */}
      <Dialog open={rejectDialog !== null} onOpenChange={() => setRejectDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>Please provide a reason for rejection. This will be sent to the applicant.</DialogDescription>
          </DialogHeader>
          <Textarea 
            placeholder="Enter rejection reason..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialog(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleReject}>Reject Application</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
