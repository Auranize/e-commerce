import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white  rounded-lg  border-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Terms & Conditions</h1>
      
      <section className="mb-6">
        <p className="text-gray-600 leading-relaxed">
          Welcome to thiqaf. By accessing our website and/or making a purchase, you engage in our service and agree to be bound by the following terms and conditions. Please read these carefully before completing your purchase.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">1. General Conditions</h2>
        <p className="text-gray-600 leading-relaxed mb-3">
          By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
        </p>
        <p className="text-gray-600 leading-relaxed">
          We reserve the right to refuse service to anyone for any reason at any time. You understand that your content may be transferred unencrypted and involve transmissions over various networks.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">2. Products & Services</h2>
        <p className="text-gray-600 leading-relaxed mb-3">
          Products and services are exclusively available online through our website. These products or services may have limited quantities and are subject to return or exchange only according to our Refund Policy.
        </p>
        <p className="text-gray-600 leading-relaxed">
          We have made every effort to display as accurately as possible the colors and images of our products. We cannot guarantee that your computer monitor's display of any color will be accurate.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">3. Accuracy of Information</h2>
        <p className="text-gray-600 leading-relaxed">
          We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products and pricing are subject to change at any time without notice, at our sole discretion. We reserve the right to discontinue any product at any time.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">4. Payments & Billing</h2>
        <p className="text-gray-600 leading-relaxed mb-3">
          We reserve the right to refuse any order you place with us. All payments must be completed and verified before the processing and shipping of orders. We may, at our discretion, limit or cancel quantities purchased per person, per household, or per order.
        </p>
        <p className="text-gray-600 leading-relaxed">
          For your convenience, we accept major credit cards, debit cards, and other payment methods as specified during checkout. All payment information is securely processed.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">5. Shipping & Delivery</h2>
        <p className="text-gray-600 leading-relaxed">
          We are not responsible for delays in delivery due to courier services, weather conditions, or any unforeseen circumstances. Shipping times are estimates and not guaranteed. Additional customs and tax fees may apply for international orders and are the responsibility of the customer.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">6. Returns & Refunds</h2>
        <p className="text-gray-600 leading-relaxed mb-3">
          All sales are final. thiqaf follows a strict no-refund policy. We do not accept cancellations or process refunds under normal circumstances.
        </p>
        <p className="text-gray-600 leading-relaxed">
          In the exceptional case of receiving a damaged product, you may request a refund by providing clear video evidence of the damage during unboxing. Such requests must be submitted within 24 hours of delivery to be considered valid.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">7. Privacy Policy</h2>
        <p className="text-gray-600 leading-relaxed">
          Your submission of personal information through the store is governed by our Privacy Policy. Please refer to our Privacy Policy for detailed information on how we collect, use, and protect your personal data.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">8. Changes to Terms of Service</h2>
        <p className="text-gray-600 leading-relaxed">
          We reserve the right to update, change, or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">9. Prohibited Uses</h2>
        <p className="text-gray-600 leading-relaxed">
          In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">10. Contact Information</h2>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-gray-700 mb-3">For any questions regarding these Terms & Conditions, please contact us at:</p>
          <p className="flex items-center text-gray-700 mb-2">
            <span className="mr-2">📧</span>
            <span className="font-medium">Email:</span> 
            <a href="mailto:support@thiqaf.in" className="ml-2 text-blue-600 hover:text-blue-800">support@thiqaf.in</a>
          </p>
          <p className="flex items-center text-gray-700">
            <span className="mr-2">📞</span>
            <span className="font-medium">Phone:</span> 
            <a href="tel:+918075725539" className="ml-2 text-blue-600 hover:text-blue-800">+91 8075725539</a>
          </p>
        </div>
      </section>

      <footer className="mt-8 pt-4 border-t text-sm text-gray-500 text-center">
        <p>Last updated: April 27, 2025</p>
        <p className="mt-1">© 2025 thiqaf. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Terms;