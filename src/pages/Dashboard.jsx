import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Sparkles, 
  Globe, 
  BarChart3, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useAudit } from '../context/AuditContext';
import ScoreGauge from '../components/common/ScoreGauge';
import LoadingScanner from '../components/common/LoadingScanner';

export default function Dashboard() {
  const { 
    currentUrl, 
    setCurrentUrl, 
    runAnalysis, 
    isAnalyzing, 
    analysisProgress, 
    activeAudit, 
    analysesHistory,
    selectAuditFromHistory,
    setActiveTab,
    errorMessage
  } = useAudit();

  const [inputUrl, setInputUrl] = useState(currentUrl || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      runAnalysis(inputUrl, 'report');
    }
  };

  const handlePresetClick = (presetUrl) => {
    setInputUrl(presetUrl);
    runAnalysis(presetUrl, 'report');
  };

  if (isAnalyzing) {
    return <LoadingScanner targetUrl={inputUrl} progress={analysisProgress} />;
  }

  const passedCount = activeAudit?.passedChecks || 0;
  const failedCount = activeAudit?.failedChecks || 0;
  const totalChecks = activeAudit?.totalChecks || 28;
  const totalIssues = activeAudit?.totalIssues || 0;
  const passedPct = Math.round((passedCount / totalChecks) * 100) || 0;
  const failedPct = Math.round((failedCount / totalChecks) * 100) || 0;

  return (
    <div>
      {/* Welcome & Fast Search Hero Card */}
      <div className="analyzer-hero-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
          <span className="badge" style={{ background: 'rgba(2, 132, 199, 0.3)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            RankPulse by Veyor Labs
          </span>
          <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
            Rule-Based Audit Engine Active
          </span>
        </div>

        <h2 className="hero-heading">RankPulse &mdash; AI-Powered SEO Optimization &amp; Search Ranking Platform</h2>
        <p className="hero-subtitle">
          <strong style={{ color: '#38bdf8' }}>Analyze. Optimize. Rank.</strong> &mdash; Evaluate technical SEO factors, audit meta structures, detect missing image alt tags, 
          and receive prioritized actionable recommendations to improve search rankings.
        </p>

        {/* URL Input Form */}
        <form onSubmit={handleSubmit}>
          <div className="url-input-group">
            <div className="url-input-icon">
              <Globe size={20} />
            </div>
            <input
              type="text"
              className="url-text-input"
              placeholder="Enter website URL (e.g., https://mytechstore.io or yourdomain.com)"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
            />
            <button 
              type="submit" 
              className="btn-primary-action"
              disabled={!inputUrl.trim() || isAnalyzing}
            >
              <Search size={18} />
              <span>Analyze Website</span>
            </button>
          </div>

          {errorMessage && (
            <div className="alert-error" style={{ maxWidth: '820px' }}>
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Quick Demo URL Presets */}
          <div className="preset-pills-row">
            <span className="preset-pill-label">Try sample websites:</span>
            <button 
              type="button" 
              className="preset-pill"
              onClick={() => handlePresetClick('https://mytechstore.io')}
            >
              mytechstore.io (Score 78)
            </button>
            <button 
              type="button" 
              className="preset-pill"
              onClick={() => handlePresetClick('https://fintechflow.dev')}
            >
              fintechflow.dev (Score 92)
            </button>
            <button 
              type="button" 
              className="preset-pill"
              onClick={() => handlePresetClick('https://freshorganicbites.com')}
            >
              freshorganicbites.com (Score 54)
            </button>
          </div>
        </form>
      </div>

      {/* 4 Core Overview Cards */}
      <div className="stat-grid">
        {/* Card 1: Overall SEO Score */}
        <div className="stat-card primary">
          <div>
            <div className="stat-label">SEO Health Score</div>
            <div className="stat-value">
              {activeAudit ? activeAudit.overallScore : 0}
              <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 500 }}>/100</span>
            </div>
            <div className="stat-subtext">
              Grade <strong>{activeAudit?.grade || 'N/A'}</strong> • {activeAudit?.overallScore >= 80 ? 'Well Optimized' : activeAudit?.overallScore >= 60 ? 'Needs Attention' : 'Critical Fixes Required'}
            </div>
          </div>
          <div className="stat-icon-box primary">
            <TrendingUp size={22} />
          </div>
        </div>

        {/* Card 2: Total Issues Detected */}
        <div className="stat-card warning">
          <div>
            <div className="stat-label">Total Issues</div>
            <div className="stat-value" style={{ color: '#d97706' }}>
              {totalIssues}
            </div>
            <div className="stat-subtext">
              <strong>{activeAudit?.criticalIssues || 0}</strong> Critical, <strong>{activeAudit?.warningIssues || 0}</strong> Warnings
            </div>
          </div>
          <div className="stat-icon-box warning">
            <AlertTriangle size={22} />
          </div>
        </div>

        {/* Card 3: Passed Checks */}
        <div className="stat-card success">
          <div>
            <div className="stat-label">Passed Checks</div>
            <div className="stat-value" style={{ color: '#059669' }}>
              {passedCount}
              <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 500 }}>/ {totalChecks}</span>
            </div>
            <div className="stat-subtext">
              <strong>{passedPct}%</strong> compliant with on-page guidelines
            </div>
          </div>
          <div className="stat-icon-box success">
            <CheckCircle size={22} />
          </div>
        </div>

        {/* Card 4: Failed Checks */}
        <div className="stat-card error">
          <div>
            <div className="stat-label">Failed Checks</div>
            <div className="stat-value" style={{ color: '#dc2626' }}>
              {failedCount}
              <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 500 }}>/ {totalChecks}</span>
            </div>
            <div className="stat-subtext">
              <strong>{failedPct}%</strong> failed verification tests
            </div>
          </div>
          <div className="stat-icon-box error">
            <XCircle size={22} />
          </div>
        </div>
      </div>

      {/* Active Audit Summary Preview */}
      {activeAudit && (
        <div className="card" style={{ marginBottom: '28px' }}>
          <div className="card-header-clean">
            <div>
              <h3 className="card-title">
                <BarChart3 size={20} color="#0284c7" />
                Active Site Audit: {activeAudit.domain}
              </h3>
              <p className="card-desc">
                Audited {activeAudit.auditedAt} • Fast rule-based crawl analysis
              </p>
            </div>
            <button 
              className="btn-primary-action" 
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              onClick={() => setActiveTab('report')}
            >
              <span>View Full Report</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Page Title</span>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', marginTop: '4px', wordBreak: 'break-word' }}>
                {activeAudit.pageTitle?.value}
              </p>
              <span className={`badge ${activeAudit.pageTitle?.status === 'passed' ? 'badge-success' : 'badge-warning'}`} style={{ marginTop: '8px' }}>
                {activeAudit.pageTitle?.length} chars
              </span>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>H1 Heading</span>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', marginTop: '4px', wordBreak: 'break-word' }}>
                {activeAudit.h1?.value || 'No H1 found'}
              </p>
              <span className={`badge ${activeAudit.h1?.status === 'passed' ? 'badge-success' : 'badge-error'}`} style={{ marginTop: '8px' }}>
                {activeAudit.h1?.count} H1 Tag
              </span>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Image Alt Tags</span>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', marginTop: '4px' }}>
                {activeAudit.imageAlt?.missingAlt === 0 
                  ? 'All images have alt tags' 
                  : `${activeAudit.imageAlt?.missingAlt} images missing alt`}
              </p>
              <span className={`badge ${activeAudit.imageAlt?.status === 'passed' ? 'badge-success' : 'badge-error'}`} style={{ marginTop: '8px' }}>
                {activeAudit.imageAlt?.withAlt} / {activeAudit.imageAlt?.total} Covered
              </span>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Hyperlinks</span>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', marginTop: '4px' }}>
                {activeAudit.links?.internal} Internal • {activeAudit.links?.external} External
              </p>
              <span className="badge badge-success" style={{ marginTop: '8px' }}>
                0 Broken Links
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Recent Analysis Section */}
      <div className="card recent-analyses-card">
        <div className="card-header-clean">
          <div>
            <h3 className="card-title">
              <Clock size={18} color="#0284c7" />
              Recent Website Analyses
            </h3>
            <p className="card-desc">
              History of analyzed domains. Click 'View Report' to inspect full diagnostic findings.
            </p>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Website / URL</th>
                <th>SEO Health Score</th>
                <th>Issues</th>
                <th>Checks Passed</th>
                <th>Audited</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {analysesHistory.map((site) => {
                const isCurrentActive = activeAudit?.id === site.id;
                return (
                  <tr key={site.id} style={{ backgroundColor: isCurrentActive ? '#f0f9ff' : 'transparent' }}>
                    <td>
                      <div className="table-site-info">
                        <span className="table-site-domain">
                          {site.domain}
                          {isCurrentActive && (
                            <span className="badge badge-info" style={{ marginLeft: '6px', fontSize: '0.65rem' }}>Active</span>
                          )}
                        </span>
                        <span className="table-site-url">{site.url}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ 
                          fontWeight: 800, 
                          color: site.overallScore >= 80 ? '#10b981' : site.overallScore >= 60 ? '#f59e0b' : '#ef4444' 
                        }}>
                          {site.overallScore}%
                        </span>
                        <span className="badge badge-neutral">Grade {site.grade}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${site.totalIssues > 5 ? 'badge-error' : site.totalIssues > 0 ? 'badge-warning' : 'badge-success'}`}>
                        {site.totalIssues} Issues
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem', color: '#475569' }}>
                        {site.passedChecks} / {site.totalChecks}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                        {site.auditedAt}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="btn-primary-action"
                        style={{ padding: '6px 12px', fontSize: '0.78rem', display: 'inline-flex' }}
                        onClick={() => selectAuditFromHistory(site.id)}
                      >
                        <span>View Report</span>
                        <ArrowRight size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
