import React from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative group">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleWishlist}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            inWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
          } hover:scale-110 transition-transform`}
        >
          <Heart className="h-5 w-5" />
        </button>
        {product.discount > 0 && (
          <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
            {product.discount}% off
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 hover:text-blue-500 cursor-pointer">
          {product.name}
        </h3>
        
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center bg-green-500 text-white px-2 py-0.5 rounded text-sm">
            <span className="font-medium">{product.rating}</span>
            <Star className="h-4 w-4 ml-1 fill-current" />
          </div>
          <span className="text-gray-500 text-sm">({product.reviews})</span>
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.discount > 0 && (
              <span className="text-gray-500 line-through text-sm">
                {formatPrice(product.mrp)}
              </span>
            )}
          </div>
          {product.delivery_time && (
            <p className="text-sm text-gray-600 mt-1">
              Delivery in {product.delivery_time}
            </p>
          )}
        </div>

        <div className="mt-4">
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;