import React, { useContext, useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { ShoppingBag, Search, User, Menu, X, Clock, ChevronDown, Heart } from 'lucide-react';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const { showSearch, setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  // Watch categories for dropdown
  const watchCategories = [
    { name: "Luxury Watches", path: "/collection/luxury" },
    { name: "Sport Watches", path: "/collection/sport" },
    { name: "Smart Watches", path: "/collection/smart" },
    { name: "Classic Watches", path: "/collection/classic" },
    { name: "Limited Editions", path: "/collection/limited" }
  ];

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-gray-900 text-white py-2 text-center text-sm">
      Enjoy Free Shipping on Every Order – No Minimums, No Worries! 🚚✨
      </div>

      {/* Main navbar */}
      <div className={`sticky top-0 z-50 w-full ${scrolled ? 'shadow-md bg-white' : 'bg-white'} transition-all duration-300`}>
        <div className="max-w-screen-2xl mx-auto">
          {/* Upper navbar with logo and icons */}
          <div className="flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-amber-600" />
              <span className="text-2xl font-bold">Watch Lab</span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex relative max-w-md w-full mx-4">
              <input 
                type="text" 
                placeholder="Search for watches..." 
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:border-amber-500 text-sm"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-6">
              <button onClick={() => setShowSearch(!showSearch)} className="md:hidden relative group">
                <Search className="w-5 h-5 text-gray-700" />
                <span className="hidden group-hover:block absolute -bottom-8 whitespace-nowrap text-xs bg-gray-800 text-white py-1 px-2 rounded">Search</span>
              </button>
              
              <Link to="/wishlist" className="relative group hidden sm:block">
                <Heart className="w-5 h-5 text-gray-700" />
                <span className="absolute -right-1 -top-1 w-4 h-4 text-center leading-4 bg-amber-600 text-white text-xs rounded-full">0</span>
                <span className="hidden group-hover:block absolute -bottom-8 whitespace-nowrap text-xs bg-gray-800 text-white py-1 px-2 rounded">Wishlist</span>
              </Link>
              
              <div className="group relative">
                <button onClick={() => token ? null : navigate('/login')} className="relative group">
                  <User className="w-5 h-5 text-gray-700" />
                  <span className="hidden group-hover:block absolute -bottom-8 whitespace-nowrap text-xs bg-gray-800 text-white py-1 px-2 rounded">Account</span>
                </button>

                {/* Account Dropdown Menu */}
                {token && (
                  <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-10">
                    <div className="flex flex-col gap-2 w-48 py-3 px-5 bg-white text-gray-700 rounded shadow-lg border">
                      <div className="pb-2 mb-2 border-b border-gray-100">
                        <p className="text-sm font-medium">Hello, User</p>
                        <p className="text-xs text-gray-500">Welcome back</p>
                      </div>
                      <Link to="/profile" className="text-sm py-1.5 px-2 hover:bg-gray-50 rounded transition-colors">My Profile</Link>
                      <Link to="/orders" className="text-sm py-1.5 px-2 hover:bg-gray-50 rounded transition-colors">My Orders</Link>
                      <Link to="/wishlist" className="text-sm py-1.5 px-2 hover:bg-gray-50 rounded transition-colors sm:hidden">My Wishlist</Link>
                      <button onClick={logout} className="text-sm py-1.5 px-2 hover:bg-gray-50 text-left rounded transition-colors text-red-500">Logout</button>
                    </div>
                  </div>
                )}
              </div>
              
              <Link to="/cart" className="relative group">
                <ShoppingBag className="w-5 h-5 text-gray-700" />
                {token && getCartCount() > 0 && (
                  <span className="absolute -right-1 -top-1 w-4 h-4 text-center leading-4 bg-amber-600 text-white text-xs rounded-full">{getCartCount()}</span>
                )}
                <span className="hidden group-hover:block absolute -bottom-8 whitespace-nowrap text-xs bg-gray-800 text-white py-1 px-2 rounded">Cart</span>
              </Link>
              
              <button onClick={() => setVisible(true)} className="sm:hidden">
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Lower navbar with navigation links */}
          <div className="hidden sm:block border-t border-gray-100">
            <div className="flex justify-center gap-8 px-4">
              <NavLink 
                to="/" 
                className={({isActive}) => 
                  `py-3 text-sm font-medium transition-colors relative ${isActive ? 'text-amber-600' : 'text-gray-700 hover:text-amber-600'}`
                }
              >
                HOME
              </NavLink>
              
              <div className="relative group" onMouseEnter={() => setShowCategoryDropdown(true)} onMouseLeave={() => setShowCategoryDropdown(false)}>
                <NavLink 
                  to="/collection" 
                  className={({isActive}) => 
                    `py-3 text-sm font-medium transition-colors flex items-center gap-1 ${isActive ? 'text-amber-600' : 'text-gray-700 hover:text-amber-600'}`
                  }
                >
                  <span>COLLECTION</span>
                  <ChevronDown className="w-4 h-4" />
                </NavLink>
                
                {/* Categories dropdown */}
                {showCategoryDropdown && (
                  <div className="absolute left-0 mt-1 w-52 bg-white shadow-lg rounded-md overflow-hidden z-50">
                    <div className="py-2">
                      {watchCategories.map((category, index) => (
                        <Link
                          key={index}
                          to={category.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-600"
                          onClick={() => setShowCategoryDropdown(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <Link
                          to="/collection"
                          className="block px-4 py-2 text-sm font-medium text-amber-600 hover:bg-gray-50"
                          onClick={() => setShowCategoryDropdown(false)}
                        >
                          View All Watches
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <NavLink 
                to="/new-arrivals" 
                className={({isActive}) => 
                  `py-3 text-sm font-medium transition-colors relative ${isActive ? 'text-amber-600' : 'text-gray-700 hover:text-amber-600'}`
                }
              >
                NEW ARRIVALS
              </NavLink>
              
              <NavLink 
                to="/about" 
                className={({isActive}) => 
                  `py-3 text-sm font-medium transition-colors relative ${isActive ? 'text-amber-600' : 'text-gray-700 hover:text-amber-600'}`
                }
              >
                ABOUT
              </NavLink>
              
              <NavLink 
                to="/contact" 
                className={({isActive}) => 
                  `py-3 text-sm font-medium transition-colors relative ${isActive ? 'text-amber-600' : 'text-gray-700 hover:text-amber-600'}`
                }
              >
                CONTACT
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar menu */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute top-0 right-0 bottom-0 w-64 bg-white shadow-xl transition-transform duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <Link to="/" onClick={() => setVisible(false)} className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-600" />
                <span className="text-xl font-bold">Watch Lab</span>
              </Link>
              <button onClick={() => setVisible(false)} className="p-1">
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            
            <div className="py-3 px-4">
              <input 
                type="text" 
                placeholder="Search for watches..." 
                className="w-full py-2 px-4 rounded-full border border-gray-300 text-sm"
              />
            </div>
            
            <div className="flex-1 overflow-auto">
              <nav className="flex flex-col">
                <NavLink 
                  to="/" 
                  onClick={() => setVisible(false)}
                  className={({isActive}) => 
                    `py-3 px-4 border-b border-gray-100 text-sm font-medium ${isActive ? 'text-amber-600' : 'text-gray-700'}`
                  }
                >
                  HOME
                </NavLink>
                <NavLink 
                  to="/collection" 
                  onClick={() => setVisible(false)}
                  className={({isActive}) => 
                    `py-3 px-4 border-b border-gray-100 text-sm font-medium ${isActive ? 'text-amber-600' : 'text-gray-700'}`
                  }
                >
                  COLLECTION
                </NavLink>
                <NavLink 
                  to="/new-arrivals" 
                  onClick={() => setVisible(false)}
                  className={({isActive}) => 
                    `py-3 px-4 border-b border-gray-100 text-sm font-medium ${isActive ? 'text-amber-600' : 'text-gray-700'}`
                  }
                >
                  NEW ARRIVALS
                </NavLink>
                <NavLink 
                  to="/about" 
                  onClick={() => setVisible(false)}
                  className={({isActive}) => 
                    `py-3 px-4 border-b border-gray-100 text-sm font-medium ${isActive ? 'text-amber-600' : 'text-gray-700'}`
                  }
                >
                  ABOUT
                </NavLink>
                <NavLink 
                  to="/contact" 
                  onClick={() => setVisible(false)}
                  className={({isActive}) => 
                    `py-3 px-4 border-b border-gray-100 text-sm font-medium ${isActive ? 'text-amber-600' : 'text-gray-700'}`
                  }
                >
                  CONTACT
                </NavLink>
              </nav>
            </div>
            
            <div className="p-4 border-t mt-auto">
              {token ? (
                <div className="space-y-2">
                  <Link 
                    to="/orders" 
                    onClick={() => setVisible(false)}
                    className="block w-full py-2 px-4 bg-gray-100 text-gray-700 rounded text-center text-sm font-medium"
                  >
                    My Orders
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setVisible(false);
                    }}
                    className="block w-full py-2 px-4 bg-red-50 text-red-600 rounded text-center text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  onClick={() => setVisible(false)}
                  className="block w-full py-2 px-4 bg-amber-600 text-white rounded text-center text-sm font-medium"
                >
                  Log In / Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;