import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, FileText, User, CheckCircle, XCircle, Clock, AlertCircle, DollarSign, Building2, Download } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';

interface TranscriptItem {
  start: number;
  end: number;
  text: string;
}

const VOCVisualizer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTranscript, setCurrentTranscript] = useState<string>('');
  const [currentSpeaker, setCurrentSpeaker] = useState<string>('Efficover');
  const [cleanTranscript, setCleanTranscript] = useState<TranscriptItem[]>([]);
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  // Get today's date for VOC verification
  const today = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  // Clinical staff view data - fully populated initially, then resets when demo starts
  const [clinicalData, setClinicalData] = useState({
    patient: {
      name: 'Michael Chen',
      policy: 'A12345',
      insurance: 'Delta Dental',
      status: 'VOC Complete'
    },
    procedures: [
      {
        code: 'D1110',
        description: 'Adult Prophylaxis',
        status: 'approved',
        coverage: '80%',
        patientCost: '$24',
        insurancePays: '$96',
        fee: '$120'
      },
      {
        code: 'D2140',
        description: 'Amalgam Filling',
        status: 'approved',
        coverage: '100%',
        patientCost: '$0',
        insurancePays: '$180',
        fee: '$180'
      }
    ],
    coverage: {
      individualDeductible: { amount: 50, met: true, status: 'verified' },
      familyDeductible: { amount: 150, spent: 100, status: 'verified' },
      annualMaximum: { limit: 2000, used: 500, status: 'verified' },
      waitingPeriods: { status: 'verified', description: '6 months for major services' },
      eligibility: { status: 'verified' }
    }
  });

  // Track if demo has started to show the building process
  const [demoStarted, setDemoStarted] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // Load transcript data from public folder
  useEffect(() => {
    fetch('/voc_agent_demo_transcript_clean.json')
      .then(response => response.json())
      .then(data => setCleanTranscript(data))
      .catch(error => console.error('Error loading transcript:', error));
  }, []);

  // Load and configure WaveSurfer
  useEffect(() => {
    if (!waveformRef.current) return;

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#e5e7eb',
      progressColor: '#3b82f6',
      height: 40,
      normalize: true,
      cursorColor: '#3b82f6',
      barWidth: 1,
      barGap: 1,
    });

    wavesurferRef.current = ws;
    ws.load('/voc_agent_demo.wav');

    ws.on('ready', () => {
      const duration = ws.getDuration();
      setDuration(duration);
    });
    
    ws.on('timeupdate', (time: number) => {
      setCurrentTime(time);
    });
    
    ws.on('finish', () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    return () => ws.destroy();
  }, []);

  // Update transcript and clinical data based on current time
  useEffect(() => {
    if (cleanTranscript.length === 0) return;
    
    const currentSegment = cleanTranscript.find((item: TranscriptItem) => 
      currentTime >= item.start && currentTime < item.end
    );
    
    if (currentSegment) {
      setCurrentTranscript(currentSegment.text);
      
      // Set the correct speaker
      if (currentSegment.text.startsWith('Efficover:')) {
        setCurrentSpeaker('Efficover');
      } else if (currentSegment.text.startsWith('Insurance:')) {
        setCurrentSpeaker('Delta Dental Insurance');
      }
      
      // Update clinical data based on transcript content - trigger earlier when info is mentioned
      if (currentSegment.text.includes('Individual 50') && clinicalData.coverage.individualDeductible.status === 'pending') {
        setClinicalData(prev => ({
          ...prev,
          coverage: {
            ...prev.coverage,
            individualDeductible: { ...prev.coverage.individualDeductible, met: true, status: 'verified' }
          }
        }));
      }
      
      if (currentSegment.text.includes('family has spent about a hundred') && clinicalData.coverage.familyDeductible.status === 'pending') {
        setClinicalData(prev => ({
          ...prev,
          coverage: {
            ...prev.coverage,
            familyDeductible: { ...prev.coverage.familyDeductible, spent: 100, status: 'verified' }
          }
        }));
      }
      
      if (currentSegment.text.includes('Annual maximum 2000') && clinicalData.coverage.annualMaximum.status === 'pending') {
        setClinicalData(prev => ({
          ...prev,
          coverage: {
            ...prev.coverage,
            annualMaximum: { ...prev.coverage.annualMaximum, used: 500, status: 'verified' }
          }
        }));
      }
      
      // Update waiting periods when mentioned
      if (currentSegment.text.includes('6 month waiting period') && clinicalData.coverage.waitingPeriods.status === 'pending') {
        setClinicalData(prev => ({
          ...prev,
          coverage: {
            ...prev.coverage,
            waitingPeriods: { status: 'verified', description: '6 months for major services' }
          }
        }));
      }
      
      // Update D1110 coverage when mentioned (trigger earlier)
      if (currentSegment.text.includes('80 percent') && clinicalData.procedures[0].status === 'pending') {
        setClinicalData(prev => ({
          ...prev,
          procedures: prev.procedures.map((proc, index) => 
            index === 0 ? { 
              ...proc, 
              status: 'approved', 
              coverage: '80%', 
              patientCost: '$24',
              insurancePays: '$96'
            } : proc
          )
        }));
      }
      
      // Update D2140 coverage when mentioned (trigger earlier)
      if (currentSegment.text.includes('hundred percent') && clinicalData.procedures[1].status === 'pending') {
        setClinicalData(prev => ({
          ...prev,
          procedures: prev.procedures.map((proc, index) => 
            index === 1 ? { 
              ...proc, 
              status: 'approved', 
              coverage: '100%', 
              patientCost: '$0',
              insurancePays: '$180'
            } : proc
          )
        }));
      }
      
      if (currentSegment.text.includes('eligible') && clinicalData.coverage.eligibility.status === 'pending') {
        setClinicalData(prev => ({
          ...prev,
          patient: { ...prev.patient, status: 'VOC Complete' },
          coverage: {
            ...prev.coverage,
            eligibility: { status: 'verified' }
          }
        }));
      }
    }
  }, [currentTime, clinicalData, cleanTranscript]);

  const togglePlay = () => {
    if (!wavesurferRef.current) return;
    
    if (!demoStarted) {
      // First time starting - reset data to show building process
      setDemoStarted(true);
      setClinicalData({
        patient: {
          name: 'Michael Chen',
          policy: 'A12345',
          insurance: 'Delta Dental',
          status: 'Pending VOC'
        },
        procedures: [
          {
            code: 'D1110',
            description: 'Adult Prophylaxis',
            status: 'pending',
            coverage: 'Pending',
            patientCost: 'Pending',
            insurancePays: 'Pending',
            fee: '$120'
          },
          {
            code: 'D2140',
            description: 'Amalgam Filling',
            status: 'pending',
            coverage: 'Pending',
            patientCost: 'Pending',
            insurancePays: 'Pending',
            fee: '$180'
          }
        ],
        coverage: {
          individualDeductible: { amount: 50, met: false, status: 'pending' },
          familyDeductible: { amount: 150, spent: 0, status: 'pending' },
          annualMaximum: { limit: 2000, used: 0, status: 'pending' },
          waitingPeriods: { status: 'pending', description: 'Pending' },
          eligibility: { status: 'pending' }
        }
      });
    }
    
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'verified': return 'text-green-600 bg-green-100 border-green-200';
      case 'denied': return 'text-red-600 bg-red-100 border-red-200';
      case 'review': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'verified': return <CheckCircle className="w-3 h-3" />;
      case 'denied': return <XCircle className="w-3 h-3" />;
      case 'review': return <AlertCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col">
      {/* Header - Audio Player */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3 border border-blue-100 mb-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-blue-600" />
            VOC Demo - Michael Chen (A12345)
          </h3>
          <span className="text-sm text-gray-500 font-medium">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        
        <div className="bg-white rounded-lg p-2 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Delta Dental - VOC Verification</span>
            <span className="text-xs text-green-600 font-medium">✓ Live</span>
          </div>
          <div ref={waveformRef} className="mb-2" />
          <button
            onClick={togglePlay}
            className="flex items-center justify-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 font-semibold text-sm"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isPlaying ? 'Pause' : (demoStarted ? 'Restart Demo' : 'Start Demo')}
          </button>
        </div>
      </div>

      {/* Main Content - 2 Columns in same row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column - VOC Audio & Transcript */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-blue-600" />
            Live VOC Call
          </h3>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-cyan-50 rounded-lg p-3 border border-blue-100">
            <div className="flex items-start gap-2 flex-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mt-1"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 font-medium leading-relaxed">
                  {!demoStarted ? 'Click Start Demo to see the VOC demo in action...' : 
                   currentTranscript || 'Starting VOC verification...'}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-500">
                    {formatTime(currentTime)}
                  </span>
                  {demoStarted && (
                    <span className="text-xs text-blue-600 font-medium">
                      {currentSpeaker} speaking...
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Clinical Staff View */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            Clinical Staff View
          </h3>
          
          <div className="space-y-2">
            {/* Patient Info - Brief */}
            <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
              <h4 className="text-xs font-semibold text-gray-800 mb-1 flex items-center gap-1">
                <User className="w-3 h-3 text-blue-600" />
                Patient
              </h4>
              <div className="grid grid-cols-2 gap-1">
                <div className="bg-white rounded p-1 border border-gray-200">
                  <label className="text-xs text-gray-600">Name</label>
                  <p className="text-xs font-semibold text-gray-800">{clinicalData.patient.name}</p>
                </div>
                <div className="bg-white rounded p-1 border border-gray-200">
                  <label className="text-xs text-gray-600">Policy</label>
                  <p className="text-xs font-semibold text-gray-800">{clinicalData.patient.policy}</p>
                </div>
                <div className="bg-white rounded p-1 border border-gray-200">
                  <label className="text-xs text-gray-600">Insurance</label>
                  <p className="text-xs font-semibold text-gray-800">{clinicalData.patient.insurance}</p>
                </div>
                <div className="bg-white rounded p-1 border border-gray-200">
                  <label className="text-xs text-gray-600">VOC Status</label>
                  <p className={`text-xs font-semibold ${clinicalData.patient.status === 'VOC Complete' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {clinicalData.patient.status === 'VOC Complete' ? `Verified on ${today}` : clinicalData.patient.status}
                  </p>
                </div>
              </div>
            </div>

            {/* Coverage Summary - Brief with Waiting Periods */}
            <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
              <h4 className="text-xs font-semibold text-gray-800 mb-1 flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-blue-600" />
                Coverage & Waiting Periods
              </h4>
              <div className="grid grid-cols-2 gap-1">
                <div className="bg-white rounded p-1 border border-gray-200">
                  <label className="text-xs text-gray-600">Individual Deductible</label>
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-semibold text-gray-800">${clinicalData.coverage.individualDeductible.amount}</p>
                    <span className={`px-1 py-0.5 rounded text-xs font-bold border ${getStatusColor(clinicalData.coverage.individualDeductible.status)}`}>
                      {getStatusIcon(clinicalData.coverage.individualDeductible.status)}
                    </span>
                  </div>
                </div>
                <div className="bg-white rounded p-1 border border-gray-200">
                  <label className="text-xs text-gray-600">Annual Maximum</label>
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-semibold text-gray-800">${clinicalData.coverage.annualMaximum.limit} (${clinicalData.coverage.annualMaximum.used} used)</p>
                    <span className={`px-1 py-0.5 rounded text-xs font-bold border ${getStatusColor(clinicalData.coverage.annualMaximum.status)}`}>
                      {getStatusIcon(clinicalData.coverage.annualMaximum.status)}
                    </span>
                  </div>
                </div>
                <div className="bg-white rounded p-1 border border-gray-200 col-span-2">
                  <label className="text-xs text-gray-600">Waiting Periods</label>
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-semibold text-gray-800">
                      {clinicalData.coverage.waitingPeriods.description}
                    </p>
                    <span className={`px-1 py-0.5 rounded text-xs font-bold border ${
                      clinicalData.coverage.waitingPeriods.status === 'verified' 
                        ? 'text-orange-600 bg-orange-100 border-orange-200' 
                        : 'text-gray-600 bg-gray-100 border-gray-200'
                    }`}>
                      {clinicalData.coverage.waitingPeriods.status === 'verified' ? <AlertCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Procedures - Brief */}
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-gray-800">
                Upcoming Procedures
              </h4>
              {clinicalData.procedures.map((proc, index) => (
                <div key={proc.code} className="bg-gray-50 rounded-lg p-2 border border-gray-200 transition-all duration-300">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-gray-800 text-xs">{proc.code}</span>
                      <span className={`px-1 py-0.5 rounded text-xs font-bold flex items-center gap-1 border transition-all duration-300 ${getStatusColor(proc.status)}`}>
                        {getStatusIcon(proc.status)}
                        {proc.status.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-xs text-gray-600">Fee: {proc.fee}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{proc.description}</p>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="bg-white rounded p-1 border border-gray-200">
                      <label className="text-xs text-gray-600">Coverage</label>
                      <p className="text-xs font-bold text-green-600">{proc.coverage}</p>
                    </div>
                    <div className="bg-white rounded p-1 border border-gray-200">
                      <label className="text-xs text-gray-600">Patient Cost</label>
                      <p className="text-xs font-bold text-red-600">{proc.patientCost}</p>
                    </div>
                    <div className="bg-white rounded p-1 border border-gray-200">
                      <label className="text-xs text-gray-600">Insurance Pays</label>
                      <p className="text-xs font-bold text-blue-600">{proc.insurancePays}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* VOC Recording/Transcript Button */}
            <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-gray-800">VOC Recording & Transcript</span>
                <span className="text-xs text-gray-600">Last Verified: {today}</span>
              </div>
              <button 
                onClick={() => setShowDownloadModal(true)}
                className="w-full flex items-center justify-center gap-2 px-2 py-1.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors"
              >
                <Download className="w-3 h-3" />
                Download VOC Recording & Transcript
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Download className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Demo Download
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                In a real implementation, this would download:
              </p>
              <ul className="text-left text-sm text-gray-600 mb-6 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  VOC audio recording (.wav)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Complete transcript (.txt)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Verification summary (.pdf)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Coverage details (.json)
                </li>
              </ul>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDownloadModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowDownloadModal(false);
                    // Simulate download by creating a demo file
                    const demoContent = `VOC Demo - Michael Chen (A12345)
Date: ${today}
Duration: ${formatTime(duration)}

Coverage Summary:
- Individual Deductible: $50 (Met)
- Annual Maximum: $2000 ($500 used)
- Waiting Periods: 6 months for major services

Procedures:
- D1110 (Adult Prophylaxis): 80% coverage, Patient cost: $24
- D2140 (Amalgam Filling): 100% coverage, Patient cost: $0

Status: VERIFIED`;
                    
                    const blob = new Blob([demoContent], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `VOC_Demo_${today.replace(/\//g, '-')}.txt`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Download Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VOCVisualizer; 