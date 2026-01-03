import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white  rounded-lg border border-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Shipping Policy</h1>
      
      <section className="mb-6">
        <p className="text-gray-600 leading-relaxed">
          Thank you for shopping with thiqaf. This Shipping Policy outlines how we handle the delivery of products purchased through our website. By placing an order, you agree to the terms outlined in this policy.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">1. Processing Time</h2>
        <p className="text-gray-600 leading-relaxed">
          All orders are processed within 1-2 business days after payment confirmation. Orders placed on weekends or public holidays will be processed on the next business day. Once your order has been processed and shipped, you will receive a confirmation email with tracking information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">2. Shipping Methods & Timeframes</h2>
        <p className="text-gray-600 leading-relaxed mb-3">
          thiqaf partners with reliable courier services to ensure safe and timely delivery of your products.
          (for now we are provding free delivery within 4-5 business days)
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 mb-3">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-700">Shipping Method</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-700">Estimated Delivery Time</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-700">Shipping Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-600">Standard Shipping</td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-600">3-5 business days</td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-600">₹99 (Free for orders above ₹2,000)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-600">Express Shipping</td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-600">1-2 business days</td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-600">₹249</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-600">Same-Day Delivery</td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-600">Same day (orders placed before 12 PM)</td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-600">₹399 (Available only in select metro cities)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Please note that these are estimated delivery times and may vary based on your location, public holidays, and unforeseen circumstances. We are not responsible for delays caused by courier services, weather conditions, or other factors beyond our control.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">3. Shipping Coverage</h2>
        <p className="text-gray-600 leading-relaxed mb-3">
          We currently ship to all major cities and towns across India. For remote locations, additional shipping charges may apply, and delivery times may be extended.
        </p>
        <p className="text-gray-600 leading-relaxed">
          International shipping is available to select countries. Please contact our customer support team for international shipping rates and estimated delivery times.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">4. Order Tracking</h2>
        <p className="text-gray-600 leading-relaxed">
          Once your order has been shipped, you will receive a confirmation email with a tracking number and link. You can also track your order by logging into your account on our website or by contacting our customer support team with your order number.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">5. Shipping Address</h2>
        <p className="text-gray-600 leading-relaxed">
          It is your responsibility to provide accurate shipping information during checkout. thiqaf is not responsible for orders shipped to incorrect addresses provided by customers. Any additional shipping charges incurred due to address changes after order processing will be borne by the customer.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">6. Customs & Import Duties</h2>
        <p className="text-gray-600 leading-relaxed">
          For international orders, you may be subject to import duties and taxes imposed by the destination country. These charges are the responsibility of the recipient and are not included in our shipping fees. thiqaf has no control over these charges and cannot predict their amount.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">7. Package Inspection</h2>
        <p className="text-gray-600 leading-relaxed">
          We recommend that you inspect your package upon delivery for any visible damage before accepting it. If the package appears damaged, please note this when signing for the delivery. All our products are carefully packed to prevent damage during transit. In case you receive a damaged product, please refer to our Refund Policy for the next steps.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">8. Undelivered Packages</h2>
        <p className="text-gray-600 leading-relaxed">
          If a package is returned to us due to incorrect address information, refused delivery, or failure to collect from a pick-up point, you will be responsible for the original shipping charges as well as the cost of returning the package to us. To have the package reshipped, you will need to cover the shipping costs again.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">9. Contact Information</h2>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-gray-700 mb-3">For any shipping-related queries or issues, please contact our customer support team:</p>
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

export default ShippingPolicy;