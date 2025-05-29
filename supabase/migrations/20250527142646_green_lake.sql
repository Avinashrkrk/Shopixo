/*
  # Add User and Seller Management Tables

  1. New Tables
    - `seller_profiles`
      - Extends profiles with seller-specific information
      - Stores KYC and business details
    
    - `product_variants`
      - Product variations (size, color, etc.)
      - Links to main product
    
  2. Changes
    - Add new columns to existing tables
    - Update existing relationships
    
  3. Security
    - Enable RLS on new tables
    - Add policies for sellers
*/

-- Create seller_profiles table
CREATE TABLE IF NOT EXISTS seller_profiles (
  id uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  business_name text NOT NULL,
  business_address text NOT NULL,
  tax_id text,
  bank_account text,
  is_verified boolean DEFAULT false,
  verification_documents jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create product_variants table
CREATE TABLE IF NOT EXISTS product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  name text NOT NULL,
  sku text UNIQUE,
  price numeric NOT NULL CHECK (price >= 0),
  stock integer NOT NULL DEFAULT 0,
  attributes jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add seller_id to products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS seller_id uuid REFERENCES seller_profiles(id);

-- Enable RLS
ALTER TABLE seller_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

-- Seller profiles policies
CREATE POLICY "Users can view own seller profile"
  ON seller_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own seller profile"
  ON seller_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Product variants policies
CREATE POLICY "Anyone can view product variants"
  ON product_variants FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Sellers can manage own product variants"
  ON product_variants FOR ALL
  TO authenticated
  USING (
    product_id IN (
      SELECT id FROM products 
      WHERE seller_id = auth.uid()
    )
  )
  WITH CHECK (
    product_id IN (
      SELECT id FROM products 
      WHERE seller_id = auth.uid()
    )
  );

-- Update products policies for sellers
CREATE POLICY "Sellers can manage own products"
  ON products FOR ALL
  TO authenticated
  USING (seller_id = auth.uid())
  WITH CHECK (seller_id = auth.uid());

-- Add updated_at triggers
CREATE TRIGGER update_seller_profiles_updated_at
  BEFORE UPDATE ON seller_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_variants_updated_at
  BEFORE UPDATE ON product_variants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();