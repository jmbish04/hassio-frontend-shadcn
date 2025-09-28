import React from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Chat from './pages/Chat';

// Simple router state (in a real app, you'd use React Router)
const getCurrentPage = (path?: string) => {
  if (path) {
    if (path === '/chat') return 'chat';
    return 'home';
  }
  if (typeof window !== 'undefined') {
    const windowPath = window.location.pathname;
    if (windowPath === '/chat') return 'chat';
  }
  return 'home';
};

const App: React.FC<{ path?: string }> = ({ path }) => {
  const [currentPage, setCurrentPage] = React.useState(getCurrentPage(path));

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
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <Sidebar 
          currentPage={currentPage}
          onNavigate={handleNavigation}
        />
        <main className="flex-1 p-6 overflow-y-auto md:p-8">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};

export default App;