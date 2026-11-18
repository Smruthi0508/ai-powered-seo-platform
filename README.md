# RankPulse – AI-Powered SEO Optimization Platform

**By Veyor Labs**

**Analyze. Optimize. Rank.**

RankPulse is a web-based SEO analysis platform designed to help users identify common on-page SEO issues through an interactive dashboard and automated website analysis.

The platform fetches website HTML, evaluates important SEO elements using a rule-based analysis engine, calculates an SEO score, and provides actionable recommendations for improvement.

## 🚀 Project Overview

Search Engine Optimization (SEO) plays an important role in improving a website's visibility and search engine performance. Identifying SEO issues manually can be time-consuming.

RankPulse aims to simplify this process by providing a centralized platform that analyzes website content and presents SEO findings in an easy-to-understand dashboard.

The current prototype uses a Python-based rule engine integrated with a React frontend through a FastAPI backend.

## ✨ Key Features

- **Website Analyzer:** Enter a website URL to perform an SEO analysis.
- **SEO Dashboard:** View SEO scores, detected issues, and analysis summaries.
- **SEO Audit Report:** View detailed results of individual SEO checks.
- **Page Title Analysis:** Checks whether a page title exists and provides length recommendations.
- **Meta Description Analysis:** Identifies missing meta descriptions and evaluates their length.
- **H1 Heading Analysis:** Checks for the presence of H1 headings and identifies multiple H1 headings.
- **Image Alt Text Analysis:** Identifies images with missing alt attributes.
- **Link Analysis:** Counts internal and external links and identifies links without href attributes.
- **SEO Score:** Calculates an overall score out of 100 based on five SEO checks.
- **Optimization Recommendations:** Provides suggestions based on detected issues.
- **Analysis History:** Displays recent analyses during the current application session.

## 🔍 SEO Analysis Checks

The current version evaluates five important on-page SEO factors.

| SEO Check | Analysis |
|---|---|
| Page Title | Checks title presence and recommends a length of approximately 30–60 characters. |
| Meta Description | Checks description presence and recommends approximately 120–160 characters. |
| H1 Headings | Checks whether H1 headings exist and identifies multiple H1 headings. |
| Image Alt Text | Checks images for the presence of alt attributes. |
| Hyperlinks | Counts internal and external links and identifies missing href attributes. |

### SEO Score Calculation

Each SEO check contributes a maximum of 20 points.

**Maximum SEO Score: 100 points**

The final score is calculated using the points awarded across the five checks.

When a page contains no images or links, the corresponding check is marked as Not Applicable and receives full points in the current scoring implementation.

## 🛠️ Technology Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Vite
- Lucide React

### Backend
- Python
- FastAPI
- Requests
- BeautifulSoup4
- Uvicorn

### Development Tools
- Visual Studio Code
- Git
- GitHub
- Antigravity

## 🏗️ System Architecture

The application follows a frontend-backend architecture.

1. The user enters a website URL in the React frontend.
2. The frontend sends an HTTP request to the FastAPI backend.
3. The backend validates the URL and retrieves the website HTML.
4. BeautifulSoup parses the HTML content.
5. The rule-based SEO engine evaluates the five SEO factors.
6. The backend calculates the SEO score and generates recommendations.
7. The API returns the analysis results in JSON format.
8. The React frontend displays the results through the dashboard, audit report, and recommendations pages.

### Application Workflow

```text
          USER
            |
            v
     REACT FRONTEND
            |
            v
       FASTAPI API
            |
            v
     URL VALIDATION
            |
            v
    WEBSITE HTML FETCH
            |
            v
   BEAUTIFULSOUP PARSING
            |
            v
    SEO RULE ENGINE
            |
            v
   SEO SCORE & RESULTS
            |
            v
      JSON RESPONSE
            |
            v
    REACT DASHBOARD
            |
            v
    SEO REPORT &
   RECOMMENDATIONS
```

## 📂 Project Structure

```text
ai-powered-seo-platform/
│
├── src/
│   ├── components/
│   │   ├── audit/
│   │   ├── common/
│   │   └── layout/
│   │
│   ├── context/
│   │   └── AuditContext.jsx
│   │
│   ├── data/
│   │   └── mockData.js
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── WebsiteAnalyzer.jsx
│   │   ├── AuditReport.jsx
│   │   ├── Recommendations.jsx
│   │   └── About.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── main.py
├── seo_analyzer.py
├── requirements.txt
├── sample_response.json
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Install the following before running the project:

- Python 3.10 or later
- Node.js and npm
- Git
- Visual Studio Code (recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/Smruthi0508/ai-powered-seo-platform.git

cd ai-powered-seo-platform
```

### 2. Backend Setup

Create a Python virtual environment:

```bash
python -m venv .venv
```

Activate the environment using Git Bash:

```bash
source .venv/Scripts/activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
python -m uvicorn main:app --reload
```

Backend URL:

`http://127.0.0.1:8000`

FastAPI documentation:

`http://127.0.0.1:8000/docs`

### 3. Frontend Setup

Open a second terminal in the project directory.

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

Frontend URL:

`http://localhost:5173`

### 4. Run the Application

Ensure both frontend and backend servers are running.

Open the frontend URL in your browser:

`http://localhost:5173`

Enter a website URL and start an SEO analysis.

## 🔗 API Endpoints

The backend provides the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Checks whether the backend is running. |
| GET | `/api/v1/health` | Backend health check. |
| POST | `/api/analyze` | Performs website SEO analysis. |

### Example API Request

**Endpoint:**

`POST /api/analyze`

**Request Body:**

```json
{
  "url": "https://example.com/"
}
```

The API returns:
- Website URL
- Overall SEO score
- Individual SEO check results
- Points awarded for each check
- SEO recommendations

## 🔒 Security and Validation

The backend includes basic safeguards:

- Allows only HTTP and HTTPS URLs.
- Rejects URLs containing embedded credentials.
- Validates public IP addresses.
- Restricts redirects.
- Limits downloaded response size to 2 MB.
- Uses request timeouts.
- Accepts HTML webpage responses for analysis.

## ⚠️ Current Implementation Scope

The current version is a functional prototype with a rule-based SEO analysis engine.

The platform currently:
- Analyzes fetched HTML content.
- Evaluates five on-page SEO factors.
- Generates rule-based recommendations.
- Calculates a score out of 100.

**Current limitations:**
- It does not use a trained AI or machine learning model.
- It does not perform actual Google search ranking analysis.
- It does not verify whether hyperlinks return broken HTTP responses.
- It does not fully render JavaScript-generated webpage content.
- Analysis history is maintained in the frontend session and is not stored in a database.
- It does not perform comprehensive website crawling.

## 🔮 Future Enhancements

- Integration of AI/ML-based SEO recommendations.
- Advanced keyword analysis.
- Google Search Console integration.
- Search engine ranking analysis.
- Broken-link verification.
- Full website crawling.
- Database integration for persistent analysis history.
- Advanced competitor SEO analysis.
- Additional technical SEO checks.

## 👥 Team Veyor Labs

| Team Member | Responsibility |
|---|---|
| Smruthi | Frontend Development |
| Soujanya | SEO Analysis and Recommendations |
| Sukanya | Backend Development |

## 🎯 Project Objective

The objective of RankPulse is to develop an accessible and user-friendly SEO analysis platform that simplifies the identification of common website optimization issues.

By combining a React-based interface with a Python FastAPI backend, the project demonstrates how automated website analysis can help users understand and improve important on-page SEO factors.

---

**RankPulse by Veyor Labs**

*Analyze. Optimize. Rank.*