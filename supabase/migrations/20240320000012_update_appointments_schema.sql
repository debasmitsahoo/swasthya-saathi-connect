-- Drop existing appointments table and related objects
DROP TABLE IF EXISTS public.appointments CASCADE;

-- Recreate appointments table with enhanced schema
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID NOT NULL REFERENCES public.patients(id),
    doctor_id UUID NOT NULL REFERENCES public.doctors(id),
    department_id UUID NOT NULL REFERENCES public.departments(id),
    date DATE NOT NULL,
    time TIME NOT NULL,
    status VARCHAR(50) DEFAULT 'Scheduled',
    notes TEXT,
    reference_number VARCHAR(20) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for appointments
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON public.appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON public.appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_department_id ON public.appointments(department_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_reference_number ON public.appointments(reference_number);

-- Enable RLS on appointments
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

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

-- Grant permissions for appointments
GRANT ALL ON public.appointments TO authenticated;
GRANT ALL ON public.appointments TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;

-- Create view for admin dashboard
CREATE OR REPLACE VIEW public.appointments_dashboard AS
SELECT 
    a.id,
    a.reference_number,
    a.date,
    a.time,
    a.status,
    a.notes,
    a.created_at,
    p.first_name || ' ' || p.last_name as patient_name,
    p.email as patient_email,
    p.phone as patient_phone,
    d.name as doctor_name,
    d.specialization as doctor_specialization,
    dep.name as department_name
FROM 
    public.appointments a
    LEFT JOIN public.patients p ON a.patient_id = p.id
    LEFT JOIN public.doctors d ON a.doctor_id = d.id
    LEFT JOIN public.departments dep ON a.department_id = dep.id;

-- Grant access to the view
GRANT SELECT ON public.appointments_dashboard TO authenticated;
GRANT SELECT ON public.appointments_dashboard TO anon; 