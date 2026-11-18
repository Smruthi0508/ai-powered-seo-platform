import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  FileCheck2, 
  Lightbulb, 
  Info, 
  ShieldCheck, 
  ExternalLink,
  X,
  Activity
} from 'lucide-react';
import { useAudit } from '../../context/AuditContext';

export default function Sidebar({ isOpen, onClose }) {
  const { activeTab, setActiveTab, activeAudit, resolvedIssues } = useAudit();

  const unresolvedCount = activeAudit 
    ? (activeAudit.recommendations?.length || 0) - (resolvedIssues ? resolvedIssues.size : 0)
    : 0;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'analyzer',
      label: 'Website Analyzer',
      icon: Search,
      badge: null
    },
    {
      id: 'report',
      label: 'SEO Audit Report',
      icon: FileCheck2,
      badge: activeAudit ? `${activeAudit.overallScore}%` : null
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      icon: Lightbulb,
      badge: unresolvedCount > 0 ? unresolvedCount : null
    },
    {
      id: 'about',
      label: 'About Project',
      icon: Info,
      badge: 'College'
    }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    if (onClose) onClose();
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="brand-wrapper" onClick={() => handleNavClick('dashboard')}>
          <div className="brand-icon-box">
            <Activity size={22} strokeWidth={2.4} />
          </div>
          <div>
            <div className="brand-title">RankPulse</div>
            <div className="brand-subtitle">SEO Platform</div>
          </div>
        </div>

        {/* Close Button on Mobile */}
        <button 
          className="menu-toggle-btn"
          style={{ border: 'none', color: '#94a3b8' }}
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation List */}
      <nav className="sidebar-nav">
        <div className="nav-section-label">Core Navigation</div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon className="nav-icon" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="nav-badge">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer with Engine & FastAPI Status */}
      <div className="sidebar-footer">
        <div className="backend-indicator-card">
          <div className="indicator-row">
            <span className="pulse-dot"></span>
            <span style={{ fontWeight: 600, color: '#f1f5f9' }}>Rule Engine v1.0</span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.74rem', marginTop: '4px' }}>
            FastAPI integration ready. Client evaluation active.
          </p>
        </div>
      </div>
    </aside>
  );
}
