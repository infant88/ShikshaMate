import React, { useState, useEffect } from 'react';
import { Key, Check, X, Eye, EyeOff, Sparkles, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { getGeminiApiKey, setGeminiApiKey } from '../services/geminiService';

export default function ApiKeyModal({ isOpen, onClose, onKeyUpdated }) {
  const [keyInput, setKeyInput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setKeyInput(getGeminiApiKey());
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setGeminiApiKey(keyInput);
    setSavedSuccess(true);
    if (onKeyUpdated) onKeyUpdated(keyInput);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setGeminiApiKey('');
    setKeyInput('');
    if (onKeyUpdated) onKeyUpdated('');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
      padding: '20px'
    }}>
      <div className="card-panel glow-red" style={{ maxWidth: '500px', width: '100%', padding: '28px', position: 'relative' }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'none',
            border: 'none',
            color: 'var(--slate-silver)',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{ 
            width: '36px', 
            height: '36px', 
            borderRadius: '10px', 
            background: 'linear-gradient(135deg, #00F2FE, #8B5CF6)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <Sparkles size={20} color="#000" />
          </div>
          <div>
            <h3 style={{ fontSize: '17px', color: '#FFF' }}>Gemini AI Cloud Expansion</h3>
            <p style={{ fontSize: '12px', color: 'var(--slate-silver)' }}>
              Enable live search for unlimited formulas and custom doubts in any language
            </p>
          </div>
        </div>

        <div style={{ 
          background: 'rgba(0, 242, 254, 0.08)', 
          border: '1px solid var(--border-cyan)', 
          borderRadius: '10px', 
          padding: '12px 14px', 
          fontSize: '12px', 
          color: '#E2E8F0',
          lineHeight: '1.5',
          margin: '16px 0'
        }}>
          💡 <strong>How it works:</strong> ShikshaMate runs 100% offline with local seed data. By adding your Gemini API key, when a formula is not in the local vault, it instantly queries Gemini and translates the response to your selected Indian language!
        </div>

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--slate-silver)', marginBottom: '6px' }}>
              Gemini API Key
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showKey ? 'text' : 'password'}
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                style={{
                  width: '100%',
                  background: 'rgba(6, 9, 16, 0.9)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '10px 40px 10px 14px',
                  color: '#FFF',
                  fontSize: '13px',
                  fontFamily: 'var(--font-mono)',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--slate-silver)',
                  cursor: 'pointer'
                }}
              >
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', marginBottom: '20px' }}>
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: 'var(--npu-cyan)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>Get a free Gemini API key</span>
              <ExternalLink size={12} />
            </a>

            {keyInput && (
              <button
                type="button"
                onClick={handleClear}
                style={{ background: 'none', border: 'none', color: 'var(--snapdragon-crimson)', cursor: 'pointer', fontSize: '11.5px' }}
              >
                Remove Key
              </button>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="action-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="action-btn-primary">
              {savedSuccess ? <Check size={14} color="#FFF" /> : <Key size={14} />}
              <span>{savedSuccess ? 'Saved!' : 'Save Key'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
