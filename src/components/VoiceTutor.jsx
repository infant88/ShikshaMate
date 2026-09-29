import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Send, 
  Cpu, 
  Zap, 
  Sparkles, 
  Radio, 
  User, 
  Bot, 
  MessageSquare,
  Play,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import { VOICE_CONVERSATION_SAMPLES } from '../data/curriculumData';

export default function VoiceTutor({ selectedCurriculum, selectedLang, onTriggerInference }) {
  const [isListening, setIsListening] = useState(false);
  const [transcriptInput, setTranscriptInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'bot',
      text: selectedLang === 'hi' 
        ? 'नमस्ते! मैं ShikshaMate Voice AI हूँ। आप बोलकर या लिखकर NCERT, JEE या NEET के किसी भी विषय पर अपने डाउट्स पूछ सकते हैं।'
        : 'Hello! I am ShikshaMate Voice AI. Tap the red orb or speak to ask doubts in Science, Math, or Exam prep!',
      timestamp: 'Just now',
      stats: { latency: '190ms', model: 'Whisper INT8 + Phi-3-mini INT4', npuPower: '2.8W' }
    }
  ]);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);

  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = selectedLang === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results).map(r => r[0].transcript).join('');
        setTranscriptInput(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }
  }, [selectedLang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.lang = selectedLang === 'hi' ? 'hi-IN' : 'en-IN';
          recognitionRef.current.start();
          setIsListening(true);
        } catch (e) {
          setIsListening(false);
        }
      } else {
        // Fallback simulation for browsers without Web Speech recognition
        setIsListening(true);
        setTimeout(() => {
          setTranscriptInput(selectedLang === 'hi' ? 'न्यूटन का दूसरा नियम समझाइए' : 'Explain Lenz\'s law with energy conservation');
          setIsListening(false);
        }, 1400);
      }
    }
  };

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || transcriptInput).trim();
    if (!query) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setTranscriptInput('');
    onTriggerInference(88, 3.4);

    setTimeout(() => {
      const matchedSample = VOICE_CONVERSATION_SAMPLES.find(s => 
        query.toLowerCase().includes(s.subject.toLowerCase()) || 
        query.toLowerCase().includes('newton') || 
        query.toLowerCase().includes('lenz') ||
        query.toLowerCase().includes('rubisco')
      ) || VOICE_CONVERSATION_SAMPLES[0];

      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: matchedSample.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        stats: matchedSample.stats
      };

      setMessages(prev => [...prev, botMsg]);
      onTriggerInference(22, 1.6);
      speakResponse(matchedSample.voiceSnippet || botMsg.text.slice(0, 180));
    }, 550);
  };

  const speakResponse = (text) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = speechRate;

    utterance.onstart = () => setIsSynthesizing(true);
    utterance.onend = () => setIsSynthesizing(false);
    utterance.onerror = () => setIsSynthesizing(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSynthesizing(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Interactive Hero Voice Sphere Banner */}
      <div className="card-panel glow-red" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
        
        {/* Left Info & Chips */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ 
              background: 'rgba(230, 0, 18, 0.15)', 
              color: 'var(--snapdragon-crimson)', 
              fontSize: '11px', 
              fontWeight: '700', 
              padding: '2px 8px', 
              borderRadius: '12px' 
            }}>
              Module 2 • Hexagon NPU
            </span>
            <h2 style={{ fontSize: '18px' }}>Voice-First AI Tutoring Interface</h2>
          </div>
          <p style={{ color: 'var(--slate-silver)', fontSize: '13px', marginBottom: '14px' }}>
            Tap the glowing Snapdragon Orb or click a question to speak. All audio processing is completely offline with sub-300ms latency.
          </p>

          {/* Quick Voice Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {VOICE_CONVERSATION_SAMPLES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleSendMessage(sample.userQuery)}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '18px',
                  padding: '6px 14px',
                  color: '#F1F5F9',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--npu-cyan)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
              >
                <Sparkles size={12} color="var(--npu-cyan)" />
                <span>"{sample.userQuery.slice(0, 38)}..."</span>
              </button>
            ))}
          </div>
        </div>

        {/* Center / Right: Glowing Interactive Voice Orb */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div className="voice-orb-wrapper">
            <div className="orb-ring" />
            <div 
              className={`voice-orb ${(isListening || isSynthesizing) ? 'active-pulse' : ''}`}
              onClick={toggleListening}
              title={isListening ? 'Listening... click to stop' : 'Click to Speak'}
            >
              {isListening ? (
                <MicOff size={32} color="#FFF" />
              ) : (
                <Mic size={32} color="#FFF" />
              )}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span style={{ 
              fontSize: '11.5px', 
              fontWeight: '700', 
              fontFamily: 'var(--font-mono)',
              color: isListening ? 'var(--snapdragon-crimson)' : isSynthesizing ? 'var(--npu-cyan)' : 'var(--slate-silver)' 
            }}>
              {isListening ? '● LISTENING (Whisper INT8)' : isSynthesizing ? '● SPEAKING (FastSpeech2)' : 'Tap Orb to Speak'}
            </span>
          </div>
        </div>

      </div>

      {/* Main Dialogue Conversation Area */}
      <div className="card-panel" style={{ display: 'flex', flexDirection: 'column', height: '540px', padding: '18px' }}>
        
        {/* Dialogue Stream Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={16} color="var(--snapdragon-red)" />
            <span style={{ fontSize: '13px', fontWeight: '700' }}>Live Conversational Stream</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isSynthesizing && (
              <button 
                onClick={stopSpeaking}
                style={{
                  background: 'rgba(230,0,18,0.15)',
                  border: '1px solid rgba(230,0,18,0.3)',
                  color: 'var(--snapdragon-crimson)',
                  borderRadius: '14px',
                  padding: '3px 10px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <VolumeX size={12} />
                <span>Mute</span>
              </button>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--slate-silver)' }}>
              <span>Speed:</span>
              {[0.8, 1.0, 1.25].map(rate => (
                <button
                  key={rate}
                  onClick={() => setSpeechRate(rate)}
                  style={{
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: speechRate === rate ? 'var(--snapdragon-red)' : 'transparent',
                    border: '1px solid var(--border-subtle)',
                    color: '#FFF',
                    fontSize: '10px',
                    cursor: 'pointer'
                  }}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Message Bubble Feed */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '6px' }}>
          {messages.map((msg) => (
            <div 
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                gap: '4px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                {msg.sender === 'user' ? (
                  <>
                    <span>You</span>
                    <User size={12} />
                  </>
                ) : (
                  <>
                    <Bot size={12} color="var(--npu-cyan)" />
                    <span>ShikshaMate Tutor</span>
                  </>
                )}
                <span>• {msg.timestamp}</span>
              </div>

              <div 
                style={{
                  maxWidth: '85%',
                  padding: '12px 18px',
                  borderRadius: msg.sender === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                  background: msg.sender === 'user' 
                    ? 'linear-gradient(135deg, rgba(230, 0, 18, 0.3), rgba(230, 0, 18, 0.15))' 
                    : 'rgba(14, 20, 36, 0.85)',
                  border: `1px solid ${msg.sender === 'user' ? 'var(--border-glow)' : 'var(--border-subtle)'}`,
                  color: '#F8FAFC',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-line'
                }}
              >
                {msg.text}

                {msg.stats && (
                  <div style={{ 
                    marginTop: '8px', 
                    paddingTop: '6px', 
                    borderTop: '1px solid rgba(255,255,255,0.06)', 
                    fontSize: '11px', 
                    fontFamily: 'var(--font-mono)', 
                    color: 'var(--slate-silver)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <span>⚡ <strong style={{ color: 'var(--npu-cyan)' }}>{msg.stats.latency}</strong></span>
                    <span>🔋 <strong style={{ color: 'var(--emerald-green)' }}>{msg.stats.npuPower}</strong></span>
                    <button 
                      onClick={() => speakResponse(msg.text)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--npu-cyan)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                        marginLeft: 'auto'
                      }}
                    >
                      <Volume2 size={12} />
                      <span>Replay</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', marginTop: '8px' }}>
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
          >
            <button 
              type="button"
              onClick={toggleListening}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                background: isListening ? 'var(--snapdragon-red)' : 'rgba(255,255,255,0.06)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} color="var(--snapdragon-red)" />}
            </button>

            <input 
              type="text"
              value={transcriptInput}
              onChange={(e) => setTranscriptInput(e.target.value)}
              placeholder={isListening ? "Listening with Whisper INT8... Speak now..." : "Type or speak your doubt in Hindi or English..."}
              style={{
                flex: 1,
                background: 'rgba(6, 9, 16, 0.8)',
                border: `1px solid ${isListening ? 'var(--snapdragon-red)' : 'var(--border-subtle)'}`,
                borderRadius: '24px',
                padding: '9px 18px',
                color: '#FFF',
                fontSize: '13px',
                outline: 'none'
              }}
            />

            <button 
              type="submit" 
              className="action-btn-primary" 
              style={{ borderRadius: '20px', padding: '9px 18px' }}
              disabled={!transcriptInput.trim()}
            >
              <Send size={14} />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
