import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col sm:flex-row border-0  rounded-lg overflow-hidden bg-white">
      {/* Hero Left side - Content */}
      <div className="w-full sm:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="max-w-md space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-amber-300"></div>
            <span className="text-sm font-medium tracking-wider text-amber-600">PREMIUM COLLECTION</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            Discover Our <span className="text-amber-600">Latest Arrivals</span>
          </h1>
          
          <p className="text-gray-600 leading-relaxed">
            Explore our handpicked selection of premium products designed for modern lifestyles.
          </p>
          
          <button 
            onClick={() => navigate("/collection")}
            className="group flex items-center gap-2 bg-gray-900 hover:bg-amber-600 text-white py-3 px-6 rounded-full transition-all duration-300"
          >
            <span className="font-medium">SHOP NOW</span>
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
      
      {/* Hero Right side - Image */}
      <div className="w-full sm:w-1/2 relative">
        <img 
          onClick={() => navigate("/collection")}
          className="w-full h-full object-cover cursor-pointer transition-transform hover:scale-105 duration-700"
          src={assets.hero_3} 
          alt="Latest collection showcase" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Hero;