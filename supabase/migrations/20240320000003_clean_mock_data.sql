-- Delete all data from tables in the correct order (respecting foreign key constraints)
DELETE FROM inventory;
DELETE FROM billing;
DELETE FROM appointments;
DELETE FROM doctors;
DELETE FROM departments;
DELETE FROM patients;

-- Reset the sequences if any
ALTER SEQUENCE IF EXISTS patients_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS appointments_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS doctors_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS departments_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS billing_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS inventory_id_seq RESTART WITH 1; 