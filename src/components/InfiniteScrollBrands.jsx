
const InfiniteScrollBrands = () => {
  // Array of premium brand names
  const brands = [
    { name: 'Rolex', id: 1 },
    { name: 'Gucci', id: 2 },
    { name: 'Louis Vuitton', id: 3 },
    { name: 'Cartier', id: 4 },
    { name: 'Prada', id: 5 },
    { name: 'Chanel', id: 6 },
    { name: 'Hermès', id: 7 },
    { name: 'Tiffany & Co.', id: 8 },
    { name: 'Dior', id: 9 },
    { name: 'Burberry', id: 10 },
  ];

  return (
    <div className="py-8 bg-white border-t border-b border-gray-100">
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {brands.map((brand) => (
            <div 
              key={brand.id} 
              className="mx-8 flex items-center justify-center h-16"
            >
              <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                <span className="text-lg font-semibold text-gray-700">{brand.name}</span>
                {/* Replace with actual logo when available */}
                {/* <img 
                  src={`/path/to/${brand.name.toLowerCase()}-logo.svg`}
                  alt={`${brand.name} logo`}
                  className="h-8 w-auto object-contain"
                /> */}
              </div>
            </div>
          ))}
          
          {/* Duplicate brands for seamless loop */}
          {brands.map((brand) => (
            <div 
              key={`${brand.id}-duplicate`} 
              className="mx-8 flex items-center justify-center h-16"
            >
              <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                <span className="text-lg font-semibold text-gray-700">{brand.name}</span>
                {/* Replace with actual logo when available */}
                {/* <img 
                  src={`/path/to/${brand.name.toLowerCase()}-logo.svg`}
                  alt={`${brand.name} logo`}
                  className="h-8 w-auto object-contain"
                /> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteScrollBrands;