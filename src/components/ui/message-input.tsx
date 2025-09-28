import React, { useState } from 'react';
import { Button } from './button';
import { Textarea } from './textarea';
import { cn } from '../../lib/utils';

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

  const promptSuggestions = [
    "What can you help me with?",
    "Tell me about Cloudflare Workers",
    "How does this chatbot work?"
  ];

  return (
    <div className="p-6 border-t border-border bg-card">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex items-end gap-3 mb-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="flex-1 min-h-[44px] max-h-32 resize-none"
          />
          <Button
            type="submit"
            disabled={!message.trim() || disabled}
            size="icon"
            className="h-11 w-11 flex-shrink-0"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z"/>
              <path d="M22 2 11 13"/>
            </svg>
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {promptSuggestions.map((suggestion, index) => (
            <Button
              key={index}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setMessage(suggestion)}
              disabled={disabled}
              className="text-xs"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default MessageInput;