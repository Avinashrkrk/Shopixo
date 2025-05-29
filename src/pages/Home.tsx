import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Instagram, ArrowRight, ShoppingBag, Star, Truck, Shield, Clock } from 'lucide-react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const FadeInSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center"
      >
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-full"
          >
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=2000"
              alt="Premium Electronics"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-full hidden md:block"
          >
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2000"
              alt="Luxury Fashion"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center md:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Premium Quality<br />Guaranteed
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-xl">
              Discover our curated collection of premium electronics and fashion items
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/products/electronics"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-black hover:bg-black hover:text-white transition-all duration-300"
              >
                Shop Electronics
                <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/products/fashion"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Explore Fashion
                <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Truck className="h-8 w-8" />,
                title: "Free Shipping",
                description: "On orders over $100"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Secure Payment",
                description: "100% secure checkout"
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Fast Delivery",
                description: "2-3 business days"
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Premium Quality",
                description: "Guaranteed authentic"
              }
            ].map((feature, index) => (
              <FadeInSection key={index} delay={index * 0.2}>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
              <p className="text-gray-600">Discover our handpicked selection of premium items</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <FadeInSection key={product.id} delay={index * 0.1}>
                <ProductCard product={product} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
              <p className="text-gray-600">Browse our collections</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeInSection delay={0.2}>
              <Link
                to="/products/electronics"
                className="group relative overflow-hidden block aspect-square"
              >
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000"
                  alt="Electronics"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Electronics</h3>
                    <span className="inline-flex items-center text-white">
                      Shop Now <ArrowRight className="h-4 w-4 ml-2" />
                    </span>
                  </div>
                </div>
              </Link>
            </FadeInSection>

            <FadeInSection delay={0.4}>
              <Link
                to="/products/fashion"
                className="group relative overflow-hidden block aspect-square"
              >
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000"
                  alt="Fashion"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Fashion</h3>
                    <span className="inline-flex items-center text-white">
                      Shop Now <ArrowRight className="h-4 w-4 ml-2" />
                    </span>
                  </div>
                </div>
              </Link>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-gray-400 mb-8">
                Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
              </p>
              <form className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-white text-black hover:bg-gray-100 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Follow Us on Instagram</h2>
              <p className="text-gray-600">@shopixo</p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <FadeInSection key={item} delay={index * 0.1}>
                <a
                  href="#"
                  className="relative aspect-square group overflow-hidden"
                >
                  <img
                    src={`https://images.unsplash.com/photo-${item}?auto=format&fit=crop&q=80&w=400`}
                    alt={`Instagram ${item}`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Instagram className="h-8 w-8 text-white" />
                  </div>
                </a>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;