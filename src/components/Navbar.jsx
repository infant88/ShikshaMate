import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  WifiOff, 
  Zap, 
  Camera, 
  Mic, 
  Brain, 
  BookOpen, 
  FileText, 
  Layers, 
  Globe, 
  Award,
  Activity
} from 'lucide-react';
import { CURRICULUM_OPTIONS, LANGUAGES } from '../data/curriculumData';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  selectedCurriculum, 
  setSelectedCurriculum, 
  selectedLang, 
  setSelectedLang,
  npuLiveStats 
}) {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header>
      {/* Top Snapdragon Hardware Telemetry & Security Header */}
      <div className="telemetry-bar">
        <div className="telemetry-group">
          <div className="offline-badge">
            <span className="pulse-dot"></span>
            <WifiOff size={13} />
            <span>100% OFFLINE SANDBOX</span>
          </div>

          <div className="telemetry-item">
            <ShieldCheck size={14} color="#10B981" />
            <span>Data Exfiltration: <span className="telemetry-val highlight-green">0 Bytes</span></span>
          </div>

          <div className="telemetry-item">
            <Cpu size={14} color="#00F2FE" />
            <span>Qualcomm Hexagon NPU: <span className="telemetry-val highlight-cyan">{npuLiveStats.activeTops} TOPS</span> / 45 TOPS Peak</span>
          </div>

          <div className="telemetry-item">
            <Zap size={14} color="#F59E0B" />
            <span>Power Draw: <span className="telemetry-val highlight-cyan">{npuLiveStats.powerWatt}W</span> (Sub-4W Active)</span>
          </div>
        </div>

        <div className="telemetry-group">
          <div className="telemetry-item">
            <span>HP OmniBook X (Snapdragon X Elite)</span>
          </div>
          <div className="telemetry-item">
            <Activity size={13} color="#8A99AD" />
            <span>QNN EP: <span className="telemetry-val highlight-green">ACTIVE</span></span>
          </div>
          <div className="telemetry-item">
            <span>{currentTime}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <nav className="main-header">
        <div className="brand-section">
          <div className="brand-logo-wrap">
            <Cpu size={26} color="#FFFFFF" />
          </div>
          <div className="brand-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1>ShikshaMate</h1>
              <span className="badge badge-red" style={{ fontSize: '10px', padding: '2px 6px' }}>Snapdragon AI</span>
            </div>
            <div className="brand-tagline">
              <span>HP OmniBook Edition</span>
              <span>•</span>
              <span style={{ color: 'var(--npu-cyan)' }}>Qualcomm AI Hub Powered</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="nav-tabs">
          <button 
            className={`nav-tab-btn ${activeTab === 'doubt' ? 'active' : ''}`}
            onClick={() => setActiveTab('doubt')}
          >
            <Camera size={16} />
            <span>Doubt Solver</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'voice' ? 'active' : ''}`}
            onClick={() => setActiveTab('voice')}
          >
            <Mic size={16} />
            <span>Voice Tutor</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => setActiveTab('quiz')}
          >
            <Brain size={16} />
            <span>Adaptive Quiz</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'telemetry' ? 'active' : ''}`}
            onClick={() => setActiveTab('telemetry')}
          >
            <Cpu size={16} />
            <span>Snapdragon NPU</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'curriculum' ? 'active' : ''}`}
            onClick={() => setActiveTab('curriculum')}
          >
            <BookOpen size={16} />
            <span>Knowledge Vault</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'dossier' ? 'active' : ''}`}
            onClick={() => setActiveTab('dossier')}
          >
            <FileText size={16} />
            <span>Submission Dossier</span>
          </button>
        </div>

        {/* Target Board & Language Switcher */}
        <div className="header-controls">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={15} color="var(--hp-slate)" />
            <select 
              className="select-pill"
              value={selectedCurriculum}
              onChange={(e) => setSelectedCurriculum(e.target.value)}
              title="Target Curriculum / Exam"
            >
              {CURRICULUM_OPTIONS.map(c => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Globe size={15} color="var(--hp-slate)" />
            <select 
              className="select-pill"
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              title="Tutoring Language"
            >
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>
                  {l.native} ({l.label})
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>
    </header>
  );
}
