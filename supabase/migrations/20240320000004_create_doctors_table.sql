-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    specialization TEXT NOT NULL,
    experience TEXT,
    phone TEXT,
    email TEXT,
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add RLS policies
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON doctors;
DROP POLICY IF EXISTS "Allow read access for anon users" ON doctors;

-- Create policy to allow all operations for authenticated users
CREATE POLICY "Enable all access for authenticated users" ON doctors
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Create policy to allow read access for anon users
CREATE POLICY "Enable read access for anon users" ON doctors
    FOR SELECT
    TO anon
    USING (true);

-- Create policy to allow insert for anon users
CREATE POLICY "Enable insert for anon users" ON doctors
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Create policy to allow update for anon users
CREATE POLICY "Enable update for anon users" ON doctors
    FOR UPDATE
    TO anon
    USING (true)
    WITH CHECK (true);

-- Create policy to allow delete for anon users
CREATE POLICY "Enable delete for anon users" ON doctors
    FOR DELETE
    TO anon
    USING (true);

-- Add some initial doctors
INSERT INTO doctors (name, specialization, experience, phone, email, status)
VALUES 
    ('Dr. John Smith', 'Cardiology', '15 years', '+91 9876543210', 'john.smith@example.com', 'Active'),
    ('Dr. Sarah Johnson', 'Neurology', '12 years', '+91 9876543211', 'sarah.johnson@example.com', 'Active'),
    ('Dr. Michael Brown', 'Orthopedics', '10 years', '+91 9876543212', 'michael.brown@example.com', 'Active'),
    ('Dr. Emily Davis', 'Pediatrics', '8 years', '+91 9876543213', 'emily.davis@example.com', 'Active'),
    ('Dr. Robert Wilson', 'Dermatology', '20 years', '+91 9876543214', 'robert.wilson@example.com', 'Active')
ON CONFLICT (id) DO NOTHING; 