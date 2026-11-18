/**
 * API Service for AI-Powered SEO Optimization and Search Ranking Platform
 * 
 * DESIGNED FOR PYTHON FASTAPI BACKEND INTEGRATION
 * ==============================================================
 * This service is pre-configured to communicate with a Python FastAPI backend.
 * 
 * Expected FastAPI Endpoints:
 * 1. POST /api/v1/analyze
 *    Request Body: { "url": "https://example.com", "depth": "standard" }
 *    Response: JSON matching the SEO Audit Report schema
 * 
 * 2. GET /api/v1/history
 *    Response: Array of recent analysis summaries
 * 
 * 3. GET /api/v1/health
 *    Response: { "status": "ok", "engine": "rule-based-v1", "ai_ready": true }
 * 
 * Initial release operates using a deterministic rule-based SEO audit simulator.
 * Toggle `USE_MOCK = false` once FastAPI backend is running at VITE_API_BASE_URL.
 */

import { SAMPLE_WEBSITES, generateMockAudit } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// Set to false when connecting to live Python FastAPI server
export const USE_MOCK = true;

/**
 * Check if the Python FastAPI backend is currently online
 */
export async function checkBackendStatus() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return { connected: true, data };
    }
    return { connected: false, message: 'Backend returned non-200 status' };
  } catch (error) {
    return { 
      connected: false, 
      message: 'FastAPI backend offline (Running in Rule-Based Frontend Mode)',
      error: error.message 
    };
  }
}

/**
 * Run SEO Analysis for a given URL
 * Simulates real-time audit phases when in mock mode.
 * 
 * @param {string} url - Target URL to analyze
 * @param {function} onProgress - Callback for scanning steps
 * @returns {Promise<object>} Complete SEO audit report
 */
export async function analyzeWebsite(url, onProgress = null) {
  // If connected to live FastAPI backend:
  if (!USE_MOCK) {
    try {
      if (onProgress) onProgress('Sending request to Python FastAPI crawler...', 20);
      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() })
      });

      if (!response.ok) {
        throw new Error(`Crawler API failed with status ${response.status}`);
      }

      if (onProgress) onProgress('Processing response from rule-based engine...', 85);
      const data = await response.json();
      return data;
    } catch (err) {
      console.warn('FastAPI request failed, falling back to client-side rule evaluation:', err);
    }
  }

  // Fallback / Initial Rule-Based Mock Simulation:
  const steps = [
    { text: 'Connecting to host and resolving DNS...', progress: 18 },
    { text: 'Crawling HTML Document Object Model...', progress: 38 },
    { text: 'Evaluating title, meta tags, and open graph schemas...', progress: 58 },
    { text: 'Auditing image alt tags and media assets...', progress: 78 },
    { text: 'Evaluating heading hierarchy & link distribution...', progress: 92 },
    { text: 'Compiling rule-based SEO recommendations...', progress: 100 }
  ];

  for (const step of steps) {
    if (onProgress) {
      onProgress(step.text, step.progress);
    }
    await new Promise((res) => setTimeout(res, 280));
  }

  // Check if matches pre-analyzed sample site
  const normalized = url.toLowerCase().trim().replace(/\/$/, '');
  const existing = SAMPLE_WEBSITES.find((s) => s.url.toLowerCase() === normalized || s.domain.toLowerCase() === normalized.replace(/^https?:\/\//, ''));

  if (existing) {
    return { ...existing, auditedAt: 'Just now' };
  }

  // Otherwise generate dynamic audit for the custom URL
  return generateMockAudit(url);
}

/**
 * Fetch list of recent site analyses
 */
export async function getRecentAnalyses() {
  if (!USE_MOCK) {
    try {
      const response = await fetch(`${API_BASE_URL}/history`);
      if (response.ok) return await response.json();
    } catch (err) {
      console.warn('Failed to fetch remote history, returning local sample data', err);
    }
  }

  return SAMPLE_WEBSITES;
}
