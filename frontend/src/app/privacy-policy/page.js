
export default function Page() {
  return (
    <main className="text-gray-800 mt-18">
      <section className="max-w-5xl mx-auto px-4 py-4 mb-5">
        <div className="bg-white rounded-2xl shadow-sm p-5 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <p className="mb-6 leading-relaxed">
            Welcome to <span className="font-semibold">A Plus Mart BD</span>. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains what information we collect, how we use it, how we protect it, and what rights you have while using our website.
          </p>
          <p className="mb-10 leading-relaxed">
            By accessing or using our website, you agree to the terms outlined in this Privacy Policy.
          </p>

          {/* Section 1 */}
          <Section title="1. Information We Collect">
            <SubTitle>1.1 Personal Information</SubTitle>
            <ul className="list-disc pl-6 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Billing or mailing address</li>
              <li>Other details required to assist you</li>
            </ul>

            <SubTitle className="mt-6">1.2 Automatically Collected Information</SubTitle>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Pages visited</li>
              <li>Time spent on the website</li>
              <li>Click activity & referring URLs</li>
            </ul>

            <SubTitle className="mt-6">1.3 Cookies & Tracking Technologies</SubTitle>
            <ul className="list-disc pl-6 space-y-1">
              <li>Remember your preferences</li>
              <li>Improve website performance</li>
              <li>Show personalized content</li>
              <li>Analyze traffic & user behavior</li>
            </ul>
          </Section>

          {/* Section 2 */}
          <Section title="2. When We Collect Information">
            <ul className="list-disc pl-6 space-y-1">
              <li>Register an account</li>
              <li>Place an order</li>
              <li>Subscribe to our newsletter</li>
              <li>Respond to a survey or marketing message</li>
              <li>Use any site features</li>
              <li>Contact customer support</li>
            </ul>
          </Section>

          {/* Section 3 */}
          <Section title="3. How We Use Your Information">
            <ul className="space-y-3">
              <li>✔ To personalize your experience</li>
              <li>✔ To improve our website and services</li>
              <li>✔ To process orders & customer requests</li>
              <li>✔ To send updates & marketing messages</li>
              <li>✔ To conduct surveys, promotions, or contests</li>
            </ul>
          </Section>

          {/* Section 4 */}
          <Section title="4. How We Protect Your Information">
            <ul className="list-disc pl-6 space-y-1">
              <li>Regular malware scans</li>
              <li>Secure hosting environment</li>
              <li>Restricted access to personal information</li>
            </ul>

            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="font-semibold mb-1">No PCI or SSL Processing</p>
              <p className="text-sm leading-relaxed">
                We do not directly process sensitive payment information. Payments are redirected to secure third-party gateways. Therefore, PCI vulnerability scanning and SSL for transactions are not currently required. This section will be updated if direct payments are introduced.
              </p>
            </div>
          </Section>

          {/* Section 5 */}
          <Section title="5. Google Advertising & Cookies">
            <p className="mb-4">
              We work with Google and other third-party vendors to display relevant ads using cookies such as the DART cookie.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Remarketing with Google AdSense</li>
              <li>Google Display Network Impression Reporting</li>
              <li>Demographics & Interests Reporting</li>
              <li>DoubleClick Integration</li>
              <li>Google Analytics</li>
            </ul>
          </Section>

          {/* Section 6 */}
          <Section title="6. Managing Your Ad Preferences">
            <ul className="list-disc pl-6 space-y-1">
              <li>Google Ad Settings</li>
              <li>Network Advertising Initiative Opt-Out Page</li>
              <li>Google Analytics Opt-Out Browser Add-on</li>
            </ul>
          </Section>

          {/* Section 7 */}
          <Section title="7. Do Not Track (DNT) Signals">
            <p>
              We respect Do Not Track signals. If your browser sends a DNT request, we do not track your behavior or serve personalized ads. Some third-party services may still track independently.
            </p>
          </Section>

          {/* Section 8 */}
          <Section title="8. Third-Party Behavioral Tracking">
            <p>
              We may allow third-party behavioral tracking to improve analytics, advertising, and user experience.
            </p>
          </Section>

          {/* Section 9 */}
          <Section title="9. Children’s Privacy (COPPA Compliance)">
            <p>
              We do not knowingly collect personal information from children under 13 years old. If such data is discovered, it will be deleted immediately.
            </p>
          </Section>

          {/* Section 10 */}
          <Section title="10. Fair Information Practices">
            <ul className="space-y-2">
              <li>✔ Data breach notification within 7 business days</li>
              <li>✔ Individual redress and legal rights</li>
            </ul>
          </Section>

          {/* Section 11 */}
          <Section title="11. CAN-SPAM Act Compliance">
            <ul className="list-disc pl-6 space-y-1">
              <li>No misleading subject lines</li>
              <li>Clear sender identification</li>
              <li>Easy unsubscribe option</li>
            </ul>
            <p className="mt-4 text-sm">
              Unsubscribe anytime by emailing us. We will promptly remove you from all mailing lists.
            </p>
          </Section>

          {/* Section 12 */}
          <Section title="12. Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised date.
            </p>
          </Section>

          {/* Section 13 */}
          <Section title="13. Contact Us">
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="mt-3 space-y-1">
               <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:support@aplusmartbd.com"
                  className="text-blue-600 hover:underline"
                >
                  support@aplusmartbd.com
                </a>
              </li>

              <li>
                <strong>Phone:</strong>{" "}
                <a
                  href="tel:+8801635347489"
                  className="text-blue-600 hover:underline"
                >
                  +8801635347489
                </a>
              </li>
            </ul>
          </Section>
        </div>
      </section>
    </main>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
        {title}
      </h2>
      <div className="space-y-3 text-gray-700">{children}</div>
    </div>
  );
}

function SubTitle({ children, className = "" }) {
  return (
    <h3 className={`font-semibold text-gray-800 ${className}`}>{children}</h3>
  );
}
