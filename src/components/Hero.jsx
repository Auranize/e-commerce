import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useT } from "../hooks/useT";

const Hero = () => {
  const navigate = useNavigate();
  const t = useT(); // translation hook

  return (
    <div className="flex flex-col sm:flex-row border-0 rounded-lg overflow-hidden bg-white">
      
      {/* Left Section */}
      <div className="w-full sm:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="max-w-md space-y-6">

          {/* Tagline */}
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-amber-300"></div>
            <span className="text-sm font-medium tracking-wider text-amber-600">
              {t("hero_tagline")}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            {t("hero_title_before")}{" "}
            <span className="text-amber-600">{t("hero_title_highlight")}</span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {t("hero_description")}
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/collection")}
            className="group flex items-center gap-2 bg-gray-900 hover:bg-amber-600 text-white py-3 px-6 rounded-full transition-all duration-300"
          >
            <span className="font-medium">{t("hero_cta")}</span>
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

        </div>
      </div>

      {/* Right Image Section */}
      <div className="w-full sm:w-1/2 relative">
        <img
          onClick={() => navigate("/collection")}
          className="w-full h-full object-cover cursor-pointer transition-transform hover:scale-105 duration-700"
          src={assets.hero_3}
          alt="hero_section"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Hero;
