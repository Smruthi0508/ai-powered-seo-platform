import React, { createContext, useContext, useState, useEffect } from 'react';

import { analyzeWebsite } from '../services/api';

const AuditContext = createContext(null);

export function AuditProvider({ children }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUrl, setCurrentUrl] = useState('');
  const [activeAudit, setActiveAudit] = useState(null);
  const [analysesHistory, setAnalysesHistory] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState({ text: '', percentage: 0 });
  const [errorMessage, setErrorMessage] = useState('');
  const [resolvedIssues, setResolvedIssues] = useState(new Set());

  // URL Validation helper
  const validateUrl = (url) => {
    if (!url || !url.trim()) {
      return 'Please enter a website URL.';
    }
    const trimmed = url.trim();
    // Regex for basic domain or URL validation
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/i;
    if (!urlPattern.test(trimmed)) {
      return 'Please enter a valid URL (e.g. https://example.com or techstart.io)';
    }
    return '';
  };

  const runAnalysis = async (urlToAnalyze, targetPage = 'report') => {
    const error = validateUrl(urlToAnalyze);
    if (error) {
      setErrorMessage(error);
      return false;
    }

    setErrorMessage('');
    setIsAnalyzing(true);
    setAnalysisProgress({ text: 'Initializing SEO audit scanner...', percentage: 5 });

    try {
      const result = await analyzeWebsite(urlToAnalyze, (text, percentage) => {
        setAnalysisProgress({ text, percentage });
      });

      setActiveAudit(result);
      setCurrentUrl(result.url);

      // Prepend to history if not already top
      setAnalysesHistory((prev) => {
        const filtered = prev.filter((item) => item.url.toLowerCase() !== result.url.toLowerCase());
        return [result, ...filtered];
      });

      setIsAnalyzing(false);
      setAnalysisProgress({ text: '', percentage: 0 });
      setActiveTab(targetPage);
      return true;
    } catch (err) {
      setIsAnalyzing(false);
      setAnalysisProgress({ text: '', percentage: 0 });
      setErrorMessage(
        err.message || 'SEO analysis failed. Please try again.'
      );
      return false;
    }
  };

  const selectAuditFromHistory = (siteId) => {
    const found = analysesHistory.find((site) => site.id === siteId);
    if (found) {
      setActiveAudit(found);
      setCurrentUrl(found.url);
      setActiveTab('report');
    }
  };

  const toggleResolvedIssue = (recId) => {
    setResolvedIssues((prev) => {
      const updated = new Set(prev);
      if (updated.has(recId)) {
        updated.delete(recId);
      } else {
        updated.add(recId);
      }
      return updated;
    });
  };

  return (
    <AuditContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentUrl,
        setCurrentUrl,
        activeAudit,
        setActiveAudit,
        analysesHistory,
        isAnalyzing,
        analysisProgress,
        errorMessage,
        setErrorMessage,
        validateUrl,
        runAnalysis,
        selectAuditFromHistory,
        resolvedIssues,
        toggleResolvedIssue
      }}
    >
      {children}
    </AuditContext.Provider>
  );
}

export function useAudit() {
  const context = useContext(AuditContext);
  if (!context) {
    throw new Error('useAudit must be used within an AuditProvider');
  }
  return context;
}
