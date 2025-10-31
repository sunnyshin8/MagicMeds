export default function Services() {
  const mainServices = [
    {
      title: 'AI Health Assistant',
      description: 'Get instant answers to your health-related questions through our advanced AI-powered chat interface.',
      color: 'blue',
      features: ['24/7 Availability', 'Multilingual Support', 'Personalized Responses', 'Quick Symptom Analysis']
    },
    {
      title: 'Health Information',
      description: 'Access reliable and up-to-date health information on various topics and conditions.',
      color: 'green',
      features: ['Expert-Reviewed Content', 'Easy to Understand', 'Regular Updates', 'Comprehensive Coverage']
    },
    {
      title: 'Symptom Guidance',
      description: 'Get preliminary guidance about your symptoms and understand when to seek professional medical help.',
      color: 'purple',
      features: ['AI-Powered Analysis', 'Risk Assessment', 'Treatment Suggestions', 'Emergency Guidance']
    },
    {
      title: 'Health Tips & Wellness',
      description: 'Receive personalized health tips and wellness recommendations for a healthier lifestyle.',
      color: 'orange',
      features: ['Personalized Advice', 'Diet Guidelines', 'Exercise Plans', 'Mental Wellness Tips']
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Services</h1>

          <div className="grid gap-8">
            {mainServices.map((service) => (
              <div key={service.title} className={`bg-${service.color}-50 p-6 rounded-lg`}>
                <h2 className={`text-xl font-semibold text-${service.color}-900 mb-3`}>
                  {service.title}
                </h2>
                <p className={`text-${service.color}-800 mb-4`}>
                  {service.description}
                </p>
                <ul className="grid grid-cols-2 gap-2">
                  {service.features.map((feature) => (
                    <li key={feature} className={`text-${service.color}-700 flex items-center`}>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Additional Health Resources */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Resources</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: 'Health Articles',
                  description: 'Regular updates on various health topics written by medical experts.'
                },
                {
                  title: 'Video Consultations',
                  description: 'Connect with qualified doctors through secure video calls.'
                },
                {
                  title: 'Emergency Support',
                  description: '24/7 access to emergency medical guidance and hospital referrals.'
                },
                {
                  title: 'Medication Reminders',
                  description: 'Set up personalized reminders for medications and health routines.'
                }
              ].map((resource) => (
                <div key={resource.title} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600">{resource.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Important Disclaimer
            </h3>
            <p className="text-sm text-gray-600">
              MagicMeds provides general health information and guidance. This
              service is not a substitute for professional medical advice,
              diagnosis, or treatment. Always seek the advice of your physician or
              other qualified health provider with any questions you may have
              regarding a medical condition.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}