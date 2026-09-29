import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Award, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Globe2, 
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function SubmissionPitch() {
  const [copied, setCopied] = useState(false);

  const handleCopyText = () => {
    const text = document.getElementById('submission-content')?.innerText;
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <span className="badge badge-red">Competition Submission</span>
            <h2 style={{ fontSize: '18px' }}>Round 1 Official Intake Form & Technical Dossier</h2>
            <span className="badge badge-green">Judge Ready</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
            Snapdragon® AI Lab Build & Present Challenge 2026. Optimized for HP OmniBook (Snapdragon X Series).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" onClick={handleCopyText}>
            {copied ? <Check size={16} color="var(--success-emerald)" /> : <Copy size={16} />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Full Form'}</span>
          </button>

          <button className="btn-primary" onClick={handlePrint}>
            <Download size={16} />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Judging Criteria Highlights */}
      <div className="grid-3">
        <div className="glass-card" style={{ padding: '16px', borderTop: '3px solid var(--snapdragon-red)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Award size={16} color="var(--snapdragon-crimson)" />
            <span style={{ fontSize: '13px', fontWeight: '700' }}>Indian Context & Impact</span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--hp-slate)' }}>
            250M+ students, NCERT alignment, Hindi & regional language roadmaps. Solves real digital divide and power outages.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '16px', borderTop: '3px solid var(--npu-cyan)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Cpu size={16} color="var(--npu-cyan)" />
            <span style={{ fontSize: '13px', fontWeight: '700' }}>Snapdragon NPU-First</span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--hp-slate)' }}>
            Built specifically for Hexagon NPU (45+ TOPS) using Qualcomm AI Hub models (Phi-3 INT4, Whisper INT8, TrOCR). Sub-4W power.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '16px', borderTop: '3px solid var(--success-emerald)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <ShieldCheck size={16} color="var(--success-emerald)" />
            <span style={{ fontSize: '13px', fontWeight: '700' }}>Zero Cloud & Cost</span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--hp-slate)' }}>
            100% offline, zero data exfiltration, zero per-use API fees. Complete privacy protection for minors and student notes.
          </p>
        </div>
      </div>

      {/* Full Document Viewport */}
      <div 
        id="submission-content" 
        className="glass-card" 
        style={{ padding: '36px 44px', lineHeight: '1.7', background: 'rgba(10, 14, 25, 0.85)', color: '#E2E8F0' }}
      >
        <div style={{ borderBottom: '2px solid var(--border-accent)', paddingBottom: '20px', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '26px', color: '#FFFFFF', marginBottom: '6px' }}>ShikshaMate</h1>
          <h3 style={{ fontSize: '16px', color: 'var(--snapdragon-crimson)', fontWeight: '600' }}>
            An Offline-First, Privacy-Preserving AI Learning Companion for Indian Students on Snapdragon-Powered HP PCs
          </h3>
          <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '12px', color: 'var(--hp-slate)', fontFamily: 'var(--font-mono)' }}>
            <span><strong>Challenge:</strong> Snapdragon® AI Lab Build & Present Challenge 2026</span>
            <span><strong>Target Hardware:</strong> HP OmniBook (Snapdragon X / X Plus / X2 Plus)</span>
            <span><strong>Models:</strong> Qualcomm AI Hub (Phi-3 INT4, Whisper INT8, TrOCR)</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '14px' }}>
          
          <section>
            <h3 style={{ fontSize: '16px', color: 'var(--npu-cyan)', marginBottom: '8px' }}>1. PROJECT TITLE & TAGLINE</h3>
            <p><strong>Title:</strong> ShikshaMate: An Offline-First, Privacy-Preserving AI Learning Companion for Indian Students on Snapdragon-Powered HP PCs</p>
            <p><strong>Tagline:</strong> A fully on-device AI tutor that helps Indian students across NCERT, competitive exams, and regional boards — with no internet, no cloud, and no cost per use.</p>
          </section>

          <section>
            <h3 style={{ fontSize: '16px', color: 'var(--npu-cyan)', marginBottom: '8px' }}>2. PROBLEM STATEMENT</h3>
            <p>India has over 250 million school and college students, yet the vast majority lack access to quality, personalized tutoring. Existing AI-powered study tools fail Indian students on three critical fronts:</p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
              <li><strong>Connectivity Dependency:</strong> Mainstream AI tutoring tools require continuous high-speed internet, making them unusable in Tier 2/3 cities, rural areas, and during load-shedding power outages.</li>
              <li><strong>Language & Curriculum Gap:</strong> Current AI tools are English-first and lack native alignment with NCERT, state board syllabi (Maharashtra, Tamil Nadu, UP, Rajasthan), or competitive patterns (JEE, NEET, UPSC).</li>
              <li><strong>Privacy & Cost Barriers:</strong> Cloud-based tools transmit textbook photos and voice notes to external servers, creating data privacy risks for minors while imposing recurring API costs unaffordable for most Indian families.</li>
            </ul>
          </section>

          <section>
            <h3 style={{ fontSize: '16px', color: 'var(--npu-cyan)', marginBottom: '8px' }}>3. PROPOSED SOLUTION & CORE MODULES</h3>
            <p>ShikshaMate runs entirely on the device — powered by Qualcomm AI Hub models and accelerated by the Snapdragon Hexagon NPU (45+ TOPS) on HP OmniBook PCs:</p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
              <li><strong>📷 Multimodal Doubt Solver:</strong> Students photograph textbook pages or handwritten problems. On-device TrOCR extracts formulas and text, and a quantized SLM (Phi-3-mini INT4) delivers step-by-step solutions with marking scheme tips and 3 auto-generated practice questions.</li>
              <li><strong>🎙️ Voice-First Tutoring Interface:</strong> Students ask doubts verbally in English or Hindi. On-device Whisper (INT8) transcribes in real-time (&lt;300ms), the local SLM reasons through the question, and an on-device TTS engine speaks the explanation aloud — completely hands-free and offline.</li>
              <li><strong>🧠 Adaptive Quiz & Revision Engine:</strong> Tracks mastery across 800+ curriculum concepts in a local SQLite database. Generates personalized MCQs, assertion-reasoning, and mock tests with real-time difficulty calibration and SM-2 spaced repetition scheduling.</li>
            </ul>
          </section>

          <section>
            <h3 style={{ fontSize: '16px', color: 'var(--npu-cyan)', marginBottom: '8px' }}>4. SNAPDRAGON & QUALCOMM AI HUB TECHNICAL ARCHITECTURE</h3>
            <p>ShikshaMate is architected specifically to exploit Snapdragon's hardware advantage:</p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
              <li><strong>Qualcomm Hexagon NPU:</strong> Executes all heavy neural tensor workloads (Phi-3 INT4, Whisper INT8, TrOCR INT8, MiniLM Embeddings) via ONNX Runtime with Qualcomm QNN Execution Provider.</li>
              <li><strong>Qualcomm Oryon CPU:</strong> Manages application UI, local SQLite database I/O, curriculum taxonomy routing, and tokenization.</li>
              <li><strong>Power Efficiency:</strong> Active AI tutoring sessions operate at sub-4W inference draw, enabling 10+ hours of continuous offline learning on battery.</li>
              <li><strong>Memory Footprint:</strong> All quantized models together occupy under 3.5GB of RAM, easily running on entry-level 16GB HP OmniBook configurations.</li>
            </ul>
          </section>

          <section>
            <h3 style={{ fontSize: '16px', color: 'var(--npu-cyan)', marginBottom: '8px' }}>5. PERFORMANCE BENCHMARKS (SNAPDRAGON X TARGET)</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '8px', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--hp-silver)' }}>
                  <th style={{ padding: '8px' }}>Operation</th>
                  <th style={{ padding: '8px' }}>Target Latency</th>
                  <th style={{ padding: '8px' }}>Hardware Engine</th>
                  <th style={{ padding: '8px' }}>Quantization</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '8px' }}>Image OCR & Formula Extraction</td>
                  <td style={{ padding: '8px', color: 'var(--npu-cyan)' }}>&lt; 1.5 seconds</td>
                  <td style={{ padding: '8px' }}>Hexagon NPU</td>
                  <td style={{ padding: '8px' }}>INT8</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '8px' }}>SLM Step-by-Step Response (100 tokens)</td>
                  <td style={{ padding: '8px', color: 'var(--npu-cyan)' }}>&lt; 2.0 seconds</td>
                  <td style={{ padding: '8px' }}>Hexagon NPU</td>
                  <td style={{ padding: '8px' }}>INT4 (W4A16)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '8px' }}>Speech-to-Text (5s Audio Chunk)</td>
                  <td style={{ padding: '8px', color: 'var(--npu-cyan)' }}>&lt; 300 ms</td>
                  <td style={{ padding: '8px' }}>Hexagon NPU</td>
                  <td style={{ padding: '8px' }}>INT8</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '8px' }}>Active System Power Draw</td>
                  <td style={{ padding: '8px', color: 'var(--success-emerald)' }}>&lt; 4.0 Watts</td>
                  <td style={{ padding: '8px' }}>Snapdragon X SoC</td>
                  <td style={{ padding: '8px' }}>Sub-4W Active</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h3 style={{ fontSize: '16px', color: 'var(--npu-cyan)', marginBottom: '8px' }}>6. QUANTIFIED IMPACT & SCALABILITY</h3>
            <p>With an addressable market of 250M+ Indian students, ShikshaMate replaces costly private coaching (₹3,000–₹8,000/month) with an accessible, on-device companion. Its zero-cloud architecture makes it ideal for pre-installation on Snapdragon HP PCs distributed through Indian governmental education initiatives (PM e-Vidya and NDEAR).</p>
          </section>

        </div>
      </div>

    </div>
  );
}
