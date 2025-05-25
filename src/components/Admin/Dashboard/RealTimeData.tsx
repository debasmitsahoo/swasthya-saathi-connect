import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type DataEntity = 'patients' | 'doctors' | 'appointments' | 'departments' | 'inventory' | 'billing' | 'reports';

interface DashboardStats {
  patients: number;
  appointments: number;
  doctors: number;
  revenue: number;
}

export const useRealTimeData = () => {
  const [stats, setStats] = useState<DashboardStats>({
    patients: 0,
    appointments: 0,
    doctors: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch patients count
      const { count: patientsCount, error: patientsError } = await supabase
        .from('patients')
        .select('*', { count: 'exact', head: true });

      if (patientsError) throw patientsError;

      // Fetch appointments count for today
      const today = new Date().toISOString().split('T')[0];
      const { count: appointmentsCount, error: appointmentsError } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true })
        .eq('date', today);

      if (appointmentsError) throw appointmentsError;

      // Fetch doctors count
      const { count: doctorsCount, error: doctorsError } = await supabase
        .from('doctors')
        .select('*', { count: 'exact', head: true });

      if (doctorsError) throw doctorsError;

      // Fetch total revenue for the current month
      const firstDayOfMonth = new Date();
      firstDayOfMonth.setDate(1);
      firstDayOfMonth.setHours(0, 0, 0, 0);

      const { data: billingData, error: billingError } = await supabase
        .from('billing')
        .select('amount')
        .gte('created_at', firstDayOfMonth.toISOString())
        .eq('status', 'Paid');

      if (billingError) throw billingError;

      const totalRevenue = billingData?.reduce((sum, bill) => sum + (bill.amount || 0), 0) || 0;

      setStats({
        patients: patientsCount || 0,
        appointments: appointmentsCount || 0,
        doctors: doctorsCount || 0,
        revenue: totalRevenue
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to fetch dashboard statistics');
      toast.error('Failed to fetch dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    let mounted = true;

    const setupSubscriptions = async () => {
      try {
        // Subscribe to patients table changes
        const patientsSubscription = supabase
          .channel('patients-changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'patients'
            },
            (payload) => {
              console.log('Patients change received:', payload);
              if (mounted) {
                fetchStats();
              }
            }
          )
          .subscribe((status) => {
            console.log('Patients subscription status:', status);
          });

        // Subscribe to appointments table changes
        const appointmentsSubscription = supabase
          .channel('appointments-changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'appointments'
            },
            (payload) => {
              console.log('Appointments change received:', payload);
              if (mounted) {
                fetchStats();
              }
            }
          )
          .subscribe((status) => {
            console.log('Appointments subscription status:', status);
          });

        // Subscribe to doctors table changes
        const doctorsSubscription = supabase
          .channel('doctors-changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'doctors'
            },
            (payload) => {
              console.log('Doctors change received:', payload);
              if (mounted) {
                fetchStats();
              }
            }
          )
          .subscribe((status) => {
            console.log('Doctors subscription status:', status);
          });

        // Subscribe to billing table changes
        const billingSubscription = supabase
          .channel('billing-changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'billing'
            },
            (payload) => {
              console.log('Billing change received:', payload);
              if (mounted) {
                fetchStats();
              }
            }
          )
          .subscribe((status) => {
            console.log('Billing subscription status:', status);
          });

        // Initial fetch
        if (mounted) {
          await fetchStats();
        }

        // Cleanup function
        return () => {
          mounted = false;
          patientsSubscription.unsubscribe();
          appointmentsSubscription.unsubscribe();
          doctorsSubscription.unsubscribe();
          billingSubscription.unsubscribe();
        };
      } catch (err) {
        console.error('Error setting up subscriptions:', err);
        toast.error('Failed to set up real-time updates');
        return () => {
          mounted = false;
        };
      }
    };

    setupSubscriptions();
  }, []);

  const refreshData = () => {
    setLoading(true);
    fetchStats();
  };

  return {
    stats,
    loading,
    error,
    refreshData
  };
};
