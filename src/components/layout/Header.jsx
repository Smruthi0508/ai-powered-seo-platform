import React from 'react';
import { Menu, Globe, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { useAudit } from '../../context/AuditContext';

export default function Header({ onToggleMenu }) {
  const { activeTab, activeAudit, setActiveTab } = useAudit();

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Overview Dashboard';
      case 'analyzer':
        return 'Website SEO Analyzer';
      case 'report':
        return 'Comprehensive SEO Audit Report';
      case 'recommendations':
        return 'Optimization Recommendations';
      case 'about':
        return 'About the Project';
      default:
        return 'SEO Platform';
    }
  };

  return (
    <header className="top-header">
      <div className="header-left">
        <button 
          className="menu-toggle-btn" 
          onClick={onToggleMenu}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="header-context-title">
          <h1 className="page-title">{getPageTitle()}</h1>
        </div>
      </div>

      <div className="header-right">
        {activeAudit && (
          <div className="active-site-pill" title={`Currently inspecting: ${activeAudit.url}`}>
            <Globe size={14} />
            <span>{activeAudit.domain}</span>
            <span style={{ 
              backgroundColor: activeAudit.overallScore >= 80 ? '#10b981' : activeAudit.overallScore >= 60 ? '#f59e0b' : '#ef4444',
              color: '#ffffff',
              fontSize: '0.68rem',
              padding: '1px 6px',
              borderRadius: '999px',
              fontWeight: 700
            }}>
              {activeAudit.overallScore}/100
            </span>
          </div>
        )}

        {activeTab !== 'analyzer' && (
          <button 
            className="btn-primary-action"
            style={{ padding: '8px 16px', fontSize: '0.84rem' }}
            onClick={() => setActiveTab('analyzer')}
          >
            <span>Audit Site</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </header>
  );
}
