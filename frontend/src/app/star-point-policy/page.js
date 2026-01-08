export default function Page() {
  return (
    <main className="text-gray-800">
      <section className="max-w-5xl mx-auto px-4 py-4 mb-5">
        <div className="bg-white rounded-2xl shadow-sm p-5 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Star Point Policy
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          {/* Intro */}
          <p className="mb-6 leading-relaxed">
            Our Star Point Policy is designed to reward retail customers for their
            continued trust and regular purchases. This program is <span className="font-semibold">not applicable for wholesale customers</span>. 
            Please read the policy carefully to understand how Star Points are earned, used, and managed.
          </p>

          {/* Section 1 */}
          <Section title="1. Eligibility">
            <ul className="list-disc pl-6 space-y-1">
              <li>Star Points are available only for retail customers.</li>
              <li>This program is not applicable for wholesale customers.</li>
              <li>Customers must have a valid registered retail account to participate.</li>
              <li>The company reserves the right to approve, suspend, or remove eligibility at any time.</li>
            </ul>
          </Section>

          {/* Section 2 */}
          <Section title="2. Earning Star Points">
            <ul className="list-disc pl-6 space-y-1">
              <li>Customers will earn 1 Star Point for every BDT 100 spent on eligible purchases.</li>
              <li>Points are calculated based on the final payable amount (excluding delivery charges, discounts, and taxes if applicable).</li>
              <li>Star Points will be credited to the customer’s account after successful order completion.</li>
            </ul>
          </Section>

          {/* Section 3 */}
          <Section title="3. Star Point Value">
            <p className="leading-relaxed">
              1 Star Point = BDT 10. Star Points have a fixed value and cannot be exchanged for cash.
            </p>
          </Section>

          {/* Section 4 */}
          <Section title="4. Using Star Points">
            <p className="mb-4">
              Star Points can be used to purchase selected products only. Eligible products will be clearly marked as “Star Point Eligible” on the website.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Full payment of selected products, or</li>
              <li>Partial discount along with cash payment (where applicable)</li>
            </ul>

            <SubTitle className="mt-6">Free Products & Offers</SubTitle>
            <ul className="list-disc pl-6 space-y-1">
              <li>Certain products may be offered as free or discounted items in exchange for Star Points.</li>
              <li>Availability depends on current stock and promotional campaigns.</li>
              <li>Free items cannot be exchanged for cash or other products.</li>
            </ul>
          </Section>

          {/* Section 5 */}
          <Section title="5. Limitations & Restrictions">
            <ul className="list-disc pl-6 space-y-1">
              <li>Star Points cannot be used on all products.</li>
              <li>Points cannot be transferred to another account.</li>
              <li>Points cannot be combined with other promotional offers unless stated otherwise.</li>
              <li>Star Points are not applicable to retail orders under any circumstances.</li>
            </ul>
          </Section>

          {/* Section 6 */}
          <Section title="6. Expiry of Star Points">
            <p>
              Star Points may have an expiry period, which will be announced from time to time.
              Expired points will be automatically removed from the account and cannot be reinstated.
            </p>
          </Section>

          {/* Section 7 */}
          <Section title="7. Returns & Cancellations">
            <p>
              If an order is canceled or returned, the Star Points earned from that order will be adjusted or deducted accordingly.
              Star Points used for a canceled order may be refunded to the account at our discretion.
            </p>
          </Section>

          {/* Section 8 */}
          <Section title="8. Policy Changes">
            <p>
              We reserve the right to modify, suspend, or cancel the Star Point Policy at any time without prior notice.
              Any changes will be updated on our website.
            </p>
          </Section>

          {/* Section 9 */}
          <Section title="9. Support">
            <p className="leading-relaxed">
              For any questions related to Star Points, please contact our customer support team.
            </p>
            <ul className="mt-3 space-y-1">
              <li><strong>Phone:</strong> +8801850219432</li>
              <li><strong>Email:</strong> support@aplusmartbd.com</li>
            </ul>
          </Section>

          {/* Section 10 */}
          <Section title="10. Final Note">
            <p className="leading-relaxed">
              The Star Point Policy is created exclusively for retail customers to reward loyalty and regular purchases. Wholesale customers are strictly excluded from this program.
            </p>
            <p className="mt-4 font-semibold">
              By participating in this program, you agree to all the terms and conditions stated above.
            </p>
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
