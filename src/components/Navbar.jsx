import React, { useContext, useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { useT } from '../hooks/useT';

import { ShoppingBag, Search, User, Menu, X, Clock, ChevronDown, Heart } from 'lucide-react';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const { 
    showSearch, setShowSearch, getCartCount, navigate, 
    token, setToken, setCartItems, language, changeLanguage 
  } = useContext(ShopContext);

  const t = useT();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  const watchCategories = [
    { name: t("cat_luxury"), path: "/collection/luxury" },
    { name: t("cat_sport"), path: "/collection/sport" },
    { name: t("cat_smart"), path: "/collection/smart" },
    { name: t("cat_classic"), path: "/collection/classic" },
    { name: t("cat_limited"), path: "/collection/limited" }
  ];

  return (
    <>
      {/* Top announcement */}
      <div className="bg-gray-900 text-white py-2 text-center text-sm">
        {t("navbar_offer")}
      </div>

      {/* Main navbar */}
      <div className={`sticky top-0 z-50 w-full ${scrolled ? 'shadow-md bg-white' : 'bg-white'} transition-all duration-300`}>
        <div className="max-w-screen-2xl mx-auto">

          {/* Upper section */}
          <div className="flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-amber-600" />
              <span className="text-2xl font-bold">{t("brand_name")}</span>
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex relative max-w-md w-full mx-4">
              <input 
                type="text" 
                placeholder={t("search_placeholder")}
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:border-amber-500 text-sm"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-6">

              {/* Search Mobile */}
              <button onClick={() => setShowSearch(!showSearch)} className="md:hidden relative group">
                <Search className="w-5 h-5 text-gray-700" />
              </button>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative group hidden sm:block">
                <Heart className="w-5 h-5 text-gray-700" />
                <span className="absolute -right-1 -top-1 w-4 h-4 text-center bg-amber-600 text-white text-xs rounded-full">
                  0
                </span>
              </Link>

              {/* Account */}
              <div className="group relative">
                <button onClick={() => token ? null : navigate('/login')}>
                  <User className="w-5 h-5 text-gray-700" />
                </button>

                {token && (
                  <div className="group-hover:block hidden absolute right-0 pt-4 z-10">
                    <div className="flex flex-col gap-2 w-48 py-3 px-5 bg-white text-gray-700 rounded shadow-lg border">
                      <p className="text-sm font-medium">{t("nav_hello_user")}</p>

                      <Link to="/profile" className="text-sm">{t("nav_profile")}</Link>
                      <Link to="/orders" className="text-sm">{t("nav_orders")}</Link>

                      <button onClick={logout} className="text-sm text-red-500">
                        {t("logout")}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link to="/cart" className="relative group">
                <ShoppingBag className="w-5 h-5 text-gray-700" />
                {token && getCartCount() > 0 && (
                  <span className="absolute -right-1 -top-1 w-4 h-4 text-center bg-amber-600 text-white text-xs rounded-full">
                    {getCartCount()}
                  </span>
                )}
              </Link>

              {/* Language Switcher */}
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="border p-1 rounded text-sm"
              >
                <option value="en">EN</option>
                <option value="ar">AR</option>
              </select>

              {/* Mobile Menu */}
              <button onClick={() => setVisible(true)} className="sm:hidden">
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>

          {/* LOWER NAV LINKS */}
          <div className="hidden sm:block border-t border-gray-100">
            <div className="flex justify-center gap-8 px-4">

              <NavLink to="/" className="py-3 text-sm">
                {t("nav_home")}
              </NavLink>

              {/* Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setShowCategoryDropdown(true)}
                onMouseLeave={() => setShowCategoryDropdown(false)}
              >
                <NavLink to="/collection" className="py-3 text-sm flex items-center gap-1">
                  {t("nav_collection")}
                  <ChevronDown className="w-4 h-4" />
                </NavLink>

                {showCategoryDropdown && (
                  <div className="absolute left-0 mt-1 w-52 bg-white shadow-lg rounded-md overflow-hidden z-50">
                    <div className="py-2">
                      {watchCategories.map((category, i) => (
                        <Link 
                          key={i}
                          to={category.path}
                          className="block px-4 py-2 text-sm hover:bg-gray-50"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <NavLink to="/new-arrivals" className="py-3 text-sm">
                {t("nav_new_arrivals")}
              </NavLink>

              <NavLink to="/about" className="py-3 text-sm">
                {t("nav_about")}
              </NavLink>

              <NavLink to="/contact" className="py-3 text-sm">
                {t("nav_contact")}
              </NavLink>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Navbar;
