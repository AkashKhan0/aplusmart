"use client";

export default function Page() {
  return (
    <main className="text-gray-800 mt-20">
      <section className="max-w-5xl mx-auto px-4 py-4 mb-5">
        <div className="bg-white rounded-2xl shadow-sm p-5 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Terms & Conditions
          </h1>
          <p className="text-sm text-gray-500 mb-5">Last Updated: 12/12/2025</p>

          <p className="mb-6 leading-relaxed">
            Welcome to <span className="font-semibold">A Plus Mart BD</span>.
            These Terms & Conditions govern your access to and use of our
            website, products, and services. By accessing, browsing, or making a
            purchase from our website, you agree to be bound by these Terms &
            Conditions. If you do not agree, please discontinue using our
            website.
          </p>

          {/* Section 1 */}
          <Section title="1. Definitions">
            <ul className="list-disc pl-6 space-y-1">
              <li>“Website” refers to A Plus Mart BD and all its pages.</li>
              <li>“We / Us / Our” refers to A Plus Mart BD.</li>
              <li>
                “User / Customer / You” refers to anyone accessing or using the
                website.
              </li>
              <li>
                “Products” refers to all items listed for sale on our website.
              </li>
            </ul>
          </Section>

          {/* Section 2 */}
          <Section title="2. Eligibility to Use">
            <ul className="list-disc pl-6 space-y-1">
              <li>
                You must be at least 18 years old to place an order on our
                website.
              </li>
              <li>
                By using this website, you confirm that all information provided
                by you is accurate, complete, and up to date.
              </li>
            </ul>
          </Section>

          {/* Section 3 */}
          <Section title="3. Account Registration">
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Creating an account is optional but recommended for a better
                shopping experience.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                login credentials.
              </li>
              <li>
                We reserve the right to suspend or terminate accounts found to
                be providing false information or engaging in fraudulent
                activity.
              </li>
            </ul>
          </Section>

          {/* Section 4 */}
          <Section title="4. Product Information & Availability">
            <ul className="list-disc pl-6 space-y-1">
              <li>
                We strive to display accurate product descriptions, images,
                prices, and availability.
              </li>
              <li>
                Colors and appearance may vary due to device screen differences.
              </li>
              <li>Product availability is subject to change without notice.</li>
              <li>
                We reserve the right to limit quantities or discontinue any
                product at any time.
              </li>
            </ul>
          </Section>

          {/* Section 5 */}
          <Section title="5. Pricing & Payment">
            <ul className="list-disc pl-6 space-y-1">
              <li>
                All prices are displayed in Bangladeshi Taka (BDT) unless stated
                otherwise.
              </li>
              <li>Prices may change without prior notice.</li>
              <li>
                Payment methods may include bKash, Nagad, bank transfer, cards,
                or other available gateways.
              </li>
              <li>
                A Plus Mart BD does not store sensitive payment information.
              </li>
            </ul>
          </Section>

          {/* Section 6 */}
          <Section title="6. Order Confirmation & Acceptance">
            <ul className="list-disc pl-6 space-y-1">
              <li>Placing an order does not guarantee acceptance.</li>
              <li>
                We reserve the right to cancel or refuse any order due to:
                <ul className="list-disc pl-6 space-y-1 mt-1">
                  <li>Product unavailability</li>
                  <li>Pricing or listing errors</li>
                  <li>Suspicious or fraudulent activity</li>
                </ul>
              </li>
              <li>Order confirmation is sent via SMS, email, or WhatsApp.</li>
            </ul>
          </Section>

          {/* Section 7 */}
          <Section title="7. Shipping & Delivery">
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Delivery timelines are estimates and may vary due to location,
                courier delays, or unforeseen circumstances.
              </li>
              <li>
                We are not responsible for delays caused by courier services,
                natural disasters, strikes, or force majeure events.
              </li>
              <li>
                Delivery charges (if any) will be clearly mentioned during
                checkout.
              </li>
            </ul>
          </Section>

          {/* Section 8 */}
          <Section title="8. Returns, Refunds & Replacements">
            <p>
              Returns, refunds, and replacements are governed by our Refund &
              Return Policy. By placing an order, you agree to comply with the
              terms stated in that policy.
            </p>
          </Section>

          {/* Section 9 */}
          <Section title="9. Order Cancellation">
            <ul className="list-disc pl-6 space-y-1">
              <li>Orders can be canceled before dispatch only.</li>
              <li>Once dispatched, orders cannot be canceled.</li>
              <li>
                Refunds for approved cancellations will be processed according
                to our Refund Policy.
              </li>
            </ul>
          </Section>

          {/* Section 10 */}
          <Section title="10. User Responsibilities">
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Do not use the website for illegal or unauthorized purposes
              </li>
              <li>Do not attempt to hack, disrupt, or damage the website</li>
              <li>
                Do not submit false information or impersonate another person
              </li>
              <li>Do not abuse return, refund, or promotional systems</li>
            </ul>
          </Section>

          {/* Section 11 */}
          <Section title="11. Intellectual Property Rights">
            <p>
              All website content including logos, images, text, designs, and
              graphics are the property of A Plus Mart BD. Unauthorized copying,
              reproduction, or commercial use is strictly prohibited.
            </p>
          </Section>

          {/* Section 12 */}
          <Section title="12. Limitation of Liability">
            <p>
              A Plus Mart BD shall not be liable for indirect, incidental, or
              consequential damages. Our maximum liability shall not exceed the
              amount paid by the customer for the product.
            </p>
          </Section>

          {/* Section 13 */}
          <Section title="13. Indemnification">
            <p>
              You agree to indemnify and hold harmless A Plus Mart BD from any
              claims, damages, losses, or legal expenses arising from your
              misuse of the website or violation of these Terms & Conditions.
            </p>
          </Section>

          {/* Section 14 */}
          <Section title="14. Third-Party Links">
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the content, policies, or practices of third-party
              sites.
            </p>
          </Section>

          {/* Section 15 */}
          <Section title="15. Force Majeure">
            <p>
              We shall not be responsible for failure or delay in performance
              due to events beyond our reasonable control, including natural
              disasters, government actions, strikes, or technical failures.
            </p>
          </Section>

          {/* Section 16 */}
          <Section title="16. Governing Law & Jurisdiction">
            <p>
              These Terms & Conditions shall be governed by the laws of
              Bangladesh. Any disputes shall be subject to the exclusive
              jurisdiction of Bangladeshi courts.
            </p>
          </Section>

          {/* Section 17 */}
          <Section title="17. Termination of Service">
            <p>
              We reserve the right to terminate or suspend access to our website
              without prior notice if these Terms & Conditions are violated.
            </p>
          </Section>

          {/* Section 18 */}
          <Section title="18. Changes to Terms & Conditions">
            <p>
              We may update or modify these Terms & Conditions at any time.
              Changes will be effective immediately upon posting on the website.
            </p>
          </Section>

          {/* Section 19 */}
          <Section title="19. Contact Information">
            <p>
              If you have any questions regarding these Terms & Conditions,
              please contact us:
            </p>
            <ul className="mt-2 space-y-1">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:info@aplusmartbd.com"
                  className="text-blue-600 hover:underline"
                >
                  info@aplusmartbd.com
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

          <p className="mt-6 leading-relaxed">
            By using our website, you acknowledge that you have read,
            understood, and agreed to these Terms & Conditions.
          </p>
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
