import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Video, Mic, MicOff, VideoOff, Phone, MessageSquare, Monitor, Settings } from 'lucide-react';

const upcomingCalls = [
  { id: 1, doctor: 'Dr. Sarah Smith', specialty: 'Cardiologist', date: 'Dec 5, 2024', time: '10:00 AM', status: 'ready' },
  { id: 2, doctor: 'Dr. Emily Wilson', specialty: 'Dermatologist', date: 'Dec 10, 2024', time: '2:00 PM', status: 'scheduled' },
];

export default function Telemedicine() {
  const [inCall, setInCall] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);

  if (inCall) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex flex-col">
        {/* Video Area */}
        <div className="flex-1 relative bg-muted">
          {/* Doctor Video (Main) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Avatar className="h-32 w-32 mx-auto mb-4">
                <AvatarFallback className="bg-primary/10 text-primary text-4xl">DS</AvatarFallback>
              </Avatar>
              <p className="text-lg font-medium">Dr. Sarah Smith</p>
              <p className="text-sm text-muted-foreground">Cardiologist</p>
              <Badge className="mt-2">Connected</Badge>
            </div>
          </div>

          {/* Self Video (Picture-in-Picture) */}
          <div className="absolute bottom-4 right-4 w-48 h-36 bg-card rounded-lg border shadow-lg flex items-center justify-center">
            {videoOn ? (
              <div className="text-center">
                <Avatar className="h-12 w-12 mx-auto">
                  <AvatarFallback className="bg-accent text-accent-foreground">You</AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <VideoOff className="h-8 w-8 mx-auto mb-2" />
                <p className="text-xs">Camera Off</p>
              </div>
            )}
          </div>

          {/* Call Timer */}
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">12:34</Badge>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-card border-t p-4">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant={micOn ? 'outline' : 'destructive'}
              size="icon"
              className="h-14 w-14 rounded-full"
              onClick={() => setMicOn(!micOn)}
            >
              {micOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
            </Button>
            <Button
              variant={videoOn ? 'outline' : 'destructive'}
              size="icon"
              className="h-14 w-14 rounded-full"
              onClick={() => setVideoOn(!videoOn)}
            >
              {videoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-14 w-14 rounded-full"
            >
              <Monitor className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-14 w-14 rounded-full"
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-14 w-14 rounded-full"
            >
              <Settings className="h-6 w-6" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="h-14 w-14 rounded-full"
              onClick={() => setInCall(false)}
            >
              <Phone className="h-6 w-6 rotate-[135deg]" />
            </Button>
          </div>
        </div>
      </div>
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
            <Button size="lg" className="shrink-0">
              <Video className="mr-2 h-5 w-5" />
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
                  <Button onClick={() => setInCall(true)}>
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
    </div>
  );
}
