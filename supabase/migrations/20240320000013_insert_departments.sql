-- Insert departments with specific IDs to match frontend
INSERT INTO public.departments (id, name, description, staff_count)
VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'General Medicine', 'General medical care and consultations', 10),
    ('550e8400-e29b-41d4-a716-446655440001', 'Cardiology', 'Heart and cardiovascular care', 8),
    ('550e8400-e29b-41d4-a716-446655440002', 'Orthopedics', 'Bone and joint care', 6),
    ('550e8400-e29b-41d4-a716-446655440003', 'Neurology', 'Brain and nervous system care', 7),
    ('550e8400-e29b-41d4-a716-446655440004', 'Dermatology', 'Skin care and treatments', 5),
    ('550e8400-e29b-41d4-a716-446655440005', 'Gynecology', 'Women''s health care', 6),
    ('550e8400-e29b-41d4-a716-446655440006', 'Pediatrics', 'Child health care', 8)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    staff_count = EXCLUDED.staff_count,
    updated_at = CURRENT_TIMESTAMP; 