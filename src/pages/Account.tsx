import React, { useState, useEffect } from 'react';
import { User, Settings, ShoppingBag, Heart, LogOut, Store, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const Account = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isSeller, setIsSeller] = useState(false);
  const [showSellerForm, setShowSellerForm] = useState(false);
  const [sellerFormData, setSellerFormData] = useState({
    businessName: '',
    businessAddress: '',
    taxId: '',
    bankAccount: ''
  });

  useEffect(() => {
    const checkSellerStatus = async () => {
      if (user) {
        const { data } = await supabase
          .from('seller_profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setIsSeller(!!data);
      }
    };
    checkSellerStatus();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleSellerRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('seller_profiles')
        .insert({
          id: user?.id,
          business_name: sellerFormData.businessName,
          business_address: sellerFormData.businessAddress,
          tax_id: sellerFormData.taxId,
          bank_account: sellerFormData.bankAccount,
          is_verified: false
        });

      if (error) throw error;

      toast.success('Seller registration submitted successfully!');
      setIsSeller(true);
      setShowSellerForm(false);
    } catch (error) {
      console.error('Error registering as seller:', error);
      toast.error('Failed to register as seller');
    }
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <User className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.email}</h2>
                <p className="text-gray-600">Member since {new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/orders">
              <button className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors w-full">
                <ShoppingBag className="h-5 w-5 text-gray-600" />
                <span>Orders</span>
              </button>
            </Link>

            <Link to="/wishlist">
              <button className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors w-full">
                <Heart className="h-5 w-5 text-gray-600" />
                <span>Wishlist</span>
              </button>
            </Link>

            <Link to="/settings">
              <button className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors w-full">
                <Settings className="h-5 w-5 text-gray-600" />
                <span>Settings</span>
              </button>
            </Link>

            {isSeller ? (
              <Link to="/seller/dashboard">
                <button className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors w-full">
                  <div className="flex items-center space-x-3">
                    <Store className="h-5 w-5 text-blue-600" />
                    <span className="text-blue-600">Seller Dashboard</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-blue-600" />
                </button>
              </Link>
            ) : (
              <button
                onClick={() => setShowSellerForm(true)}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors w-full"
              >
                <div className="flex items-center space-x-3">
                  <Store className="h-5 w-5 text-gray-600" />
                  <span>Become a Seller</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            )}

            <button
              onClick={handleSignOut}
              className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-red-50 text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Seller Registration Form */}
        {showSellerForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-2xl font-bold mb-4">Become a Seller</h2>
              <form onSubmit={handleSellerRegistration} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    required
                    value={sellerFormData.businessName}
                    onChange={(e) => setSellerFormData({ ...sellerFormData, businessName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Address
                  </label>
                  <textarea
                    required
                    value={sellerFormData.businessAddress}
                    onChange={(e) => setSellerFormData({ ...sellerFormData, businessAddress: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={sellerFormData.taxId}
                    onChange={(e) => setSellerFormData({ ...sellerFormData, taxId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Account (Optional)
                  </label>
                  <input
                    type="text"
                    value={sellerFormData.bankAccount}
                    onChange={(e) => setSellerFormData({ ...sellerFormData, bankAccount: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowSellerForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Account;