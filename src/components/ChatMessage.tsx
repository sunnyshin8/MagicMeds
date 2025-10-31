import { Message } from './ChatInterface';

export default function ChatMessage({ message }: { message: Message }) {
  const isAssistant = message.sender === 'assistant';

  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isAssistant
            ? 'bg-blue-100 text-blue-900'
            : 'bg-blue-500 text-white'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <p className="text-xs opacity-70 mt-1">
          {message.timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}