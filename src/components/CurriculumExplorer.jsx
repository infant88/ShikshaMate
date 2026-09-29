import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  Sparkles, 
  Layers, 
  Key,
  ExternalLink,
  Loader2,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { UI_TRANSLATIONS } from '../data/translations';
import { searchFormulaWithGemini, getGeminiApiKey } from '../services/geminiService';

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

export default function CurriculumExplorer({ 
  selectedCurriculum, 
  setSelectedCurriculum, 
  selectedLang,
  onOpenApiKeyModal 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [customFormulas, setCustomFormulas] = useState([]);
  const [isSearchingGemini, setIsSearchingGemini] = useState(false);
  const [geminiError, setGeminiError] = useState('');

  const t = (UI_TRANSLATIONS[selectedLang] || UI_TRANSLATIONS.en).curriculum;

  const subjectPills = [
    { id: 'All', label: t.all },
    { id: 'Physics', label: t.physics },
    { id: 'Chemistry', label: t.chemistry },
    { id: 'Biology', label: t.biology },
    { id: 'Mathematics', label: t.mathematics }
  ];

  const allFormulas = [...customFormulas, ...FORMULA_VAULT];

  const filteredFormulas = allFormulas.filter(item => {
    const matchesSubject = selectedSubject === 'All' || item.subject.toLowerCase() === selectedSubject.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesSubject;

    const matchesQuery = item.title.toLowerCase().includes(query) || 
                         item.formula.toLowerCase().includes(query) ||
                         item.topic.toLowerCase().includes(query);
    return matchesSubject && matchesQuery;
  });

  const handleSearchWithGemini = async () => {
    if (!searchQuery.trim()) return;
    const hasKey = getGeminiApiKey();
    if (!hasKey) {
      if (onOpenApiKeyModal) onOpenApiKeyModal();
      return;
    }

    setIsSearchingGemini(true);
    setGeminiError('');

    try {
      const result = await searchFormulaWithGemini(searchQuery, selectedSubject, selectedLang);
      setCustomFormulas(prev => [result, ...prev]);
    } catch (err) {
      if (err.message === 'MISSING_API_KEY') {
        if (onOpenApiKeyModal) onOpenApiKeyModal();
      } else {
        setGeminiError(err.message || 'Failed to fetch formula via Gemini API.');
      }
    } finally {
      setIsSearchingGemini(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Banner */}
      <div className="card-panel glow-red" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <span style={{ 
              background: 'rgba(230, 0, 18, 0.15)', 
              color: 'var(--snapdragon-crimson)', 
              fontSize: '11px', 
              fontWeight: '700', 
              padding: '2px 8px', 
              borderRadius: '12px' 
            }}>
              {t.badge}
            </span>
            <h2 style={{ fontSize: '18px' }}>{t.title}</h2>
          </div>
          <p style={{ color: 'var(--slate-silver)', fontSize: '12.5px' }}>
            {t.desc}
          </p>
        </div>

        {/* Subject Pills */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {subjectPills.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedSubject(s.id)}
              className={selectedSubject === s.id ? 'action-btn-primary' : 'action-btn-secondary'}
              style={{ padding: '6px 14px', fontSize: '11.5px' }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar with Gemini Expansion */}
      <div className="card-panel" style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Search size={16} color="var(--npu-cyan)" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setGeminiError(''); }}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSearchWithGemini(); }}
          placeholder={t.searchPlaceholder}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#FFFFFF',
            fontSize: '13px',
            fontFamily: 'var(--font-body)'
          }}
        />

        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            style={{ background: 'none', border: 'none', color: 'var(--slate-silver)', cursor: 'pointer', fontSize: '12px', marginRight: '6px' }}
          >
            Clear
          </button>
        )}

        <button 
          onClick={handleSearchWithGemini}
          disabled={isSearchingGemini || !searchQuery.trim()}
          className="action-btn-cyan"
          style={{ padding: '6px 14px', fontSize: '12px' }}
          title="Search any formula live via Gemini API in your selected language"
        >
          {isSearchingGemini ? <Loader2 size={13} className="pulse-indicator" /> : <Sparkles size={13} />}
          <span>{isSearchingGemini ? 'Searching Gemini...' : 'Search with Gemini'}</span>
        </button>
      </div>

      {/* Error alert if any */}
      {geminiError && (
        <div style={{ 
          background: 'rgba(230, 0, 18, 0.12)', 
          border: '1px solid rgba(230, 0, 18, 0.3)', 
          borderRadius: '8px', 
          padding: '10px 14px', 
          color: '#F87171', 
          fontSize: '12.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertCircle size={15} />
          <span>{geminiError}</span>
        </div>
      )}

      {/* When no local match is found */}
      {filteredFormulas.length === 0 && searchQuery && (
        <div className="card-panel glow-cyan" style={{ textAlign: 'center', padding: '30px 20px' }}>
          <Sparkles size={36} color="var(--npu-cyan)" style={{ margin: '0 auto 10px' }} />
          <h4 style={{ fontSize: '16px', color: '#FFF', marginBottom: '6px' }}>
            "{searchQuery}" is not in the offline seed database
          </h4>
          <p style={{ color: 'var(--slate-silver)', fontSize: '13px', maxWidth: '520px', margin: '0 auto 16px' }}>
            Click below to generate and translate this formula live with Gemini AI in your selected language!
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button 
              className="action-btn-primary"
              onClick={handleSearchWithGemini}
              disabled={isSearchingGemini}
            >
              <Sparkles size={14} />
              <span>Generate "{searchQuery}" with Gemini</span>
            </button>

            {!getGeminiApiKey() && (
              <button 
                className="action-btn-secondary"
                onClick={onOpenApiKeyModal}
              >
                <Key size={14} color="var(--npu-cyan)" />
                <span>Configure Gemini API Key</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Formulas & Exam Insights Grid */}
      <div className="grid-2">
        {filteredFormulas.map((item, idx) => (
          <div key={idx} className="card-panel glow-red" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--snapdragon-crimson)', fontWeight: '700', textTransform: 'uppercase' }}>
                    {item.subject} • {item.topic}
                  </span>
                  {item.isGeminiGenerated && (
                    <span style={{ 
                      background: 'rgba(0, 242, 254, 0.12)', 
                      border: '1px solid rgba(0, 242, 254, 0.3)', 
                      color: 'var(--npu-cyan)', 
                      fontSize: '10px', 
                      fontWeight: '700', 
                      padding: '1px 6px', 
                      borderRadius: '8px' 
                    }}>
                      ✨ Gemini AI
                    </span>
                  )}
                </div>
                <h4 style={{ fontSize: '15px', color: '#FFF', marginTop: '2px' }}>{item.title}</h4>
              </div>
              <Bookmark size={14} color="var(--slate-silver)" style={{ cursor: 'pointer' }} />
            </div>

            {/* Formula Block */}
            <div style={{ 
              background: '#06080F', 
              border: '1px solid var(--border-cyan)', 
              borderRadius: '8px', 
              padding: '10px 14px', 
              fontFamily: 'var(--font-mono)', 
              color: 'var(--npu-cyan)',
              fontSize: '13px',
              fontWeight: '600',
              marginBottom: '10px'
            }}>
              {item.formula}
            </div>

            {/* Concept if present */}
            {item.concept && (
              <p style={{ fontSize: '12px', color: '#E2E8F0', marginBottom: '8px', fontStyle: 'italic' }}>
                {item.concept}
              </p>
            )}

            {/* Exam Note */}
            <div style={{ fontSize: '12px', color: '#CBD5E1', lineHeight: '1.5' }}>
              <span style={{ color: 'var(--amber-gold)', fontWeight: '700' }}>Examiner Note: </span>
              {item.examNote}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
