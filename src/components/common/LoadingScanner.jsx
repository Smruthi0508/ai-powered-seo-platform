import React from 'react';
import { Search, Loader2, CheckCircle, Shield, Globe } from 'lucide-react';

export default function LoadingScanner({ targetUrl, progress }) {
  const steps = [
    { label: 'Connecting to target server & resolving DNS', threshold: 15 },
    { label: 'Crawling HTML Document Object Model', threshold: 35 },
    { label: 'Evaluating Title, Meta & Social Graph tags', threshold: 55 },
    { label: 'Auditing image elements & missing alt attributes', threshold: 75 },
    { label: 'Analyzing H1 heading hierarchy & link graph', threshold: 90 },
    { label: 'Synthesizing rule-based recommendations', threshold: 100 }
  ];

  return (
    <div className="scanner-progress-container">
      <div className="scanner-radar-box">
        <Search size={32} />
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
        Analyzing Website SEO Architecture
      </h3>
      <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '20px' }}>
        Target: <strong style={{ color: '#0284c7' }}>{targetUrl || 'Target Domain'}</strong>
      </p>

      {/* Progress Bar */}
      <div className="progress-bar-bg">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${Math.max(8, progress.percentage || 10)}%` }} 
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b', marginBottom: '24px' }}>
        <span>{progress.text || 'Running rule-based SEO evaluation...'}</span>
        <strong>{progress.percentage || 10}%</strong>
      </div>

      {/* Checklist items */}
      <div style={{ textAlign: 'left', background: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.04em' }}>
          Rule Engine Scan Sequence
        </div>

        {steps.map((s, idx) => {
          const isDone = (progress.percentage || 0) >= s.threshold;
          const isCurrent = !isDone && (progress.percentage || 0) >= (steps[idx - 1]?.threshold || 0);

          return (
            <div 
              key={idx} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                padding: '6px 0',
                fontSize: '0.83rem',
                color: isDone ? '#047857' : isCurrent ? '#0284c7' : '#94a3b8',
                fontWeight: isCurrent || isDone ? 600 : 400
              }}
            >
              {isDone ? (
                <CheckCircle size={16} color="#10b981" />
              ) : isCurrent ? (
                <Loader2 size={16} color="#0284c7" className="animate-spin" />
              ) : (
                <div style={{ width: 16, height: 16, borderRadius: '50%', border: '1px dashed #cbd5e1' }} />
              )}
              <span>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
