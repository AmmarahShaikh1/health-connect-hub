import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Video, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import VideoCall from '@/components/video/VideoCall';

const upcomingCalls = [
  { id: 1, doctor: 'Dr. Sarah Smith', specialty: 'Cardiologist', date: 'Dec 5, 2024', time: '10:00 AM', status: 'ready' },
  { id: 2, doctor: 'Dr. Emily Wilson', specialty: 'Dermatologist', date: 'Dec 10, 2024', time: '2:00 PM', status: 'scheduled' },
];

export default function Telemedicine() {
  const [inCall, setInCall] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<typeof upcomingCalls[0] | null>(null);
  const [testingEquipment, setTestingEquipment] = useState(false);
  const [testResults, setTestResults] = useState<{ video: boolean; audio: boolean } | null>(null);
  const [showTestDialog, setShowTestDialog] = useState(false);
  const { toast } = useToast();

  const handleTestEquipment = async () => {
    setTestingEquipment(true);
    setShowTestDialog(true);
    setTestResults(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      
      // Check if we got video and audio tracks
      const hasVideo = stream.getVideoTracks().length > 0;
      const hasAudio = stream.getAudioTracks().length > 0;
      
      setTestResults({ video: hasVideo, audio: hasAudio });
      
      // Stop the test stream
      stream.getTracks().forEach(track => track.stop());
      
      if (hasVideo && hasAudio) {
        toast({
          title: 'Equipment Ready',
          description: 'Your camera and microphone are working properly.',
        });
      }
    } catch (err) {
      setTestResults({ video: false, audio: false });
      toast({
        title: 'Equipment Error',
        description: 'Could not access camera or microphone. Please check permissions.',
        variant: 'destructive',
      });
    } finally {
      setTestingEquipment(false);
    }
  };

  const handleJoinCall = (call: typeof upcomingCalls[0]) => {
    setSelectedDoctor(call);
    setInCall(true);
  };

  const handleEndCall = () => {
    setInCall(false);
    setSelectedDoctor(null);
    toast({
      title: 'Call Ended',
      description: 'Your video consultation has ended.',
    });
  };

  if (inCall && selectedDoctor) {
    return (
      <VideoCall
        doctorName={selectedDoctor.doctor}
        doctorSpecialty={selectedDoctor.specialty}
        onEndCall={handleEndCall}
      />
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Telemedicine</h1>
        <p className="text-muted-foreground">Connect with doctors through video consultations</p>
      </div>

      {/* Quick Start */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Ready for your next consultation?</h2>
              <p className="text-muted-foreground">
                Ensure you have a stable internet connection and your camera/microphone are working properly.
              </p>
            </div>
            <Button size="lg" className="shrink-0" onClick={handleTestEquipment} disabled={testingEquipment}>
              {testingEquipment ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Video className="mr-2 h-5 w-5" />
              )}
              Test Equipment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Video Calls */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Video Consultations</CardTitle>
          <CardDescription>Your scheduled telemedicine appointments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingCalls.map((call) => (
            <div key={call.id} className="flex items-center gap-4 p-4 rounded-lg border">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {call.doctor.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{call.doctor}</p>
                <p className="text-sm text-muted-foreground">{call.specialty}</p>
                <p className="text-sm text-muted-foreground">{call.date} at {call.time}</p>
              </div>
              <div className="flex items-center gap-2">
                {call.status === 'ready' ? (
                  <Button onClick={() => handleJoinCall(call)}>
                    <Video className="mr-2 h-4 w-4" />
                    Join Now
                  </Button>
                ) : (
                  <Badge variant="secondary">Scheduled</Badge>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Before Your Consultation</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {[
              'Find a quiet, well-lit space for your video call',
              'Test your camera and microphone before the appointment',
              'Have a stable internet connection (WiFi or 4G minimum)',
              'Keep your medical history and current medications handy',
              'Prepare any questions you want to ask your doctor',
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm shrink-0">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Equipment Test Dialog */}
      <Dialog open={showTestDialog} onOpenChange={setShowTestDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Equipment Test</DialogTitle>
            <DialogDescription>
              Testing your camera and microphone for video calls
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-4">
            {testingEquipment ? (
              <div className="text-center">
                <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary mb-4" />
                <p>Testing your equipment...</p>
                <p className="text-sm text-muted-foreground">Please allow access to your camera and microphone</p>
              </div>
            ) : testResults ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  {testResults.video ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  )}
                  <span className="font-medium">Camera</span>
                  <Badge variant={testResults.video ? 'default' : 'destructive'} className="ml-auto">
                    {testResults.video ? 'Working' : 'Not Found'}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  {testResults.audio ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  )}
                  <span className="font-medium">Microphone</span>
                  <Badge variant={testResults.audio ? 'default' : 'destructive'} className="ml-auto">
                    {testResults.audio ? 'Working' : 'Not Found'}
                  </Badge>
                </div>
                {(!testResults.video || !testResults.audio) && (
                  <p className="text-sm text-muted-foreground mt-4">
                    Please check your browser permissions and ensure your camera/microphone are connected.
                  </p>
                )}
              </div>
            ) : null}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTestDialog(false)}>Close</Button>
            {testResults && (!testResults.video || !testResults.audio) && (
              <Button onClick={handleTestEquipment}>Test Again</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
