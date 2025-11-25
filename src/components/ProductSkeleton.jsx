import React from 'react';

const ProductSkeleton = ({ count = 5 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10">
      {Array(count).fill().map((_, index) => (
        <div key={index} className="animate-pulse">
          {/* Image skeleton */}
          <div className="bg-gray-200 rounded-lg aspect-square mb-3"></div>
          
          {/* Name skeleton */}
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          
          {/* Price skeleton */}
          <div className="h-5 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;