import React from 'react';

const PaymentPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white  rounded-lg border border-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Payment Policy</h1>
      
      <section className="mb-6">
        <p className="text-gray-600 leading-relaxed">
          Thank you for shopping with WatchLab. This Payment Policy outlines the terms and conditions related to payments for products purchased through our website. By making a purchase, you agree to comply with and be bound by the following policy.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">1. Accepted Payment Methods</h2>
        <p className="text-gray-600 leading-relaxed mb-3">
          WatchLab accepts the following payment methods:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-gray-600">
          <li>Credit Cards (Visa, MasterCard, American Express)</li>
          <li>Debit Cards</li>
          <li>UPI Payments</li>
          <li>Net Banking</li>
          <li>Mobile Wallets (Paytm, PhonePe, Google Pay)</li>
          <li>Cash on Delivery (COD) for select locations and products</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">2. Payment Security</h2>
        <p className="text-gray-600 leading-relaxed">
          All payment information is encrypted and processed securely. WatchLab does not store your credit card details. All payment transactions are processed through secure and PCI-DSS compliant payment gateways. While we implement various security measures to protect your personal information, we cannot guarantee that all communications or transactions will be completely secure.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">3. Pricing and Currency</h2>
        <p className="text-gray-600 leading-relaxed mb-3">
          All prices listed on our website are in Indian Rupees (INR) and are inclusive of applicable taxes unless otherwise stated. Prices are subject to change without prior notice.
        </p>
        <p className="text-gray-600 leading-relaxed">
          For international orders, currency conversion rates are determined by your payment provider and may include additional conversion fees.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">4. Order Processing</h2>
        <p className="text-gray-600 leading-relaxed">
          Your order will be processed only after successful payment confirmation. Orders placed with invalid or declined payment methods will not be processed. For Cash on Delivery orders, verification calls may be made before processing the order. We reserve the right to cancel orders in case of pricing errors, product unavailability, or suspected fraudulent activity.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">5. Payment Verification</h2>
        <p className="text-gray-600 leading-relaxed">
          For security purposes, we may verify payments before shipping products. This may include address verification, card verification value checks, or additional identity confirmation. These measures are in place to protect both our customers and our business from fraudulent transactions.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">6. Invoicing</h2>
        <p className="text-gray-600 leading-relaxed">
          A digital invoice will be sent to your registered email address upon successful payment. A physical copy of the invoice will also be included with your shipment. All invoices include itemized pricing, applicable taxes, and shipping charges.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">7. Payment Failures</h2>
        <p className="text-gray-600 leading-relaxed">
          In case of payment failure, the order will remain unpaid in your account. You can retry the payment through your account dashboard or place a new order. If money has been deducted from your account despite payment failure, it will typically be refunded within 5-7 business days, depending on your bank's policies.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">8. Prepaid Order Cancellation</h2>
        <p className="text-gray-600 leading-relaxed">
          For prepaid orders that are cancelled before shipping, the refund will be processed to the original payment method within 5-7 business days. Any applicable refund processing fees may be deducted from the refunded amount.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">9. Contact Information</h2>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-gray-700 mb-3">For any payment-related queries or issues, please contact our customer support team:</p>
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
        <p>Last updated: April 27, 2025</p>
        <p className="mt-1">© 2025 WatchLab. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PaymentPolicy;