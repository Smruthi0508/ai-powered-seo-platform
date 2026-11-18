import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ChevronRight } from 'lucide-react';

export default function CheckItem({ check }) {
  const { name, category, status, details } = check;

  const renderIcon = () => {
    switch (status) {
      case 'passed':
        return (
          <div className="check-icon-circle passed" title="Check Passed">
            <CheckCircle2 size={16} />
          </div>
        );
      case 'warning':
        return (
          <div className="check-icon-circle warning" title="Warning / Improvement Recommended">
            <AlertTriangle size={16} />
          </div>
        );
      case 'failed':
      default:
        return (
          <div className="check-icon-circle failed" title="Critical Issue / Failed Check">
            <XCircle size={16} />
          </div>
        );
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'passed':
        return <span className="badge badge-success">Passed</span>;
      case 'warning':
        return <span className="badge badge-warning">Warning</span>;
      case 'failed':
      default:
        return <span className="badge badge-error">Failed</span>;
    }
  };

  return (
    <div className="check-item">
      <div className="check-item-main">
        {renderIcon()}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span className="check-name">{name}</span>
            <span className="badge badge-neutral" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
              {category}
            </span>
          </div>
          <div className="check-details">{details}</div>
        </div>
      </div>
      <div>{getStatusBadge()}</div>
    </div>
  );
}
