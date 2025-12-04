import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, Calendar, CheckCircle2, XCircle, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const requests = [
  { id: 1, patient: 'John Doe', type: 'Appointment', reason: 'Follow-up consultation for heart condition', requestedDate: '2024-12-10', preferredTime: 'Morning', urgency: 'Normal', createdAt: '2024-12-03' },
  { id: 2, patient: 'Jane Smith', type: 'Prescription Refill', reason: 'Need refill for Lisinopril 10mg', requestedDate: null, preferredTime: null, urgency: 'Urgent', createdAt: '2024-12-04' },
  { id: 3, patient: 'Robert Johnson', type: 'Appointment', reason: 'Chest pain episodes', requestedDate: '2024-12-08', preferredTime: 'Afternoon', urgency: 'Urgent', createdAt: '2024-12-04' },
  { id: 4, patient: 'Emily Davis', type: 'Lab Review', reason: 'Review recent blood work results', requestedDate: '2024-12-12', preferredTime: 'Any', urgency: 'Normal', createdAt: '2024-12-03' },
];

export default function PatientRequests() {
  const { toast } = useToast();

  const handleAccept = (id: number) => {
    toast({ title: 'Request accepted', description: 'The patient has been notified.' });
  };

  const handleDecline = (id: number) => {
    toast({ title: 'Request declined', description: 'The patient has been notified.' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Patient Requests</h1>
        <p className="text-muted-foreground">Review and respond to patient requests</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-warning/10">
              <Clock className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{requests.length}</p>
              <p className="text-sm text-muted-foreground">Pending Requests</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-destructive/10">
              <Clock className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold">{requests.filter(r => r.urgency === 'Urgent').length}</p>
              <p className="text-sm text-muted-foreground">Urgent</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-success/10">
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Completed Today</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id} className={request.urgency === 'Urgent' ? 'border-destructive' : ''}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Avatar className="h-12 w-12 shrink-0">
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    {request.patient.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{request.patient}</h3>
                        <Badge variant={request.urgency === 'Urgent' ? 'destructive' : 'secondary'}>
                          {request.urgency}
                        </Badge>
                        <Badge variant="outline">{request.type}</Badge>
                      </div>
                      <p className="text-muted-foreground mt-1">{request.reason}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {request.requestedDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Requested: {new Date(request.requestedDate).toLocaleDateString()}
                      </span>
                    )}
                    {request.preferredTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {request.preferredTime}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      Submitted {new Date(request.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" onClick={() => handleAccept(request.id)}>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Accept
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDecline(request.id)}>
                      <XCircle className="mr-2 h-4 w-4" />
                      Decline
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
