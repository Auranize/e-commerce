import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto my-10 p-8 bg-white  rounded-lg border border-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Refund & Cancellation Policy</h1>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Overview</h2>
        <p className="text-gray-600 leading-relaxed">
          At WatchLab, we strive to ensure complete customer satisfaction with every purchase. 
          Please review our refund policy carefully before completing your order.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">No-Refund Policy</h2>
        <p className="text-gray-600 leading-relaxed">
          WatchLab maintains a <span className="text-red-600 font-medium">strict no-refund policy</span>. All sales are considered final once processed, 
          and we do not accept cancellations or process refunds under normal circumstances.
        </p>
        <p className="text-gray-600 leading-relaxed mt-3">
          Once an order has been shipped, cancellation requests cannot be accommodated.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Damaged Product Policy</h2>
        <p className="text-gray-600 leading-relaxed">
          In the exceptional case that you receive a damaged product, you may request a refund by providing a 
          <span className="text-red-600 font-medium"> complete unboxing video</span> clearly documenting the condition of the product upon arrival.
        </p>
        <p className="text-gray-600 leading-relaxed mt-3">
          Damage claims must be submitted within <span className="font-medium">24 hours</span> of delivery to be considered valid.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Refund Processing</h2>
        <p className="text-gray-600 leading-relaxed">
          For approved refund requests, funds will be credited back to the original payment method within 3-4 business days of approval.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Contact Information</h2>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-gray-700 mb-2">For any refund inquiries or to submit a damage claim, please contact our customer support team:</p>
          <p className="flex items-center text-gray-700 mb-2">
            <span className="mr-2">📧</span>
            <span className="font-medium">Email:</span> 
            <a href="mailto:support@watchlab.in" className="ml-2 text-blue-600 hover:text-blue-800">support@watchlab.in</a>
          </p>
          <p className="flex items-center text-gray-700">
            <span className="mr-2">📞</span>
            <span className="font-medium">Phone:</span> 
            <a href="tel:+918075725539" className="ml-2 text-blue-600 hover:text-blue-800">+91 8075725539</a>
          </p>
        </div>
      </section>

      <footer className="mt-8 pt-4 border-t text-sm text-gray-500 text-center">
        <p>This policy was last updated on April 27, 2025.</p>
      </footer>
    </div>
  );
};

export default RefundPolicy;