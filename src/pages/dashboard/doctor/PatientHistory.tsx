import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Calendar, FileText, Pill, Activity } from 'lucide-react';

const patients = [
  { id: 1, name: 'John Doe', age: 45, lastVisit: '2024-11-28', totalVisits: 12, conditions: ['Hypertension', 'Type 2 Diabetes'] },
  { id: 2, name: 'Jane Smith', age: 32, lastVisit: '2024-11-25', totalVisits: 8, conditions: ['Asthma'] },
  { id: 3, name: 'Robert Johnson', age: 58, lastVisit: '2024-11-20', totalVisits: 15, conditions: ['Heart Disease', 'High Cholesterol'] },
  { id: 4, name: 'Emily Davis', age: 28, lastVisit: '2024-11-15', totalVisits: 5, conditions: [] },
  { id: 5, name: 'Michael Wilson', age: 52, lastVisit: '2024-11-30', totalVisits: 20, conditions: ['Arthritis'] },
];

const patientDetails = {
  visits: [
    { date: '2024-11-28', reason: 'Follow-up', notes: 'Blood pressure stable, continue current medication' },
    { date: '2024-10-15', reason: 'Routine checkup', notes: 'Adjusted Lisinopril dosage' },
    { date: '2024-08-20', reason: 'Consultation', notes: 'Started new diabetes management plan' },
  ],
  prescriptions: [
    { name: 'Lisinopril 10mg', status: 'Active', date: '2024-11-28' },
    { name: 'Metformin 500mg', status: 'Active', date: '2024-11-28' },
  ],
  vitals: [
    { date: '2024-11-28', bp: '125/82', heart: '72', weight: '175 lbs' },
    { date: '2024-10-15', bp: '130/85', heart: '75', weight: '178 lbs' },
  ],
};

export default function PatientHistory() {
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<typeof patients[0] | null>(null);

  const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Patient History</h1>
        <p className="text-muted-foreground">View medical history of your patients</p>
      </div>

      <Card>
        <CardHeader>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search patients..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{patient.name}</h3>
                    <span className="text-sm text-muted-foreground">Age: {patient.age}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {patient.conditions.map((c) => (
                      <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
                    ))}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Last visit: {new Date(patient.lastVisit).toLocaleDateString()} • {patient.totalVisits} total visits
                  </div>
                </div>
                <Button variant="outline" onClick={() => setSelectedPatient(patient)}>
                  <FileText className="mr-2 h-4 w-4" />View History
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={selectedPatient !== null} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary">
                  {selectedPatient?.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p>{selectedPatient?.name}</p>
                <p className="text-sm font-normal text-muted-foreground">Age: {selectedPatient?.age}</p>
              </div>
            </DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="visits" className="mt-4">
            <TabsList className="w-full">
              <TabsTrigger value="visits" className="flex-1"><Calendar className="mr-2 h-4 w-4" />Visits</TabsTrigger>
              <TabsTrigger value="prescriptions" className="flex-1"><Pill className="mr-2 h-4 w-4" />Prescriptions</TabsTrigger>
              <TabsTrigger value="vitals" className="flex-1"><Activity className="mr-2 h-4 w-4" />Vitals</TabsTrigger>
            </TabsList>
            <TabsContent value="visits" className="mt-4 space-y-4">
              {patientDetails.visits.map((visit, i) => (
                <div key={i} className="p-4 rounded-lg border">
                  <div className="flex justify-between">
                    <p className="font-medium">{visit.reason}</p>
                    <p className="text-sm text-muted-foreground">{new Date(visit.date).toLocaleDateString()}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{visit.notes}</p>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="prescriptions" className="mt-4 space-y-4">
              {patientDetails.prescriptions.map((rx, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">{rx.name}</p>
                    <p className="text-sm text-muted-foreground">Prescribed: {new Date(rx.date).toLocaleDateString()}</p>
                  </div>
                  <Badge variant={rx.status === 'Active' ? 'default' : 'secondary'}>{rx.status}</Badge>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="vitals" className="mt-4 space-y-4">
              {patientDetails.vitals.map((v, i) => (
                <div key={i} className="p-4 rounded-lg border">
                  <p className="text-sm text-muted-foreground mb-2">{new Date(v.date).toLocaleDateString()}</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div><span className="text-muted-foreground">BP:</span> {v.bp}</div>
                    <div><span className="text-muted-foreground">Heart Rate:</span> {v.heart} bpm</div>
                    <div><span className="text-muted-foreground">Weight:</span> {v.weight}</div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
