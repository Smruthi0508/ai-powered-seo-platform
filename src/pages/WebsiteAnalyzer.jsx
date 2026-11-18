import React, { useState } from 'react';
import { 
  Search, 
  Globe, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Image as ImageIcon, 
  Link2, 
  Code2, 
  Sparkles,
  ArrowRight,
  Server
} from 'lucide-react';
import { useAudit } from '../context/AuditContext';
import LoadingScanner from '../components/common/LoadingScanner';

export default function WebsiteAnalyzer() {
  const { 
    currentUrl, 
    setCurrentUrl, 
    runAnalysis, 
    isAnalyzing, 
    analysisProgress,
    errorMessage,
    setErrorMessage
  } = useAudit();

  const [inputUrl, setInputUrl] = useState(currentUrl || '');
  const [localError, setLocalError] = useState('');

  const handleAnalyze = (e) => {
    e?.preventDefault();
    setLocalError('');
    setErrorMessage('');

    if (!inputUrl || !inputUrl.trim()) {
      setLocalError('Please enter a website URL to begin analysis.');
      return;
    }

    const trimmed = inputUrl.trim();
    // Verify valid URL pattern
    const pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/i;
    if (!pattern.test(trimmed)) {
      setLocalError('Invalid URL format. Please enter a valid domain (e.g. https://example.com or techsite.io)');
      return;
    }

    runAnalysis(trimmed, 'report');
  };

  const handleSelectPreset = (url) => {
    setInputUrl(url);
    setLocalError('');
    setErrorMessage('');
    runAnalysis(url, 'report');
  };

  if (isAnalyzing) {
    return <LoadingScanner targetUrl={inputUrl} progress={analysisProgress} />;
  }

  const auditScopeItems = [
    {
      icon: FileText,
      title: 'Meta & SERP Preview',
      desc: 'Checks title tag presence & length, meta description length, and generates Google snippet simulation.'
    },
    {
      icon: Code2,
      title: 'Heading Hierarchy',
      desc: 'Ensures single semantic H1 heading presence and logical H2-H4 nesting for crawlers.'
    },
    {
      icon: ImageIcon,
      title: 'Image Alt Attributes',
      desc: 'Detects all image elements missing alternative text required for accessibility and image search.'
    },
    {
      icon: Link2,
      title: 'Hyperlink Architecture',
      desc: 'Calculates internal vs external link distribution and checks for broken 404 navigation anchors.'
    },
    {
      icon: ShieldCheck,
      title: 'Technical Standards',
      desc: 'Validates SSL/HTTPS, mobile viewport tag, robots.txt, XML sitemap, and Open Graph meta tags.'
    },
    {
      icon: Server,
      title: 'FastAPI Integration Ready',
      desc: 'Modular decoupled client architecture ready to consume Python FastAPI crawler endpoints.'
    }
  ];

  return (
    <div>
      {/* Analyzer Input Card */}
      <div className="card" style={{ marginBottom: '28px', padding: '32px' }}>
        <div style={{ maxWidth: '800px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-info">
              Rule-Based SEO Audit Engine
            </span>
            <span className="badge badge-neutral">
              FastAPI Endpoint: /api/v1/analyze
            </span>
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
            Website SEO Scanner
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.94rem', marginBottom: '24px', lineHeight: 1.6 }}>
            Enter any public website URL to run comprehensive technical and on-page SEO diagnostics. 
            The system tests against 28 on-page guidelines and computes an overall health score.
          </p>

          <form onSubmit={handleAnalyze}>
            <div className="url-input-group" style={{ border: '2px solid #e2e8f0', maxWidth: '100%' }}>
              <div className="url-input-icon">
                <Globe size={20} color="#0284c7" />
              </div>
              <input
                type="text"
                className="url-text-input"
                placeholder="https://example.com"
                value={inputUrl}
                onChange={(e) => {
                  setInputUrl(e.target.value);
                  if (localError) setLocalError('');
                }}
              />
              <button 
                type="submit" 
                className="btn-primary-action"
                disabled={!inputUrl.trim()}
              >
                <Search size={18} />
                <span>Run SEO Audit</span>
              </button>
            </div>

            {/* Error Message Display */}
            {(localError || errorMessage) && (
              <div className="alert-error">
                <AlertCircle size={16} />
                <span>{localError || errorMessage}</span>
              </div>
            )}

            {/* Quick Demo Presets */}
            <div className="preset-pills-row" style={{ marginTop: '16px' }}>
              <span className="preset-pill-label" style={{ color: '#64748b' }}>Quick test samples:</span>
              <button
                type="button"
                className="preset-pill"
                style={{ background: '#f1f5f9', color: '#0f172a', borderColor: '#e2e8f0' }}
                onClick={() => handleSelectPreset('https://mytechstore.io')}
              >
                mytechstore.io (E-Commerce • Score 78)
              </button>
              <button
                type="button"
                className="preset-pill"
                style={{ background: '#f1f5f9', color: '#0f172a', borderColor: '#e2e8f0' }}
                onClick={() => handleSelectPreset('https://fintechflow.dev')}
              >
                fintechflow.dev (SaaS • Score 92)
              </button>
              <button
                type="button"
                className="preset-pill"
                style={{ background: '#f1f5f9', color: '#0f172a', borderColor: '#e2e8f0' }}
                onClick={() => handleSelectPreset('https://freshorganicbites.com')}
              >
                freshorganicbites.com (Local • Score 54)
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Audit Scope Grid */}
      <div className="card">
        <div className="card-header-clean">
          <div>
            <h3 className="card-title">
              Diagnostic Checks Included in Each Audit
            </h3>
            <p className="card-desc">
              Our automated rule-based evaluation tests against search engine webmaster guidelines.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {auditScopeItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                style={{ 
                  background: '#f8fafc', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px', 
                  padding: '20px',
                  display: 'flex',
                  gap: '14px'
                }}
              >
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '10px', 
                  background: '#e0f2fe', 
                  color: '#0284c7', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
