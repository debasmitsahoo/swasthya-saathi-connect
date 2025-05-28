-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.appointments CASCADE;
DROP TABLE IF EXISTS public.patients CASCADE;
DROP TABLE IF EXISTS public.doctors CASCADE;
DROP TABLE IF EXISTS public.departments CASCADE;

-- Create departments table
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    staff_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create doctors table
CREATE TABLE IF NOT EXISTS public.doctors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    experience VARCHAR(50),
    phone VARCHAR(20),
    email VARCHAR(255) UNIQUE,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create patients table
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    gender VARCHAR(10),
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID NOT NULL REFERENCES public.patients(id),
    doctor_id UUID NOT NULL REFERENCES public.doctors(id),
    department_id UUID NOT NULL REFERENCES public.departments(id),
    date DATE NOT NULL,
    time TIME NOT NULL,
    status VARCHAR(50) DEFAULT 'Scheduled',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON public.appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON public.appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_department_id ON public.appointments(department_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(date);

-- Enable RLS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for appointments
DROP POLICY IF EXISTS "Enable read access for all users" ON public.appointments;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.appointments;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.appointments;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.appointments;

CREATE POLICY "Enable read access for all users" ON public.appointments
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON public.appointments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON public.appointments
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON public.appointments
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create RLS policies for patients
DROP POLICY IF EXISTS "Enable read access for all users" ON public.patients;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.patients;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.patients;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.patients;

CREATE POLICY "Enable read access for all users" ON public.patients
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON public.patients
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON public.patients
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON public.patients
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create RLS policies for doctors
DROP POLICY IF EXISTS "Enable read access for all users" ON public.doctors;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.doctors;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.doctors;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.doctors;

CREATE POLICY "Enable read access for all users" ON public.doctors
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON public.doctors
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON public.doctors
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON public.doctors
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create RLS policies for departments
DROP POLICY IF EXISTS "Enable read access for all users" ON public.departments;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.departments;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.departments;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.departments;

CREATE POLICY "Enable read access for all users" ON public.departments
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON public.departments
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON public.departments
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON public.departments
    FOR DELETE USING (auth.role() = 'authenticated');

-- Grant permissions
GRANT ALL ON public.appointments TO authenticated;
GRANT ALL ON public.appointments TO anon;
GRANT ALL ON public.patients TO authenticated;
GRANT ALL ON public.patients TO anon;
GRANT ALL ON public.doctors TO authenticated;
GRANT ALL ON public.doctors TO anon;
GRANT ALL ON public.departments TO authenticated;
GRANT ALL ON public.departments TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO anon; 