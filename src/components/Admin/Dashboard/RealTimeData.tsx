
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type DataEntity = 'appointments' | 'patients' | 'doctors' | 'departments' | 'inventory' | 'billing' | 'reports';

export interface DashboardStats {
  appointments: number;
  patients: number;
  doctors: number;
  departments: number;
  inventory: number;
  billing: number;
  reports: number;
}

export const useRealTimeData = () => {
  const [stats, setStats] = useState<DashboardStats>({
    appointments: 0,
    patients: 0,
    doctors: 0,
    departments: 0,
    inventory: 0,
    billing: 0,
    reports: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch initial data
    fetchDashboardData();

    // Set up real-time listeners
    const channel = supabase
      .channel('dashboard-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public' },
        (payload) => {
          console.log('Real-time update received:', payload);
          fetchDashboardData();
        }
      )
      .subscribe((status) => {
        console.log('Real-time subscription status:', status);
        if (status === 'SUBSCRIBED') {
          toast({
            title: 'Real-time updates active',
            description: 'Dashboard will refresh automatically when data changes',
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch counts from each table
      const [
        appointmentsResponse,
        patientsResponse,
        doctorsResponse,
        departmentsResponse,
        inventoryResponse,
        billingResponse
      ] = await Promise.all([
        supabase.from('appointments').select('id', { count: 'exact', head: true }),
        supabase.from('patients').select('id', { count: 'exact', head: true }),
        supabase.from('doctors').select('id', { count: 'exact', head: true }),
        supabase.from('departments').select('id', { count: 'exact', head: true }),
        supabase.from('inventory').select('id', { count: 'exact', head: true }),
        supabase.from('billing').select('id', { count: 'exact', head: true }),
      ]);

      // Fetch total billing amount
      const { data: billingData } = await supabase
        .from('billing')
        .select('amount');

      const totalBilling = billingData?.reduce((sum, bill) => sum + Number(bill.amount), 0) || 0;

      setStats({
        appointments: appointmentsResponse.count || 0,
        patients: patientsResponse.count || 0,
        doctors: doctorsResponse.count || 0,
        departments: departmentsResponse.count || 0,
        inventory: inventoryResponse.count || 0,
        billing: totalBilling,
        reports: 0, // This is a placeholder, you might want to create a reports table
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
      toast({
        title: 'Error',
        description: 'Failed to fetch dashboard data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchDashboardData();
    toast({
      title: 'Refreshing data',
      description: 'Dashboard data is being updated',
    });
  };

  return { stats, loading, error, refreshData };
};
