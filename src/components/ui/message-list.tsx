import React, { useRef, useEffect } from 'react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading = false }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <h3>Start a conversation</h3>
          <p>Send a message to begin chatting with the AI assistant.</p>
        </div>
      ) : (
        <div className="messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.role}`}>
              <div className="message-avatar">
                {message.role === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-content">
                <div className="message-text">
                  {message.content}
                </div>
                <div className="message-timestamp">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message assistant">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div ref={messagesEndRef} />
      
      <style>{`
        .message-list {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
        }
        
        .empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #64748b;
        }
        
        .empty-icon {
          font-size: 64px;
          margin-bottom: 16px;
        }
        
        .empty-state h3 {
          margin: 0 0 8px 0;
          color: #1e293b;
          font-size: 24px;
          font-weight: 600;
        }
        
        .empty-state p {
          margin: 0;
          font-size: 16px;
        }
        
        .messages {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .message {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        
        .message.user {
          flex-direction: row-reverse;
        }
        
        .message-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          font-size: 18px;
          flex-shrink: 0;
        }
        
        .message.user .message-avatar {
          background: #3b82f6;
          color: white;
        }
        
        .message-content {
          flex: 1;
          max-width: 80%;
        }
        
        .message.user .message-content {
          text-align: right;
        }
        
        .message-text {
          background: white;
          padding: 12px 16px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          word-wrap: break-word;
          line-height: 1.5;
        }
        
        .message.user .message-text {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }
        
        .message-timestamp {
          font-size: 12px;
          color: #64748b;
          margin-top: 4px;
        }
        
        .message.user .message-timestamp {
          text-align: right;
        }
        
        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 12px 16px;
          background: white;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }
        
        .typing-indicator span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #64748b;
          animation: typing 1.4s infinite;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }
        
        @media (max-width: 768px) {
          .message-list {
            padding: 16px;
          }
          
          .message-content {
            max-width: 85%;
          }
        }
      `}</style>
    </div>
  );
};

export default MessageList;