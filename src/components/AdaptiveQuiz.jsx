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
  Target,
  BarChart3,
  Check,
  Zap
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
  const [viewMode, setViewMode] = useState('quiz'); // 'quiz' | 'heatmap'

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
      setTopics(prev => prev.map(t => {
        if (t.name.toLowerCase().includes(currentQ.topic.toLowerCase())) {
          return { ...t, mastery: Math.min(100, t.mastery + 8) };
        }
        return t;
      }));
    } else {
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
      if (score >= 1) {
        confetti({
          particleCount: 100,
          spread: 80,
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Bar */}
      <div className="card-panel" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
              Module 3 • Adaptive Engine
            </span>
            <h2 style={{ fontSize: '18px' }}>Personalized Adaptive Quiz & Retention</h2>
          </div>
          <p style={{ color: 'var(--slate-silver)', fontSize: '12.5px' }}>
            SM-2 spaced repetition engine tracks your mastery across 800+ Indian curriculum concepts.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(230,0,18,0.12)', border: '1px solid var(--border-glow)', padding: '5px 14px', borderRadius: '20px' }}>
            <Flame size={15} color="var(--snapdragon-crimson)" />
            <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#FFF' }}>{streakDays} Days Streak</span>
          </div>

          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: '20px', padding: '3px' }}>
            <button
              onClick={() => setViewMode('quiz')}
              style={{
                background: viewMode === 'quiz' ? 'var(--snapdragon-red)' : 'transparent',
                border: 'none',
                color: '#FFF',
                fontSize: '12px',
                fontWeight: '600',
                padding: '5px 14px',
                borderRadius: '16px',
                cursor: 'pointer'
              }}
            >
              Quiz Practice
            </button>
            <button
              onClick={() => setViewMode('heatmap')}
              style={{
                background: viewMode === 'heatmap' ? 'var(--snapdragon-red)' : 'transparent',
                border: 'none',
                color: '#FFF',
                fontSize: '12px',
                fontWeight: '600',
                padding: '5px 14px',
                borderRadius: '16px',
                cursor: 'pointer'
              }}
            >
              Knowledge Heatmap
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'quiz' ? (
        <div className="grid-2">
          
          {/* Left Column: Interactive Question Card */}
          <div className="card-panel glow-red" style={{ padding: '24px' }}>
            {!completed ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ background: 'rgba(245,158,11,0.15)', color: '#FBBF24', fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '10px' }}>
                      {currentQ.difficulty}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--slate-silver)' }}>{currentQ.examTag}</span>
                  </div>

                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--npu-cyan)' }}>
                    Question {currentQIndex + 1} of {MOCK_QUIZ_QUESTIONS.length}
                  </span>
                </div>

                {/* Question Text */}
                <div style={{ fontSize: '15.5px', fontWeight: '600', color: '#FFFFFF', marginBottom: '20px', lineHeight: '1.55' }}>
                  {currentQ.question}
                </div>

                {/* Tactile Options List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
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
                        borderCol = 'var(--emerald-green)';
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
                          padding: '13px 18px',
                          borderRadius: '12px',
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
                          fontSize: '11.5px',
                          fontWeight: '700'
                        }}>
                          {opt.id}
                        </span>
                        <span style={{ flex: 1, fontSize: '13px' }}>{opt.text}</span>
                        {isAnswerSubmitted && opt.id === currentQ.correctAnswer && (
                          <CheckCircle size={16} color="var(--emerald-green)" />
                        )}
                        {isAnswerSubmitted && selectedOption === opt.id && opt.id !== currentQ.correctAnswer && (
                          <XCircle size={16} color="var(--snapdragon-crimson)" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Explanation Card */}
                {isAnswerSubmitted && (
                  <div style={{ 
                    background: 'rgba(6, 9, 16, 0.85)', 
                    border: '1px solid var(--border-cyan)', 
                    borderRadius: '10px', 
                    padding: '14px 18px', 
                    marginBottom: '20px',
                    animation: 'fadeIn 0.2s ease'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--npu-cyan)', fontSize: '11.5px', fontWeight: '700', marginBottom: '4px' }}>
                      <Sparkles size={13} />
                      <span>ON-DEVICE STEP-BY-STEP EXPLANATION [Phi-3-mini INT4]</span>
                    </div>
                    <p style={{ fontSize: '12.5px', color: '#E2E8F0', lineHeight: '1.5' }}>
                      {currentQ.explanation}
                    </p>
                  </div>
                )}

                {/* Submit & Next Action Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  {!isAnswerSubmitted ? (
                    <button 
                      className="action-btn-primary"
                      onClick={handleSubmitAnswer}
                      disabled={!selectedOption}
                      style={{ opacity: selectedOption ? 1 : 0.5 }}
                    >
                      <span>Check Answer</span>
                      <Target size={14} />
                    </button>
                  ) : (
                    <button className="action-btn-cyan" onClick={handleNextQuestion}>
                      <span>{currentQIndex < MOCK_QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}</span>
                      <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </>
            ) : (
              /* Quiz Completion Screen */
              <div style={{ textAlign: 'center', padding: '36px 16px' }}>
                <Award size={64} color="var(--snapdragon-crimson)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '24px', marginBottom: '6px' }}>Sprint Completed!</h3>
                <p style={{ color: 'var(--slate-silver)', fontSize: '13.5px', marginBottom: '24px' }}>
                  You scored <strong style={{ color: 'var(--npu-cyan)' }}>{score} / {MOCK_QUIZ_QUESTIONS.length}</strong> on this curriculum diagnostic round.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '24px' }}>
                  <div className="metric-tile" style={{ minWidth: '120px' }}>
                    <span className="metric-tile-title">Accuracy</span>
                    <span className="metric-tile-val" style={{ color: 'var(--emerald-green)' }}>
                      {Math.round((score / MOCK_QUIZ_QUESTIONS.length) * 100)}%
                    </span>
                  </div>
                  <div className="metric-tile" style={{ minWidth: '120px' }}>
                    <span className="metric-tile-title">SM-2 Interval</span>
                    <span className="metric-tile-val" style={{ color: 'var(--amber-gold)' }}>
                      +3 Days
                    </span>
                  </div>
                </div>

                <button className="action-btn-primary" onClick={handleRestartQuiz}>
                  <RotateCcw size={14} />
                  <span>Practice Another Round</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Exam Targets & Real-Time Countdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div className="card-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Calendar size={16} color="var(--snapdragon-red)" />
                <span style={{ fontSize: '13px', fontWeight: '700' }}>Official Exam Targets (Offline Tracking)</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>JEE Main Session 1</div>
                    <div style={{ fontSize: '11px', color: 'var(--slate-silver)' }}>Target: 99.2+ Percentile</div>
                  </div>
                  <span style={{ background: 'rgba(230,0,18,0.15)', color: 'var(--snapdragon-crimson)', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '12px' }}>
                    42 Days Left
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>CBSE Class 12 Science Board</div>
                    <div style={{ fontSize: '11px', color: 'var(--slate-silver)' }}>Physics & Chemistry Core</div>
                  </div>
                  <span style={{ background: 'rgba(245,158,11,0.15)', color: 'var(--amber-gold)', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '12px' }}>
                    68 Days Left
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>NEET-UG National Exam</div>
                    <div style={{ fontSize: '11px', color: 'var(--slate-silver)' }}>Biology 360/360 Target</div>
                  </div>
                  <span style={{ background: 'rgba(0,242,254,0.12)', color: 'var(--npu-cyan)', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '12px' }}>
                    114 Days Left
                  </span>
                </div>
              </div>
            </div>

            {/* Weak Area Alert */}
            <div className="card-panel" style={{ background: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.3)', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <AlertTriangle size={15} color="var(--amber-gold)" />
                <span style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--amber-gold)' }}>SM-2 Flag: Review Rotational Dynamics</span>
              </div>
              <p style={{ fontSize: '12px', color: '#CBD5E1', marginBottom: '12px', lineHeight: '1.5' }}>
                Based on your last quiz, pure rolling acceleration needs another review to move to permanent retention.
              </p>
              <button className="action-btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '12px' }}>
                <span>Launch 3-Question Booster</span>
                <ChevronRight size={13} />
              </button>
            </div>

          </div>

        </div>
      ) : (
        /* Knowledge Graph Heatmap */
        <div className="card-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={18} color="var(--npu-cyan)" />
              <h3 style={{ fontSize: '16px' }}>Student Competency Knowledge Graph (Local SQLite Cache)</h3>
            </div>
            <span style={{ background: 'rgba(16,185,129,0.15)', color: '#34D399', fontSize: '11px', fontWeight: '700', padding: '2px 10px', borderRadius: '12px' }}>
              800+ Concepts Mapped
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {topics.map((t) => (
              <div 
                key={t.id}
                style={{
                  background: 'rgba(6, 9, 16, 0.65)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px'
                }}
              >
                <div style={{ minWidth: '220px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#FFF' }}>{t.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--slate-silver)' }}>{t.subject} • {t.chapters}</div>
                </div>

                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ flex: 1, height: '7px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div 
                      style={{
                        width: `${t.mastery}%`,
                        height: '100%',
                        borderRadius: '4px',
                        background: t.mastery >= 75 ? 'var(--emerald-green)' : t.mastery >= 55 ? 'var(--amber-gold)' : 'var(--snapdragon-red)'
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', minWidth: '40px', fontWeight: '700', color: t.mastery >= 75 ? '#34D399' : t.mastery >= 55 ? '#FBBF24' : '#F87171' }}>
                    {t.mastery}%
                  </span>
                </div>

                <div>
                  {t.reviewsDue > 0 ? (
                    <span style={{ background: 'rgba(245,158,11,0.15)', color: 'var(--amber-gold)', fontSize: '10.5px', padding: '2px 8px', borderRadius: '10px' }}>
                      {t.reviewsDue} Reviews Due
                    </span>
                  ) : (
                    <span style={{ background: 'rgba(16,185,129,0.15)', color: '#34D399', fontSize: '10.5px', padding: '2px 8px', borderRadius: '10px' }}>
                      Mastered
                    </span>
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
