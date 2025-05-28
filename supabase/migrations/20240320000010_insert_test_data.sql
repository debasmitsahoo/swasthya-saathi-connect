-- Insert test departments
INSERT INTO public.departments (id, name, description, staff_count)
VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'General Medicine', 'General medical care and consultations', 10),
  ('550e8400-e29b-41d4-a716-446655440001', 'Cardiology', 'Heart and cardiovascular care', 8),
  ('550e8400-e29b-41d4-a716-446655440002', 'Orthopedics', 'Bone and joint care', 6),
  ('550e8400-e29b-41d4-a716-446655440003', 'Neurology', 'Brain and nervous system care', 7),
  ('550e8400-e29b-41d4-a716-446655440004', 'Dermatology', 'Skin care and treatments', 5),
  ('550e8400-e29b-41d4-a716-446655440005', 'Gynecology', 'Women''s health care', 6),
  ('550e8400-e29b-41d4-a716-446655440006', 'Pediatrics', 'Child health care', 8)
ON CONFLICT (id) DO NOTHING;

-- Insert test doctors
INSERT INTO public.doctors (id, name, specialization, experience, phone, email, status)
VALUES
  ('660e8400-e29b-41d4-a716-446655440000', 'Dr. Sharma', 'General Medicine', '15 years', '+1234567890', 'sharma@hospital.com', 'Active'),
  ('660e8400-e29b-41d4-a716-446655440001', 'Dr. Patel', 'General Medicine', '10 years', '+1234567891', 'patel@hospital.com', 'Active'),
  ('660e8400-e29b-41d4-a716-446655440002', 'Dr. Gupta', 'Cardiology', '20 years', '+1234567892', 'gupta@hospital.com', 'Active'),
  ('660e8400-e29b-41d4-a716-446655440003', 'Dr. Verma', 'Cardiology', '12 years', '+1234567893', 'verma@hospital.com', 'Active'),
  ('660e8400-e29b-41d4-a716-446655440004', 'Dr. Singh', 'Orthopedics', '18 years', '+1234567894', 'singh@hospital.com', 'Active'),
  ('660e8400-e29b-41d4-a716-446655440005', 'Dr. Reddy', 'Orthopedics', '14 years', '+1234567895', 'reddy@hospital.com', 'Active'),
  ('660e8400-e29b-41d4-a716-446655440006', 'Dr. Kumar', 'Neurology', '16 years', '+1234567896', 'kumar@hospital.com', 'Active'),
  ('660e8400-e29b-41d4-a716-446655440007', 'Dr. Mishra', 'Neurology', '11 years', '+1234567897', 'mishra@hospital.com', 'Active'),
  ('660e8400-e29b-41d4-a716-446655440008', 'Dr. Joshi', 'Dermatology', '13 years', '+1234567898', 'joshi@hospital.com', 'Active'),
  ('660e8400-e29b-41d4-a716-446655440009', 'Dr. Das', 'Dermatology', '9 years', '+1234567899', 'das@hospital.com', 'Active'),
  ('660e8400-e29b-41d4-a716-446655440010', 'Dr. Shah', 'Gynecology', '17 years', '+1234567800', 'shah@hospital.com', 'Active'),
  ('660e8400-e29b-41d4-a716-446655440011', 'Dr. Desai', 'Gynecology', '12 years', '+1234567801', 'desai@hospital.com', 'Active'),
  ('660e8400-e29b-41d4-a716-446655440012', 'Dr. Khanna', 'Pediatrics', '15 years', '+1234567802', 'khanna@hospital.com', 'Active'),
  ('660e8400-e29b-41d4-a716-446655440013', 'Dr. Chauhan', 'Pediatrics', '10 years', '+1234567803', 'chauhan@hospital.com', 'Active')
ON CONFLICT (id) DO NOTHING; 