import React, { useState } from 'react';
import { 
  Globe, 
  Clock, 
  ExternalLink, 
  ArrowRight, 
  FileText, 
  Heading1, 
  Image as ImageIcon, 
  Link2, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ShieldCheck, 
  Filter,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import { useAudit } from '../context/AuditContext';
import ScoreGauge from '../components/common/ScoreGauge';
import SerpPreview from '../components/audit/SerpPreview';
import ImageAltIssues from '../components/audit/ImageAltIssues';
import CheckItem from '../components/audit/CheckItem';

export default function AuditReport() {
  const { activeAudit, setActiveTab } = useAudit();
  const [checkFilter, setCheckFilter] = useState('all'); // all, passed, warning, failed
  const [copied, setCopied] = useState(false);

  if (!activeAudit) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <Globe size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>No Audit Report Loaded</h3>
        <p style={{ color: '#64748b', margin: '8px 0 20px' }}>Please analyze a website first to inspect its detailed diagnostic report.</p>
        <button className="btn-primary-action" onClick={() => setActiveTab('analyzer')}>
          Go to Website Analyzer
        </button>
      </div>
    );
  }

  const {
    url,
    domain,
    overallScore,
    grade,
    auditedAt,
    pageTitle,
    metaDescription,
    h1,
    imageAlt,
    links,
    crawlDetails,
    checks = []
  } = activeAudit;

  const filteredChecks = checks.filter((chk) => {
    if (checkFilter === 'all') return true;
    return chk.status === checkFilter;
  });

  const handleCopySummary = () => {
    const summary = `SEO Audit Summary for ${url}
Score: ${overallScore}/100 (Grade ${grade})
Title: ${pageTitle?.value} (${pageTitle?.length} chars)
Meta Description: ${metaDescription?.value || 'Missing'}
H1: ${h1?.value || 'None'}
Image Alt Issues: ${imageAlt?.missingAlt} missing out of ${imageAlt?.total}
Links: ${links?.internal} internal, ${links?.external} external
Audited via RankPulse by Veyor Labs`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {/* Top Banner with Site Identity and Score */}
      <div className="report-header-banner">
        <div className="report-site-meta">
          <div className="report-site-avatar">
            <Globe size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 className="report-url-title">{domain}</h2>
              <a 
                href={url} 
                target="_blank" 
                rel="noreferrer" 
                style={{ color: '#64748b', display: 'flex' }}
                title="Open website in new tab"
              >
                <ExternalLink size={16} />
              </a>
            </div>
            <div className="report-timestamp">
              <Clock size={13} />
              <span>Audited {auditedAt}</span>
              {crawlDetails?.loadTime && (
                <span>• Response Time: {crawlDetails.loadTime}</span>
              )}
              {crawlDetails?.responseCode && (
                <span>• HTTP {crawlDetails.responseCode}</span>
             )}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
              Overall SEO Score
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: overallScore >= 80 ? '#10b981' : overallScore >= 60 ? '#f59e0b' : '#ef4444' }}>
              {overallScore}/100
            </div>
          </div>
          <ScoreGauge score={overallScore} grade={grade} size={84} />
          
          <button 
            className="btn-primary-action"
            style={{ padding: '8px 14px', background: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1' }}
            onClick={handleCopySummary}
          >
            {copied ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>
        </div>
      </div>

      {/* Google SERP Snippet Preview */}
      <SerpPreview 
        title={pageTitle?.value} 
        description={metaDescription?.value} 
        url={url} 
      />

      {/* Grid of Key On-Page SEO Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        
        {/* 1. Page Title Tag Detail */}
        <div className="card">
          <div className="card-header-clean">
            <h3 className="card-title">
              <FileText size={18} color="#0284c7" />
              Page Title
            </h3>
            <span className={`badge ${pageTitle?.status === 'passed' ? 'badge-success' : 'badge-warning'}`}>
              {pageTitle?.status === 'passed' ? 'Optimal Length' : 'Needs Optimization'}
            </span>
          </div>

          <p style={{ fontSize: '0.92rem', fontWeight: 600, color: '#0f172a', lineHeight: 1.4, marginBottom: '12px' }}>
            "{pageTitle?.value || 'No Title Tag Configured'}"
          </p>

          <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', fontSize: '0.8rem', color: '#64748b' }}>
            <div>Character Count: <strong>{pageTitle?.length || 0}</strong> / 60 optimal max</div>
            <div style={{ marginTop: '4px' }}>{pageTitle?.message}</div>
          </div>
        </div>

        {/* 2. Meta Description Detail */}
        <div className="card">
          <div className="card-header-clean">
            <h3 className="card-title">
              <FileText size={18} color="#0284c7" />
              Meta Description
            </h3>
            <span className={`badge ${metaDescription?.status === 'passed' ? 'badge-success' : metaDescription?.value ? 'badge-warning' : 'badge-error'}`}>
              {metaDescription?.status === 'passed' ? 'Passed' : metaDescription?.value ? 'Warning' : 'Missing'}
            </span>
          </div>

          <p style={{ fontSize: '0.9rem', color: metaDescription?.value ? '#334155' : '#ef4444', fontStyle: metaDescription?.value ? 'normal' : 'italic', marginBottom: '12px', lineHeight: 1.4 }}>
            {metaDescription?.value ? `"${metaDescription.value}"` : 'No meta description found on this page.'}
          </p>

          <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', fontSize: '0.8rem', color: '#64748b' }}>
            <div>Character Count: <strong>{metaDescription?.length || 0}</strong> (Recommended: 120-160 chars)</div>
            <div style={{ marginTop: '4px' }}>{metaDescription?.message}</div>
          </div>
        </div>

        {/* 3. H1 Heading Detail */}
        <div className="card">
          <div className="card-header-clean">
            <h3 className="card-title">
              <Heading1 size={18} color="#0284c7" />
              Primary H1 Heading
            </h3>
            <span className={`badge ${h1?.status === 'passed' ? 'badge-success' : 'badge-error'}`}>
              {h1?.count === 1 ? '1 H1 Present' : `${h1?.count || 0} H1 Found`}
            </span>
          </div>

          <p style={{ fontSize: '0.92rem', fontWeight: 600, color: '#0f172a', marginBottom: '12px', lineHeight: 1.4 }}>
            {h1?.value ? `"${h1.value}"` : 'Missing H1 heading tag.'}
          </p>

          <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', fontSize: '0.8rem', color: '#64748b' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span>H1: <strong>{h1?.hierarchy?.h1 || h1?.count || 0}</strong></span>
              <span>H2: <strong>Not checked</strong></span>
              <span>H3: <strong>Not checked</strong></span>
            </div>
            <div style={{ marginTop: '4px' }}>{h1?.message}</div>
          </div>
        </div>

        {/* 4. Internal & External Links Detail */}
        <div className="card">
          <div className="card-header-clean">
            <h3 className="card-title">
              <Link2 size={18} color="#0284c7" />
              Link Architecture
            </h3>
            <span className="badge badge-warning">
              Link status not verified
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '12px', textAlign: 'center' }}>
            <div style={{ background: '#f1f5f9', padding: '8px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Total</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{links?.total || 0}</div>
            </div>
            <div style={{ background: '#e0f2fe', padding: '8px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.72rem', color: '#0369a1' }}>Internal</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0369a1' }}>{links?.internal || 0}</div>
            </div>
            <div style={{ background: '#f1f5f9', padding: '8px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>External</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{links?.external || 0}</div>
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', fontSize: '0.8rem', color: '#64748b' }}>
            {links?.message}
          </div>
        </div>
      </div>

      {/* Image Alt Issues Section */}
      <ImageAltIssues imageAltData={imageAlt} />

      {/* Detailed Checkpoints List with Filtering */}
      <div className="card">
        <div className="card-header-clean" style={{ flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 className="card-title">
              <ShieldCheck size={20} color="#0284c7" />
              All On-Page & Technical SEO Checkpoints
            </h3>
            <p className="card-desc">
              Rule-based checklist covering page titles, meta descriptions, H1 headings, image alt attributes, and links.
            </p>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <button 
              className={`tab-btn ${checkFilter === 'all' ? 'active' : ''}`}
              onClick={() => setCheckFilter('all')}
            >
              All ({checks.length})
            </button>
            <button 
              className={`tab-btn ${checkFilter === 'passed' ? 'active' : ''}`}
              onClick={() => setCheckFilter('passed')}
            >
              Passed ({checks.filter(c => c.status === 'passed').length})
            </button>
            <button 
              className={`tab-btn ${checkFilter === 'warning' ? 'active' : ''}`}
              onClick={() => setCheckFilter('warning')}
            >
              Warnings ({checks.filter(c => c.status === 'warning').length})
            </button>
            <button 
              className={`tab-btn ${checkFilter === 'failed' ? 'active' : ''}`}
              onClick={() => setCheckFilter('failed')}
            >
              Failed ({checks.filter(c => c.status === 'failed').length})
            </button>
            <button
            className={`tab-btn ${checkFilter === 'not_applicable' ? 'active' : ''}`}
            onClick={() => setCheckFilter('not_applicable')}
            >
              Not Applicable ({checks.filter(c => c.status === 'not_applicable').length})
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filteredChecks.length > 0 ? (
            filteredChecks.map((check) => (
              <CheckItem key={check.id} check={check} />
            ))
          ) : (
            <div style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
              No checks match the selected filter.
            </div>
          )}
        </div>

        {/* Footer Jump to Recommendations */}
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Want step-by-step guidance to resolve issues?
          </span>
          <button 
            className="btn-primary-action"
            style={{ padding: '8px 18px', fontSize: '0.88rem' }}
            onClick={() => setActiveTab('recommendations')}
          >
            <span>View Recommendations</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
