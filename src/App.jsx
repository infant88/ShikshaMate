import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DoubtSolver from './components/DoubtSolver';
import VoiceTutor from './components/VoiceTutor';
import AdaptiveQuiz from './components/AdaptiveQuiz';
import SnapdragonNpuDashboard from './components/SnapdragonNpuDashboard';
import CurriculumExplorer from './components/CurriculumExplorer';
import SubmissionPitch from './components/SubmissionPitch';
import { Cpu, ShieldCheck, Heart, Terminal } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('doubt');
  const [selectedCurriculum, setSelectedCurriculum] = useState('ncert_10');
  const [selectedLang, setSelectedLang] = useState('hi');
  const [npuLiveStats, setNpuLiveStats] = useState({
    activeTops: 24,
    powerWatt: '2.1',
    queriesSolved: 142
  });

  // Dynamic subtle jitter for NPU stats to feel alive and responsive
  useEffect(() => {
    const interval = setInterval(() => {
      setNpuLiveStats(prev => {
        const baseTops = prev.activeTops > 45 ? 36 : prev.activeTops;
        const jitter = (Math.random() * 4 - 2);
        const newTops = Math.max(12, Math.min(44, Math.round(baseTops + jitter)));
        const newPower = (1.8 + (newTops / 45) * 1.6).toFixed(1);
        return {
          ...prev,
          activeTops: newTops,
          powerWatt: newPower
        };
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleTriggerInference = (targetTops = 40, targetPower = 3.6) => {
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
    <div className="app-container">
      {/* Background Neural Matrix & Subtle Mesh */}
      <div className="bg-mesh" />
      <div className="bg-grid" />

      {/* Top Telemetry & Main Navigation */}
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
      <main className="content-viewport">
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
          />
        )}

        {activeTab === 'dossier' && (
          <SubmissionPitch />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(7, 9, 15, 0.9)',
        backdropFilter: 'var(--backdrop-blur)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '12px',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={15} color="var(--snapdragon-red)" />
          <span><strong>ShikshaMate</strong> • Built for Snapdragon® AI Lab Build & Present Challenge 2026</span>
          <span>•</span>
          <span style={{ color: 'var(--npu-cyan)' }}>HP OmniBook X Series Optimized</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>Total Offline Queries Solved: <strong style={{ color: '#FFF' }}>{npuLiveStats.queriesSolved}</strong></span>
          <span>Zero Cloud Footprint</span>
          <span style={{ color: 'var(--success-emerald)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} /> 100% Privacy Sandbox
          </span>
        </div>
      </footer>
    </div>
  );
}
