import React from 'react';
import { Eye, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';

export default function SerpPreview({ title, description, url }) {
  const displayUrl = url ? url.replace(/^https?:\/\//, '') : 'example.com';
  const isTitleLong = (title?.length || 0) > 60;
  const isDescOptimal = (description?.length || 0) >= 120 && (description?.length || 0) <= 160;

  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <div className="card-header-clean">
        <div>
          <h3 className="card-title">
            <Eye size={18} color="#0284c7" />
            Google SERP Snippet Preview
          </h3>
          <p className="card-desc">
            Visual simulation of how your page appears in Google search engine results.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className={`badge ${isTitleLong ? 'badge-warning' : 'badge-success'}`}>
            Title: {title?.length || 0} / 60 chars
          </span>
          <span className={`badge ${isDescOptimal ? 'badge-success' : (description?.length || 0) > 0 ? 'badge-warning' : 'badge-error'}`}>
            Meta: {description?.length || 0} / 160 chars
          </span>
        </div>
      </div>

      {/* Realistic Google SERP Preview Box */}
      <div className="serp-preview-box">
        <div className="serp-url-row">
          <div className="serp-favicon"></div>
          <span style={{ fontWeight: 600, color: '#202124' }}>{displayUrl.split('/')[0]}</span>
          <span style={{ color: '#5f6368' }}>› {displayUrl.split('/').slice(1).join(' › ') || 'home'}</span>
        </div>

        <a 
          href="#preview" 
          onClick={(e) => e.preventDefault()}
          className="serp-title"
        >
          {isTitleLong ? `${title.slice(0, 60)}...` : (title || 'No Title Provided')}
        </a>

        <p className="serp-snippet">
          {description ? (
            description.length > 160 ? `${description.slice(0, 160)}...` : description
          ) : (
            <span style={{ color: '#ef4444', fontStyle: 'italic' }}>
              Warning: No meta description provided. Google will auto-generate an excerpt from your page body.
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
