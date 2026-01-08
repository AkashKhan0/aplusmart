"use client";

import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.target);

    const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    }),
  }
);


    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setMessage("✅ Your message has been sent successfully.");
      e.target.reset();
    } else {
      console.error("Contact form error:", data);
      setMessage("❌ Failed to send message. Please try again.");
    }
  }

  return (
    <main className="text-gray-800">
      <section className="max-w-5xl mx-auto px-4 py-4 mb-5">
        <div className="bg-white rounded-2xl shadow-sm p-5 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <p className="mb-8 leading-relaxed">
            We’re always here to help you. If you have any questions, concerns,
            or need assistance with your order, please feel free to contact us.
            Our support team is dedicated to providing you with a smooth and
            satisfying shopping experience.
          </p>

          {/* Section 1 */}
          <Section title="1. Customer Support">
            <ul className="space-y-2">
              <li><strong>Phone:</strong> +8801850219432</li>
              <li><strong>Support Hours:</strong> 10:00 AM – 8:00 PM (Everyday)</li>
            </ul>
            <p className="mt-3">
              Call us for urgent issues related to orders, delivery, payments, or
              general inquiries.
            </p>
          </Section>

          {/* Section 2 */}
          <Section title="2. Email Support">
            <p>
              <strong>Email:</strong> support@aplusmartbd.com
            </p>
            <p className="mt-2 text-sm text-gray-600">
              You can email us anytime. We usually respond within 24 working
              hours.
            </p>
          </Section>

          {/* Section 3 */}
          <Section title="3. Live Chat">
            <p>Chat with us directly through our website for instant support.</p>
            <p className="mt-2 text-sm text-gray-600">
              Live Chat Availability: 10:00 AM – 8:00 PM
            </p>
          </Section>

          {/* Section 4 */}
          <Section title="4. Order & Delivery Support">
            <p className="mb-3">
              For faster service, please keep the following information ready:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Order ID / Invoice Number</li>
              <li>Registered phone number or email</li>
              <li>Brief description of your issue</li>
            </ul>
          </Section>

          {/* Section 5 */}
          <Section title="5. Business & Partnership Inquiries">
            <p>
              For corporate sales, bulk orders, or partnership opportunities:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> support@aplusmartbd.com
            </p>
          </Section>

          {/* Section 6 */}
          <Section title="6. Feedback & Complaints">
            <p>
              Your feedback helps us improve. If you have any suggestions or
              complaints, please email us.
            </p>
            <p className="mt-2">
              <strong>Email:</strong> support@aplusmartbd.com
            </p>
            <p className="mt-2 text-sm text-gray-600">
              We take every concern seriously and aim to resolve issues as
              quickly as possible.
            </p>
          </Section>

          {/* Section 7 */}
          <Section title="7. Response Time Policy">
            <ul className="list-disc pl-6 space-y-1">
              <li>Phone / Live Chat: Immediate during working hours</li>
              <li>Email: Within 24 working hours</li>
            </ul>
          </Section>

          {/* Contact Form */}
          <Section title="8. Send Us a Message">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                name="name"
                required
                placeholder="Your Name"
                className="border rounded-lg px-4 py-2"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Your Email"
                className="border rounded-lg px-4 py-2"
              />
              <input
                name="phone"
                placeholder="Phone Number"
                className="border rounded-lg px-4 py-2 md:col-span-2"
              />
              <input
                name="subject"
                required
                placeholder="Subject"
                className="border rounded-lg px-4 py-2 md:col-span-2"
              />
              <textarea
                name="message"
                required
                placeholder="Write your message..."
                rows="4"
                className="border rounded-lg px-4 py-2 md:col-span-2"
              ></textarea>

              <button
                disabled={loading}
                className="bg-gray-900 text-white rounded-lg px-6 py-2 w-fit"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {message && (
                <p className="md:col-span-2 text-sm mt-2">{message}</p>
              )}
            </form>
          </Section>

          {/* Section 9 */}
          <Section title="9. Our Commitment">
            <p>
              We are committed to providing reliable support, clear
              communication, and quick solutions for all our customers.
            </p>
            <p className="mt-3 font-semibold">
              Thank you for choosing A Plus Mart BD!
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
