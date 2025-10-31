'use client';

import { useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-bounce text-blue-500">...</div>
          </div>
        )}
      </div>
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
}