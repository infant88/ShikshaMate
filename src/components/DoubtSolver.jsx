import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  Zap, 
  ArrowRight, 
  HelpCircle,
  Eye,
  Check,
  ChevronDown,
  ChevronUp,
  Edit3,
  Send,
  MessageCircle,
  Maximize2
} from 'lucide-react';
import { SAMPLE_PROBLEMS } from '../data/curriculumData';

export default function DoubtSolver({ selectedCurriculum, selectedLang, onTriggerInference }) {
  const [activeProblem, setActiveProblem] = useState(SAMPLE_PROBLEMS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [savedToNotebook, setSavedToNotebook] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [revealedHints, setRevealedHints] = useState({});
  const [completedSteps, setCompletedSteps] = useState({});
  const [followUpQuery, setFollowUpQuery] = useState('');
  const [followUpResponses, setFollowUpResponses] = useState([]);
  const [activeLangOverride, setActiveLangOverride] = useState(selectedLang);
  const [selectedBox, setSelectedBox] = useState('all');

  const videoRef = useRef(null);

  useEffect(() => {
    setActiveLangOverride(selectedLang);
  }, [selectedLang]);

  useEffect(() => {
    const matched = SAMPLE_PROBLEMS.find(p => p.curriculum === selectedCurriculum);
    if (matched) {
      handleSelectProblem(matched);
    }
  }, [selectedCurriculum]);

  const handleSelectProblem = (prob) => {
    stopAudio();
    setIsProcessing(true);
    onTriggerInference(92, 3.4);

    setTimeout(() => {
      setIsProcessing(false);
      setActiveProblem(prob);
      setSavedToNotebook(false);
      setRevealedHints({});
      setCompletedSteps({});
      setFollowUpResponses([]);
      setSelectedBox('all');
      onTriggerInference(24, 1.8);
    }, 450);
  };

  const toggleCamera = async () => {
    if (!isCameraActive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraActive(true);
      } catch (err) {
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

  const toggleSpeech = () => {
    if (speaking) {
      stopAudio();
      return;
    }

    if (!('speechSynthesis' in window)) return;

    const currentLang = activeLangOverride === 'hi' ? 'hi' : 'en';
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

  const toggleStepCompleted = (idx) => {
    setCompletedSteps(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const toggleHint = (idx) => {
    setRevealedHints(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSendFollowUp = (e) => {
    e.preventDefault();
    if (!followUpQuery.trim()) return;

    const q = followUpQuery.trim();
    setFollowUpQuery('');
    onTriggerInference(90, 3.5);

    setTimeout(() => {
      let ans = activeLangOverride === 'hi'
        ? `बिल्कुल! अगर हम उत्तल दर्पण (Convex Mirror) लेते, तो फोकस दूरी f धनात्मक (+15 cm) होती। तब 1/v = 1/15 - (-1/25) = 1/15 + 1/25 = 8/75 cm बनता, जिससे प्रतिबिम्ब हमेशा आभासी और सीधा (Virtual & Erect) बनता।`
        : `Great question! If this were a convex mirror instead, the focal length f would be positive (+15.0 cm). The mirror equation would yield 1/v = 1/15 - (-1/25) = 8/75, giving v = +9.38 cm. The image would always be virtual, erect, and diminished behind the mirror!`;

      setFollowUpResponses(prev => [
        ...prev,
        { query: q, answer: ans, time: 'Just now' }
      ]);
      onTriggerInference(22, 1.7);
    }, 500);
  };

  const currentLang = activeLangOverride === 'hi' ? 'hi' : 'en';
  const solutionSteps = activeProblem.solutionSteps[currentLang] || activeProblem.solutionSteps.en;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Sleek Problem Selector Strip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--slate-silver)', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
          Quick Demo Doubts:
        </span>
        {SAMPLE_PROBLEMS.map((prob) => (
          <button
            key={prob.id}
            onClick={() => handleSelectProblem(prob)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '20px',
              background: activeProblem.id === prob.id ? 'var(--snapdragon-red)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeProblem.id === prob.id ? 'var(--snapdragon-crimson)' : 'var(--border-subtle)'}`,
              color: activeProblem.id === prob.id ? '#FFFFFF' : 'var(--slate-silver)',
              fontSize: '12px',
              fontWeight: activeProblem.id === prob.id ? '700' : '500',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            <span>{prob.subject.split(' ')[0]}</span>
            <span>•</span>
            <span>{prob.title.slice(0, 28)}...</span>
          </button>
        ))}
      </div>

      {/* Main Grid: Left Scanner & Extracted OCR | Right Interactive Solution */}
      <div className="grid-2">
        
        {/* Left Column: Visual Capture & OCR Lens */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div className="card-panel" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={16} color="var(--npu-cyan)" />
                <span style={{ fontSize: '13px', fontWeight: '700' }}>Textbook Page & NPU OCR Lens</span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="action-btn-secondary"
                  onClick={toggleCamera}
                  style={{ padding: '5px 12px', fontSize: '11.5px' }}
                >
                  <Camera size={13} color="var(--snapdragon-red)" />
                  <span>{isCameraActive ? 'Close Camera' : 'Live Camera'}</span>
                </button>
              </div>
            </div>

            {/* Viewport with Interactive Bounding Boxes */}
            <div className="scanner-viewport" style={{ height: '340px', borderRadius: '14px' }}>
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
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} 
                />
              )}

              {/* Glowing Laser Scan Line */}
              <div className="scanner-laser" />

              {/* Clickable Bounding Boxes to Focus */}
              <div 
                className="bounding-box" 
                onClick={() => setSelectedBox('formula')}
                style={{ 
                  top: '25%', left: '8%', width: '84%', height: '48%',
                  borderColor: selectedBox === 'formula' ? 'var(--snapdragon-red)' : 'var(--npu-cyan)',
                  cursor: 'pointer'
                }}
              >
                <span className="bounding-label" style={{ background: selectedBox === 'formula' ? 'var(--snapdragon-red)' : 'var(--npu-cyan)', color: '#FFF' }}>
                  FORMULA & NUMERICAL [INT8]
                </span>
              </div>
            </div>

            {/* Extracted Text Display */}
            <div style={{ marginTop: '14px', background: 'rgba(6, 9, 16, 0.75)', borderRadius: '10px', padding: '12px 14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--npu-cyan)' }}>
                  QUALCOMM AI HUB TrOCR INT8 (1.18s)
                </span>
                <span style={{ fontSize: '11px', color: 'var(--emerald-green)' }}>Confidence: 99.4%</span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#E2E8F0', fontStyle: 'italic', lineHeight: '1.5' }}>
                "{activeProblem.extractedText}"
              </p>
            </div>
          </div>

          {/* Quick Hardware Footprint Badge */}
          <div className="card-panel glow-cyan" style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={16} color="var(--npu-cyan)" />
              <span style={{ fontSize: '12.5px', fontWeight: '600' }}>Snapdragon X Direct Inference:</span>
            </div>
            <div style={{ display: 'flex', gap: '14px', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
              <span>OCR: <strong style={{ color: 'var(--npu-cyan)' }}>1.18s</strong></span>
              <span>SLM: <strong style={{ color: 'var(--emerald-green)' }}>52 t/s</strong></span>
              <span>Power: <strong style={{ color: 'var(--snapdragon-crimson)' }}>3.2W</strong></span>
            </div>
          </div>

        </div>

        {/* Right Column: Step-by-Step Interactive Solution */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div className="card-panel glow-red" style={{ padding: '22px' }}>
            
            {/* Header info & Language Switcher */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--snapdragon-crimson)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {activeProblem.boardTag}
                </span>
                <h3 style={{ fontSize: '17px', color: '#FFFFFF', marginTop: '2px' }}>{activeProblem.title}</h3>
              </div>

              {/* Language and Audio Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: '16px', padding: '2px' }}>
                  <button
                    onClick={() => setActiveLangOverride('en')}
                    style={{
                      background: activeLangOverride === 'en' ? 'var(--snapdragon-red)' : 'transparent',
                      border: 'none',
                      color: '#FFF',
                      fontSize: '11px',
                      padding: '3px 8px',
                      borderRadius: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setActiveLangOverride('hi')}
                    style={{
                      background: activeLangOverride === 'hi' ? 'var(--snapdragon-red)' : 'transparent',
                      border: 'none',
                      color: '#FFF',
                      fontSize: '11px',
                      padding: '3px 8px',
                      borderRadius: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    हिंदी
                  </button>
                </div>

                <button 
                  onClick={toggleSpeech}
                  className="action-btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '11.5px', color: speaking ? 'var(--snapdragon-crimson)' : '#FFF' }}
                  title="Read Solution Aloud"
                >
                  {speaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  <span>{speaking ? 'Stop' : 'Listen'}</span>
                </button>
              </div>
            </div>

            {/* Core Concept Banner */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.1), rgba(0, 242, 254, 0.02))', 
              border: '1px solid var(--border-cyan)', 
              borderRadius: '10px', 
              padding: '12px 16px', 
              marginBottom: '16px' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--npu-cyan)', fontWeight: '700', fontSize: '11.5px', marginBottom: '2px' }}>
                <Sparkles size={13} />
                <span>KEY CONCEPT & FORMULA</span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#E2E8F0' }}>
                {activeProblem.conceptSummary}
              </p>
            </div>

            {/* Interactive Step Cards with "Understood" Checkmarks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {solutionSteps.map((step, idx) => {
                const isDone = completedSteps[idx];
                return (
                  <div 
                    key={idx} 
                    className="step-card"
                    style={{
                      background: isDone ? 'rgba(16, 185, 129, 0.06)' : 'rgba(14, 19, 32, 0.7)',
                      borderColor: isDone ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-subtle)',
                      borderLeftColor: isDone ? 'var(--emerald-green)' : 'var(--snapdragon-red)',
                      transition: 'all 0.2s ease',
                      borderRadius: '10px',
                      padding: '14px 16px',
                      marginBottom: '0'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: '700', color: isDone ? '#34D399' : '#FFFFFF' }}>
                        {step.title}
                      </span>
                      <button
                        onClick={() => toggleStepCompleted(idx)}
                        style={{
                          background: isDone ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                          border: `1px solid ${isDone ? 'var(--emerald-green)' : 'var(--border-subtle)'}`,
                          color: isDone ? '#34D399' : 'var(--slate-silver)',
                          borderRadius: '14px',
                          padding: '3px 8px',
                          fontSize: '11px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {isDone ? <Check size={12} /> : null}
                        <span>{isDone ? 'Understood' : 'Mark as Understood'}</span>
                      </button>
                    </div>

                    <div style={{ fontSize: '13px', color: '#CBD5E1', whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                      {step.content}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Follow-Up Doubt Bar */}
            <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--slate-silver)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MessageCircle size={14} color="var(--npu-cyan)" />
                <span>Ask a Follow-Up Question on this Problem</span>
              </div>

              {followUpResponses.map((res, i) => (
                <div key={i} style={{ background: 'rgba(7, 9, 15, 0.7)', borderRadius: '8px', padding: '10px 14px', marginBottom: '8px', border: '1px solid var(--border-cyan)' }}>
                  <div style={{ fontSize: '11.5px', color: 'var(--npu-cyan)', fontWeight: '600' }}>You: "{res.query}"</div>
                  <div style={{ fontSize: '12.5px', color: '#F1F5F9', marginTop: '4px' }}>{res.answer}</div>
                </div>
              ))}

              <form onSubmit={handleSendFollowUp} style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text"
                  value={followUpQuery}
                  onChange={(e) => setFollowUpQuery(e.target.value)}
                  placeholder="e.g. What if the mirror was convex? or Explain step 2 in simpler words..."
                  style={{
                    flex: 1,
                    background: 'rgba(6, 9, 16, 0.8)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    color: '#FFF',
                    fontSize: '12.5px',
                    outline: 'none'
                  }}
                />
                <button type="submit" className="action-btn-primary" style={{ padding: '8px 16px' }} disabled={!followUpQuery.trim()}>
                  <Send size={13} />
                </button>
              </form>
            </div>

            {/* 3 Related Practice Questions with Interactive Reveal */}
            <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#FFFFFF', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HelpCircle size={15} color="var(--snapdragon-red)" />
                <span>Related Practice Questions for Revision</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {activeProblem.practiceQuestions.map((q, idx) => (
                  <div key={idx} style={{ background: 'rgba(6, 9, 16, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '12.5px', color: '#F8FAFC' }}>
                        <strong style={{ color: 'var(--snapdragon-crimson)' }}>Q{idx + 1}.</strong> {q.q}
                      </span>
                      <button 
                        onClick={() => toggleHint(idx)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--npu-cyan)',
                          fontSize: '11px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px',
                          whiteSpace: 'nowrap',
                          marginLeft: '8px'
                        }}
                      >
                        <span>{revealedHints[idx] ? 'Hide' : 'Hint'}</span>
                        {revealedHints[idx] ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>
                    </div>

                    {revealedHints[idx] && (
                      <div style={{ marginTop: '6px', paddingTop: '6px', borderTop: '1px dashed rgba(255,255,255,0.08)', fontSize: '11.5px', color: 'var(--slate-silver)', fontStyle: 'italic' }}>
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
