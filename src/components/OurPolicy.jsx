
import React from 'react';
import { MessageCircle, Clock, Shield, Headphones } from 'lucide-react';

const OurPolicy = () => {
  const services = [
    {
      icon: <Headphones size={24} className="text-amber-600" />,
      title: "Expert Consultation",
      description: "Get personalized advice from our watch specialists"
    },
    {
      icon: <Clock size={24} className="text-amber-600" />,
      title: "24/7 Support",
      description: "Our team is available around the clock to assist you"
    },
    {
      icon: <Shield size={24} className="text-amber-600" />,
      title: "Authenticity Guaranteed",
      description: "Every timepiece verified by our expert craftsmen"
    },
    {
      icon: <MessageCircle size={24} className="text-amber-600" />,
      title: "Live Chat Support",
      description: "Connect instantly with our customer care team"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Exceptional Customer Experience</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            We're committed to providing an outstanding service experience with every interaction
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-amber-50 group-hover:bg-amber-100 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-500 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;