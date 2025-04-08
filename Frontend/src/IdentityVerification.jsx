import React, { useRef, useState, useEffect } from 'react';

export default function IdentityVerification() {
  // Refs & States
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(5);
  const [intervalId, setIntervalId] = useState(null);
  const [apiMessage, setApiMessage] = useState('');
  const [faceDetected, setFaceDetected] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [instructionVisible, setInstructionVisible] = useState(true);

  // Cleanup any interval on unmount
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const startRecording = async () => {
    try {
      setError(null);
      setApiMessage('');
      setVideoURL(null);
      setFaceDetected(false);
      setInstructionVisible(false);

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      let chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        clearInterval(intervalId);
        setTimer(5);
        const blob = new Blob(chunks, { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        setVideoURL(url);

        await processVideo(blob);
      };

      mediaRecorder.start();
      setRecording(true);

      // Simulate real-time face detection after 2 seconds
      setTimeout(() => {
        setFaceDetected(true);
      }, 2000);

      // Start countdown timer
      const id = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(id);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(id);

      // Stop recording after 5 seconds
      setTimeout(() => {
        mediaRecorder.stop();
        stream.getTracks().forEach((track) => track.stop());
        setRecording(false);
      }, 5000);
    } catch (err) {
      console.error(err);
      setError("Could not access the camera. Please check your permissions.");
    }
  };

  const processVideo = async (blob) => {
    setProcessing(true);
    setProcessingProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setProcessingProgress(progress);
    }, 150);

    // Simulate processing delay
    setTimeout(() => {
      setProcessing(false);
      setApiMessage("Identity verified successfully!");
    }, 3000);
  };

  const resetRecording = () => {
    setVideoURL(null);
    setError(null);
    setTimer(5);
    setApiMessage('');
    setFaceDetected(false);
    setInstructionVisible(true);
  };

  return (
    <>
      {/* Hardcoded keyframe animations */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
      `}</style>
      <div className="flex flex-col items-center min-h-screen p-4 font-sans bg-gray-100 text-gray-800">
        <div
          className="w-4/5 p-8 bg-white shadow-xl rounded-2xl text-center"
          style={{ animation: 'fadeIn 0.5s ease-in-out forwards' }}
        >
          <h2 className="text-3xl font-bold mb-6">Identity Verification</h2>
          <p className="text-lg mb-6">
            Please Look  at the Frame   for identity verification.
          </p>
          {/* Video container (80% viewport width & height) */}
          <div className="relative w-4/5 mx-auto h-[80vh] border-2 border-blue-500 rounded-lg overflow-hidden bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover filter brightness-110"
              aria-label="Camera preview"
            />
            {videoURL && (
              <video
                src={videoURL}
                className="absolute inset-0 w-full h-full object-cover"
                aria-label="Recorded video"
                style={{ animation: 'fadeIn 0.5s ease-in-out forwards' }}
              />
            )}
            {recording && (
              <div
                className="absolute top-2 right-2 bg-gray-800 bg-opacity-75 text-white px-3 py-1 rounded-full text-lg"
                style={{ animation: 'pulse 1s infinite' }}
              >
                {timer}s
              </div>
            )}
            {/* Face guidance overlay */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <div className="w-1/3 h-1/3 border-4 border-dashed border-white rounded-full"></div>
            </div>
            {/* Instruction overlay */}
            {instructionVisible && !recording && !videoURL && (
              <div
                className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50"
                style={{ animation: 'fadeIn 0.5s ease-in-out forwards' }}
              >
                <p className="text-2xl font-semibold">
                  Align your face within the frame
                </p>
              </div>
            )}
          </div>
          {/* Face detected message */}
          {faceDetected && recording && (
            <p className="mt-4 text-xl font-medium text-green-500">
              Face Detected!
            </p>
          )}
          {error && <p className="text-red-500 mt-6 text-lg">{error}</p>}
          {apiMessage && <p className="text-green-500 mt-6 text-lg">{apiMessage}</p>}
          {/* Processing progress bar */}
          {processing && (
            <div className="w-4/5 mx-auto mt-4">
              <div className="h-4 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${processingProgress}%`, transition: 'width 0.15s ease-out' }}
                ></div>
              </div>
              <p className="mt-2 text-lg">Processing: {processingProgress}%</p>
            </div>
          )}
          <div className="mt-8 flex flex-col gap-4 items-center">
            {!recording && !processing && !videoURL && (
              <button
                onClick={startRecording}
                className="bg-[#071952] text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-transform transform hover:scale-105 text-lg"
                style={{borderRadius:'20px'}}
              >
                Start Checking
              </button>
            )}
            {recording && (
              <p className="text-yellow-500 font-semibold text-lg">
                Recording...
              </p>
            )}
            {processing && (
              <div className="flex justify-center items-center mt-4">
                <svg
                  className="animate-spin h-10 w-10 text-teal-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <span className="ml-3 text-xl">Processing...</span>
              </div>
            )}
            {videoURL && !recording && !processing && (
              <button
                onClick={resetRecording}
                className="bg-gray-300 text-gray-800 px-8 py-3 rounded-full hover:bg-gray-400 transition-transform transform hover:scale-105 text-lg"
                style={{borderRadius:'20px'}}
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
