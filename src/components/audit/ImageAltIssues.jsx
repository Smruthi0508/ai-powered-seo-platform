import React from 'react';
import { Image as ImageIcon, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function ImageAltIssues({ imageAltData }) {
  if (!imageAltData) return null;

  const { total = 0, withAlt = 0, missingAlt = 0, missingList = [] } = imageAltData;
  const isHealthy = missingAlt === 0;

  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <div className="card-header-clean">
        <div>
          <h3 className="card-title">
            <ImageIcon size={18} color="#0284c7" />
            Image Alternative Text (Alt) Audit
          </h3>
          <p className="card-desc">
            Alt tags provide text descriptions for screen readers and enable indexing in Google Image Search.
          </p>
        </div>
        <span className={`badge ${isHealthy ? 'badge-success' : 'badge-error'}`}>
          {isHealthy ? 'All Images Passed' : `${missingAlt} Missing Alt Tags`}
        </span>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '20px' }}>
        <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Total Images</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>{total}</div>
        </div>

        <div style={{ background: '#ecfdf5', padding: '12px 16px', borderRadius: '10px', border: '1px solid #a7f3d0' }}>
          <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 600, textTransform: 'uppercase' }}>Images With Alt</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#047857' }}>{withAlt}</div>
        </div>

        <div style={{ background: missingAlt > 0 ? '#fef2f2' : '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: missingAlt > 0 ? '1px solid #fecaca' : '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.75rem', color: missingAlt > 0 ? '#b91c1c' : '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Missing Alt Tags</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: missingAlt > 0 ? '#b91c1c' : '#0f172a' }}>{missingAlt}</div>
        </div>
      </div>

      {/* Flagged Images Table / List */}
      {missingAlt > 0 ? (
        <div>
          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={15} color="#ef4444" />
            Flagged Image Elements Requiring Alt Attributes:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {missingList.map((img, idx) => (
              <div 
                key={img.id || idx}
                style={{ 
                  background: '#f8fafc', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '10px', 
                  padding: '12px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <code style={{ fontSize: '0.8rem', color: '#0369a1', background: '#e0f2fe', padding: '2px 8px', borderRadius: '4px', wordBreak: 'break-all' }}>
                    {img.src}
                  </code>
                  <span className="badge badge-error" style={{ fontSize: '0.7rem' }}>Missing Alt</span>
                </div>

                {img.suggestedAlt && (
                  <div style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ color: '#047857' }}>Suggested Alt:</strong> 
                    <span>"{img.suggestedAlt}"</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#ecfdf5', padding: '14px', borderRadius: '10px', color: '#047857', fontSize: '0.88rem' }}>
          <CheckCircle size={18} />
          <span>Great job! All images on this page contain valid alternative text descriptions.</span>
        </div>
      )}
    </div>
  );
}
