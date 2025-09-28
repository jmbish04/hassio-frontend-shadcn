import React from 'react';
import { cn } from "../../lib/utils";
import CopyButton from './copy-button';
import MarkdownRenderer from './markdown-renderer';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  className?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, className }) => {
  const isUser = message.role === 'user';

  return (
    <div className={cn("flex gap-3 p-4", isUser && "flex-row-reverse", className)}>
      <div className="flex-shrink-0">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}>
          {isUser ? '👤' : '🤖'}
        </div>
      </div>
      
      <div className={cn("flex-1 space-y-2", isUser && "text-right")}>
        <div className={cn(
          "inline-block max-w-[80%] rounded-lg px-3 py-2",
          isUser 
            ? "bg-primary text-primary-foreground ml-auto" 
            : "bg-muted text-muted-foreground"
        )}>
          {isUser ? (
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          ) : (
            <MarkdownRenderer 
              content={message.content} 
              className={cn("text-sm", !isUser && "text-muted-foreground")}
            />
          )}
        </div>
        
        <div className={cn("flex items-center gap-2 text-xs text-muted-foreground", isUser && "justify-end")}>
          <span>{message.timestamp.toLocaleTimeString()}</span>
          {!isUser && (
            <CopyButton 
              content={message.content}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;