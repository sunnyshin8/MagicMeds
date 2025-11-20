export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl rounded-lg p-8 md:p-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">Terms of Service</h1>
          <p className="text-center text-gray-500 mb-8">Last updated: November 2025</p>

          <div className="space-y-8 text-gray-600">
            <section className="border-l-4 border-emerald-500 pl-6 animate-slideInLeft">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using MagicMeds, you accept and agree to be bound by the terms and provision of 
                this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="border-l-4 border-blue-500 pl-6 animate-slideInRight">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Use License</h2>
              <p className="mb-4">Permission is granted to temporarily download one copy of the materials (information or software) on MagicMeds for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on MagicMeds</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transmitting any unlawful, threatening, abusive, defamatory, or otherwise objectionable material</li>
              </ul>
            </section>

            <section className="border-l-4 border-purple-500 pl-6 animate-slideInLeft">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Disclaimer</h2>
              <p className="mb-4">
                The materials on MagicMeds are provided "as is". MagicMeds makes no warranties, expressed or implied, 
                and hereby disclaims and negates all other warranties including, without limitation:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Implied warranties or conditions of merchantability, fitness for a particular purpose</li>
                <li>Warranty of non-infringement</li>
                <li>Medical accuracy or completeness of health information</li>
              </ul>
              <p className="mt-4 font-semibold text-red-600">
                MagicMeds is NOT a substitute for professional medical advice, diagnosis, or treatment.
              </p>
            </section>

            <section className="border-l-4 border-pink-500 pl-6 animate-slideInRight">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Limitations of Liability</h2>
              <p>
                In no event shall MagicMeds or its suppliers be liable for any damages (including, without limitation, 
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
                to use the materials on MagicMeds, even if we or our authorized representative has been notified orally 
                or in writing of the possibility of such damage.
              </p>
            </section>

            <section className="border-l-4 border-indigo-500 pl-6 animate-slideInLeft">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on MagicMeds could include technical, typographical, or photographic errors. 
                MagicMeds does not warrant that any of the materials on MagicMeds are accurate, complete, or current. 
                MagicMeds may make changes to the materials contained on MagicMeds at any time without notice.
              </p>
            </section>

            <section className="border-l-4 border-green-500 pl-6 animate-slideInRight">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Materials and Content</h2>
              <p>
                MagicMeds has not reviewed all of the sites linked to its website and is not responsible for the 
                contents of any such linked site. The inclusion of any link does not imply endorsement by MagicMeds 
                of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section className="border-l-4 border-red-500 pl-6 animate-slideInLeft">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Modifications</h2>
              <p>
                MagicMeds may revise these terms of service for our website at any time without notice. By using this 
                website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section className="border-l-4 border-yellow-500 pl-6 animate-slideInRight">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of India, and you 
                irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section className="border-l-4 border-cyan-500 pl-6 animate-slideInLeft">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. User Responsibilities</h2>
              <p className="mb-4">By using MagicMeds, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and truthful information</li>
                <li>Not engage in any unlawful or fraudulent activity</li>
                <li>Respect the intellectual property rights of others</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
                <li>Consult qualified healthcare professionals before making medical decisions</li>
              </ul>
            </section>

            <section className="text-sm text-gray-500 mt-8 p-4 bg-amber-50 rounded">
              <p>
                <strong>Important:</strong> If you have any questions regarding these Terms of Service, please contact us at 
                <span className="text-emerald-600"> terms@magicmeds.com</span>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
