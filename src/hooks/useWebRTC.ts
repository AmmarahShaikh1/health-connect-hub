import { useState, useRef, useCallback, useEffect } from 'react';

interface UseWebRTCOptions {
  onRemoteStream?: (stream: MediaStream) => void;
  onConnectionStateChange?: (state: RTCPeerConnectionState) => void;
}

interface UseWebRTCReturn {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  screenStream: MediaStream | null;
  isConnecting: boolean;
  isConnected: boolean;
  error: string | null;
  videoEnabled: boolean;
  audioEnabled: boolean;
  screenSharing: boolean;
  callDuration: number;
  startLocalStream: () => Promise<void>;
  stopLocalStream: () => void;
  toggleVideo: () => void;
  toggleAudio: () => void;
  toggleScreenShare: () => Promise<void>;
  endCall: () => void;
}

export function useWebRTC(options: UseWebRTCOptions = {}): UseWebRTCReturn {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start call duration timer
  useEffect(() => {
    if (isConnected) {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isConnected]);

  const startLocalStream = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      
      setLocalStream(stream);
      setIsConnecting(false);
      setIsConnected(true);
      
      // For demo purposes, create a mock "remote" stream after a delay
      // In production, this would come from the peer connection
      setTimeout(() => {
        setRemoteStream(stream); // Using local stream as mock remote for demo
      }, 2000);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to access camera/microphone';
      setError(errorMessage);
      setIsConnecting(false);
      console.error('Error accessing media devices:', err);
    }
  }, []);

  const stopLocalStream = useCallback(() => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
      setRemoteStream(null);
    }
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
      setScreenStream(null);
      setScreenSharing(false);
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    setIsConnected(false);
    setCallDuration(0);
  }, [localStream, remoteStream, screenStream]);

  const toggleVideo = useCallback(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setVideoEnabled(videoTrack.enabled);
      }
    }
  }, [localStream]);

  const toggleAudio = useCallback(() => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setAudioEnabled(audioTrack.enabled);
      }
    }
  }, [localStream]);

  const toggleScreenShare = useCallback(async () => {
    if (screenSharing && screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
      setScreenStream(null);
      setScreenSharing(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        });
        
        stream.getVideoTracks()[0].onended = () => {
          setScreenStream(null);
          setScreenSharing(false);
        };
        
        setScreenStream(stream);
        setScreenSharing(true);
      } catch (err) {
        console.error('Error sharing screen:', err);
      }
    }
  }, [screenSharing, screenStream]);

  const endCall = useCallback(() => {
    stopLocalStream();
  }, [stopLocalStream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopLocalStream();
    };
  }, []);

  return {
    localStream,
    remoteStream,
    screenStream,
    isConnecting,
    isConnected,
    error,
    videoEnabled,
    audioEnabled,
    screenSharing,
    callDuration,
    startLocalStream,
    stopLocalStream,
    toggleVideo,
    toggleAudio,
    toggleScreenShare,
    endCall,
  };
}

export function formatCallDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
