/*
  # Fix addresses table RLS policies

  1. Changes
    - Update RLS policies for addresses table to properly handle user_id

  2. Security
    - Enable RLS on addresses table
    - Add policies for authenticated users to:
      - Insert addresses with their own user_id
      - Update their own addresses
      - Delete their own addresses
      - Select their own addresses
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'addresses'
  ) THEN
    DROP POLICY IF EXISTS "Users can create own addresses" ON addresses;
    DROP POLICY IF EXISTS "Users can update own addresses" ON addresses;
    DROP POLICY IF EXISTS "Users can delete own addresses" ON addresses;
    DROP POLICY IF EXISTS "Users can view own addresses" ON addresses;
  END IF;
END $$;

-- Create new policies
CREATE POLICY "Users can create own addresses"
ON addresses FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses"
ON addresses FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses"
ON addresses FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can view own addresses"
ON addresses FOR SELECT
TO authenticated
USING (auth.uid() = user_id);