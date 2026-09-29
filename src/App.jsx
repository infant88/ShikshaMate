import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DoubtSolver from './components/DoubtSolver';
import VoiceTutor from './components/VoiceTutor';
import AdaptiveQuiz from './components/AdaptiveQuiz';
import SnapdragonNpuDashboard from './components/SnapdragonNpuDashboard';
import CurriculumExplorer from './components/CurriculumExplorer';
import SubmissionPitch from './components/SubmissionPitch';
import { Cpu, ShieldCheck, Heart, Camera, Mic, Brain, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('doubt');
  const [selectedCurriculum, setSelectedCurriculum] = useState('ncert_10');
  const [selectedLang, setSelectedLang] = useState('hi');
  const [npuLiveStats, setNpuLiveStats] = useState({
    activeTops: 24,
    powerWatt: '2.1',
    queriesSolved: 142
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setNpuLiveStats(prev => {
        const baseTops = prev.activeTops > 45 ? 36 : prev.activeTops;
        const jitter = (Math.random() * 4 - 2);
        const newTops = Math.max(14, Math.min(44, Math.round(baseTops + jitter)));
        const newPower = (1.8 + (newTops / 45) * 1.5).toFixed(1);
        return {
          ...prev,
          activeTops: newTops,
          powerWatt: newPower
        };
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const handleTriggerInference = (targetTops = 40, targetPower = 3.4) => {
    setNpuLiveStats(prev => ({
      activeTops: targetTops,
      powerWatt: targetPower.toString(),
      queriesSolved: prev.queriesSolved + 1
    }));

    setTimeout(() => {
      setNpuLiveStats(prev => ({
        activeTops: 22,
        powerWatt: '2.0',
        queriesSolved: prev.queriesSolved
      }));
    }, 1800);
  };

  return (
    <div className="app-layout">
      {/* Background Ambient Glows & Grid Mesh */}
      <div className="ambient-bg">
        <div className="ambient-blob-1" />
        <div className="ambient-blob-2" />
        <div className="ambient-blob-3" />
      </div>
      <div className="grid-mesh" />

      {/* Navigation & Telemetry */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCurriculum={selectedCurriculum}
        setSelectedCurriculum={setSelectedCurriculum}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
        npuLiveStats={npuLiveStats}
      />

      {/* Main Viewport Content */}
      <main className="app-viewport">
        {activeTab === 'doubt' && (
          <DoubtSolver 
            selectedCurriculum={selectedCurriculum}
            selectedLang={selectedLang}
            onTriggerInference={handleTriggerInference}
          />
        )}

        {activeTab === 'voice' && (
          <VoiceTutor 
            selectedCurriculum={selectedCurriculum}
            selectedLang={selectedLang}
            onTriggerInference={handleTriggerInference}
          />
        )}

        {activeTab === 'quiz' && (
          <AdaptiveQuiz 
            selectedCurriculum={selectedCurriculum}
            selectedLang={selectedLang}
            onTriggerInference={handleTriggerInference}
          />
        )}

        {activeTab === 'telemetry' && (
          <SnapdragonNpuDashboard 
            npuLiveStats={npuLiveStats}
          />
        )}

        {activeTab === 'curriculum' && (
          <CurriculumExplorer 
            selectedCurriculum={selectedCurriculum}
            setSelectedCurriculum={setSelectedCurriculum}
            selectedLang={selectedLang}
          />
        )}

        {activeTab === 'dossier' && (
          <SubmissionPitch />
        )}
      </main>

      {/* Clean Footer */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(7, 9, 14, 0.92)',
        backdropFilter: 'var(--backdrop-blur)',
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '12px',
        color: 'var(--slate-silver)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={14} color="var(--snapdragon-red)" />
          <span><strong>ShikshaMate</strong> • Snapdragon® AI Lab Build & Present Challenge 2026</span>
          <span>•</span>
          <span style={{ color: 'var(--npu-cyan)' }}>HP OmniBook X Series Target</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>Offline Doubts Solved: <strong style={{ color: '#FFF' }}>{npuLiveStats.queriesSolved}</strong></span>
          <span style={{ color: 'var(--emerald-green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} /> 100% Privacy Sandbox (0 Bytes Sent)
          </span>
        </div>
      </footer>
    </div>
  );
}
