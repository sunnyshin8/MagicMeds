export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About MagicMeds</h1>
          
          <div className="space-y-6 text-gray-600">
            <p>
              MagicMeds is an innovative AI-powered healthcare assistant designed to provide reliable, 
              instant responses to your health-related questions. Our platform combines advanced 
              artificial intelligence with comprehensive medical knowledge to offer accurate and 
              helpful information.
            </p>

            <div className="border-l-4 border-blue-500 pl-4 my-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h2>
              <p>
                To make reliable healthcare information accessible to everyone, anytime, anywhere. 
                We strive to bridge the gap between people and healthcare knowledge through 
                innovative AI technology.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">What Sets Us Apart</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Advanced AI Technology</li>
              <li>24/7 Availability</li>
              <li>User-Friendly Interface</li>
              <li>Accurate and Up-to-date Information</li>
              <li>Secure and Private Platform</li>
            </ul>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Important Note</h2>
              <p className="text-sm text-gray-500">
                While MagicMeds provides helpful health-related information, it should not be 
                considered a replacement for professional medical advice. Always consult with 
                qualified healthcare providers for medical diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}