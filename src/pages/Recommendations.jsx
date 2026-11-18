import React, { useState } from 'react';
import { 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight, 
  Filter, 
  Sparkles,
  ChevronDown,
  Info,
  Layers,
  Wrench
} from 'lucide-react';
import { useAudit } from '../context/AuditContext';

export default function Recommendations() {
  const { activeAudit, resolvedIssues, toggleResolvedIssue, setActiveTab } = useAudit();
  const [severityFilter, setSeverityFilter] = useState('all'); // all, high, medium, low
  const [copiedId, setCopiedId] = useState(null);

  if (!activeAudit) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <Lightbulb size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>No Recommendations Available</h3>
        <p style={{ color: '#64748b', margin: '8px 0 20px' }}>
          Run an audit on a website to generate prioritized fixes and actionable suggestions.
        </p>
        <button className="btn-primary-action" onClick={() => setActiveTab('analyzer')}>
          Analyze a Website
        </button>
      </div>
    );
  }

  const recommendations = activeAudit.recommendations || [];

  const filtered = recommendations.filter((rec) => {
    if (severityFilter === 'all') return true;
    return rec.severity === severityFilter;
  });

  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'high':
        return <span className="badge badge-error">High Priority</span>;
      case 'medium':
        return <span className="badge badge-warning">Medium Priority</span>;
      case 'low':
      default:
        return <span className="badge badge-info">Optimization</span>;
    }
  };

  const highCount = recommendations.filter((r) => r.severity === 'high').length;
  const medCount = recommendations.filter((r) => r.severity === 'medium').length;
  const lowCount = recommendations.filter((r) => r.severity === 'low').length;
  const totalResolved = resolvedIssues ? resolvedIssues.size : 0;

  return (
    <div>
      {/* Top Recommendations Header Card */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header-clean" style={{ flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-info">Rule-Based Diagnostic Engine</span>
              <span className="badge badge-neutral">Audited: {activeAudit.domain}</span>
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a' }}>
              Actionable SEO Recommendations
            </h2>
            <p className="card-desc">
              Review detected on-page SEO issues and apply the suggested improvements to your website.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#f8fafc', padding: '8px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>Resolved</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>
                {totalResolved} / {recommendations.length}
              </div>
            </div>
          </div>
        </div>

        {/* Severity Filter Tabs */}
        <div className="filter-tabs" style={{ marginBottom: 0 }}>
          <button 
            className={`tab-btn ${severityFilter === 'all' ? 'active' : ''}`}
            onClick={() => setSeverityFilter('all')}
          >
            All Suggestions ({recommendations.length})
          </button>
          <button 
            className={`tab-btn ${severityFilter === 'high' ? 'active' : ''}`}
            onClick={() => setSeverityFilter('high')}
          >
            Critical / High ({highCount})
          </button>
          <button 
            className={`tab-btn ${severityFilter === 'medium' ? 'active' : ''}`}
            onClick={() => setSeverityFilter('medium')}
          >
            Medium ({medCount})
          </button>
          <button 
            className={`tab-btn ${severityFilter === 'low' ? 'active' : ''}`}
            onClick={() => setSeverityFilter('low')}
          >
            Low / Enhancements ({lowCount})
          </button>
        </div>
      </div>

      {/* Recommendations Cards List */}
      <div>
        {filtered.length > 0 ? (
          filtered.map((rec) => {
            const isResolved = resolvedIssues.has(rec.id);

            return (
              <div 
                key={rec.id}
                className={`recommendation-card priority-${rec.severity} ${isResolved ? 'resolved' : ''}`}
              >
                <div className="rec-header">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      {getSeverityBadge(rec.severity)}
                      <span className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                        {rec.category}
                      </span>
                      {isResolved && (
                        <span className="badge badge-success">
                          <CheckCircle2 size={12} /> Resolved
                        </span>
                      )}
                    </div>
                    <h3 className="rec-title">{rec.title}</h3>
                  </div>

                  <button 
                    onClick={() => toggleResolvedIssue(rec.id)}
                    style={{ 
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: isResolved ? '1px solid #10b981' : '1px solid #cbd5e1',
                      background: isResolved ? '#ecfdf5' : '#ffffff',
                      color: isResolved ? '#047857' : '#475569',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {isResolved ? (
                      <>
                        <Check size={14} color="#10b981" />
                        <span>Done</span>
                      </>
                    ) : (
                      <span>Mark Resolved</span>
                    )}
                  </button>
                </div>

                {/* Impact callout */}
                <div style={{ 
                  fontSize: '0.82rem', 
                  color: '#0369a1', 
                  background: '#f0f9ff', 
                  border: '1px solid #bae6fd', 
                  padding: '8px 12px', 
                  borderRadius: '8px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Sparkles size={15} color="#0284c7" />
                  <strong>Impact:</strong> {rec.impact}
                </div>

                {/* Detected Issue Description */}
                <div className="rec-problem-box">
                  <strong style={{ display: 'block', color: '#b91c1c', marginBottom: '4px' }}>
                    Problem Detected:
                  </strong>
                  {rec.problem}
                </div>

                {/* Recommended Fix */}
                <div className="rec-solution-box">
                  <strong style={{ display: 'block', color: '#0369a1', marginBottom: '4px' }}>
                    Recommended Action:
                  </strong>
                  {rec.solution}
                </div>

                {/* Code Snippet if present */}
                {rec.codeSnippet && (
                  <div className="code-snippet-box">
                    <button 
                      className="code-copy-btn"
                      onClick={() => handleCopyCode(rec.id, rec.codeSnippet)}
                    >
                      {copiedId === rec.id ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                      <span>{copiedId === rec.id ? 'Copied' : 'Copy'}</span>
                    </button>
                    <pre style={{ margin: 0, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
                      {rec.codeSnippet}
                    </pre>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <CheckCircle2 size={36} color="#10b981" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>No issues found for this filter</h4>
            <p style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '4px' }}>
              All checks in this severity category passed successfully!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
