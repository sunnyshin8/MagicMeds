export default function Disclaimer() {
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl rounded-lg p-8 md:p-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">Disclaimer</h1>
          <p className="text-center text-gray-500 mb-8">Important Legal Information</p>

          <div className="space-y-8 text-gray-600">
            <section className="border-l-4 border-red-500 pl-6 animate-slideInLeft">
              <h2 className="text-2xl font-bold text-red-600 mb-4">⚠️ CRITICAL MEDICAL DISCLAIMER</h2>
              <p className="text-lg font-semibold text-gray-800 mb-4">
                MagicMeds is NOT a Medical Service. It is an informational platform only.
              </p>
              <p>
                The information provided on MagicMeds is for educational and informational purposes only. It is not 
                intended to serve as professional medical advice, diagnosis, or treatment. Always consult with a qualified 
                healthcare professional before making any health-related decisions.
              </p>
            </section>

            <section className="border-l-4 border-orange-500 pl-6 animate-slideInRight">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. No Professional Medical Relationship</h2>
              <p>
                By using MagicMeds, you acknowledge that no doctor-patient or healthcare provider-patient relationship 
                is established. MagicMeds does not provide medical services and should not be used in place of professional 
                medical care.
              </p>
            </section>

            <section className="border-l-4 border-yellow-500 pl-6 animate-slideInLeft">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Not for Emergency Situations</h2>
              <p className="mb-4">
                MagicMeds is not for emergency situations. If you are experiencing a medical emergency, please:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Call emergency services immediately (911 in the US, 112 in India)</li>
                <li>Go to the nearest emergency room or hospital</li>
                <li>Call your healthcare provider directly</li>
              </ul>
            </section>

            <section className="border-l-4 border-green-500 pl-6 animate-slideInRight">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Accuracy and Completeness</h2>
              <p>
                While we strive to provide accurate and up-to-date information, MagicMeds makes no warranties or 
                representations about the accuracy, completeness, or timeliness of the information provided. Medical 
                knowledge is constantly evolving, and information may become outdated.
              </p>
            </section>

            <section className="border-l-4 border-blue-500 pl-6 animate-slideInLeft">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Individual Variation</h2>
              <p>
                Health conditions and responses to treatments vary significantly among individuals. Information that 
                applies to one person may not apply to another. Your personal medical history, genetics, and other 
                factors are crucial in determining appropriate healthcare.
              </p>
            </section>

            <section className="border-l-4 border-indigo-500 pl-6 animate-slideInRight">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. AI Limitations</h2>
              <p className="mb-4">
                While artificial intelligence is powerful, it has limitations:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>AI may misinterpret symptoms or health descriptions</li>
                <li>AI cannot perform physical examinations</li>
                <li>AI cannot access your complete medical history</li>
                <li>AI responses should never replace professional judgment</li>
              </ul>
            </section>

            <section className="border-l-4 border-purple-500 pl-6 animate-slideInLeft">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Medications and Treatments</h2>
              <p>
                Any information about medications, treatments, or therapies provided by MagicMeds is for informational 
                purposes only. Do not start, stop, or change any medications or treatments based solely on information from 
                this platform. Always consult your healthcare provider or pharmacist first.
              </p>
            </section>

            <section className="border-l-4 border-pink-500 pl-6 animate-slideInRight">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Pregnancy and Pediatric Care</h2>
              <p>
                This platform is NOT suitable for medical guidance during pregnancy or for pediatric care. These are 
                specialized areas requiring direct consultation with qualified healthcare providers.
              </p>
            </section>

            <section className="border-l-4 border-cyan-500 pl-6 animate-slideInLeft">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Mental Health Emergencies</h2>
              <p className="mb-4">
                If you are experiencing a mental health crisis or having thoughts of self-harm or suicide, please seek 
                immediate help:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Call emergency services (911 in the US, 112 in India)</li>
                <li>Contact the National Suicide Prevention Lifeline: 1-800-273-8255 (US)</li>
                <li>Contact the AASRA Helpline: +91-22-2754-6669 (India)</li>
                <li>Go to the nearest hospital emergency room</li>
              </ul>
            </section>

            <section className="border-l-4 border-green-600 pl-6 animate-slideInRight">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Proper Use of MagicMeds</h2>
              <p className="mb-4">
                MagicMeds is best used for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>General health education and awareness</li>
                <li>Understanding common health concepts</li>
                <li>Preparing questions to ask your healthcare provider</li>
                <li>Supporting your own health research</li>
                <li>Supplementing professional medical advice</li>
              </ul>
            </section>

            <section className="border-l-4 border-red-600 pl-6 animate-slideInLeft">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, MagicMeds shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages resulting from your use of or inability to use the information provided.
              </p>
            </section>

            <div className="mt-8 p-6 bg-red-50 border-l-4 border-red-600 rounded animate-slideInUp">
              <h3 className="text-lg font-bold text-red-700 mb-2">BY USING MAGICMEDS, YOU AGREE:</h3>
              <ul className="list-disc list-inside space-y-2 text-red-700">
                <li>That you understand the limitations of this platform</li>
                <li>That you will not rely solely on MagicMeds for medical decisions</li>
                <li>That you will seek professional medical advice for any health concerns</li>
                <li>That you assume all responsibility for your health decisions</li>
                <li>That MagicMeds is not liable for any health outcomes</li>
              </ul>
            </div>

            <div className="text-center mt-8 p-4 bg-blue-50 rounded">
              <p className="text-sm text-gray-600">
                For medical emergencies, always call emergency services or visit your nearest hospital.<br/>
                This disclaimer was last updated: November 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
