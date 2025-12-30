import React, { useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { Search, X, ChevronDown, ChevronUp, Filter, Sliders, ChevronLeft, ChevronRight } from 'lucide-react';
import { useT } from '../hooks/useT'; // Import translation hook

// Constants for better maintenance
const CATEGORIES = ['Men', 'Women', 'Couple'];
const BRANDS = [
  "Rolex", "Casio", "Seiko", "Fossil", "Rado", "PatekPhilippe", "Cartier", "Tissot"
];

const SORT_OPTIONS = {
  relevant: { key: 'collection_sort_relevant' },
  'low-high': { key: 'collection_sort_low_high' },
  'high-low': { key: 'collection_sort_high_low' },
  newest: { key: 'collection_sort_newest' },
  bestselling: { key: 'collection_sort_bestselling' }
};

const DEFAULT_PRICE_RANGE = { min: 0, max: 10000 };
const PRODUCTS_PER_PAGE = 25;

const Collection = () => {
  const t = useT(); // Translation function
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
  
  // Handle search
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveSearch(searchQuery);
    setContextSearch(searchQuery);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setActiveSearch('');
    setContextSearch('');
    searchInputRef.current?.focus();
  };
  
  // Filtered products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeSearch) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(activeSearch.toLowerCase())
      );
    }

    if (category.length > 0) {
      result = result.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      result = result.filter(item => subCategory.includes(item.subCategory));
    }

    result = result.filter(item => {
      const itemPrice = item.price || item.discount || 0;
      return itemPrice >= priceRange.min && itemPrice <= priceRange.max;
    });

    const sortFn = SORT_OPTIONS[sortType]?.fn;
    if (sortFn) result.sort(sortFn);

    return result;
  }, [products, activeSearch, category, subCategory, priceRange, sortType]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  useEffect(() => setCurrentPage(1), [category, subCategory, activeSearch, priceRange, sortType]);

  const toggleCategory = useCallback((e) => {
    const value = e.target.value;
    setCategory(prev => prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]);
  }, []);

  const toggleSubCategory = useCallback((e) => {
    const value = e.target.value;
    setSubCategory(prev => prev.includes(value) ? prev.filter(b => b !== value) : [...prev, value]);
  }, []);

  const clearFilters = useCallback(() => {
    setCategory([]);
    setSubCategory([]);
    setPriceRange(DEFAULT_PRICE_RANGE);
    setSortType('relevant');
    setCurrentPage(1);
    clearSearch();

    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    const minInput = document.getElementById('min-price');
    const maxInput = document.getElementById('max-price');
    if (minInput) minInput.value = DEFAULT_PRICE_RANGE.min;
    if (maxInput) maxInput.value = DEFAULT_PRICE_RANGE.max;
  }, []);

  const handlePriceChange = useCallback((e, type) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setPriceRange(prev => ({ ...prev, [type]: value }));
    }
  }, []);

  const changePage = useCallback((page) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [totalPages]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const [openSections, setOpenSections] = useState({
    categories: true,
    brands: true,
    price: true
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const ActiveFilters = () => {
    if (category.length === 0 && subCategory.length === 0 && 
        priceRange.min === DEFAULT_PRICE_RANGE.min && 
        priceRange.max === DEFAULT_PRICE_RANGE.max && 
        !activeSearch) return null;

    return (
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-700">{t('collection_active_filters')}:</span>
          
          {activeSearch && (
            <span className="bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-sm font-medium flex items-center">
              {t('collection_search')}: {activeSearch}
              <button onClick={clearSearch} className="ml-2"><X size={14} /></button>
            </span>
          )}
          
          {category.map(cat => (
            <span key={cat} className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm font-medium flex items-center">
              {cat}
              <button onClick={() => setCategory(prev => prev.filter(c => c !== cat))} className="ml-2"><X size={14} /></button>
            </span>
          ))}
          
          {subCategory.map(brand => (
            <span key={brand} className="bg-purple-50 text-purple-700 rounded-full px-3 py-1 text-sm font-medium flex items-center">
              {brand}
              <button onClick={() => setSubCategory(prev => prev.filter(b => b !== brand))} className="ml-2"><X size={14} /></button>
            </span>
          ))}
          
          {(priceRange.min !== DEFAULT_PRICE_RANGE.min || priceRange.max !== DEFAULT_PRICE_RANGE.max) && (
            <span className="bg-green-50 text-green-700 rounded-full px-3 py-1 text-sm font-medium flex items-center">
              {t('collection_price')}: {currency}{priceRange.min} - {currency}{priceRange.max}
              <button onClick={() => setPriceRange(DEFAULT_PRICE_RANGE)} className="ml-2"><X size={14} /></button>
            </span>
          )}
          
          <button onClick={clearFilters} className="text-sm text-gray-600 hover:text-gray-800 underline ml-2">
            {t('collection_clear_all')}
          </button>
        </div>
      </div>
    );
  };

  const PaginationControls = () => {
    if (totalPages <= 1) return null;

    // Simplified page rendering logic (same as before)
    const renderPageNumbers = () => {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(totalPages, start + maxVisible - 1);
      if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

      if (start > 1) {
        pages.push(<button key={1} onClick={() => changePage(1)} className="w-10 h-10 rounded-md hover:bg-gray-100">{1}</button>);
        if (start > 2) pages.push(<span key="start-..." className="w-10 h-10 flex items-center justify-center">...</span>);
      }

      for (let i = start; i <= end; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => changePage(i)}
            className={`w-10 h-10 rounded-md ${currentPage === i ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
          >
            {i}
          </button>
        );
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push(<span key="end-..." className="w-10 h-10 flex items-center justify-center">...</span>);
        pages.push(<button key={totalPages} onClick={() => changePage(totalPages)} className="w-10 h-10 rounded-md hover:bg-gray-100">{totalPages}</button>);
      }

      return pages;
    };

    return (
      <div className="flex justify-center mt-10 mb-4">
        <div className="inline-flex items-center shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-2 ${currentPage === 1 ? 'text-gray-300' : 'hover:bg-gray-50'}`}>
            <ChevronLeft size={20} />
          </button>
          <div className="hidden sm:flex">{renderPageNumbers()}</div>
          <div className="block sm:hidden px-4 py-2 text-gray-700 font-medium">{currentPage} / {totalPages}</div>
          <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-2 ${currentPage === totalPages ? 'text-gray-300' : 'hover:bg-gray-50'}`}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  };

  const renderSkeletons = () => {
    return [...Array(PRODUCTS_PER_PAGE)].map((_, i) => (
      <div key={i} className="animate-pulse rounded-lg overflow-hidden shadow-sm">
        <div className="bg-gray-200 h-64 mb-3"></div>
        <div className="p-3 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    ));
  };

  const FilterSection = ({ title, children, isOpen, onToggle }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <button onClick={onToggle} className="w-full px-4 py-3 flex justify-between bg-gray-50 hover:bg-gray-100">
        <span className="font-medium text-gray-800">{title}</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {isOpen && <div className="p-4 border-t">{children}</div>}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="relative mx-auto max-w-4xl mb-8">
        <form onSubmit={handleSearchSubmit} className="flex items-center bg-white shadow-lg rounded-full border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
              <Search size={20} />
            </div>
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={t('collection_search_placeholder')}
              className="w-full pl-12 pr-4 py-3 bg-transparent outline-none text-base"
            />
            {searchQuery && (
              <button type="button" onClick={clearSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <X size={18} />
              </button>
            )}
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium">
            {t('collection_search_button')}
          </button>
        </form>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <button onClick={() => setShowFilter(!showFilter)} className="w-full flex justify-center items-center gap-2 py-3 bg-gray-100 border rounded-lg font-medium">
          <Filter size={18} />
          {showFilter ? t('collection_hide_filters') : t('collection_show_filters')}
        </button>
      </div>

      <ActiveFilters />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`${showFilter ? 'block' : 'hidden'} lg:block w-full lg:w-64`}>
          <div className="sticky top-20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Sliders size={20} />
                {t('collection_filters')}
              </h2>
              <button onClick={clearFilters} className="text-sm text-blue-600 hover:underline">
                {t('collection_clear_all')}
              </button>
            </div>

            <div className="space-y-4">
              <FilterSection title={t('collection_categories')} isOpen={openSections.categories} onToggle={() => toggleSection('categories')}>
                <div className="space-y-2">
                  {CATEGORIES.map(cat => (
                    <div key={cat} className="flex items-center">
                      <input type="checkbox" id={`cat-${cat}`} value={cat} checked={category.includes(cat)} onChange={toggleCategory} className="h-4 w-4 rounded text-blue-600" />
                      <label htmlFor={`cat-${cat}`} className="ml-2 text-sm cursor-pointer">{cat}</label>
                    </div>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title={t('collection_brands')} isOpen={openSections.brands} onToggle={() => toggleSection('brands')}>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {BRANDS.map(brand => (
                    <div key={brand} className="flex items-center">
                      <input type="checkbox" id={`brand-${brand}`} value={brand} checked={subCategory.includes(brand)} onChange={toggleSubCategory} className="h-4 w-4 rounded text-blue-600" />
                      <label htmlFor={`brand-${brand}`} className="ml-2 text-sm cursor-pointer">{brand}</label>
                    </div>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title={t('collection_price_range')} isOpen={openSections.price} onToggle={() => toggleSection('price')}>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-sm mb-1">{t('collection_min')}</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-sm text-gray-500">{currency}</span>
                        <input id="min-price" type="number" value={priceRange.min} onChange={(e) => handlePriceChange(e, 'min')} className="w-full pl-8 pr-2 py-2 border rounded-md" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm mb-1">{t('collection_max')}</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-sm text-gray-500">{currency}</span>
                        <input id="max-price" type="number" value={priceRange.max} onChange={(e) => handlePriceChange(e, 'max')} className="w-full pl-8 pr-2 py-2 border rounded-md" />
                      </div>
                    </div>
                  </div>
                </div>
              </FilterSection>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Title text1={t('collection_all')} text2={t('collection_collections')} />
              {activeSearch && (
                <p className="text-sm text-gray-600 mt-1">
                  {t('collection_search_results_for')} <span className="font-medium">{activeSearch}</span>
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
              <p className="text-sm text-gray-600">
                {t('collection_showing')} <span className="font-medium">
                  {filteredProducts.length > 0 
                    ? `${(currentPage - 1) * PRODUCTS_PER_PAGE + 1} - ${Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length)}`
                    : '0'}
                </span> {t('collection_of')} <span className="font-medium">{filteredProducts.length}</span> {t('collection_products')}
              </p>

              <select value={sortType} onChange={(e) => setSortType(e.target.value)} className="border rounded-md px-3 py-2 text-sm">
                {Object.entries(SORT_OPTIONS).map(([value, { key }]) => (
                  <option key={value} value={value}>{t(key)}</option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{renderSkeletons()}</div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedProducts.map(item => (
                  <ProductItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    discount={item.discount || ''}
                  />
                ))}
              </div>
              <PaginationControls />
            </>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-xl border">
              <div className="inline-flex p-4 bg-white rounded-full mb-4 shadow">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">{t('collection_no_products_title')}</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">{t('collection_no_products_desc')}</p>
              <button onClick={clearFilters} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                {t('collection_clear_filters')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;