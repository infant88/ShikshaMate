import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  Zap, 
  BookOpen, 
  ArrowRight, 
  Layers, 
  HelpCircle,
  Eye,
  Sliders,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SAMPLE_PROBLEMS } from '../data/curriculumData';

export default function DoubtSolver({ selectedCurriculum, selectedLang, onTriggerInference }) {
  const [activeProblem, setActiveProblem] = useState(SAMPLE_PROBLEMS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(100);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [savedToNotebook, setSavedToNotebook] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [revealedHints, setRevealedHints] = useState({});
  const [customText, setCustomText] = useState('');
  const [inferenceStats, setInferenceStats] = useState({
    ocrLatency: '1.18s',
    slmLatency: '1.42s',
    npuLoad: '88%',
    power: '3.3W',
    tokensPerSec: '51 t/s'
  });

  const videoRef = useRef(null);

  // Switch to problem matching curriculum if available
  useEffect(() => {
    const matched = SAMPLE_PROBLEMS.find(p => p.curriculum === selectedCurriculum);
    if (matched) {
      handleSelectProblem(matched);
    }
  }, [selectedCurriculum]);

  // Handle problem selection
  const handleSelectProblem = (prob) => {
    stopAudio();
    setIsProcessing(true);
    setOcrProgress(20);
    onTriggerInference(92, 3.4);

    setTimeout(() => setOcrProgress(60), 200);
    setTimeout(() => {
      setOcrProgress(100);
      setIsProcessing(false);
      setActiveProblem(prob);
      setCustomText('');
      setSavedToNotebook(false);
      setRevealedHints({});
      setInferenceStats({
        ocrLatency: (1.0 + Math.random() * 0.3).toFixed(2) + 's',
        slmLatency: (1.3 + Math.random() * 0.4).toFixed(2) + 's',
        npuLoad: '89%',
        power: (3.1 + Math.random() * 0.4).toFixed(1) + 'W',
        tokensPerSec: (48 + Math.floor(Math.random() * 8)) + ' t/s'
      });
      onTriggerInference(25, 1.8);
    }, 600);
  };

  // Toggle Camera
  const toggleCamera = async () => {
    if (!isCameraActive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraActive(true);
      } catch (err) {
        alert('Webcam permission not granted or device camera unavailable. Demonstrating camera OCR simulation mode.');
        setIsCameraActive(true);
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
      setIsCameraActive(false);
    }
  };

  // TTS Readout
  const toggleSpeech = () => {
    if (speaking) {
      stopAudio();
      return;
    }

    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis not supported on this browser.');
      return;
    }

    const currentLang = selectedLang === 'hi' ? 'hi' : 'en';
    const steps = activeProblem.solutionSteps[currentLang] || activeProblem.solutionSteps.en;
    const textToRead = `${activeProblem.title}. ${steps.map(s => s.title + '. ' + s.content).join(' ')}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = currentLang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 1.0;

    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  };

  const toggleHint = (idx) => {
    setRevealedHints(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Handle custom query submit
  const handleSolveCustom = (e) => {
    e.preventDefault();
    if (!customText.trim()) return;

    setIsProcessing(true);
    onTriggerInference(94, 3.6);
    setTimeout(() => {
      setIsProcessing(false);
      onTriggerInference(24, 1.7);
    }, 700);
  };

  const currentLang = selectedLang === 'hi' ? 'hi' : 'en';
  const solutionSteps = activeProblem.solutionSteps[currentLang] || activeProblem.solutionSteps.en;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Banner / Module Info */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <span className="badge badge-red">Module 1</span>
            <h2 style={{ fontSize: '18px' }}>Multimodal Doubt Solver</h2>
            <span className="curriculum-tag">{activeProblem.boardTag}</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
            Scan textbook pages, question papers, or handwritten math. Processed 100% on Qualcomm Hexagon NPU using TrOCR + Phi-3-mini INT4.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className={`btn-secondary ${isCameraActive ? 'active' : ''}`}
            onClick={toggleCamera}
          >
            <Camera size={16} color="var(--snapdragon-red)" />
            <span>{isCameraActive ? 'Close Camera' : 'Live Camera'}</span>
          </button>

          <button 
            className={`btn-secondary ${speaking ? 'active' : ''}`}
            onClick={toggleSpeech}
            style={speaking ? { borderColor: 'var(--snapdragon-red)', color: 'var(--snapdragon-red)' } : {}}
          >
            {speaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span>{speaking ? 'Stop Voice' : 'Read Solution'}</span>
          </button>

          <button 
            className="btn-secondary"
            onClick={() => setSavedToNotebook(!savedToNotebook)}
            style={savedToNotebook ? { color: 'var(--success-emerald)', borderColor: 'var(--success-emerald)' } : {}}
          >
            {savedToNotebook ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            <span>{savedToNotebook ? 'Saved to Vault' : 'Save Session'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Scanner & Problem Picker | Right Step-by-Step AI Solution */}
      <div className="grid-2">
        
        {/* Left Column: Image / Scanner View & Extracted OCR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Sample Exam Problem Quick Selector */}
          <div className="glass-card" style={{ padding: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Select Sample Exam Question (Qualcomm NPU Benchmark Test)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {SAMPLE_PROBLEMS.map((prob) => (
                <button
                  key={prob.id}
                  onClick={() => handleSelectProblem(prob)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: activeProblem.id === prob.id ? 'rgba(230, 0, 18, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${activeProblem.id === prob.id ? 'var(--border-accent)' : 'var(--border-subtle)'}`,
                    color: activeProblem.id === prob.id ? '#FFFFFF' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '13px', color: activeProblem.id === prob.id ? '#FFF' : 'var(--hp-silver)' }}>
                      {prob.title}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {prob.subject} • {prob.curriculum.toUpperCase()}
                    </div>
                  </div>
                  <ArrowRight size={14} color={activeProblem.id === prob.id ? 'var(--snapdragon-red)' : 'var(--text-muted)'} />
                </button>
              ))}
            </div>
          </div>

          {/* Camera / Image Viewport */}
          <div className="glass-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={16} color="var(--npu-cyan)" />
                <span style={{ fontSize: '13px', fontWeight: '600' }}>Camera / Textbook Feed</span>
              </div>
              <span className="badge badge-cyan">Hexagon Vision Pipeline</span>
            </div>

            <div className="scanner-viewport">
              {isCameraActive ? (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <img 
                  src={activeProblem.imageUrl} 
                  alt="Textbook Page" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} 
                />
              )}

              {/* Scanning Laser Line */}
              <div className="scanner-laser"></div>

              {/* Simulated Vision Bounding Boxes */}
              <div className="bounding-box" style={{ top: '25%', left: '8%', width: '84%', height: '48%' }}>
                <span className="bounding-label">MATH_FORMULA [INT8]</span>
              </div>
              <div className="bounding-box" style={{ top: '78%', left: '15%', width: '70%', height: '16%' }}>
                <span className="bounding-label">CURRICULUM_TAG [NCERT]</span>
              </div>
            </div>

            {/* OCR Extracted Text Output */}
            <div style={{ marginTop: '16px', background: 'rgba(7, 9, 15, 0.7)', borderRadius: '8px', padding: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--npu-cyan)' }}>
                  EXTRACTED TEXT [Qualcomm AI Hub TrOCR INT8]
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Confidence: 99.4%</span>
              </div>
              <p style={{ fontSize: '13px', color: '#E2E8F0', fontStyle: 'italic', lineHeight: '1.5' }}>
                "{activeProblem.extractedText}"
              </p>
            </div>
          </div>

          {/* NPU Telemetry Footprint Card */}
          <div className="glass-card npu-border" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Cpu size={16} color="var(--npu-cyan)" />
              <span style={{ fontSize: '13px', fontWeight: '700' }}>Snapdragon Hardware Inference Telemetry</span>
            </div>

            <div className="grid-3" style={{ gap: '10px' }}>
              <div className="metric-box">
                <span className="metric-label">Vision OCR</span>
                <span className="metric-number" style={{ color: 'var(--npu-cyan)', fontSize: '18px' }}>
                  {inferenceStats.ocrLatency}
                </span>
                <span className="metric-sub">TrOCR INT8</span>
              </div>

              <div className="metric-box">
                <span className="metric-label">SLM Solution</span>
                <span className="metric-number" style={{ color: 'var(--success-emerald)', fontSize: '18px' }}>
                  {inferenceStats.slmLatency}
                </span>
                <span className="metric-sub">{inferenceStats.tokensPerSec}</span>
              </div>

              <div className="metric-box">
                <span className="metric-label">Active Power</span>
                <span className="metric-number" style={{ color: 'var(--snapdragon-crimson)', fontSize: '18px' }}>
                  {inferenceStats.power}
                </span>
                <span className="metric-sub">Hexagon NPU</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Step-by-Step AI Solution */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="glass-card red-border">
            
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-red" style={{ marginBottom: '6px' }}>
                  Phi-3-mini INT4 On-Device Output
                </span>
                <h3 style={{ fontSize: '18px', color: '#FFFFFF' }}>{activeProblem.title}</h3>
              </div>
              <span className="badge badge-green">Curriculum Verified</span>
            </div>

            {/* Concept Summary Banner */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.1), rgba(0, 242, 254, 0.02))', 
              border: '1px solid var(--border-cyan)', 
              borderRadius: '8px', 
              padding: '12px 16px', 
              marginBottom: '18px' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--npu-cyan)', fontWeight: '700', fontSize: '12px', marginBottom: '4px' }}>
                <Sparkles size={14} />
                <span>CORE CONCEPT & EXAM MAPPING</span>
              </div>
              <p style={{ fontSize: '13px', color: '#E2E8F0' }}>
                {activeProblem.conceptSummary}
              </p>
            </div>

            {/* Step-by-Step Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {solutionSteps.map((step, idx) => (
                <div 
                  key={idx} 
                  className={`step-card ${idx === 0 ? 'cyan-edge' : idx === solutionSteps.length - 1 ? 'green-edge' : ''}`}
                >
                  <div className="step-title">
                    <span>{step.title}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      0.{idx + 2}s QNN EP
                    </span>
                  </div>
                  <div className="step-content">
                    {step.content}
                  </div>
                </div>
              ))}
            </div>

            {/* 3 Related Practice Questions Generated by Local SLM */}
            <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-subtle)', paddingTop: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <HelpCircle size={16} color="var(--snapdragon-red)" />
                  <span style={{ fontSize: '14px', fontWeight: '700' }}>3 Related Practice Questions (Exam Pattern)</span>
                </div>
                <span className="badge badge-amber">Auto-Generated</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeProblem.practiceQuestions.map((q, idx) => (
                  <div 
                    key={idx}
                    style={{
                      background: 'rgba(7, 9, 15, 0.6)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '12px 16px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                      <p style={{ fontSize: '13px', color: '#F1F5F9', fontWeight: '500' }}>
                        <span style={{ color: 'var(--snapdragon-crimson)', fontWeight: '700', marginRight: '6px' }}>Q{idx + 1}.</span>
                        {q.q}
                      </p>
                      <button 
                        onClick={() => toggleHint(idx)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--npu-cyan)',
                          fontSize: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <span>{revealedHints[idx] ? 'Hide Hint' : 'Show Hint'}</span>
                        {revealedHints[idx] ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>
                    </div>

                    {revealedHints[idx] && (
                      <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed rgba(255,255,255,0.1)', color: 'var(--hp-silver)', fontSize: '12px', fontStyle: 'italic' }}>
                        💡 <strong>Examiner Hint:</strong> {q.hint}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
