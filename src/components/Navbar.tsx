import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();
  const { state: cartState } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAccountClick = () => {
    if (user) {
      navigate('/account');
    } else {
      navigate('/auth');
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      {/* Announcement Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-black text-white py-2.5 text-center text-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span className="hidden md:flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Free shipping on orders over ₹5,000
          </span>
          <span className="md:hidden">Free shipping over ₹5,000</span>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/track-order" className="hover:text-gray-300">Track Order</Link>
            <Link to="/support" className="hover:text-gray-300">Support</Link>
          </div>
        </div>
      </motion.div>

      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Navigation */}
          <div className="h-20 flex items-center justify-between">
            <div className="flex items-center gap-12">
              <Link to="/" className="text-2xl font-bold">Shopixo</Link>
              
              <div className="hidden lg:flex items-center space-x-8">
                <div className="group relative">
                  <button className="flex items-center gap-1 text-gray-800 hover:text-black">
                    Electronics <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="absolute top-full left-0 w-48 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="py-2">
                      <Link to="/products/electronics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Headphones
                      </Link>
                      <Link to="/products/electronics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Smartphones
                      </Link>
                      <Link to="/products/electronics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Accessories
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <button className="flex items-center gap-1 text-gray-800 hover:text-black">
                    Fashion <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="absolute top-full left-0 w-48 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="py-2">
                      <Link to="/products/fashion" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Traditional Wear
                      </Link>
                      <Link to="/products/fashion" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Western Wear
                      </Link>
                      <Link to="/products/fashion" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Accessories
                      </Link>
                    </div>
                  </div>
                </div>

                <Link to="/new-arrivals" className="text-gray-800 hover:text-black">New Arrivals</Link>
                <Link to="/sale" className="text-gray-800 hover:text-black">Sale</Link>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-800 hover:text-black hidden sm:block"
              >
                <Search className="h-5 w-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={handleAccountClick}
                className="text-gray-800 hover:text-black hidden sm:block"
              >
                <User className="h-5 w-5" />
              </motion.button>
              
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link to="/wishlist" className="text-gray-800 hover:text-black hidden sm:block">
                  <Heart className="h-5 w-5" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link to="/cart" className="text-gray-800 hover:text-black relative">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartState.items.length}
                  </span>
                </Link>
              </motion.div>
              
              <motion.button 
                whileHover={{ scale: 1.1 }}
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden py-4 border-t overflow-hidden"
              >
                <div className="flex flex-col space-y-4">
                  <Link to="/products/electronics" className="text-gray-800 hover:text-black">Electronics</Link>
                  <Link to="/products/fashion" className="text-gray-800 hover:text-black">Fashion</Link>
                  <Link to="/new-arrivals" className="text-gray-800 hover:text-black">New Arrivals</Link>
                  <Link to="/sale" className="text-gray-800 hover:text-black">Sale</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-lg z-50"
          >
            <div className="max-w-3xl mx-auto relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-black text-lg"
              />
              <Search className="absolute right-3 top-3.5 h-6 w-6 text-gray-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;