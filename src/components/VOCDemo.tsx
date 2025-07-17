export default function AudioWithWaveform() {
  return (
    <div className="audio-container">
      <div className="waveform-visual">
        {/* Simple visual representation */}
        <div className="wave-bar" style={{height: '20px'}}></div>
        <div className="wave-bar" style={{height: '35px'}}></div>
        <div className="wave-bar" style={{height: '15px'}}></div>
        {/* Add more bars as needed */}
      </div>
      
      <audio controls className="mt-4">
        <source src="/public/voc_agent_demo.wav" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}