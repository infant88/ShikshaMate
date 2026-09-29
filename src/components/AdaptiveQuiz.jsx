import React, { useState } from 'react';
import { 
  Brain, 
  Award, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  RotateCcw, 
  ChevronRight, 
  Flame, 
  Calendar, 
  Sparkles, 
  Clock, 
  Target,
  BarChart3,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_QUIZ_QUESTIONS, TOPIC_KNOWLEDGE_GRAPH } from '../data/curriculumData';

export default function AdaptiveQuiz({ selectedCurriculum, onTriggerInference }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [topics, setTopics] = useState(TOPIC_KNOWLEDGE_GRAPH);
  const [streakDays, setStreakDays] = useState(14);
  const [activeTabSub, setActiveTabSub] = useState('quiz'); // 'quiz' | 'heatmap' | 'spaced_repetition'

  const currentQ = MOCK_QUIZ_QUESTIONS[currentQIndex];

  const handleSelectOption = (optId) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctAnswer;
    onTriggerInference(85, 3.2);

    if (isCorrect) {
      setScore(prev => prev + 1);
      // Update topic knowledge graph
      setTopics(prev => prev.map(t => {
        if (t.name.toLowerCase().includes(currentQ.topic.toLowerCase())) {
          return { ...t, mastery: Math.min(100, t.mastery + 8) };
        }
        return t;
      }));
    } else {
      // Degrade mastery slightly
      setTopics(prev => prev.map(t => {
        if (t.name.toLowerCase().includes(currentQ.topic.toLowerCase())) {
          return { ...t, mastery: Math.max(20, t.mastery - 6), reviewsDue: t.reviewsDue + 1 };
        }
        return t;
      }));
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < MOCK_QUIZ_QUESTIONS.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setCompleted(true);
      if (score >= 2) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <span className="badge badge-red">Module 3</span>
            <h2 style={{ fontSize: '18px' }}>Adaptive Quiz & Revision Engine</h2>
            <span className="badge badge-cyan">SM-2 Spaced Repetition</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
            On-device difficulty calibration, knowledge graph tracking across 800+ curriculum concepts, and exam countdown planner.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(230, 0, 18, 0.15)', border: '1px solid var(--border-accent)', padding: '6px 14px', borderRadius: '20px' }}>
            <Flame size={16} color="var(--snapdragon-crimson)" />
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#FFF' }}>{streakDays} Day Streak!</span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button 
              className={`nav-tab-btn ${activeTabSub === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveTabSub('quiz')}
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              Quiz Drill
            </button>
            <button 
              className={`nav-tab-btn ${activeTabSub === 'heatmap' ? 'active' : ''}`}
              onClick={() => setActiveTabSub('heatmap')}
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              Mastery Heatmap
            </button>
          </div>
        </div>
      </div>

      {activeTabSub === 'quiz' ? (
        <div className="grid-2">
          
          {/* Left Column: Interactive Quiz Card */}
          <div className="glass-card red-border" style={{ padding: '24px' }}>
            {!completed ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-amber">{currentQ.difficulty}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{currentQ.examTag}</span>
                  </div>
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--npu-cyan)' }}>
                    Question {currentQIndex + 1} of {MOCK_QUIZ_QUESTIONS.length}
                  </span>
                </div>

                <div style={{ fontSize: '16px', fontWeight: '600', color: '#FFFFFF', marginBottom: '20px', lineHeight: '1.5' }}>
                  {currentQ.question}
                </div>

                {/* Options List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  {currentQ.options.map((opt) => {
                    let borderCol = 'var(--border-subtle)';
                    let bgCol = 'rgba(255, 255, 255, 0.03)';
                    let textColor = '#F1F5F9';

                    if (selectedOption === opt.id) {
                      borderCol = 'var(--npu-cyan)';
                      bgCol = 'rgba(0, 242, 254, 0.12)';
                    }

                    if (isAnswerSubmitted) {
                      if (opt.id === currentQ.correctAnswer) {
                        borderCol = 'var(--success-emerald)';
                        bgCol = 'rgba(16, 185, 129, 0.2)';
                        textColor = '#34D399';
                      } else if (selectedOption === opt.id && opt.id !== currentQ.correctAnswer) {
                        borderCol = 'var(--snapdragon-red)';
                        bgCol = 'rgba(230, 0, 18, 0.2)';
                        textColor = '#F87171';
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(opt.id)}
                        disabled={isAnswerSubmitted}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '14px 16px',
                          borderRadius: '8px',
                          background: bgCol,
                          border: `1.5px solid ${borderCol}`,
                          color: textColor,
                          textAlign: 'left',
                          cursor: isAnswerSubmitted ? 'default' : 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          background: 'rgba(255,255,255,0.08)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: '700'
                        }}>
                          {opt.id}
                        </span>
                        <span style={{ flex: 1, fontSize: '13.5px' }}>{opt.text}</span>
                        {isAnswerSubmitted && opt.id === currentQ.correctAnswer && (
                          <CheckCircle size={16} color="var(--success-emerald)" />
                        )}
                        {isAnswerSubmitted && selectedOption === opt.id && opt.id !== currentQ.correctAnswer && (
                          <XCircle size={16} color="var(--snapdragon-crimson)" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card after Submission */}
                {isAnswerSubmitted && (
                  <div style={{ 
                    background: 'rgba(7, 9, 15, 0.8)', 
                    border: '1px solid var(--border-subtle)', 
                    borderRadius: '8px', 
                    padding: '14px 18px', 
                    marginBottom: '20px' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--npu-cyan)', fontSize: '12px', fontWeight: '700', marginBottom: '6px' }}>
                      <Sparkles size={14} />
                      <span>ON-DEVICE STEP-BY-STEP EXPLANATION [Phi-3-mini INT4]</span>
                    </div>
                    <p style={{ fontSize: '13px', color: '#E2E8F0', lineHeight: '1.5' }}>
                      {currentQ.explanation}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  {!isAnswerSubmitted ? (
                    <button 
                      className="btn-primary"
                      onClick={handleSubmitAnswer}
                      disabled={!selectedOption}
                      style={{ opacity: selectedOption ? 1 : 0.5 }}
                    >
                      <span>Submit Answer</span>
                      <Target size={15} />
                    </button>
                  ) : (
                    <button className="btn-cyan" onClick={handleNextQuestion}>
                      <span>{currentQIndex < MOCK_QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}</span>
                      <ChevronRight size={15} />
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <Award size={56} color="var(--snapdragon-crimson)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Sprint Completed!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                  You scored <strong style={{ color: 'var(--npu-cyan)' }}>{score} out of {MOCK_QUIZ_QUESTIONS.length}</strong> on this curriculum diagnostic round.
                </p>

                <div className="grid-3" style={{ maxWidth: '480px', margin: '0 auto 24px' }}>
                  <div className="metric-box">
                    <span className="metric-label">Accuracy</span>
                    <span className="metric-number" style={{ color: 'var(--success-emerald)' }}>
                      {Math.round((score / MOCK_QUIZ_QUESTIONS.length) * 100)}%
                    </span>
                  </div>
                  <div className="metric-box">
                    <span className="metric-label">NPU Latency</span>
                    <span className="metric-number" style={{ color: 'var(--npu-cyan)' }}>240ms</span>
                  </div>
                  <div className="metric-box">
                    <span className="metric-label">SM-2 Spaced</span>
                    <span className="metric-number" style={{ color: 'var(--warning-amber)' }}>+2 Days</span>
                  </div>
                </div>

                <button className="btn-primary" onClick={handleRestartQuiz}>
                  <RotateCcw size={15} />
                  <span>Practice Again</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Weak Area Drill & Exam Countdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Exam Countdown & Targets */}
            <div className="glass-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Calendar size={16} color="var(--snapdragon-red)" />
                <span style={{ fontSize: '13px', fontWeight: '700' }}>Official Exam Targets (Offline Countdown)</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>JEE Main Session 1</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Target: 99.2+ Percentile</div>
                  </div>
                  <span className="badge badge-red">42 Days Left</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>CBSE Class 12 Science Board</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Physics & Chemistry Core</div>
                  </div>
                  <span className="badge badge-amber">68 Days Left</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>NEET-UG National Exam</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Biology 360/360 Target</div>
                  </div>
                  <span className="badge badge-cyan">114 Days Left</span>
                </div>
              </div>
            </div>

            {/* Weak Area Targeted Booster Alert */}
            <div className="glass-card" style={{ background: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.3)', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <AlertTriangle size={16} color="var(--warning-amber)" />
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#FBBF24' }}>Weak Area Booster: Rotational Motion (44%)</span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#CBD5E1', marginBottom: '14px', lineHeight: '1.5' }}>
                Your local SM-2 spaced repetition log flagged <strong>Center of Mass & Pure Rolling</strong> for immediate review. An adaptive 5-question micro-drill is prepared offline.
              </p>
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Launch 5-Question Weakness Drill</span>
                <ChevronRight size={14} />
              </button>
            </div>

          </div>

        </div>
      ) : (
        /* Topic Mastery Heatmap View */
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={18} color="var(--npu-cyan)" />
              <h3 style={{ fontSize: '16px' }}>Student Competency Knowledge Graph (Local SQLite Cache)</h3>
            </div>
            <span className="badge badge-green">800+ Concepts Monitored</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {topics.map((t) => (
              <div 
                key={t.id}
                style={{
                  background: 'rgba(7, 9, 15, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px'
                }}
              >
                <div style={{ minWidth: '220px' }}>
                  <div style={{ fontSize: '13.5px', fontWeight: '600', color: '#FFF' }}>{t.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.subject} • {t.chapters}</div>
                </div>

                {/* Progress Bar */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div 
                      style={{
                        width: `${t.mastery}%`,
                        height: '100%',
                        borderRadius: '4px',
                        background: t.mastery >= 75 ? 'var(--success-emerald)' : t.mastery >= 55 ? 'var(--warning-amber)' : 'var(--snapdragon-red)'
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', minWidth: '40px', fontWeight: '700', color: t.mastery >= 75 ? '#34D399' : t.mastery >= 55 ? '#FBBF24' : '#F87171' }}>
                    {t.mastery}%
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {t.reviewsDue > 0 ? (
                    <span className="badge badge-amber">{t.reviewsDue} Reviews Due</span>
                  ) : (
                    <span className="badge badge-green">Mastered</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
