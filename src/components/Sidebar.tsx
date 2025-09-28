import React from 'react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'chat', label: 'Chat', icon: '💬' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Hassio Frontend</h2>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <style>{`
        .sidebar {
          width: 280px;
          background: white;
          border-right: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          height: 100vh;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }
        
        .sidebar-header {
          padding: 24px 20px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .sidebar-header h2 {
          margin: 0;
          color: #1e293b;
          font-size: 20px;
          font-weight: 600;
        }
        
        .sidebar-nav {
          padding: 16px 12px;
          flex: 1;
        }
        
        .nav-item {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 12px 16px;
          margin-bottom: 4px;
          border: none;
          border-radius: 8px;
          background: transparent;
          color: #64748b;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }
        
        .nav-item:hover {
          background: #f1f5f9;
          color: #475569;
        }
        
        .nav-item.active {
          background: #3b82f6;
          color: white;
        }
        
        .nav-icon {
          margin-right: 12px;
          font-size: 16px;
        }
        
        .nav-label {
          font-weight: 500;
        }
        
        @media (max-width: 768px) {
          .sidebar {
            width: 240px;
          }
          
          .sidebar-header {
            padding: 20px 16px;
          }
          
          .sidebar-nav {
            padding: 12px 8px;
          }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;