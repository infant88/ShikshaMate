import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  Sparkles, 
  FileText, 
  Layers, 
  CheckCircle,
  ExternalLink,
  Tag
} from 'lucide-react';
import { CURRICULUM_OPTIONS } from '../data/curriculumData';

export const FORMULA_VAULT = [
  {
    subject: 'Physics',
    topic: 'Ray Optics',
    title: 'Mirror Formula & Magnification',
    formula: '1/f = 1/v + 1/u  |  m = -v/u = h₂/h₁',
    examNote: 'Sign convention: Concave f < 0, Convex f > 0. For real image m < 0, virtual image m > 0.'
  },
  {
    subject: 'Physics',
    topic: 'Rotational Motion',
    title: 'Acceleration on an Inclined Plane',
    formula: 'a = (g sin θ) / (1 + I_cm / MR²)',
    examNote: 'For solid sphere: k=2/5 → a = 5/7 g sin θ. For cylinder: k=1/2 → a = 2/3 g sin θ. Higher acceleration reaches bottom first.'
  },
  {
    subject: 'Chemistry',
    topic: 'Electrochemistry',
    title: 'Nernst Equation at 298 K',
    formula: 'E_cell = E°_cell - (0.0591 / n) log₁₀ Q',
    examNote: 'Remember to raise ionic concentrations to their stoichiometric powers in reaction quotient Q.'
  },
  {
    subject: 'Biology',
    topic: 'Genetics',
    title: 'Dihybrid Cross Ratios (YyRr × YyRr)',
    formula: 'Phenotypic: 9 : 3 : 3 : 1  |  Test Cross: 1 : 1 : 1 : 1',
    examNote: 'Recombinant frequency = (Total Recombinants / Total Offspring) × 100%. Linked genes deviate from 9:3:3:1.'
  },
  {
    subject: 'Mathematics',
    topic: 'Definite Integration',
    title: 'King\'s Property of Definite Integrals',
    formula: '∫[a to b] f(x) dx = ∫[a to b] f(a + b - x) dx',
    examNote: 'Essential for evaluating symmetrical integrals with sin/cos or e^x in CBSE Board 6-mark questions.'
  },
  {
    subject: 'Chemistry',
    topic: 'Chemical Kinetics',
    title: 'First Order Integrated Rate Law & Half-Life',
    formula: 'k = (2.303 / t) log₁₀([A]₀ / [A]_t)  |  t_½ = 0.693 / k',
    examNote: 'Half-life of first-order reaction is independent of initial reactant concentration [A]₀.'
  }
];

export default function CurriculumExplorer({ selectedCurriculum, setSelectedCurriculum }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');

  const filteredFormulas = FORMULA_VAULT.filter(item => {
    const matchesSubject = selectedSubject === 'All' || item.subject === selectedSubject;
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesQuery;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Banner */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <span className="badge badge-red">Knowledge Vault</span>
            <h2 style={{ fontSize: '18px' }}>Curriculum Taxonomy & Offline Formula Sheet</h2>
            <span className="curriculum-tag">NCERT • JEE • NEET • State Boards</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
            Pre-indexed local RAG vector store and formula reference sheets. Accessible instantly without an internet connection.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Physics', 'Chemistry', 'Biology', 'Mathematics'].map(subj => (
            <button
              key={subj}
              onClick={() => setSelectedSubject(subj)}
              className={`nav-tab-btn ${selectedSubject === subj ? 'active' : ''}`}
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              {subj}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="glass-card" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Search size={18} color="var(--npu-cyan)" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search formulas, concepts, theorems, or exam marking tips..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#FFFFFF',
            fontSize: '14px',
            fontFamily: 'var(--font-body)'
          }}
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px' }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Formulas & Exam Insights Grid */}
      <div className="grid-2">
        {filteredFormulas.map((item, idx) => (
          <div key={idx} className="glass-card red-border" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <span className="badge badge-red" style={{ fontSize: '10px', marginBottom: '4px' }}>
                  {item.subject} • {item.topic}
                </span>
                <h4 style={{ fontSize: '15px', color: '#FFF' }}>{item.title}</h4>
              </div>
              <Bookmark size={15} color="var(--hp-slate)" style={{ cursor: 'pointer' }} />
            </div>

            {/* Formula Block */}
            <div style={{ 
              background: '#06080F', 
              border: '1px solid var(--border-cyan)', 
              borderRadius: '8px', 
              padding: '12px 16px', 
              fontFamily: 'var(--font-mono)', 
              color: 'var(--npu-cyan)',
              fontSize: '13.5px',
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              {item.formula}
            </div>

            {/* Exam Note */}
            <div style={{ fontSize: '12.5px', color: '#CBD5E1', lineHeight: '1.5' }}>
              <span style={{ color: 'var(--warning-amber)', fontWeight: '700' }}>Examiner Tip: </span>
              {item.examNote}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
