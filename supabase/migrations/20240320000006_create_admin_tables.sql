-- Drop existing tables if they exist
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS stock_movements CASCADE;
DROP TABLE IF EXISTS inventory_items CASCADE;
DROP TABLE IF EXISTS suppliers CASCADE;
DROP TABLE IF EXISTS inventory_categories CASCADE;
DROP TABLE IF EXISTS billing CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS patients CASCADE;
DROP TABLE IF EXISTS departments CASCADE;

-- Create departments table
CREATE TABLE departments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    head_doctor_id UUID REFERENCES doctors(id),
    staff_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create patients table
CREATE TABLE patients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    date_of_birth DATE,
    gender VARCHAR(10),
    blood_group VARCHAR(5),
    medical_history TEXT,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create appointments table
CREATE TABLE appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID REFERENCES patients(id) NOT NULL,
    doctor_id UUID REFERENCES doctors(id) NOT NULL,
    department_id UUID REFERENCES departments(id) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'Scheduled',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create billing table
CREATE TABLE billing (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID REFERENCES patients(id) NOT NULL,
    appointment_id UUID REFERENCES appointments(id),
    amount DECIMAL(10,2) NOT NULL,
    services TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending',
    payment_method VARCHAR(50),
    payment_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create inventory_categories table
CREATE TABLE inventory_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create suppliers table
CREATE TABLE suppliers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create inventory_items table
CREATE TABLE inventory_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id UUID REFERENCES inventory_categories(id),
    supplier_id UUID REFERENCES suppliers(id),
    unit VARCHAR(50) NOT NULL,
    current_stock INTEGER DEFAULT 0,
    minimum_stock INTEGER DEFAULT 0,
    price DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create stock_movements table
CREATE TABLE stock_movements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    item_id UUID REFERENCES inventory_items(id) NOT NULL,
    movement_type VARCHAR(20) NOT NULL, -- 'IN' or 'OUT'
    quantity INTEGER NOT NULL,
    reference_number VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create reports table
CREATE TABLE reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content JSONB NOT NULL,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable read access for all users" ON departments;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON departments;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON departments;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON departments;

DROP POLICY IF EXISTS "Enable read access for all users" ON patients;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON patients;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON patients;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON patients;

DROP POLICY IF EXISTS "Enable read access for all users" ON appointments;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON appointments;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON appointments;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON appointments;

DROP POLICY IF EXISTS "Enable read access for all users" ON billing;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON billing;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON billing;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON billing;

DROP POLICY IF EXISTS "Enable read access for all users" ON inventory_categories;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON inventory_categories;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON inventory_categories;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON inventory_categories;

DROP POLICY IF EXISTS "Enable read access for all users" ON suppliers;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON suppliers;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON suppliers;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON suppliers;

DROP POLICY IF EXISTS "Enable read access for all users" ON inventory_items;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON inventory_items;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON inventory_items;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON inventory_items;

DROP POLICY IF EXISTS "Enable read access for all users" ON stock_movements;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON stock_movements;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON stock_movements;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON stock_movements;

DROP POLICY IF EXISTS "Enable read access for all users" ON reports;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON reports;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON reports;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON reports;

-- Enable Row Level Security
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- Departments
CREATE POLICY "Enable read access for all users" ON departments
    FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON departments
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON departments
    FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON departments
    FOR DELETE USING (auth.role() = 'authenticated');

-- Patients
CREATE POLICY "Enable read access for all users" ON patients
    FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON patients
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON patients
    FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON patients
    FOR DELETE USING (auth.role() = 'authenticated');

-- Appointments
CREATE POLICY "Enable read access for all users" ON appointments
    FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON appointments
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON appointments
    FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON appointments
    FOR DELETE USING (auth.role() = 'authenticated');

-- Billing
CREATE POLICY "Enable read access for all users" ON billing
    FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON billing
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON billing
    FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON billing
    FOR DELETE USING (auth.role() = 'authenticated');

-- Inventory Categories
CREATE POLICY "Enable read access for all users" ON inventory_categories
    FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON inventory_categories
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON inventory_categories
    FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON inventory_categories
    FOR DELETE USING (auth.role() = 'authenticated');

-- Suppliers
CREATE POLICY "Enable read access for all users" ON suppliers
    FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON suppliers
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON suppliers
    FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON suppliers
    FOR DELETE USING (auth.role() = 'authenticated');

-- Inventory Items
CREATE POLICY "Enable read access for all users" ON inventory_items
    FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON inventory_items
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON inventory_items
    FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON inventory_items
    FOR DELETE USING (auth.role() = 'authenticated');

-- Stock Movements
CREATE POLICY "Enable read access for all users" ON stock_movements
    FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON stock_movements
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON stock_movements
    FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON stock_movements
    FOR DELETE USING (auth.role() = 'authenticated');

-- Reports
CREATE POLICY "Enable read access for all users" ON reports
    FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON reports
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON reports
    FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON reports
    FOR DELETE USING (auth.role() = 'authenticated');

-- Drop existing function and trigger if they exist
DROP TRIGGER IF EXISTS stock_movement_trigger ON stock_movements;
DROP FUNCTION IF EXISTS update_stock_levels();

-- Create function to update stock levels
CREATE OR REPLACE FUNCTION update_stock_levels()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.movement_type = 'IN' THEN
        UPDATE inventory_items
        SET current_stock = current_stock + NEW.quantity,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = NEW.item_id;
    ELSIF NEW.movement_type = 'OUT' THEN
        UPDATE inventory_items
        SET current_stock = current_stock - NEW.quantity,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = NEW.item_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for stock movements
CREATE TRIGGER stock_movement_trigger
    AFTER INSERT ON stock_movements
    FOR EACH ROW
    EXECUTE FUNCTION update_stock_levels();

-- Insert initial data
INSERT INTO departments (name, description) VALUES
    ('Cardiology', 'Heart and cardiovascular care'),
    ('Neurology', 'Brain and nervous system care'),
    ('Orthopedics', 'Bone and joint care'),
    ('Pediatrics', 'Child healthcare'),
    ('Dermatology', 'Skin care and treatment');

INSERT INTO inventory_categories (name, description) VALUES
    ('Medications', 'Pharmaceutical drugs and medicines'),
    ('Medical Supplies', 'General medical supplies and equipment'),
    ('Surgical Instruments', 'Tools and instruments for surgical procedures'),
    ('Diagnostic Equipment', 'Equipment for medical diagnosis'),
    ('Personal Protective Equipment', 'PPE and safety equipment');

INSERT INTO suppliers (name, contact_person, email, phone) VALUES
    ('MedSupply Co.', 'John Smith', 'john@medsupply.com', '+1-555-0123'),
    ('HealthTech Inc.', 'Sarah Johnson', 'sarah@healthtech.com', '+1-555-0124'),
    ('MedEquip Ltd.', 'Mike Brown', 'mike@medequip.com', '+1-555-0125'),
    ('PharmaCorp', 'Lisa Davis', 'lisa@pharmacorp.com', '+1-555-0126'),
    ('SafetyFirst Medical', 'Tom Wilson', 'tom@safetyfirst.com', '+1-555-0127'); 