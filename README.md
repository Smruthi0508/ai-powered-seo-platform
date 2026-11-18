
# RankPulse by Veyor Labs

> **Analyze. Optimize. Rank.**  
> AI-Powered SEO Optimization & Search Ranking Platform

A modern, responsive, and professional SaaS dashboard frontend for auditing website SEO health, evaluating on-page ranking factors, and delivering actionable developer recommendations. Built by Veyor Labs.

---

## 🚀 Key Features

1. **Overview Dashboard**
   - Interactive hero bar to scan any website URL with 1-click sample presets.
   - Core metric stat cards: SEO Health Score, Total Issues, Passed Checks, and Failed Checks.
   - Active website summary preview with quick jump to full report.
   - Interactive recent analyses table with scores, grades, issue counts, and action buttons.

2. **Website SEO Analyzer**
   - URL input with real-time format validation and helpful error feedback.
   - Animated multi-stage scanning simulation (DNS resolution, HTML DOM parsing, Meta tag analysis, Image Alt audit, Heading hierarchy, and Recommendation generation).
   - Audit scope overview outlining all on-page checks.

3. **Comprehensive SEO Audit Report**
   - Overall health score gauge with letter grades (A, B, C, D, F).
   - **Google SERP Snippet Preview**: Real-time visual simulation of desktop search results.
   - **Page Title Tag**: Character length counter (optimal: 50–60 chars) and truncation indicator.
   - **Meta Description**: Character count validator (recommended: 120–160 chars) and content display.
   - **H1 Heading Structure**: Single H1 tag check, multi-H1 alerts, and H1–H4 nesting distribution.
   - **Image Alt Attributes Audit**: Total images counted, missing alt count, and list of flagged images with recommended alt text.
   - **Link Architecture**: Internal vs external link counts and broken 404 link status.
   - **28-Point SEO Checkpoints**: Filterable by All, Passed, Warnings, and Failed.
   - One-click **Copy Summary** button.

4. **Actionable Recommendations**
   - Prioritized by severity: **High / Critical**, **Medium**, and **Low / Optimization**.
   - Clear explanations of the detected problem and the recommended fix.
   - Impact statements explaining search engine ranking consequences.
   - Formatted HTML/JSON-LD code snippets with **1-click Copy** functionality.
   - Interactive **Mark as Resolved** toggle to track remediation progress.

5. **About Page**
   - Academic context and capstone project objectives.
   - Technology stack overview (React.js, Vite, Lucide Icons, pure CSS design system).
   - Academic note explaining the choice of deterministic rule-based evaluation for Phase 1.
   - Decoupled API architecture and roadmap for Python FastAPI & AI integration.

---

## 🛠️ Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite 6
- **Icons**: Lucide React
- **Design System**: Custom CSS variables with a Navy Blue (`#0F172A`), White (`#FFFFFF`), and Light Blue (`#0284C7`) palette.
- **State Management**: React Context (`AuditContext.jsx`)
- **API Service Layer**: `src/services/api.js` (FastAPI-ready)

---

## 💻 Running the Application

### Prerequisites
- Node.js (v18 or newer recommended)
- npm or pnpm

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173
```

### 3. Production Build
```bash
npm run build
```

---

## 🔌 Python FastAPI Backend Integration Guide

The frontend is built with a separate API service (`src/services/api.js`) ready for seamless connection to a Python FastAPI backend.

### Expected Backend Endpoints:
- `POST /api/v1/analyze`: Accepts `{ "url": "https://example.com" }` and returns the audit JSON object.
- `GET /api/v1/history`: Returns previous audit summaries.
- `GET /api/v1/health`: Returns `{ "status": "ok" }`.

### To Connect to Live FastAPI:
1. In `src/services/api.js`, set:
   ```javascript
   export const USE_MOCK = false;
   ```
2. Set your backend URL in `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```


