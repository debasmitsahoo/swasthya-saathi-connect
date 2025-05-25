-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    address TEXT,
    date_of_birth DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID NOT NULL REFERENCES patients(id),
    date DATE NOT NULL,
    time TEXT NOT NULL,
    department TEXT NOT NULL,
    doctor TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'scheduled',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    head TEXT NOT NULL,
    doctors INTEGER,
    staff INTEGER,
    patients INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    specialization TEXT NOT NULL,
    experience TEXT,
    phone TEXT,
    email TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create billing table
CREATE TABLE IF NOT EXISTS billing (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID NOT NULL REFERENCES patients(id),
    amount DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL,
    services TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    item TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity INTEGER,
    unit TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'in_stock',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert initial departments
INSERT INTO departments (name, head, doctors, staff, patients) VALUES
    ('General Medicine', 'Dr. Sharma', 8, 15, 120),
    ('Cardiology', 'Dr. Gupta', 6, 12, 95),
    ('Orthopedics', 'Dr. Singh', 5, 10, 78),
    ('Neurology', 'Dr. Kumar', 7, 14, 150),
    ('Dermatology', 'Dr. Joshi', 4, 8, 65),
    ('Gynecology', 'Dr. Shah', 6, 12, 90),
    ('Pediatrics', 'Dr. Khanna', 5, 10, 85)
ON CONFLICT (name) DO NOTHING;

-- Insert initial doctors
INSERT INTO doctors (name, specialization, experience, email, status) VALUES
    ('Dr. Sharma', 'General Medicine', '15 years', 'sharma@hospital.com', 'active'),
    ('Dr. Patel', 'General Medicine', '10 years', 'patel@hospital.com', 'active'),
    ('Dr. Gupta', 'Cardiology', '12 years', 'gupta@hospital.com', 'active'),
    ('Dr. Verma', 'Cardiology', '8 years', 'verma@hospital.com', 'active'),
    ('Dr. Singh', 'Orthopedics', '14 years', 'singh@hospital.com', 'active'),
    ('Dr. Reddy', 'Orthopedics', '11 years', 'reddy@hospital.com', 'active'),
    ('Dr. Kumar', 'Neurology', '13 years', 'kumar@hospital.com', 'active'),
    ('Dr. Mishra', 'Neurology', '9 years', 'mishra@hospital.com', 'active'),
    ('Dr. Joshi', 'Dermatology', '10 years', 'joshi@hospital.com', 'active'),
    ('Dr. Das', 'Dermatology', '7 years', 'das@hospital.com', 'active'),
    ('Dr. Shah', 'Gynecology', '12 years', 'shah@hospital.com', 'active'),
    ('Dr. Desai', 'Gynecology', '8 years', 'desai@hospital.com', 'active'),
    ('Dr. Khanna', 'Pediatrics', '11 years', 'khanna@hospital.com', 'active'),
    ('Dr. Chauhan', 'Pediatrics', '9 years', 'chauhan@hospital.com', 'active')
ON CONFLICT (email) DO NOTHING; 