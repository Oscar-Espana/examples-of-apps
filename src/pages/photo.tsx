import { useState, useRef } from "react";

const CameraComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [photo, setPhoto] = useState<string>("");

  const handleStartClick = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const handleStopClick = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const handleTakePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current?.videoWidth || 0;
    canvas.height = videoRef.current?.videoHeight || 0;

    const ctx = canvas.getContext("2d");
    if (ctx && videoRef.current) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setPhoto(dataUrl);
    }
  };

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="flex justify-center gap-3 mb-6">
        <button
          className="bg-teal-500 py-3 px-5 rounded-lg"
          onClick={handleStartClick}
        >
          Start Camera
        </button>
        <button
          className="bg-teal-500 py-3 px-5 rounded-lg"
          onClick={handleStopClick}
        >
          Stop Camera
        </button>
        <button
          className="bg-teal-500 py-3 px-5 rounded-lg"
          onClick={handleTakePhoto}
        >
          Take Photo
        </button>
      </div>
      <div className="flex">
        <video ref={videoRef} autoPlay />
        {photo && <img src={photo} alt="Captured" />}
      </div>
    </section>
  );
};

export default CameraComponent;
