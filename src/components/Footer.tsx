import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Truck, CreditCard, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Shopixo</h2>
            <p className="text-gray-600">
              Premium quality electronics and fashion items for the discerning customer.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-black">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">SHOP</h3>
            <ul className="space-y-2">
              <li><Link to="/new-arrivals" className="text-gray-600 hover:text-black">New Arrivals</Link></li>
              <li><Link to="/best-sellers" className="text-gray-600 hover:text-black">Best Sellers</Link></li>
              <li><Link to="/sale" className="text-gray-600 hover:text-black">Sale</Link></li>
              <li><Link to="/gift-cards" className="text-gray-600 hover:text-black">Gift Cards</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold mb-4">CUSTOMER SERVICE</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-600 hover:text-black">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-gray-600 hover:text-black">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-gray-600 hover:text-black">Returns & Exchanges</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-black">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4">CONTACT US</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-600" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-600" />
                <span className="text-gray-600">support@shopixo.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-gray-600" />
                <span className="text-gray-600">Free shipping on orders over $100</span>
              </li>
              <li className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-gray-600" />
                <span className="text-gray-600">Secure payments</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-gray-600 text-sm">
            <p>© {new Date().getFullYear()} Shopixo. All rights reserved.</p>
          </div>
          <div className="flex gap-4 text-sm justify-start md:justify-end">
            <Link to="/privacy" className="text-gray-600 hover:text-black">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-600 hover:text-black">Terms of Service</Link>
            <Link to="/sitemap" className="text-gray-600 hover:text-black">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;