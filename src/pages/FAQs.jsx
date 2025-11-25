import React, { useState } from 'react';

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  const faqItems = [
    {
      question: "How do I track my order?",
      answer: "Once your order is shipped, you'll receive a confirmation email with a tracking number. You can also log into your account on our website and view your order status under 'My Orders'. If you have any difficulties, please contact our customer support team."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards (Visa, MasterCard, American Express), UPI payments, net banking, mobile wallets (Paytm, PhonePe, Google Pay), and Cash on Delivery for select locations and products."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to select international destinations. Shipping rates and delivery times vary by location. Please note that import duties and taxes are the responsibility of the recipient and are not included in our shipping fees."
    },
    {
      question: "How can I return or exchange a product?",
      answer: "WatchLab follows a strict no-refund policy. All sales are final. However, if you receive a damaged product, you can request a replacement by providing a clear unboxing video as proof within 24 hours of delivery. Please contact our customer support team to initiate the process."
    },
    {
      question: "Are the watches authentic?",
      answer: "Absolutely! We only sell 100% authentic watches directly sourced from authorized distributors or manufacturers. Each product comes with its original packaging, warranty card, and manufacturer's guarantee."
    },
    {
      question: "How do I know my watch size?",
      answer: "Watch sizes are typically specified by case diameter (in mm). For a comfortable fit, men's watches usually range from 38mm to 46mm, while women's watches range from 26mm to 36mm. For strap size, measure your wrist circumference or use our size guide available on the product page."
    },
    {
      question: "Are batteries included with quartz watches?",
      answer: "Yes, all our quartz watches come with pre-installed batteries. Depending on the model, battery life typically ranges from 1-3 years under normal use."
    },
    {
      question: "How water-resistant are your watches?",
      answer: "Water resistance varies by model. The water resistance rating is clearly mentioned in the product specifications. Please note that water resistance is not permanent and should be checked periodically. Leather straps are generally not water-resistant even if the watch case is."
    },
    {
      question: "Do you offer warranty on your products?",
      answer: "Yes, all watches come with the original manufacturer's warranty, typically ranging from 1-5 years depending on the brand. We also offer an optional extended warranty on select premium models. Please refer to our Warranty Policy for more details."
    },
    {
      question: "How do I care for my watch?",
      answer: "For mechanical watches, we recommend servicing every 3-5 years. For daily care, wipe your watch with a soft cloth after wear, avoid magnetic fields, extreme temperatures, and chemicals. For specific care instructions, please refer to the manual provided with your watch."
    },
    {
      question: "Can I cancel my order?",
      answer: "Order cancellation is only possible if the order has not been shipped. Once shipped, orders cannot be canceled. Please contact our customer support team immediately if you wish to cancel your order."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our customer support team via email at support@watchlab.in or by phone at +91 8075725539. Our support hours are Monday through Saturday, 10:00 AM to 7:00 PM IST."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white  rounded-lg border border-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Frequently Asked Questions</h1>
      
      <section className="mb-6">
        <p className="text-gray-600 leading-relaxed mb-8">
          Find answers to the most common questions about WatchLab products, orders, shipping, and more. If you can't find what you're looking for, please don't hesitate to contact our customer support team.
        </p>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 text-left focus:outline-none transition-colors"
                onClick={() => toggleItem(index)}
              >
                <span className="font-medium text-gray-800">{item.question}</span>
                <svg 
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${openItem === index ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openItem === index ? 'max-h-96 p-4' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Still Have Questions?</h2>
        <p className="text-gray-600 mb-4">
          If you couldn't find the answer to your question, our customer support team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <a 
            href="mailto:support@watchlab.in" 
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Email Support
          </a>
          <a 
            href="tel:+918075725539" 
            className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Call Support
          </a>
        </div>
      </section>

      <footer className="mt-8 pt-4 border-t text-sm text-gray-500 text-center">
        <p>Last updated: April 27, 2025</p>
        <p className="mt-1">© 2025 WatchLab. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FAQ;