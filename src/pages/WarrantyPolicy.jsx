import React from 'react';

const WarrantyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white shadow-lg rounded-lg border border-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Warranty Policy</h1>
      
      <section className="mb-6">
        <p className="text-gray-600 leading-relaxed">
          At WatchLab, we stand behind the quality of our products. This Warranty Policy outlines the terms and conditions regarding product warranties, repairs, and replacements. By purchasing from us, you agree to the terms outlined in this policy.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">1. Manufacturer's Warranty</h2>
        <p className="text-gray-600 leading-relaxed">
          All watches sold on WatchLab come with the original manufacturer's warranty. The warranty period varies by brand and model, typically ranging from 1 to 5 years from the date of purchase. The manufacturer's warranty covers manufacturing defects and mechanical failures under normal use conditions.
        </p>
      </section>

      

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">2. Warranty Exclusions</h2>
        <p className="text-gray-600 leading-relaxed mb-3">
          The following are not covered under either the manufacturer's warranty or the WatchLab Extended Warranty:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-gray-600">
          <li>Damage resulting from accidents, misuse, or abuse</li>
          <li>Normal wear and tear, including scratches on the case, crystal, or band</li>
          <li>Damage from water for non-water-resistant watches</li>
          <li>Unauthorized service or modifications</li>
          <li>Aesthetic deterioration due to normal aging</li>
          <li>Battery depletion for quartz watches after the first year</li>
          <li>Lost or stolen watches</li>
          <li>Damage to packaging, instructions, or accessories</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">3. Warranty Claim Process</h2>
        <p className="text-gray-600 leading-relaxed mb-3">
          To initiate a warranty claim, please follow these steps:
        </p>
        <ol className="list-decimal pl-6 space-y-1 text-gray-600">
          <li>Contact our customer support team with your order number and a detailed description of the issue.</li>
          <li>Our team will verify your warranty coverage and provide you with a Return Authorization (RA) number.</li>
          <li>Ship the watch in its original packaging or equivalent protective packaging to the address provided by our customer support team.</li>
          <li>Include the RA number and a copy of your purchase invoice with the shipment.</li>
          <li>Our technical team will assess the watch to determine if the issue is covered under warranty.</li>
          <li>You will be notified of the assessment results and estimated repair time.</li>
        </ol>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">4. Repair and Replacement</h2>
        <p className="text-gray-600 leading-relaxed">
          For issues covered under warranty, we will repair or replace the watch at our discretion. If the specific model is no longer available for replacement, we will offer a product of equal or greater value. For repairs not covered under warranty, we will provide a repair cost estimate for your approval before proceeding.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">5. Warranty Transfer</h2>
        <p className="text-gray-600 leading-relaxed">
          The manufacturer's warranty and WatchLab Extended Warranty are tied to the original purchaser and are not transferable to subsequent owners.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">6. Return Shipping</h2>
        <p className="text-gray-600 leading-relaxed">
          For warranty repairs, WatchLab will cover the return shipping costs to the customer. For non-warranty repairs, the customer is responsible for both the initial shipping to our service center and the return shipping costs.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">7. Service Timeframe</h2>
        <p className="text-gray-600 leading-relaxed">
          Standard warranty repairs typically take 2-4 weeks to complete, depending on the nature of the issue and parts availability. Premium and limited edition watches may require longer service times. Our customer support team will provide you with an estimated timeframe when you initiate your warranty claim.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">8. Contact Information</h2>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-gray-700 mb-3">For any warranty or repair-related queries, please contact our customer support team:</p>
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

export default WarrantyPolicy;