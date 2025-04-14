
export default function PrivacyPolicyPage() {
  const effectiveDate = "April 14, 2025"
  const contactEmail = "contact@kavenk.com"
  const businessAddress = "123 Rental Street, Suite 101, New York, NY 10001"

  return (
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-background rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-2 text-center">Privacy Policy</h1>

            <p className="text-center mb-6 text-muted-foreground">
              <em>Effective Date: {effectiveDate}</em>
            </p>

            <div className="prose prose-sm sm:prose dark:prose-invert max-w-none">
              <p>
                Welcome to Kavenk.com. Your privacy is important to us. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you visit our website and use our services.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">1. Information We Collect</h2>
              <p>We may collect personal and non-personal information, including but not limited to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Personal Information:</strong> Name, email address, phone number, payment information (if
                  applicable), and any other details you provide.
                </li>
                <li>
                  <strong>Non-Personal Information:</strong> IP address, browser type, device information, and usage
                  data.
                </li>
                <li>
                  <strong>Cookies & Tracking Technologies:</strong> We use cookies and analytics tools to enhance user
                  experience.
                </li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
              <p>We use the collected information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, operate, and maintain our website and services.</li>
                <li>Improve user experience and analyze website traffic.</li>
                <li>Respond to inquiries and customer service requests.</li>
                <li>Send promotional materials, if you opt-in.</li>
                <li>Ensure security and prevent fraudulent activities.</li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">3. How We Share Your Information</h2>
              <p>We do not sell or rent your personal information. However, we may share it with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Service Providers:</strong> Trusted third parties that assist in website operations.
                </li>
                <li>
                  <strong>Legal Authorities:</strong> When required by law or to protect our rights.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In case of mergers, acquisitions, or asset transfers.
                </li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">4. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your information. However, no method of
                transmission over the internet is 100% secure.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">5. Your Rights & Choices</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Access & Update:</strong> You may request access to your personal data and update or correct
                  it.
                </li>
                <li>
                  <strong>Opt-Out:</strong> You can opt out of promotional communications at any time.
                </li>
                <li>
                  <strong>Cookies Management:</strong> You can modify browser settings to disable cookies.
                </li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">6. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party sites. We are not responsible for their privacy practices.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">7. Children's Privacy</h2>
              <p>Kavenk.com is not intended for children under 13, and we do not knowingly collect data from them.</p>

              <h2 className="text-xl font-bold mt-8 mb-4">8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated
                effective date.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">9. Contact Us</h2>
              <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Email:</strong> {contactEmail}
                </li>
                <li>
                  <strong>Address:</strong> {businessAddress}
                </li>
              </ul>

              <p className="mt-8">By using Kavenk.com, you consent to the terms of this Privacy Policy.</p>
            </div>
          </div>
        </div>
      </main>
  )
}
