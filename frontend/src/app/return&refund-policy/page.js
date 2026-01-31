"use client";

export default function Page() {
  return (
    <main className="text-gray-800 mt-20">
      <section className="max-w-5xl mx-auto px-4 py-4 mb-5">
        <div className="bg-white rounded-2xl shadow-sm p-5 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Refund & Return Policy
          </h1>
          <p className="text-sm text-gray-500 mb-5">
            Effective Date: 12/12/2025
          </p>

          <p className="mb-6 leading-relaxed">
            This Refund & Return Policy applies to all orders placed through our
            e-commerce website. Please read this policy carefully before making
            a purchase. By confirming an order, you agree to the terms outlined
            below.
          </p>

          {/* Section 1 */}
          <Section title="1. General Policy Overview">
            <p>
              Customer satisfaction is our top priority. Refunds, returns, and
              replacements are subject to specific terms and conditions. All
              decisions will be made in accordance with this policy, and the
              final decision rests with the management.
            </p>
          </Section>

          {/* Section 2 */}
          <Section title="2. Eligible Products for Refund / Return">
            <ul className="list-disc pl-6 space-y-1">
              <li>Incorrect product delivered</li>
              <li>Wrong size or color delivered due to our error</li>
              <li>Manufacturing defects</li>
              <li>Product damaged at the time of delivery</li>
            </ul>
            <p className="mt-3">
              <strong>Conditions:</strong> The product must be unused, unwashed,
              and in original condition with original tags, invoice, and
              packaging intact.
            </p>
          </Section>

          {/* Section 3 */}
          <Section title="3. Non-Refundable / Non-Returnable Items">
            <ul className="list-disc pl-6 space-y-1">
              <li>Used, washed, or altered products</li>
              <li>
                Incorrect size or color selected by the customer (when a size
                guide is provided)
              </li>
              <li>Sale, discounted, or clearance items</li>
              <li>Innerwear and personal care items (for hygiene reasons)</li>
              <li>Digital or downloadable products</li>
            </ul>
          </Section>

          {/* Section 4 */}
          <Section title="4. Return Timeframe">
            <p>
              Refund/return requests must be submitted within 48 hours of
              product delivery. Requests made after this period will not be
              accepted.
            </p>
          </Section>

          {/* Section 5 */}
          <Section title="5. Refund Process (Step-by-Step)">
            <ul className="list-decimal pl-6 space-y-1">
              <li>
                Contact our customer support team (WhatsApp / Email / Support
                Ticket)
              </li>
              <li>
                Provide your Order ID, issue details, and clear images or videos
                as evidence
              </li>
              <li>After verification, return approval will be issued</li>
              <li>
                Once approved, return the product following our instructions
              </li>
              <li>
                After receiving and inspecting the product, the refund will be
                initiated
              </li>
            </ul>
          </Section>

          {/* Section 6 */}
          <Section title="6. Refund Method">
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Original payment method (bKash, Nagad, Card, Bank Transfer)
              </li>
              <li>Store credit or wallet balance (if applicable)</li>
            </ul>
            <p className="mt-2">
              Refund Processing Time: Within 7–10 working days after approval
            </p>
          </Section>

          {/* Section 7 */}
          <Section title="7. Replacement Policy">
            <p>
              Replacements are subject to stock availability. If the replacement
              item is out of stock, a refund or store credit will be offered.
              Replacement delivery time: 5–7 working days.
            </p>
          </Section>

          {/* Section 8 */}
          <Section title="8. Shipping Cost Policy">
            <ul className="list-disc pl-6 space-y-1">
              <li>
                If the return is due to our mistake, we will bear the shipping
                cost
              </li>
              <li>
                If the return is due to customer preference or error, the
                customer must bear the shipping cost
              </li>
            </ul>
          </Section>

          {/* Section 9 */}
          <Section title="9. Order Cancellation Policy">
            <ul className="list-disc pl-6 space-y-1">
              <li>Orders can be cancelled before dispatch</li>
              <li>Orders cannot be cancelled after dispatch</li>
              <li>
                Approved cancellations will be refunded according to this refund
                policy
              </li>
            </ul>
          </Section>

          {/* Section 10 */}
          <Section title="10. Fraud & Abuse Prevention">
            <ul className="list-disc pl-6 space-y-1">
              <li>False or misleading claims</li>
              <li>Manipulated or insufficient evidence</li>
              <li>Repeated abuse of refund requests</li>
              <li>
                Products returned in a damaged condition caused by the customer
              </li>
            </ul>
            <p className="mt-2">
              We reserve the right to use fraud prevention measures and deny
              service when necessary.
            </p>
          </Section>

          {/* Section 11 */}
          <Section title="11. Force Majeure">
            <p>
              We shall not be held responsible for delays or failures in
              delivery or refunds caused by events beyond our control, including
              natural disasters, political unrest, strikes, or logistics
              disruptions.
            </p>
          </Section>

          {/* Section 12 */}
          <Section title="12. Policy Modification Rights">
            <p>
              We reserve the right to modify, update, or change this Refund
              Policy at any time without prior notice. Any changes will take
              effect immediately upon being published on the website.
            </p>
          </Section>

          {/* Section 13 */}
          <Section title="13. Contact Information">
            <p>
              If you have any questions regarding refunds or returns, please
              contact us:
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
            Final Note: Our goal is to ensure a transparent, fair, and
            customer-friendly refund and return process while protecting both
            customer rights and business integrity.
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
