import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, Eye, Pill, FlaskConical, ImageIcon, Calendar } from 'lucide-react';

const prescriptions = [
  { id: 1, name: 'Lisinopril 10mg', doctor: 'Dr. Sarah Smith', date: '2024-11-28', refills: 2, status: 'Active' },
  { id: 2, name: 'Metformin 500mg', doctor: 'Dr. Michael Chen', date: '2024-11-15', refills: 5, status: 'Active' },
  { id: 3, name: 'Omeprazole 20mg', doctor: 'Dr. Michael Chen', date: '2024-10-01', refills: 0, status: 'Expired' },
];

const labResults = [
  { id: 1, name: 'Complete Blood Count (CBC)', date: '2024-11-25', status: 'Normal', doctor: 'Dr. Sarah Smith' },
  { id: 2, name: 'Lipid Panel', date: '2024-11-25', status: 'Review', doctor: 'Dr. Sarah Smith' },
  { id: 3, name: 'Hemoglobin A1C', date: '2024-10-15', status: 'Normal', doctor: 'Dr. Michael Chen' },
  { id: 4, name: 'Thyroid Panel', date: '2024-09-20', status: 'Normal', doctor: 'Dr. Lisa Anderson' },
];

const imaging = [
  { id: 1, name: 'Chest X-Ray', date: '2024-11-20', facility: 'Downtown Imaging Center' },
  { id: 2, name: 'Echocardiogram', date: '2024-10-10', facility: 'Heart Care Clinic' },
  { id: 3, name: 'MRI - Brain', date: '2024-08-15', facility: 'Advanced Diagnostics' },
];

const visits = [
  { id: 1, doctor: 'Dr. Sarah Smith', specialty: 'Cardiologist', date: '2024-11-28', reason: 'Follow-up', notes: true },
  { id: 2, doctor: 'Dr. Michael Chen', specialty: 'General Physician', date: '2024-11-15', reason: 'Annual checkup', notes: true },
  { id: 3, doctor: 'Dr. Emily Wilson', specialty: 'Dermatologist', date: '2024-10-20', reason: 'Skin consultation', notes: true },
];

export default function MedicalRecords() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Medical Records</h1>
          <p className="text-muted-foreground">Access your prescriptions, lab results, and medical history</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export All Records
        </Button>
      </div>

      <Tabs defaultValue="prescriptions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="labs">Lab Results</TabsTrigger>
          <TabsTrigger value="imaging">Imaging</TabsTrigger>
          <TabsTrigger value="visits">Visit Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="prescriptions" className="mt-6">
          <div className="space-y-4">
            {prescriptions.map((rx) => (
              <Card key={rx.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Pill className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{rx.name}</h3>
                        <Badge variant={rx.status === 'Active' ? 'default' : 'secondary'}>
                          {rx.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Prescribed by {rx.doctor} on {new Date(rx.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground">{rx.refills} refills remaining</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      {rx.status === 'Active' && (
                        <Button size="sm">Request Refill</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="labs" className="mt-6">
          <div className="space-y-4">
            {labResults.map((lab) => (
              <Card key={lab.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FlaskConical className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{lab.name}</h3>
                        <Badge variant={lab.status === 'Normal' ? 'secondary' : 'default'}>
                          {lab.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(lab.date).toLocaleDateString()} • Ordered by {lab.doctor}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View Results
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="imaging" className="mt-6">
          <div className="space-y-4">
            {imaging.map((img) => (
              <Card key={img.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{img.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(img.date).toLocaleDateString()} • {img.facility}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View Images
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="visits" className="mt-6">
          <div className="space-y-4">
            {visits.map((visit) => (
              <Card key={visit.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{visit.doctor}</h3>
                      <p className="text-sm text-muted-foreground">{visit.specialty}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(visit.date).toLocaleDateString()} • {visit.reason}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        View Notes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
