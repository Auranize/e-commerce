import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto my-10 p-8 bg-white rounded-lg border border-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Return Policy</h1>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Overview</h2>
        <p className="text-gray-600 leading-relaxed">
          At thiqaf, we pride ourselves on the quality and craftsmanship of our timepieces. 
          Each watch is carefully inspected before shipping to ensure you receive exactly what 
          you ordered in perfect condition.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">No-Return Policy</h2>
        <p className="text-gray-600 leading-relaxed mb-3">
          thiqaf operates under a <span className="text-red-600 font-medium">strict no-return policy</span> for all purchases. 
          Once an order is placed and delivered, we do not accept returns for:
        </p>
        <ul className="text-gray-600 space-y-1 pl-5 list-disc">
          <li>Change of mind</li>
          <li>Buyer's remorse</li>
          <li>Style preferences</li>
          <li>Size concerns</li>
          <li>Any other personal reasons</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Exceptions</h2>
        <p className="text-gray-600 leading-relaxed mb-3">
          <span className="font-medium">Wrong Product Delivery:</span> If you receive a watch that is different from what 
          you ordered, we will take full responsibility and correct the error.
        </p>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-gray-700 mb-2 font-medium">In case of a wrong product delivery:</p>
          <ol className="text-gray-600 space-y-2 pl-5 list-decimal">
            <li>Contact our customer service within 48 hours of receiving your order</li>
            <li>Include your order number and clear photos of the product received</li>
            <li>Our team will verify the discrepancy</li>
            <li>Once verified, we will arrange for the correct product to be shipped to you</li>
            <li>We will provide a prepaid shipping label to return the incorrect item</li>
          </ol>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Before You Purchase</h2>
        <p className="text-gray-600 leading-relaxed mb-3">
          We encourage all customers to take the following steps before completing a purchase:
        </p>
        <ul className="text-gray-600 space-y-1 pl-5 list-disc">
          <li>Review product specifications carefully</li>
          <li>Check sizing information thoroughly</li>
          <li>Read all product descriptions</li>
          <li>View all available product images</li>
          <li>Contact customer service with any questions before placing your order</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Contact Information</h2>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-gray-700 mb-2">If you believe you have received the wrong product, please contact us immediately:</p>
          <p className="flex items-center text-gray-700 mb-2">
            <span className="mr-2">📧</span>
            <span className="font-medium">Email:</span> 
            <a href="mailto:returns@thiqaf.com" className="ml-2 text-blue-600 hover:text-blue-800">support@thiqaf.com</a>
          </p>
          <p className="flex items-center text-gray-700 mb-2">
            <span className="mr-2">📞</span>
            <span className="font-medium">Phone:</span> 
            <span className="ml-2">+91 8075725539</span>
          </p>
          
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Legal Rights</h2>
        <p className="text-gray-600 leading-relaxed">
          This policy does not affect your statutory rights regarding faulty or misrepresented goods.
        </p>
      </section>

      <footer className="mt-8 pt-4 border-t text-sm text-gray-500 text-center">
        <p>This policy was last updated on April 27, 2025.</p>
      </footer>
    </div>
  );
};

export default ReturnPolicy;