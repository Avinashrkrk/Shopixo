import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Shield, Truck, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find(p => p.id === productId);
  const { dispatch } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="sticky top-24"
        >
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 cursor-pointer hover:border-blue-500 transition-colors"
              >
                <img
                  src={product.image_url}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-2 text-gray-600">{product.description}</p>
            
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center bg-green-500 text-white px-3 py-1 rounded-lg">
                <span className="font-medium">{product.rating}</span>
                <Star className="h-5 w-5 ml-1 fill-current" />
              </div>
              <span className="text-gray-500">
                {product.reviews.toLocaleString()} ratings
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.discount > 0 && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.mrp)}
                  </span>
                  <span className="text-green-500 font-medium">
                    {product.discount}% off
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-500">
              inclusive of all taxes
            </p>
          </div>

          {/* Delivery and Offers */}
          <div className="space-y-4 border-y py-4">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">Free Delivery</p>
                <p className="text-sm text-gray-500">Delivery in {product.delivery_time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">{product.warranty}</p>
                <p className="text-sm text-gray-500">Know More</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">7 Days Replacement</p>
                <p className="text-sm text-gray-500">Easy returns & exchange</p>
              </div>
            </div>
          </div>

          {/* Seller Info */}
          <div>
            <p className="text-gray-500">
              Sold by <span className="text-blue-500 font-medium">{product.seller}</span>
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Highlights</h3>
            <ul className="list-disc list-inside space-y-1">
              {product.highlights.map((highlight, index) => (
                <li key={index} className="text-gray-600">{highlight}</li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              Add to Cart
            </button>
            <button
              onClick={handleWishlist}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                inWishlist
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Heart className="h-5 w-5" />
              {inWishlist ? 'Wishlisted' : 'Wishlist'}
            </button>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Specifications</h3>
            {Object.entries(product.specifications).map(([category, specs]) => (
              <div key={category} className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">{category}</h4>
                <ul className="space-y-2">
                  {specs.map((spec, index) => (
                    <li key={index} className="text-gray-600 flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;