import React from "react";
import { MessageCircle, Clock, Shield, Headphones } from "lucide-react";
import { useT } from "../hooks/useT";

const OurPolicy = () => {
  const t = useT();

  const services = [
    {
      icon: <Headphones size={24} className="text-amber-600" />,
      title: t("policy_expert_consultation_title"),
      description: t("policy_expert_consultation_desc"),
    },
    {
      icon: <Clock size={24} className="text-amber-600" />,
      title: t("policy_support_title"),
      description: t("policy_support_desc"),
    },
    {
      icon: <Shield size={24} className="text-amber-600" />,
      title: t("policy_authenticity_title"),
      description: t("policy_authenticity_desc"),
    },
    {
      icon: <MessageCircle size={24} className="text-amber-600" />,
      title: t("policy_live_chat_title"),
      description: t("policy_live_chat_desc"),
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {t("policy_main_title")}
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            {t("policy_main_subtitle")}
          </p>
        </div>

        {/* Services Grid */}
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
