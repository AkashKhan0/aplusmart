export default function Page() {
  return (
    <main className="text-gray-800">
      <section className="max-w-5xl mx-auto px-4 py-4 mb-5">
        <div className="bg-white rounded-2xl shadow-sm p-5 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Online Delivery Policy
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          {/* Intro */}
          <p className="mb-6 leading-relaxed">
            At <span className="font-semibold">A Plus Mart BD</span>, our delivery
            system is designed based on an in-depth study of leading Bangladeshi
            e-commerce platforms and customer expectations. We are committed to
            providing a fast, secure, transparent, and reliable delivery
            experience across Bangladesh.
          </p>

          {/* Section 1 */}
          <Section title="1. Delivery Coverage Areas">
            <ul className="list-disc pl-6 space-y-1">
              <li>Dhaka Metro & surrounding areas</li>
              <li>All divisional cities</li>
              <li>District headquarters and selected upazilas</li>
              <li>Remote or rural areas may require additional delivery time</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Note: Delivery availability and time may vary depending on product
              type, size, and location.
            </p>
          </Section>

          {/* Section 2 */}
          <Section title="2. Estimated Delivery Time">
            <ul className="list-disc pl-6 space-y-1">
              <li>Inside Dhaka: 24–72 working hours</li>
              <li>Outside Dhaka: 3–7 working days</li>
              <li>Remote areas: 5–10 working days</li>
              <li>Pre-order or customized items: As mentioned on the product page</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Delivery timelines exclude public holidays and force majeure
              situations.
            </p>
          </Section>

          {/* Section 3 */}
          <Section title="3. Delivery Charges">
            <p className="mb-4">
              Delivery charges are calculated based on:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Delivery location</li>
              <li>Product weight and size</li>
              <li>Delivery urgency (regular or express)</li>
            </ul>

            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="font-semibold mb-2">Typical Delivery Charges</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Inside Dhaka: BDT 60 – BDT 120</li>
                <li>Outside Dhaka: BDT 120 – BDT 250</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600">
                Exact delivery cost will be shown during checkout before payment
                confirmation.
              </p>
            </div>
          </Section>

          {/* Section 4 */}
          <Section title="4. Cash on Delivery (COD)">
            <ul className="list-disc pl-6 space-y-1">
              <li>Available in selected locations</li>
              <li>Applicable for most regular products</li>
              <li>Depends on delivery location and order value</li>
              <li>Additional COD service charge may apply</li>
              <li>
                Not available for customized, digital, or pre-order items
              </li>
            </ul>
          </Section>

          {/* Section 5 */}
          <Section title="5. Order Processing">
            <ul className="space-y-2">
              <li>✔ Order confirmation after successful placement</li>
              <li>✔ Product quality check and secure packaging</li>
              <li>✔ Handover to delivery partner</li>
              <li>✔ Real-time order tracking enabled</li>
              <li>✔ Successful delivery to customer</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Orders are usually processed within 24 hours after confirmation.
            </p>
          </Section>

          {/* Section 6 */}
          <Section title="6. Order Tracking">
            <ul className="list-disc pl-6 space-y-1">
              <li>Tracking ID via SMS and/or email</li>
              <li>Live tracking updates through your account dashboard</li>
            </ul>
            <p className="mt-4">
              You can track your order anytime until it is delivered.
            </p>
          </Section>

          {/* Section 7 */}
          <Section title="7. Failed Delivery Attempts">
            <p className="mb-4">Delivery may fail due to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Customer unavailable or unreachable</li>
              <li>Incorrect or incomplete address</li>
              <li>Restricted delivery area</li>
            </ul>
            <ul className="mt-4 list-disc pl-6 space-y-1">
              <li>Re-delivery will be attempted</li>
              <li>Additional delivery charges may apply</li>
              <li>Order may be canceled after multiple failed attempts</li>
            </ul>
          </Section>

          {/* Section 8 */}
          <Section title="8. Return & Exchange During Delivery">
            <ul className="list-disc pl-6 space-y-1">
              <li>Check the package in front of the delivery person</li>
              <li>Refuse delivery if items are damaged or incorrect</li>
              <li>Return or exchange must follow our Return Policy</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Delivery charges are non-refundable once shipment is dispatched.
            </p>
          </Section>

          {/* Section 9 */}
          <Section title="9. Important Delivery Guidelines">
            <ul className="list-disc pl-6 space-y-1">
              <li>Valid phone number is mandatory</li>
              <li>Delivery time: 10:00 AM – 8:00 PM (may vary)</li>
              <li>Customers must provide accurate delivery information</li>
            </ul>
          </Section>

          {/* Section 10 */}
          <Section title="10. Customer Support">
            <p className="leading-relaxed">
              For any delivery-related queries, please contact our support team:
            </p>
            <ul className="mt-3 space-y-1">
              <li><strong>Email:</strong> support@aplusmartbd.com</li>
              <li><strong>Phone:</strong> +8801850219432</li>
            </ul>
          </Section>

          {/* Section 11 */}
          <Section title="11. Our Commitment">
            <p className="leading-relaxed">
              We are committed to delivering your products on time, safely, and
              with complete transparency, following the best practices of
              Bangladesh’s leading e-commerce platforms.
            </p>
            <p className="mt-4 font-semibold">
              Thank you for shopping with A Plus Mart BD!
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
