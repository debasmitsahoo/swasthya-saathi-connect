-- Create inventory categories table
CREATE TABLE IF NOT EXISTS inventory_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    contact_person TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create inventory items table
CREATE TABLE IF NOT EXISTS inventory_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category_id UUID REFERENCES inventory_categories(id),
    supplier_id UUID REFERENCES suppliers(id),
    unit TEXT NOT NULL,
    min_stock_level INTEGER NOT NULL DEFAULT 0,
    max_stock_level INTEGER,
    current_stock INTEGER NOT NULL DEFAULT 0,
    unit_price DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create stock movements table
CREATE TABLE IF NOT EXISTS stock_movements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    item_id UUID REFERENCES inventory_items(id),
    movement_type TEXT NOT NULL CHECK (movement_type IN ('purchase', 'issue', 'return', 'adjustment')),
    quantity INTEGER NOT NULL,
    reference_number TEXT,
    notes TEXT,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE inventory_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;

-- Create policies for inventory_categories
CREATE POLICY "Enable all access for authenticated users" ON inventory_categories
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable read access for anon users" ON inventory_categories
    FOR SELECT TO anon USING (true);

-- Create policies for suppliers
CREATE POLICY "Enable all access for authenticated users" ON suppliers
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable read access for anon users" ON suppliers
    FOR SELECT TO anon USING (true);

-- Create policies for inventory_items
CREATE POLICY "Enable all access for authenticated users" ON inventory_items
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable read access for anon users" ON inventory_items
    FOR SELECT TO anon USING (true);

-- Create policies for stock_movements
CREATE POLICY "Enable all access for authenticated users" ON stock_movements
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable read access for anon users" ON stock_movements
    FOR SELECT TO anon USING (true);

-- Add some initial categories
INSERT INTO inventory_categories (name, description) VALUES
    ('Medicines', 'Pharmaceutical drugs and medications'),
    ('Medical Supplies', 'General medical supplies and equipment'),
    ('Surgical Instruments', 'Tools and instruments used in surgeries'),
    ('Laboratory Equipment', 'Equipment used in medical laboratories'),
    ('Personal Protective Equipment', 'PPE items for healthcare workers');

-- Add some initial suppliers
INSERT INTO suppliers (name, contact_person, email, phone, address) VALUES
    ('MediSupply Co.', 'John Smith', 'john@medisupply.com', '+91 9876543210', '123 Medical Street, Mumbai'),
    ('HealthTech Solutions', 'Sarah Johnson', 'sarah@healthtech.com', '+91 9876543211', '456 Healthcare Avenue, Delhi'),
    ('Surgical Equipment Ltd.', 'Michael Brown', 'michael@surgical.com', '+91 9876543212', '789 Hospital Road, Bangalore');

-- Add some initial inventory items
INSERT INTO inventory_items (name, description, category_id, supplier_id, unit, min_stock_level, max_stock_level, current_stock, unit_price) 
SELECT 
    'Paracetamol 500mg',
    'Pain relief and fever reduction tablets',
    (SELECT id FROM inventory_categories WHERE name = 'Medicines'),
    (SELECT id FROM suppliers WHERE name = 'MediSupply Co.'),
    'Tablets',
    100,
    1000,
    500,
    0.50
WHERE NOT EXISTS (
    SELECT 1 FROM inventory_items WHERE name = 'Paracetamol 500mg'
);

-- Create function to update stock levels
CREATE OR REPLACE FUNCTION update_inventory_stock()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.movement_type = 'purchase' THEN
        UPDATE inventory_items
        SET current_stock = current_stock + NEW.quantity
        WHERE id = NEW.item_id;
    ELSIF NEW.movement_type = 'issue' THEN
        UPDATE inventory_items
        SET current_stock = current_stock - NEW.quantity
        WHERE id = NEW.item_id;
    ELSIF NEW.movement_type = 'return' THEN
        UPDATE inventory_items
        SET current_stock = current_stock + NEW.quantity
        WHERE id = NEW.item_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for stock movements
CREATE TRIGGER update_stock_on_movement
    AFTER INSERT ON stock_movements
    FOR EACH ROW
    EXECUTE FUNCTION update_inventory_stock(); 