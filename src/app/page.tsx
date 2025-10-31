import ChatInterface from '@/components/ChatInterface';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Chat Interface */}
      <section className="bg-gradient-to-br from-emerald-500 to-emerald-700 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ChatInterface />
          </div>
        </div>
      </section>

      {/* Health Articles Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Health Articles</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Understanding Diabetes: Prevention and Management",
                  author: "Dr. Anjali Sharma",
                  category: "Diabetes",
                  readTime: "8 min read",
                  views: "12.5k views"
                },
                {
                  title: "Heart Health in Rural India: Common Risk Factors",
                  author: "Dr. Rajesh Kumar",
                  category: "Heart Health",
                  readTime: "6 min read",
                  views: "8.2k views"
                },
                {
                  title: "Nutrition During Pregnancy: Essential Guidelines",
                  author: "Dr. Priya Mehta",
                  category: "Women's Health",
                  readTime: "10 min read",
                  views: "15.2k views"
                }
              ].map((article, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="text-sm text-emerald-600 mb-2">{article.category} • by {article.author}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{article.title}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{article.readTime}</span>
                      <span className="mx-2">•</span>
                      <span>{article.views}</span>
                    </div>
                    <button className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Complete Healthcare Ecosystem */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Complete Healthcare Ecosystem</h2>
          <p className="text-center text-gray-600 mb-12">
            From AI-powered diagnostics to emergency care, everything you need for better health outcomes
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "AI-Powered Consultations",
                description: "Get instant medical advice from our advanced AI system trained on Indian healthcare patterns",
                icon: "🤖"
              },
              {
                title: "Multilingual Support",
                description: "Available in English and major Indian languages including Hindi, Tamil, Bengali, and more",
                icon: "🌐"
              },
              {
                title: "24/7 Emergency Care",
                description: "Round-the-clock emergency support with instant connection to local hospitals",
                icon: "🏥"
              },
              {
                title: "Health Assessment",
                description: "Comprehensive symptom checker with personalized health insights",
                icon: "📋"
              },
              {
                title: "Medical Records",
                description: "Secure digital health records accessible anytime, anywhere",
                icon: "📱"
              },
              {
                title: "Telemedicine",
                description: "Connect with verified doctors via video, voice, or chat consultations",
                icon: "👨‍⚕️"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <Link href="/services" className="inline-block mt-4 text-emerald-600 hover:text-emerald-700">
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}