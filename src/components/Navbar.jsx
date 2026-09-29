import React, { useState } from 'react';
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
  Globe, 
  Award,
  Activity,
  ChevronDown
} from 'lucide-react';
import { CURRICULUM_OPTIONS, LANGUAGES } from '../data/curriculumData';
import { UI_TRANSLATIONS } from '../data/translations';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  selectedCurriculum, 
  setSelectedCurriculum, 
  selectedLang, 
  setSelectedLang,
  npuLiveStats 
}) {
  const [showFullTelemetry, setShowFullTelemetry] = useState(false);
  const t = UI_TRANSLATIONS[selectedLang] || UI_TRANSLATIONS.en;

  return (
    <header>
      {/* Sleek Minimalist Ambient Strip */}
      <div className="telemetry-strip">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div className="status-chip">
            <span className="pulse-indicator"></span>
            <WifiOff size={12} />
            <span>{t.offlineStatus}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px' }}>
            <Cpu size={13} color="var(--npu-cyan)" />
            <span>{t.npuLabel}: <strong style={{ color: 'var(--npu-cyan)' }}>{npuLiveStats.activeTops} TOPS</strong></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px' }}>
            <Zap size={13} color="var(--snapdragon-crimson)" />
            <span>{t.powerLabel}: <strong style={{ color: '#F1F5F9' }}>{npuLiveStats.powerWatt}W</strong></span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--slate-silver)' }}>
            <ShieldCheck size={13} color="var(--emerald-green)" />
            <span>{t.privacyLabel}</span>
          </div>

          <button
            onClick={() => setShowFullTelemetry(!showFullTelemetry)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--npu-cyan)',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>{showFullTelemetry ? 'Hide Details' : 'HP OmniBook Specs'}</span>
            <ChevronDown size={12} style={{ transform: showFullTelemetry ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
        </div>
      </div>

      {/* Expandable Hardware Quick Panel */}
      {showFullTelemetry && (
        <div style={{ 
          background: 'rgba(9, 13, 24, 0.95)', 
          borderBottom: '1px solid var(--border-subtle)', 
          padding: '10px 28px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          fontSize: '11.5px', 
          fontFamily: 'var(--font-mono)',
          color: 'var(--slate-silver)',
          animation: 'fadeIn 0.2s ease'
        }}>
          <span>SoC: <strong>Snapdragon® X Elite (X1E-80-100)</strong></span>
          <span>NPU Engine: <strong>Qualcomm Hexagon 45 TOPS</strong></span>
          <span>Runtime: <strong>ONNX Runtime + QNN EP</strong></span>
          <span>RAM Allocation: <strong>3.2 GB / 16 GB Unified LPDDR5x</strong></span>
          <span>Audio Buffer: <strong>Zero-Persistence Volatile RAM</strong></span>
        </div>
      )}

      {/* Main Navigation Bar */}
      <nav className="main-nav">
        <div className="nav-brand" onClick={() => setActiveTab('doubt')}>
          <div className="brand-icon">
            <Cpu size={22} color="#FFF" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="brand-title">{t.appTitle}</span>
              <span style={{ 
                background: 'rgba(230, 0, 18, 0.15)', 
                border: '1px solid rgba(230, 0, 18, 0.35)', 
                color: 'var(--snapdragon-crimson)', 
                fontSize: '10px', 
                fontWeight: '700', 
                padding: '1px 6px', 
                borderRadius: '8px' 
              }}>
                Snapdragon AI
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--slate-silver)', marginTop: '-2px' }}>
              {t.appSub}
            </div>
          </div>
        </div>

        {/* Primary Navigation Pills - Dynamically Localized */}
        <div className="nav-pill-group">
          <button 
            className={`nav-pill-btn ${activeTab === 'doubt' ? 'active' : ''}`}
            onClick={() => setActiveTab('doubt')}
          >
            <Camera size={15} />
            <span>{t.tabs.doubt}</span>
          </button>

          <button 
            className={`nav-pill-btn ${activeTab === 'voice' ? 'active' : ''}`}
            onClick={() => setActiveTab('voice')}
          >
            <Mic size={15} />
            <span>{t.tabs.voice}</span>
          </button>

          <button 
            className={`nav-pill-btn ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => setActiveTab('quiz')}
          >
            <Brain size={15} />
            <span>{t.tabs.quiz}</span>
          </button>

          <button 
            className={`nav-pill-btn ${activeTab === 'telemetry' ? 'active' : ''}`}
            onClick={() => setActiveTab('telemetry')}
          >
            <Activity size={15} />
            <span>{t.tabs.telemetry}</span>
          </button>

          <button 
            className={`nav-pill-btn ${activeTab === 'curriculum' ? 'active' : ''}`}
            onClick={() => setActiveTab('curriculum')}
          >
            <BookOpen size={15} />
            <span>{t.tabs.curriculum}</span>
          </button>

          <button 
            className={`nav-pill-btn ${activeTab === 'dossier' ? 'active' : ''}`}
            onClick={() => setActiveTab('dossier')}
          >
            <FileText size={15} />
            <span>{t.tabs.dossier}</span>
          </button>
        </div>

        {/* Curriculum & Language Selector Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={14} color="var(--slate-silver)" />
            <select 
              className="clean-select"
              value={selectedCurriculum}
              onChange={(e) => setSelectedCurriculum(e.target.value)}
              title="Target Syllabus / Exam"
            >
              {CURRICULUM_OPTIONS.map(c => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Globe size={14} color="var(--snapdragon-red)" />
            <select 
              className="clean-select"
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              title="Language"
              style={{ fontWeight: '700', borderColor: 'var(--border-accent)' }}
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
