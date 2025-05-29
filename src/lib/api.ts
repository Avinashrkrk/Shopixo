import { supabase } from './supabase';
import { Product, DeliveryAddress, Review } from '../types';

// Profile API
export const getProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Profile doesn't exist, create it
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert({ id: user.id })
        .select()
        .single();

      if (createError) throw createError;
      return newProfile;
    }
    throw error;
  }

  return data;
};

export const updateProfile = async (updates: Partial<Profile>) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Address API
export const getAddresses = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', user.id)
    .order('is_default', { ascending: false });

  if (error) throw error;
  return data;
};

export const addAddress = async (address: Omit<DeliveryAddress, 'id' | 'user_id'>) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('addresses')
    .insert({
      ...address,
      user_id: user.id
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateAddress = async (id: string, updates: Partial<DeliveryAddress>) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Remove user_id from updates to prevent unauthorized modifications
  const { user_id, id: addressId, ...safeUpdates } = updates;

  const { data, error } = await supabase
    .from('addresses')
    .update(safeUpdates)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteAddress = async (id: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('addresses')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;
};

// Orders API
export const getOrders = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        product:products (*)
      ),
      address:addresses (*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getOrderById = async (orderId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        product:products (*)
      ),
      address:addresses (*)
    `)
    .eq('id', orderId)
    .eq('user_id', user.id)
    .single();

  if (error) throw error;
  return data;
};

export const createOrder = async (orderData: {
  address_id: string;
  items: { product_id: string; quantity: number; price: number }[];
  payment_method: string;
  subtotal: number;
  shipping_fee: number;
  total: number;
}) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      ...orderData,
      user_id: user.id,
      status: 'pending',
      payment_status: 'pending'
    })
    .select()
    .single();

  if (orderError) throw orderError;

  const orderItems = orderData.items.map(item => ({
    order_id: order.id,
    ...item,
    total: item.price * item.quantity
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return order;
};

// Reviews API
export const getProductReviews = async (productId: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      user:profiles (
        full_name,
        avatar_url
      )
    `)
    .eq('product_id', productId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const addReview = async (review: {
  product_id: string;
  rating: number;
  comment: string;
}) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('reviews')
    .insert({
      ...review,
      user_id: user.id
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateReview = async (
  reviewId: string,
  updates: { rating?: number; comment?: string }
) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('reviews')
    .update(updates)
    .eq('id', reviewId)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteReview = async (reviewId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId)
    .eq('user_id', user.id);

  if (error) throw error;
};

// Wishlist API
export const getWishlist = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('wishlists')
    .select(`
      *,
      product:products (*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const addToWishlist = async (productId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('wishlists')
    .insert({ 
      user_id: user.id,
      product_id: productId 
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const removeFromWishlist = async (productId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('wishlists')
    .delete()
    .eq('product_id', productId)
    .eq('user_id', user.id);

  if (error) throw error;
};

// Search API
export const searchProducts = async (query: string) => {
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      images:product_images(*)
    `)
    .or(`
      name.ilike.%${query}%,
      description.ilike.%${query}%,
      seller.ilike.%${query}%
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return products;
};

// Categories API
export const getCategories = async () => {
  const { data: categories, error } = await supabase
    .from('product_categories')
    .select('*')
    .is('parent_id', null)
    .order('name');

  if (error) throw error;
  return categories;
};

export const getSubcategories = async (categoryId: string) => {
  const { data: subcategories, error } = await supabase
    .from('product_categories')
    .select('*')
    .eq('parent_id', categoryId)
    .order('name');

  if (error) throw error;
  return subcategories;
};

// Product API
export const getProducts = async (options: {
  category?: string;
  subcategory?: string;
  sort?: 'price-asc' | 'price-desc' | 'newest';
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}) => {
  let query = supabase
    .from('products')
    .select('*');

  if (options.category) {
    query = query.eq('category', options.category);
  }

  if (options.subcategory) {
    query = query.eq('subcategory', options.subcategory);
  }

  if (options.minPrice !== undefined) {
    query = query.gte('price', options.minPrice);
  }

  if (options.maxPrice !== undefined) {
    query = query.lte('price', options.maxPrice);
  }

  if (options.inStock) {
    query = query.gt('stock', 0);
  }

  switch (options.sort) {
    case 'price-asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price-desc':
      query = query.order('price', { ascending: false });
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
};

export const getProductById = async (productId: string) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      reviews (
        *,
        user:profiles (
          full_name,
          avatar_url
        )
      )
    `)
    .eq('id', productId)
    .single();

  if (error) throw error;
  return data;
};