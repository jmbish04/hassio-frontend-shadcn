import React from 'react';
import { cn } from '../lib/utils';

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
    <aside className="w-70 bg-card border-r border-border flex flex-col h-screen shadow-sm md:w-80">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground">Hassio Frontend</h2>
      </div>
      
      <nav className="p-3 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex items-center w-full p-3 mb-1 rounded-lg text-sm font-medium transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              currentPage === item.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground"
            )}
            onClick={() => onNavigate(item.id)}
          >
            <span className="mr-3 text-base">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;