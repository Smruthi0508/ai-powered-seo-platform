const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Live backend mode
export const USE_MOCK = false;

// Check backend connection
export async function checkBackendStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/health`);

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json();

    return { connected: true, data };
  } catch (error) {
    return {
      connected: false,
      message: 'FastAPI backend is offline',
      error: error.message
    };
  }
}

// Convert backend response into the existing RankPulse format
function adaptBackendResponse(data) {
  const checks = data.checks || {};

  const title = checks.title || {};
  const meta = checks.meta_description || {};
  const h1 = checks.h1 || {};
  const image = checks.image_alt || {};
  const links = checks.links || {};

  const checkItems = [
    {
      id: 'title',
      category: 'Meta Tags',
      name: 'Page Title',
      status: title.status,
      score: title.points,
      details: title.message
    },
    {
      id: 'meta',
      category: 'Meta Tags',
      name: 'Meta Description',
      status: meta.status,
      score: meta.points,
      details: meta.message
    },
    {
      id: 'h1',
      category: 'Content & Structure',
      name: 'H1 Heading',
      status: h1.status,
      score: h1.points,
      details: h1.message
    },
    {
      id: 'image-alt',
      category: 'Accessibility & Media',
      name: 'Image Alt Text',
      status: image.status,
      score: image.points,
      details: image.message
    },
    {
      id: 'links',
      category: 'Links & Crawlability',
      name: 'Links',
      status: links.status,
      score: links.points,
      details: links.message
    }
  ];

  const normalizeStatus = (status) => {
    if (status === 'pass') return 'passed';
    if (status === 'fail') return 'failed';
    return status || 'not_applicable';
  };

  const normalizedChecks = checkItems.map((item) => ({
    ...item,
    status: normalizeStatus(item.status)
  }));

  const passedChecks = normalizedChecks.filter(
    (item) => item.status === 'passed'
  ).length;

  const notApplicableChecks = normalizedChecks.filter(
    (item) => item.status === 'not_applicable'
  ).length;
  const failedChecks = normalizedChecks.filter(
    (item) => item.status === 'failed'
  ).length;

  const warningChecks = normalizedChecks.filter(
    (item) => item.status === 'warning'
  ).length;

  
const recommendations = (data.recommendations || []).map(
  (recommendation, index) => {
    const isTitleLengthIssue = recommendation.toLowerCase().includes('title length');

    return {
      id: `backend-rec-${index + 1}`,
      title: recommendation,
      severity: isTitleLengthIssue ? 'low' : 'medium',
      category: 'SEO Improvement',
      impact: isTitleLengthIssue
        ? 'Helps improve page title clarity and display.'
        : 'Improves on-page SEO quality.',
      problem: isTitleLengthIssue
        ? 'The page title is outside the suggested 30–60 character range.'
        : recommendation,
      solution: isTitleLengthIssue
        ? 'Consider expanding the title with relevant descriptive keywords while keeping it concise.'
        : recommendation,
      codeSnippet: ''
    };
  }
);


  return {
    id: `live-${Date.now()}`,
    url: data.url,
    domain: new URL(data.url).hostname,
    overallScore: data.seo_score,
    grade:
      data.seo_score >= 90 ? 'A' :
      data.seo_score >= 80 ? 'B' :
      data.seo_score >= 70 ? 'C' :
      data.seo_score >= 60 ? 'D' : 'F',
    status: 'Completed',
    auditedAt: new Date().toLocaleString(),

    totalIssues: failedChecks + warningChecks,
    criticalIssues: failedChecks,
    warningIssues: warningChecks,
    passedChecks,
    failedChecks,
    notApplicableChecks,
    totalChecks: normalizedChecks.length,

    pageTitle: {
      value: title.value || '',
      length: (title.value || '').length,
      recommendedMin: 30,
      recommendedMax: 60,
      status: normalizeStatus(title.status),
      message: title.message || ''
    },

    metaDescription: {
      value: meta.value || '',
      length: (meta.value || '').length,
      recommendedMin: 120,
      recommendedMax: 160,
      status: normalizeStatus(meta.status),
      message: meta.message || ''
    },

    h1: {
      value: Array.isArray(h1.value)
        ? h1.value.join(', ')
        : h1.value || '',
      count: Array.isArray(h1.value) ? h1.value.length : 0,
      status: normalizeStatus(h1.status),
      message: h1.message || '',
      hierarchy: {
        h1: Array.isArray(h1.value) ? h1.value.length : 0,
        h2: 0,
        h3: 0,
        h4: 0
      }
    },

    imageAlt: {
      total: image.value?.total || 0,
      withAlt: image.value?.with_alt || 0,
      missingAlt: image.value?.missing_alt || 0,
      status: normalizeStatus(image.status),
      message: image.message || '',
      missingList: []
    },

    links: {
      total: links.value?.total || 0,
      internal: links.value?.internal || 0,
      external: links.value?.external || 0,
      broken: 0,
      status: normalizeStatus(links.status),
      message: links.message || '',
      sampleInternal: [],
      sampleExternal: []
    },

    crawlDetails: null,
    checks: normalizedChecks,
    recommendations
  };
}

// Run real website SEO analysis
export async function analyzeWebsite(url, onProgress = null) {
  if (onProgress) {
    onProgress('Connecting to FastAPI backend...', 20);
  }

  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: url.trim() })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error?.message ||
      data?.detail ||
      `SEO analysis failed (${response.status})`
    );
  }

  if (onProgress) {
    onProgress('Processing real SEO analysis results...', 85);
  }

  const result = adaptBackendResponse(data);

  if (onProgress) {
    onProgress('SEO analysis completed!', 100);
  }

  return result;
}

// Backend does not currently provide analysis history.
// Return an empty list rather than presenting mock records as real.
export async function getRecentAnalyses() {
  return [];
}
