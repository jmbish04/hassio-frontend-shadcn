import React, { useState, useCallback } from 'react';
import MessageList from '../components/ui/message-list';
import MessageInput from '../components/ui/message-input';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: generateId(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content }
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: generateId(),
        content: data.choices[0]?.message?.content || 'Sorry, I encountered an error.',
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: generateId(),
        content: 'Sorry, I encountered an error while processing your request. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="header-content">
          <h1>AI Chat Assistant</h1>
          <p>Powered by Cloudflare Workers AI</p>
        </div>
        {messages.length > 0 && (
          <button onClick={clearChat} className="clear-button">
            Clear Chat
          </button>
        )}
      </div>
      
      <div className="chat-container">
        <MessageList messages={messages} isLoading={isLoading} />
        <MessageInput 
          onSendMessage={sendMessage} 
          disabled={isLoading}
          placeholder="Ask me anything..."
        />
      </div>
      
      <style>{`
        .chat-page {
          height: calc(100vh - 48px);
          display: flex;
          flex-direction: column;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 0 16px 0;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 0;
        }
        
        .header-content h1 {
          margin: 0 0 4px 0;
          font-size: 32px;
          font-weight: 700;
          color: #1e293b;
        }
        
        .header-content p {
          margin: 0;
          color: #64748b;
          font-size: 16px;
        }
        
        .clear-button {
          padding: 8px 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          color: #64748b;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s ease;
        }
        
        .clear-button:hover {
          background: #f1f5f9;
          color: #475569;
        }
        
        .chat-container {
          flex: 1;
          background: white;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        
        @media (max-width: 768px) {
          .chat-page {
            height: calc(100vh - 32px);
          }
          
          .chat-header {
            padding: 16px 0 12px 0;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .header-content h1 {
            font-size: 28px;
          }
          
          .header-content p {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default Chat;