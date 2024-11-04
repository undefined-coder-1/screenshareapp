"use client";

import { useRef, useState } from 'react';


const ScreenShare = () => {
  const videoRef = useRef(null);
  const [isSharing, setIsSharing] = useState(false);

  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always' },
        audio: false,
      });

      videoRef.current.srcObject = stream;
      setIsSharing(true);

      // Stop screen share when the user stops sharing
      stream.getVideoTracks()[0].onended = () => {
        stopScreenShare();
      };
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };

  const stopScreenShare = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream?.getTracks() || [];
    tracks.forEach((track) => track.stop());

    videoRef.current.srcObject = null;
    setIsSharing(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: '80%',
          height: 'auto',
          border: '2px solid black',
        }}
      />
      <div style={{ marginTop: '10px' }}>
        {!isSharing ? (
          <button onClick={startScreenShare}>Start Screen Sharing</button>
        ) : (
          <button onClick={stopScreenShare}>Stop Screen Sharing</button>
        )}
      </div>
    </div>
  );
};

export default ScreenShare;
