import React, { useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { Search, X, ChevronDown, ChevronUp, Filter, Sliders, ChevronLeft, ChevronRight } from 'lucide-react';

// Constants for better maintenance
const CATEGORIES = ['Men', 'Women', 'Couple'];
const BRANDS = [
  "Rolex", "Casio", "Seiko", "Fossil", "Rado", "PatekPhilippe", "Cartier", "Tissot"
];
const SORT_OPTIONS = {
  relevant: { label: 'Sort by: Relevance', fn: null },
  'low-high': { label: 'Price: Low to High', fn: (a, b) => (a.price || a.discount || 0) - (b.price || b.discount || 0) },
  'high-low': { label: 'Price: High to Low', fn: (a, b) => (b.price || b.discount || 0) - (a.price || a.discount || 0) },
  newest: { label: 'Newest First', fn: (a, b) => new Date(b.createdAt) - new Date(a.createdAt) },
  bestselling: { label: 'Best Selling', fn: (a, b) => (b.sold || 0) - (a.sold || 0) }
};
const DEFAULT_PRICE_RANGE = { min: 0, max: 10000 };
const PRODUCTS_PER_PAGE = 25;

const Collection = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { products, currency, setSearch: setContextSearch } = useContext(ShopContext);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState(DEFAULT_PRICE_RANGE);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const searchInputRef = useRef(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  
  // Handle input change for search box
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveSearch(searchQuery);
    setContextSearch(searchQuery); // Update the context search for other components
    setCurrentPage(1); // Reset to first page on new search
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setActiveSearch('');
    setContextSearch('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };
  
  // Memoize filtered products to prevent unnecessary recalculations
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply search filter
    if (activeSearch) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(activeSearch.toLowerCase())
      );
    }

    // Apply category filter
    if (category.length > 0) {
      result = result.filter(item => category.includes(item.category));
    }

    // Apply subcategory filter
    if (subCategory.length > 0) {
      result = result.filter(item => subCategory.includes(item.subCategory));
    }

    // Apply price range filter
    result = result.filter(item => {
      const itemPrice = item.price || item.discount || 0;
      return itemPrice >= priceRange.min && itemPrice <= priceRange.max;
    });

    // Apply sorting
    const sortFn = SORT_OPTIONS[sortType]?.fn;
    if (sortFn) {
      result.sort(sortFn);
    }

    return result;
  }, [products, activeSearch, category, subCategory, priceRange, sortType]);
  
  // Calculate pagination data
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [category, subCategory, activeSearch, priceRange, sortType]);

  // Toggle category selection - memoized to prevent recreating on every render
  const toggleCategory = useCallback((e) => {
    const value = e.target.value;
    setCategory(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  }, []);

  // Toggle subcategory selection - memoized callback
  const toggleSubCategory = useCallback((e) => {
    const value = e.target.value;
    setSubCategory(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setCategory([]);
    setSubCategory([]);
    setPriceRange(DEFAULT_PRICE_RANGE);
    setSortType('relevant');
    setCurrentPage(1);
    clearSearch();
    
    // Reset checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });
    
    // Reset price inputs
    const minInput = document.getElementById('min-price');
    const maxInput = document.getElementById('max-price');
    if (minInput) minInput.value = DEFAULT_PRICE_RANGE.min;
    if (maxInput) maxInput.value = DEFAULT_PRICE_RANGE.max;
  }, []);

  // Handle price range changes
  const handlePriceChange = useCallback((e, type) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setPriceRange(prev => ({
        ...prev,
        [type]: value
      }));
    }
  }, []);
  
  // Handle page change
  const changePage = useCallback((pageNumber) => {
    // Ensure page number is within valid range
    const validPage = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(validPage);
    
    // Scroll to top when page changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [totalPages]);

  // Loading effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter section component for mobile
  const FilterSection = ({ title, children, isOpen, onToggle }) => {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
        <button 
          onClick={onToggle}
          className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span className="font-medium text-gray-800">{title}</span>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {isOpen && (
          <div className="p-4 border-t border-gray-200">
            {children}
          </div>
        )}
      </div>
    );
  };

  // Animation variants for filter section
  const [openSections, setOpenSections] = useState({
    categories: true,
    brands: true,
    price: true
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Badges component to show active filters
  const ActiveFilters = () => {
    if (category.length === 0 && subCategory.length === 0 && 
        priceRange.min === DEFAULT_PRICE_RANGE.min && 
        priceRange.max === DEFAULT_PRICE_RANGE.max && 
        !activeSearch) {
      return null;
    }

    return (
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-700">Active filters:</span>
          
          {activeSearch && (
            <span className="bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-sm font-medium flex items-center">
              Search: {activeSearch}
              <button onClick={clearSearch} className="ml-2 text-blue-600 hover:text-blue-800">
                <X size={14} />
              </button>
            </span>
          )}
          
          {category.map(cat => (
            <span key={`cat-${cat}`} className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm font-medium flex items-center">
              {cat}
              <button 
                onClick={() => setCategory(prev => prev.filter(c => c !== cat))} 
                className="ml-2 text-indigo-600 hover:text-indigo-800"
              >
                <X size={14} />
              </button>
            </span>
          ))}
          
          {subCategory.map(brand => (
            <span key={`brand-${brand}`} className="bg-purple-50 text-purple-700 rounded-full px-3 py-1 text-sm font-medium flex items-center">
              {brand}
              <button 
                onClick={() => setSubCategory(prev => prev.filter(b => b !== brand))} 
                className="ml-2 text-purple-600 hover:text-purple-800"
              >
                <X size={14} />
              </button>
            </span>
          ))}
          
          {(priceRange.min !== DEFAULT_PRICE_RANGE.min || priceRange.max !== DEFAULT_PRICE_RANGE.max) && (
            <span className="bg-green-50 text-green-700 rounded-full px-3 py-1 text-sm font-medium flex items-center">
              Price: {currency}{priceRange.min} - {currency}{priceRange.max}
              <button 
                onClick={() => setPriceRange(DEFAULT_PRICE_RANGE)} 
                className="ml-2 text-green-600 hover:text-green-800"
              >
                <X size={14} />
              </button>
            </span>
          )}
          
          <button 
            onClick={clearFilters} 
            className="text-sm text-gray-600 hover:text-gray-800 underline ml-2"
          >
            Clear all
          </button>
        </div>
      </div>
    );
  };

  // Pagination controls component with improved UI
  const PaginationControls = () => {
    if (totalPages <= 1) return null;
    
    const renderPageNumbers = () => {
      const pages = [];
      const maxPagesToShow = 5;
      
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      
      // Adjust if we're at the end
      if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
      
      // Always show first page
      if (startPage > 1) {
        pages.push(
          <button 
            key="1" 
            onClick={() => changePage(1)}
            className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
          >
            1
          </button>
        );
        
        // Add ellipsis if there's a gap
        if (startPage > 2) {
          pages.push(
            <span key="start-ellipsis" className="w-10 h-10 flex items-center justify-center">...</span>
          );
        }
      }
      
      // Add page numbers
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button 
            key={i} 
            onClick={() => changePage(i)}
            className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors ${
              currentPage === i 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-gray-100'
            }`}
          >
            {i}
          </button>
        );
      }
      
      // Always show last page
      if (endPage < totalPages) {
        // Add ellipsis if there's a gap
        if (endPage < totalPages - 1) {
          pages.push(
            <span key="end-ellipsis" className="w-10 h-10 flex items-center justify-center">...</span>
          );
        }
        
        pages.push(
          <button 
            key={totalPages} 
            onClick={() => changePage(totalPages)}
            className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
          >
            {totalPages}
          </button>
        );
      }
      
      return pages;
    };
    
    return (
      <div className="flex items-center justify-center mt-10 mb-4">
        <div className="inline-flex items-center shadow-sm rounded-lg overflow-hidden border border-gray-200">
          {/* Previous button */}
          <button 
            onClick={() => changePage(currentPage - 1)} 
            disabled={currentPage === 1}
            className={`px-3 py-2 border-r border-gray-200 flex items-center ${
              currentPage === 1 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          
          {/* Page numbers */}
          <div className="hidden sm:flex">
            {renderPageNumbers()}
          </div>
          
          {/* Mobile pagination indicator */}
          <div className="block sm:hidden px-4 py-2 text-gray-700 font-medium">
            {currentPage} / {totalPages}
          </div>
          
          {/* Next button */}
          <button 
            onClick={() => changePage(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className={`px-3 py-2 border-l border-gray-200 flex items-center ${
              currentPage === totalPages 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  };

  // Render loading skeletons
  const renderSkeletons = () => {
    return [...Array(PRODUCTS_PER_PAGE)].map((_, idx) => (
      <div key={idx} className="animate-pulse rounded-lg overflow-hidden shadow-sm">
        <div className="bg-gray-200 h-64 mb-3"></div>
        <div className="p-3">
          <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded-full w-1/4 mb-1"></div>
          <div className="h-4 bg-gray-200 rounded-full w-2/4"></div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar - Modern and improved */}
      <div className="relative mx-auto max-w-4xl mb-8">
        <form 
          onSubmit={handleSearchSubmit} 
          className="flex items-center bg-white overflow-hidden shadow-lg rounded-full border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all"
        >
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
              <Search size={20} />
            </div>
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for luxury watches..."
              className="bg-transparent border-none ring-0 outline-none focus:ring-0 focus:outline-none text-gray-900 text-base block w-full pl-12 pr-4 py-3"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3  rounded-full transition-colors flex items-center font-medium"
          >
            Search
          </button>
        </form>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <button 
          onClick={() => setShowFilter(!showFilter)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 font-medium hover:bg-gray-200 transition-colors"
        >
          <Filter size={18} />
          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Active Filters */}
      <ActiveFilters />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className={`${showFilter ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
          <div className="sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Sliders size={20} className="text-gray-700" />
                <span>Filters</span>
              </h2>
              
              <button 
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear All
              </button>
            </div>

            {/* Filter Sections */}
            <div className="space-y-4">
              {/* Category Filter */}
              <FilterSection 
                title="Categories" 
                isOpen={openSections.categories}
                onToggle={() => toggleSection('categories')}
              >
                <div className="space-y-2">
                  {CATEGORIES.map((cat) => (
                    <div key={cat} className="flex items-center">
                      <input
                        id={`category-${cat}`}
                        type="checkbox"
                        value={cat}
                        checked={category.includes(cat)}
                        onChange={toggleCategory}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`category-${cat}`} className="ml-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer">
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
              </FilterSection>

              {/* Brand Filter */}
              <FilterSection 
                title="Brands" 
                isOpen={openSections.brands}
                onToggle={() => toggleSection('brands')}
              >
                <div className="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                  {BRANDS.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <input
                        id={`brand-${brand}`}
                        type="checkbox"
                        value={brand}
                        checked={subCategory.includes(brand)}
                        onChange={toggleSubCategory}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`brand-${brand}`} className="ml-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </FilterSection>

              {/* Price Range Filter */}
              <FilterSection 
                title="Price Range" 
                isOpen={openSections.price}
                onToggle={() => toggleSection('price')}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="w-1/2 pr-2">
                      <label htmlFor="min-price" className="block text-sm text-gray-600 mb-1 font-medium">Min</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-gray-500">
                          {currency}
                        </span>
                        <input
                          id="min-price"
                          type="number"
                          min="0"
                          value={priceRange.min}
                          onChange={(e) => handlePriceChange(e, 'min')}
                          className="pl-7 pr-2 py-2 w-full border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="w-1/2 pl-2">
                      <label htmlFor="max-price" className="block text-sm text-gray-600 mb-1 font-medium">Max</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-gray-500">
                          {currency}
                        </span>
                        <input
                          id="max-price"
                          type="number"
                          min="0"
                          value={priceRange.max}
                          onChange={(e) => handlePriceChange(e, 'max')}
                          className="pl-7 pr-2 py-2 w-full border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Price range slider could be added here */}
                </div>
              </FilterSection>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col">
              <Title text1={'ALL'} text2={'COLLECTIONS'} />
              {activeSearch && (
                <p className="text-sm text-gray-600 mt-1">
                  Search results for: <span className="font-medium">{activeSearch}</span>
                </p>
              )}
            </div>
            
            {/* Products count and sort options */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium">
                  {filteredProducts.length > 0 ? 
                    `${Math.min(
                      (currentPage - 1) * PRODUCTS_PER_PAGE + 1,
                      filteredProducts.length
                    )} - ${Math.min(
                      currentPage * PRODUCTS_PER_PAGE,
                      filteredProducts.length
                    )}` : '0'}
                </span> of <span className="font-medium">{filteredProducts.length}</span> products
              </p>
              
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
              >
                {Object.entries(SORT_OPTIONS).map(([value, { label }]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Grid with improved UI */}
          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {renderSkeletons()}
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedProducts.map((item, index) => (
                  <ProductItem 
                    key={item._id || index} 
                    id={item._id} 
                    name={item.name} 
                    image={item.image} 
                    price={item.price} 
                    discount={item.discount || ''} 
                  />
                ))}
              </div>
              
              {/* Pagination controls */}
              <PaginationControls />
            </>
          ) : (
            // No products found
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-50 rounded-xl border border-gray-200">
              <div className="bg-white p-4 rounded-full mb-4 shadow-sm">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No watches found</h3>
              <p className="text-gray-600 mb-6 max-w-md">We couldn't find any watches matching your current filters. Try adjusting your search criteria or browse our collections.</p>
              <button 
                onClick={clearFilters}
                className="inline-flex items-center px-5 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;