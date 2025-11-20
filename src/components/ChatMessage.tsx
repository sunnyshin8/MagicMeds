import { Message } from './ChatInterface';

export default function ChatMessage({ message }: { message: Message }) {
  const isAssistant = message.sender === 'assistant';

  return (
    <div className={`flex items-end space-x-2 ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      {isAssistant && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
      )}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          isAssistant
            ? 'bg-white border border-gray-200 text-gray-900'
            : 'bg-blue-500 text-white'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        <p className={`text-xs mt-1 ${isAssistant ? 'text-gray-500' : 'text-blue-100'}`}>
          {message.timestamp.toLocaleTimeString()}
        </p>
      </div>
      {!isAssistant && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}