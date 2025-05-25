import { supabase } from './client';
import { toast } from 'sonner';

export const initializeDatabase = async () => {
  try {
    // Check if patients table exists
    const { error: patientsError } = await supabase
      .from('patients')
      .select('id')
      .limit(1);

    if (patientsError) {
      console.error('Patients table not found:', patientsError);
      toast.error('Database tables not initialized. Please run the migrations first.');
      return false;
    }

    // Check if appointments table exists
    const { error: appointmentsError } = await supabase
      .from('appointments')
      .select('id')
      .limit(1);

    if (appointmentsError) {
      console.error('Appointments table not found:', appointmentsError);
      toast.error('Database tables not initialized. Please run the migrations first.');
      return false;
    }

    // Check if doctors table exists
    const { error: doctorsError } = await supabase
      .from('doctors')
      .select('id')
      .limit(1);

    if (doctorsError) {
      console.error('Doctors table not found:', doctorsError);
      toast.error('Database tables not initialized. Please run the migrations first.');
      return false;
    }

    // Check if billing table exists
    const { error: billingError } = await supabase
      .from('billing')
      .select('id')
      .limit(1);

    if (billingError) {
      console.error('Billing table not found:', billingError);
      toast.error('Database tables not initialized. Please run the migrations first.');
      return false;
    }

    console.log('All required tables exist');
    return true;
  } catch (err) {
    console.error('Database initialization failed:', err);
    toast.error('Failed to initialize database');
    return false;
  }
}; 