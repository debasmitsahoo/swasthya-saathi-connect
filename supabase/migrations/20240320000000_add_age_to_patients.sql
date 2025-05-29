-- Add age column to patients table
ALTER TABLE patients
ADD COLUMN age INTEGER;

-- Add comment to the column
COMMENT ON COLUMN patients.age IS 'Patient age in years'; 