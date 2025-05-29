/*
  # Add admin column to profiles table

  1. Changes
    - Add is_admin boolean column to profiles table
    - Set default value to false
    - Update existing rows
*/

-- Add is_admin column to profiles table
ALTER TABLE profiles
ADD COLUMN is_admin boolean DEFAULT false;

-- Update existing rows to have is_admin set to false
UPDATE profiles
SET is_admin = false
WHERE is_admin IS NULL;