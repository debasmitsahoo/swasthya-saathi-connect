-- Drop all tables in the correct order (respecting foreign key constraints)
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS billing CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS doctors CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS patients CASCADE; 