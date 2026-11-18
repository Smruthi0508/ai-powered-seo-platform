import React, { useState } from 'react';
import { AuditProvider, useAudit } from './context/AuditContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import WebsiteAnalyzer from './pages/WebsiteAnalyzer';
import AuditReport from './pages/AuditReport';
import Recommendations from './pages/Recommendations';
import About from './pages/About';

function AppContent() {
  const { activeTab } = useAudit();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'analyzer':
        return <WebsiteAnalyzer />;
      case 'report':
        return <AuditReport />;
      case 'recommendations':
        return <Recommendations />;
      case 'about':
        return <About />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      {/* Mobile Backdrop */}
      <div 
        className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Modern Navy Sidebar */}
      <Sidebar 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header onToggleMenu={() => setMobileMenuOpen((prev) => !prev)} />
        <main className="content-body">
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuditProvider>
      <AppContent />
    </AuditProvider>
  );
}
