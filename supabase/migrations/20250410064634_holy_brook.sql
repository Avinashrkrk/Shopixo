/*
  # Fix Profile RLS Policies

  1. Changes
    - Add RLS policies for profile creation and management
    - Enable authenticated users to create their own profiles
    - Allow users to update their own profiles
    - Ensure users can only access their own profile data

  2. Security
    - Maintain strict RLS enforcement
    - Only allow users to manage their own profiles
    - Prevent unauthorized access to profile data
*/

-- Enable RLS on profiles table (if not already enabled)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can create own profile" ON profiles;

-- Create comprehensive RLS policies
CREATE POLICY "Users can create own profile"
ON profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);