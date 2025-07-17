import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

const InteractiveAudioPlayer = ({ audioFile = '/your-audio-file.wav' }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTranscript, setShowTranscript] = useState(false);

  // Mock waveform data - in production, you'd generate this from the audio file
  const waveformData = [
    0.1, 0.3, 0.6, 0.8, 0.4, 0.7, 0.9, 0.5, 0.3, 0.8, 0.6, 0.4, 0.9, 0.7, 0.2,
    0.5, 0.8, 0.3, 0.6, 0.9, 0.4, 0.7, 0.5, 0.8, 0.3, 0.6, 0.9, 0.4, 0.7, 0.5,
    0.8, 0.3, 0.6, 0.9, 0.4, 0.7, 0.5, 0.8, 0.3, 0.6, 0.9, 0.4, 0.7, 0.5, 0.8,
    0.3, 0.6, 0.9, 0.4, 0.7, 0.5, 0.8, 0.3, 0.6, 0.9, 0.4, 0.7, 0.5, 0.8, 0.3
  ];

  // Mock transcript with timestamps
  const transcript = [
    { time: 0, text: "Hello, I'm calling to verify insurance coverage for patient John Smith." },
    { time: 3, text: "His date of birth is January 15th, 1985." },
    { time: 6, text: "Policy number is ABC123456789." },
    { time: 9, text: "We need to verify coverage for a crown procedure, code D2740." },
    { time: 12, text: "What is the patient's annual maximum and how much has been used?" },
    { time: 15, text: "Thank you, I have all the information I need." }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = (e) => {
      setError('Audio file could not be loaded. Please check the file path.');
      setIsLoading(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => {
        setError('Could not play audio. Please try again.');
      });
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  };

  const getCurrentTranscriptText = () => {
    const current = transcript.find((item, index) => {
      const nextItem = transcript[index + 1];
      return currentTime >= item.time && (!nextItem || currentTime < nextItem.time);
    });
    return current ? current.text : '';
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-600 text-sm">{error}</p>
        <p className="text-red-500 text-xs mt-2">
          Make sure your audio file is in the public folder and accessible at: {audioFile}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <audio
        ref={audioRef}
        preload="metadata"
        className="hidden"
      >
        <source src={audioFile} type="audio/wav" />
        <source src={audioFile.replace('.wav', '.mp3')} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Waveform Visualization */}
      <div className="mb-6">
        <div className="flex items-end justify-center space-x-1 h-20 bg-gray-50 rounded-lg p-4">
          {waveformData.map((height, index) => {
            const isActive = (index / waveformData.length) * 100 <= getProgressPercentage();
            return (
              <div
                key={index}
                className={`w-1 rounded-full transition-colors duration-200 ${
                  isActive ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                style={{ height: `${height * 60}px` }}
              />
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-full p-3 transition-colors duration-200"
        >
          {isLoading ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          ) : isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-1" />
          )}
        </button>
        <Volume2 className="h-5 w-5 text-gray-600" />
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-200"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Transcript Toggle */}
      <div className="text-center">
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="text-blue-500 hover:text-blue-600 text-sm font-medium"
        >
          {showTranscript ? 'Hide' : 'Show'} Transcript
        </button>
      </div>

      {/* Real-time Transcript */}
      {showTranscript && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Live Transcript:</h4>
          <p className="text-sm text-gray-700 min-h-[3rem] italic">
            {isPlaying ? getCurrentTranscriptText() : 'Click play to see live transcript...'}
          </p>
        </div>
      )}

      {/* Full Transcript */}
      {showTranscript && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Full Transcript:</h4>
          <div className="space-y-2 text-sm text-gray-700 max-h-32 overflow-y-auto">
            {transcript.map((item, index) => (
              <p key={index} className="leading-relaxed">
                <span className="text-blue-600 font-mono text-xs">
                  [{formatTime(item.time)}]
                </span>{' '}
                {item.text}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveAudioPlayer;