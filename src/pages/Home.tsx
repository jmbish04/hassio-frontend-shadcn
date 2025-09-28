import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Hassio Frontend</h1>
        <p className="hero-description">
          A modern frontend built with React, Cloudflare Workers, and shadcn/ui components.
          Experience the power of edge computing with AI-powered chat functionality.
        </p>
        
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Edge Computing</h3>
            <p>Built on Cloudflare Workers for ultra-fast global performance</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI-Powered Chat</h3>
            <p>Integrated with Cloudflare AI for intelligent conversations</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Modern UI</h3>
            <p>Beautiful components powered by shadcn/ui design system</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Responsive</h3>
            <p>Fully responsive design that works on all devices</p>
          </div>
        </div>
      </div>
      
      <style>{`
        .home {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .hero-section {
          text-align: center;
          padding: 48px 0;
        }
        
        .hero-title {
          font-size: 48px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 16px 0;
          line-height: 1.1;
        }
        
        .hero-description {
          font-size: 20px;
          color: #64748b;
          margin: 0 0 48px 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }
        
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
          margin-top: 64px;
        }
        
        .feature-card {
          background: white;
          padding: 32px 24px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px 0 rgba(0, 0, 0, 0.12);
        }
        
        .feature-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .feature-card h3 {
          font-size: 24px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 12px 0;
        }
        
        .feature-card p {
          font-size: 16px;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: 36px;
          }
          
          .hero-description {
            font-size: 18px;
            padding: 0 16px;
          }
          
          .feature-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-top: 48px;
          }
          
          .feature-card {
            padding: 24px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;