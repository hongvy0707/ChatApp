import React, { useState, useRef } from 'react';

const Camera = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  const handleStartCapture = async () => {
    const constraints = { video: true };
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      setStream(stream);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStopCapture = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks()[0].stop();
    }
  };
  

  return (
    <div>
      <button onClick={handleStartCapture}>Start Capture</button>
      <button onClick={handleStopCapture}>Stop Capture</button>
      {stream && <video ref={videoRef} autoPlay />}
    </div>
  );
};

export default Camera;
