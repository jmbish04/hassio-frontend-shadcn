import React from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Chat from './pages/Chat';

// Simple router state (in a real app, you'd use React Router)
const getCurrentPage = () => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    if (path === '/chat') return 'chat';
  }
  return 'home';
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(getCurrentPage());

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', page === 'home' ? '/' : `/${page}`);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'chat':
        return <Chat />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <Sidebar 
          currentPage={currentPage}
          onNavigate={handleNavigation}
        />
        <main className="main-content">
          {renderCurrentPage()}
        </main>
      </div>
      <style>{`
        .app {
          min-height: 100vh;
          background: #f8fafc;
        }
        
        .app-container {
          display: flex;
          min-height: 100vh;
        }
        
        .main-content {
          flex: 1;
          padding: 24px;
          overflow-y: auto;
        }
        
        @media (max-width: 768px) {
          .main-content {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default App;