import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
          Welcome to Hassio Frontend
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed px-4">
          A modern frontend built with React, Cloudflare Workers, and shadcn/ui components.
          Experience the power of edge computing with AI-powered chat functionality.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-center">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">Edge Computing</h3>
            <p className="text-muted-foreground leading-relaxed">
              Built on Cloudflare Workers for ultra-fast global performance
            </p>
          </div>
          
          <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-center">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">AI-Powered Chat</h3>
            <p className="text-muted-foreground leading-relaxed">
              Integrated with Cloudflare AI for intelligent conversations
            </p>
          </div>
          
          <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-center">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">Modern UI</h3>
            <p className="text-muted-foreground leading-relaxed">
              Beautiful components powered by shadcn/ui design system
            </p>
          </div>
          
          <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-center">
            <div className="text-5xl mb-4">📱</div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">Responsive</h3>
            <p className="text-muted-foreground leading-relaxed">
              Fully responsive design that works on all devices
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;