import React, { useState, useCallback } from 'react';
import ChatMessage, { Message } from '../components/ui/chat-message';
import MessageInput from '../components/ui/message-input';
import { Button } from '../components/ui/button';

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
    <div className="h-[calc(100vh-3rem)] flex flex-col max-w-6xl mx-auto">
      <div className="flex justify-between items-center py-6 border-b border-border mb-0">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1">AI Chat Assistant</h1>
          <p className="text-muted-foreground">Powered by Cloudflare Workers AI</p>
        </div>
        {messages.length > 0 && (
          <Button variant="outline" onClick={clearChat}>
            Clear Chat
          </Button>
        )}
      </div>
      
      <div className="flex-1 bg-card border border-border rounded-2xl shadow-sm flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">Start a conversation</h3>
              <p className="text-muted-foreground">Send a message to begin chatting with the AI assistant.</p>
            </div>
          ) : (
            <div className="space-y-0">
              {messages.map((message) => (
                <div key={message.id} className="group">
                  <ChatMessage message={message} />
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 p-4">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">
                    🤖
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="inline-block bg-muted rounded-lg px-3 py-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <MessageInput 
          onSendMessage={sendMessage} 
          disabled={isLoading}
          placeholder="Ask me anything..."
        />
      </div>
    </div>
  );
};

export default Chat;