import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "Type your message..." 
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="message-input">
      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-container">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="input-field"
          />
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className="send-button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z"/>
              <path d="M22 2 11 13"/>
            </svg>
          </button>
        </div>
        
        <div className="prompt-suggestions">
          <button
            type="button"
            onClick={() => setMessage("What can you help me with?")}
            className="suggestion-button"
            disabled={disabled}
          >
            What can you help me with?
          </button>
          <button
            type="button"
            onClick={() => setMessage("Tell me about Cloudflare Workers")}
            className="suggestion-button"
            disabled={disabled}
          >
            Tell me about Cloudflare Workers
          </button>
          <button
            type="button"
            onClick={() => setMessage("How does this chatbot work?")}
            className="suggestion-button"
            disabled={disabled}
          >
            How does this chatbot work?
          </button>
        </div>
      </form>
      
      <style>{`
        .message-input {
          padding: 24px;
          border-top: 1px solid #e2e8f0;
          background: white;
        }
        
        .input-form {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .input-container {
          position: relative;
          display: flex;
          align-items: flex-end;
          gap: 12px;
          margin-bottom: 16px;
        }
        
        .input-field {
          flex: 1;
          min-height: 44px;
          max-height: 120px;
          padding: 12px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          resize: none;
          font-family: inherit;
          font-size: 14px;
          line-height: 1.5;
          background: white;
          transition: all 0.2s ease;
        }
        
        .input-field:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .input-field:disabled {
          background: #f8fafc;
          color: #64748b;
          cursor: not-allowed;
        }
        
        .send-button {
          width: 44px;
          height: 44px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        
        .send-button:hover:not(:disabled) {
          background: #2563eb;
          transform: translateY(-1px);
        }
        
        .send-button:disabled {
          background: #94a3b8;
          cursor: not-allowed;
          transform: none;
        }
        
        .prompt-suggestions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .suggestion-button {
          padding: 8px 12px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          font-size: 12px;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .suggestion-button:hover:not(:disabled) {
          background: #e2e8f0;
          color: #475569;
        }
        
        .suggestion-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        @media (max-width: 768px) {
          .message-input {
            padding: 16px;
          }
          
          .prompt-suggestions {
            flex-direction: column;
          }
          
          .suggestion-button {
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
};

export default MessageInput;