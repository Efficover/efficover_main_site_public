import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, Volume2 } from 'lucide-react';

interface TranscriptItem {
  start: number; // seconds
  end: number;   // seconds
  text: string;
}

interface Props {
  audioFile: string;
  transcriptFile: string; // URL to TextGrid file
}

function parseTextGrid(textgridText: string, tierName = "ORT-MAU"): TranscriptItem[] {
  const lines = textgridText.split(/\r?\n/).map(line => line.trim());
  const transcript: TranscriptItem[] = [];

  let tierIndex = lines.findIndex(line => line === `name = "${tierName}"`);
  if (tierIndex === -1) return [];

  let intervalsSizeLineIndex = lines.findIndex(
    (line, idx) => idx > tierIndex && line.startsWith("intervals: size =")
  );
  if (intervalsSizeLineIndex === -1) return [];

  const sizeMatch = lines[intervalsSizeLineIndex].match(/intervals: size = (\d+)/);
  if (!sizeMatch) return [];

  const intervalsCount = parseInt(sizeMatch[1], 10);
  let currentLine = intervalsSizeLineIndex + 1;

  for (let i = 0; i < intervalsCount; i++) {
    while (currentLine < lines.length && !lines[currentLine].startsWith(`intervals [${i + 1}]:`)) {
      currentLine++;
    }
    if (currentLine >= lines.length) break;
    currentLine++; // skip 'intervals [i+1]:'

    const xminLine = lines[currentLine++] || "";
    const xminMatch = xminLine.match(/xmin = ([0-9.]+)/);
    const start = xminMatch ? parseFloat(xminMatch[1]) : 0;

    const xmaxLine = lines[currentLine++] || "";
    const xmaxMatch = xmaxLine.match(/xmax = ([0-9.]+)/);
    const end = xmaxMatch ? parseFloat(xmaxMatch[1]) : 0;

    const textLine = lines[currentLine++] || "";
    const textMatch = textLine.match(/text = "(.*)"/);
    const text = textMatch ? textMatch[1] : "";

    transcript.push({ start, end, text: text.trim() });
  }

  return transcript;
}

// Group intervals into sentences by concatenating consecutive non-empty texts
function groupIntoSentences(items: TranscriptItem[]): TranscriptItem[] {
  const sentences: TranscriptItem[] = [];
  let currentSentence: TranscriptItem | null = null;

  for (const item of items) {
    if (!item.text) {
      // Empty text indicates a pause or break, close current sentence
      if (currentSentence) {
        sentences.push(currentSentence);
        currentSentence = null;
      }
    } else {
      if (!currentSentence) {
        currentSentence = { ...item }; // start new sentence
      } else {
        // Append text with a space, extend end time
        currentSentence.text += ' ' + item.text;
        currentSentence.end = item.end;
      }
    }
  }

  // Push last sentence if any
  if (currentSentence) sentences.push(currentSentence);

  return sentences;
}

const InteractiveAudioPlayer: React.FC<Props> = ({ audioFile, transcriptFile }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);

  useEffect(() => {
    if (!waveformRef.current) return;

    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#cbd5e1',
      progressColor: '#3b82f6',
      height: 80,
      responsive: true,
      normalize: true,
      cursorColor: '#3b82f6',
      barWidth: 2,
      barGap: 2,
    });

    wavesurferRef.current.load(audioFile);

    wavesurferRef.current.on('ready', () => {
      setDuration(wavesurferRef.current!.getDuration());
    });

    wavesurferRef.current.on('audioprocess', (time: number) => {
      setCurrentTime(time);
    });

    wavesurferRef.current.on('seek', (progress: number) => {
      const time = progress * duration;
      setCurrentTime(time);
    });

    wavesurferRef.current.on('finish', () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    return () => {
      wavesurferRef.current?.destroy();
    };
  }, [audioFile, duration]);

  useEffect(() => {
    fetch(transcriptFile)
      .then(res => res.text())
      .then(text => {
        const rawItems = parseTextGrid(text, "ORT-MAU");
        const grouped = groupIntoSentences(rawItems);
        setTranscript(grouped);
      })
      .catch(err => {
        console.error("Failed to load transcript:", err);
        setTranscript([]);
      });
  }, [transcriptFile]);

  const togglePlay = () => {
    if (!wavesurferRef.current) return;

    if (isPlaying) {
      wavesurferRef.current.pause();
    } else {
      wavesurferRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getCurrentTranscriptText = () => {
    if (transcript.length === 0) return '';
    const current = transcript.find(item => currentTime >= item.start && currentTime < item.end);
    return current ? current.text : '';
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      {/* Waveform */}
      <div ref={waveformRef} className="mb-6" />

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <button
          onClick={togglePlay}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 transition-colors duration-200"
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-1" />}
        </button>
        <Volume2 className="h-5 w-5 text-gray-600" />
        <div className="text-xs text-gray-500 ml-2">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Current Transcript */}
      {/* <div className="p-4 bg-gray-50 rounded-lg min-h-[4rem]">
        <p className="text-sm text-gray-700 italic">
          {getCurrentTranscriptText()}
        </p>
      </div> */}

      {/* Full Transcript (sentences) */}
      {/* <div className="mt-4 p-4 bg-gray-50 rounded-lg max-h-40 overflow-y-auto text-sm text-gray-700">
        {transcript.map((item, i) => (
          <p
            key={i}
            className={`mb-2 cursor-pointer ${
              currentTime >= item.start && currentTime < item.end
                ? 'text-blue-600 font-semibold'
                : 'text-gray-700'
            }`}
            onClick={() => wavesurferRef.current?.seekTo(item.start / duration)}
          >
            [{formatTime(item.start)}] {item.text}
          </p>
        ))}
      </div> */}
    </div>
  );
};

export default InteractiveAudioPlayer;
