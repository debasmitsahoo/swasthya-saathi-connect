
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

// This is a placeholder function until we have real tables in Supabase
const getDummyStats = (): DashboardStats => {
  return {
    appointments: Math.floor(Math.random() * 100) + 200,
    patients: Math.floor(Math.random() * 1000) + 12000,
    doctors: Math.floor(Math.random() * 10) + 45,
    departments: 8,
    inventory: Math.floor(Math.random() * 200) + 500,
    billing: Math.floor(Math.random() * 10000) + 60000,
    reports: Math.floor(Math.random() * 50) + 100
  };
};

export const useRealTimeData = () => {
  const [stats, setStats] = useState<DashboardStats>(getDummyStats());
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
      // In a real implementation, we would fetch actual data from Supabase tables
      // For now, we'll use dummy data that changes on each refresh
      setStats(getDummyStats());
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
