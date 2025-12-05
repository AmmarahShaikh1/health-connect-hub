import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Video, Mic, MicOff, VideoOff, Phone, MessageSquare, Monitor, Settings, Loader2 } from 'lucide-react';
import { useWebRTC, formatCallDuration } from '@/hooks/useWebRTC';

interface VideoCallProps {
  doctorName: string;
  doctorSpecialty: string;
  onEndCall: () => void;
}

export default function VideoCall({ doctorName, doctorSpecialty, onEndCall }: VideoCallProps) {
  const {
    localStream,
    remoteStream,
    isConnecting,
    isConnected,
    error,
    videoEnabled,
    audioEnabled,
    callDuration,
    startLocalStream,
    toggleVideo,
    toggleAudio,
    endCall,
  } = useWebRTC();

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Start the call when component mounts
  useEffect(() => {
    startLocalStream();
  }, [startLocalStream]);

  // Set local video stream
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // Set remote video stream (mock for demo)
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const handleEndCall = () => {
    endCall();
    onEndCall();
  };

  const doctorInitials = doctorName.split(' ').map(n => n[0]).join('');

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Video Area */}
      <div className="flex-1 relative bg-muted overflow-hidden">
        {/* Remote Video (Main) - Doctor's video */}
        <div className="absolute inset-0">
          {remoteStream ? (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                {isConnecting ? (
                  <>
                    <Loader2 className="h-16 w-16 mx-auto mb-4 text-primary animate-spin" />
                    <p className="text-lg font-medium">Connecting to {doctorName}...</p>
                    <p className="text-sm text-muted-foreground">Please wait while we establish the connection</p>
                  </>
                ) : error ? (
                  <>
                    <VideoOff className="h-16 w-16 mx-auto mb-4 text-destructive" />
                    <p className="text-lg font-medium text-destructive">Connection Error</p>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">{error}</p>
                    <Button className="mt-4" onClick={startLocalStream}>Retry Connection</Button>
                  </>
                ) : (
                  <>
                    <Avatar className="h-32 w-32 mx-auto mb-4">
                      <AvatarFallback className="bg-primary/10 text-primary text-4xl">
                        {doctorInitials}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-lg font-medium">{doctorName}</p>
                    <p className="text-sm text-muted-foreground">{doctorSpecialty}</p>
                    <Badge className="mt-2">Waiting for doctor...</Badge>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Local Video (Picture-in-Picture) - Your video */}
        <div className="absolute bottom-4 right-4 w-48 h-36 bg-card rounded-lg border shadow-lg overflow-hidden">
          {localStream && videoEnabled ? (
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover mirror"
              style={{ transform: 'scaleX(-1)' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <div className="text-center text-muted-foreground">
                <VideoOff className="h-8 w-8 mx-auto mb-2" />
                <p className="text-xs">Camera Off</p>
              </div>
            </div>
          )}
          {!audioEnabled && (
            <div className="absolute bottom-2 left-2">
              <Badge variant="destructive" className="text-xs">
                <MicOff className="h-3 w-3 mr-1" />
                Muted
              </Badge>
            </div>
          )}
        </div>

        {/* Call Timer & Status */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {formatCallDuration(callDuration)}
          </Badge>
          {isConnected && (
            <Badge variant="default" className="bg-success">
              <span className="w-2 h-2 bg-success-foreground rounded-full mr-2 animate-pulse" />
              Connected
            </Badge>
          )}
        </div>

        {/* Doctor Info Overlay */}
        <div className="absolute top-4 right-4">
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-3 border">
            <p className="font-medium text-sm">{doctorName}</p>
            <p className="text-xs text-muted-foreground">{doctorSpecialty}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-card border-t p-4">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant={audioEnabled ? 'outline' : 'destructive'}
            size="icon"
            className="h-14 w-14 rounded-full"
            onClick={toggleAudio}
            title={audioEnabled ? 'Mute microphone' : 'Unmute microphone'}
          >
            {audioEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
          </Button>
          
          <Button
            variant={videoEnabled ? 'outline' : 'destructive'}
            size="icon"
            className="h-14 w-14 rounded-full"
            onClick={toggleVideo}
            title={videoEnabled ? 'Turn off camera' : 'Turn on camera'}
          >
            {videoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-full"
            title="Share screen"
          >
            <Monitor className="h-6 w-6" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-full"
            title="Open chat"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-full"
            title="Settings"
          >
            <Settings className="h-6 w-6" />
          </Button>
          
          <Button
            variant="destructive"
            size="icon"
            className="h-14 w-14 rounded-full"
            onClick={handleEndCall}
            title="End call"
          >
            <Phone className="h-6 w-6 rotate-[135deg]" />
          </Button>
        </div>
      </div>
    </div>
  );
}
