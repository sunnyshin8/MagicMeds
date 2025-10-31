import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-semibold text-gray-900">MagicMeds</h1>
          <p className="text-gray-600">Your AI-Powered Healthcare Assistant</p>
        </div>
      </header>
      <ChatInterface />
    </main>
  );
}
