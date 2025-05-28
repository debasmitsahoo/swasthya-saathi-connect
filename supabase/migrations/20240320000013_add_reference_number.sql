-- Add reference_number column to appointments table
ALTER TABLE public.appointments
ADD COLUMN IF NOT EXISTS reference_number VARCHAR(20) UNIQUE;

-- Create index for reference_number
CREATE INDEX IF NOT EXISTS idx_appointments_reference_number ON public.appointments(reference_number);

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