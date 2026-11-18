import React from 'react';
import { 
  GraduationCap, 
  Code2, 
  Server, 
  Sparkles, 
  CheckCircle, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  FileCode,
  Globe2,
  Workflow
} from 'lucide-react';

export default function About() {
  const techStack = [
    { name: 'React.js', role: 'Frontend UI Framework', badge: 'v18.3' },
    { name: 'Vite', role: 'Modern Lightning Build Tool', badge: 'v6.1' },
    { name: 'Lucide React', role: 'Accessible Vector Icon Suite', badge: 'v0.475' },
    { name: 'Pure CSS Variables', role: 'Navy & Blue SaaS Design System', badge: 'Custom' },
    { name: 'Python FastAPI', role: 'Planned Backend Microservice', badge: 'FastAPI' },
    { name: 'BeautifulSoup / Scrapy', role: 'Crawler & DOM Parsing Engine', badge: 'Roadmap' }
  ];

  const milestones = [
    {
      phase: 'Phase 1 (Completed)',
      title: 'Responsive Frontend & Rule-Based Audit Simulator',
      desc: 'Built modern SaaS dashboard UI, automated 28 on-page SEO checkpoints, SERP snippet preview, image alt audits, and interactive recommendation trackers.',
      status: 'active'
    },
    {
      phase: 'Phase 2 (FastAPI Integration)',
      title: 'Python FastAPI Crawler Service',
      desc: 'Connect the decoupled API service to a Python backend using requests, BeautifulSoup, or Playwright for headless live page scraping.',
      status: 'upcoming'
    },
    {
      phase: 'Phase 3 (AI Ranking Engine)',
      title: 'AI Semantic Keyword & Meta Generation',
      desc: 'Integrate LLMs to suggest semantic topic clusters, automatically draft meta descriptions, and rewrite titles for CTR optimization.',
      status: 'upcoming'
    }
  ];

  return (
    <div>
      {/* Project Overview Card */}
      <div className="card" style={{ marginBottom: '28px', padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-info">
            <GraduationCap size={14} /> College Project
          </span>
          <span className="badge badge-success">
            Academic Year Capstone
          </span>
        </div>

        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
          AI-Powered SEO Optimization and Search Ranking Platform
        </h2>

        <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '20px' }}>
          Search engine optimization is critical for online visibility, yet many developers and small businesses 
          struggle with technical accessibility and on-page compliance. This project provides an intuitive, 
          automated web platform that audits on-page technical factors, scores website health, simulates 
          search result snippets, and translates complex algorithmic guidelines into clear, prioritized developer fixes.
        </p>

        <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '18px', color: '#0369a1' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={18} />
            Academic Transparency Note on AI & Rule-Based Engine
          </h4>
          <p style={{ fontSize: '0.86rem', lineHeight: 1.5 }}>
            To maintain academic integrity and rigorous methodology, initial evaluation operates via a deterministic, 
            rule-based SEO audit engine. This guarantees accurate, repeatable testing of title tags, meta descriptions, 
            H1 headings, image alternative text, and canonical tags before introducing non-deterministic generative AI models.
          </p>
        </div>
      </div>

      {/* Architecture & Tech Stack Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '28px' }}>
        
        {/* Frontend Architecture */}
        <div className="card">
          <div className="card-header-clean">
            <h3 className="card-title">
              <Code2 size={18} color="#0284c7" />
              Technology Stack
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {techStack.map((tech, idx) => (
              <div 
                key={idx}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{tech.name}</div>
                  <div style={{ fontSize: '0.76rem', color: '#64748b' }}>{tech.role}</div>
                </div>
                <span className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                  {tech.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Backend Readiness & API Layer */}
        <div className="card">
          <div className="card-header-clean">
            <h3 className="card-title">
              <Server size={18} color="#0284c7" />
              FastAPI Backend Readiness
            </h3>
          </div>

          <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.6, marginBottom: '14px' }}>
            The frontend is engineered with an isolated API service layer (<code>src/services/api.js</code>) 
            following RESTful client-server design principles. Once the Python FastAPI backend is spun up, 
            simply configure <code>VITE_API_BASE_URL</code>:
          </p>

          <div style={{ background: '#0f172a', color: '#e2e8f0', padding: '14px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.78rem', marginBottom: '14px', lineHeight: 1.5 }}>
            <span style={{ color: '#38bdf8' }}># Python FastAPI endpoint structure:</span><br />
            POST /api/v1/analyze<br />
            GET &nbsp;/api/v1/history<br />
            GET &nbsp;/api/v1/health
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#047857', background: '#ecfdf5', padding: '10px 14px', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
            <CheckCircle size={16} />
            <span>Decoupled architecture: zero backend code mixed into UI components.</span>
          </div>
        </div>
      </div>

      {/* Project Roadmap & Evolution */}
      <div className="card">
        <div className="card-header-clean">
          <div>
            <h3 className="card-title">
              <Workflow size={20} color="#0284c7" />
              Project Development Roadmap
            </h3>
            <p className="card-desc">
              Phased development plan from initial client prototype to full-stack AI platform.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {milestones.map((m, idx) => (
            <div 
              key={idx}
              style={{ 
                borderLeft: m.status === 'active' ? '4px solid #10b981' : '4px solid #94a3b8',
                paddingLeft: '16px',
                background: '#f8fafc',
                padding: '16px 20px',
                borderRadius: '0 12px 12px 0',
                border: '1px solid #e2e8f0',
                borderLeftWidth: '4px',
                borderLeftColor: m.status === 'active' ? '#10b981' : '#cbd5e1'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className={`badge ${m.status === 'active' ? 'badge-success' : 'badge-neutral'}`}>
                  {m.phase}
                </span>
                <span style={{ fontWeight: 700, fontSize: '0.96rem', color: '#0f172a' }}>
                  {m.title}
                </span>
              </div>
              <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: 1.5 }}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
