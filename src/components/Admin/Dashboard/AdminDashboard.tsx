import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Header from "./Header";
import { useRealTimeData, DataEntity } from "./RealTimeData";
import DataTable from "./DataTable";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { 
  RefreshCw, 
  UserPlus, 
  Plus, 
  Package, 
  Users, 
  Stethoscope, 
  Building2, 
  ClipboardList,
  DollarSign,
  FileText,
  Settings,
  Bell,
  Search,
  Calendar
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { initializeDatabase } from '@/integrations/supabase/init';
import { testDatabaseConnection } from '@/integrations/supabase/client';

export interface Column {
  key: string;
  label: string;
  render?: (item: any) => React.ReactNode;
}

interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  department_id: string;
  date: string;
  time: string;
  status: string;
  patient: {
    first_name: string;
    last_name: string;
  };
  doctor: {
    name: string;
  };
  department: {
    name: string;
  };
}

interface DashboardStats {
  patients: number;
  appointments: number;
  doctors: number;
  revenue: number;
}

const appointmentColumns: Column[] = [
  { key: 'reference_number', label: 'Reference' },
  { key: 'patient_name', label: 'Patient' },
  { key: 'doctor_name', label: 'Doctor' },
  { key: 'department_name', label: 'Department' },
  { key: 'date', label: 'Date' },
  { key: 'time', label: 'Time' },
  { key: 'status', label: 'Status' },
];

// Add type for database response
interface AppointmentResponse {
  id: string;
  reference_number: string;
  patient_id: string;
  doctor_id: string;
  department_id: string;
  date: string;
  time: string;
  status: string;
  notes: string | null;
  patient: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  } | null;
  doctor: {
    name: string;
    specialization: string;
  } | null;
  department: {
    name: string;
  } | null;
}

// Add type for appointment insert
interface AppointmentInsert {
  patient_id: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  status: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

// Update the Patient interface to match the database schema
interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  appointments?: {
    id: string;
    date: string;
    time: string;
    status: string;
    doctor?: {
      name: string;
      specialization: string;
    };
    department?: {
      name: string;
    };
  }[];
}

const AdminDashboard = () => {
  const { stats, loading, error, refreshData } = useRealTimeData();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DataEntity | 'dashboard'>('dashboard');

  // Real appointment data state
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<any>(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    doctor: '',
    department: '',
    status: '',
    notes: ''
  });

  // Fetch doctors for the appointment form
  const [doctors, setDoctors] = useState<any[]>([]);
  const [doctorsLoading, setDoctorsLoading] = useState(false);
  const [appointmentDoctors, setAppointmentDoctors] = useState<any[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [addType, setAddType] = useState<'patient' | 'doctor' | 'inventory'>('patient');
  const [addFormData, setAddFormData] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState("");

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname.split('/').pop() || 'dashboard';
    setActiveTab(path as DataEntity | 'dashboard');
  }, [location.pathname]);

  // Fetch appointments from Supabase
  useEffect(() => {
    if (activeTab === 'appointments') {
      fetchAppointments();
    }
  }, [activeTab]);

  // Fetch doctors for the appointment form
  useEffect(() => {
    if (activeTab === 'doctors') {
      fetchDoctors();
    }
  }, [activeTab]);

  // Fetch doctors for both appointment form and doctors list
  const fetchDoctors = async () => {
    setDoctorsLoading(true);
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      // Update both doctors lists
      setDoctors(data || []);
      setAppointmentDoctors(data || []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast.error('Failed to fetch doctors');
    } finally {
      setDoctorsLoading(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          patient:patients (
            first_name,
            last_name,
            email,
            phone
          ),
          doctor:doctors (
            name,
            specialization
          ),
          department:departments (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform the data to include formatted fields
      const formattedAppointments = data.map(appointment => ({
        ...appointment,
        patient_name: appointment.patient ? `${appointment.patient.first_name} ${appointment.patient.last_name}` : 'N/A',
        doctor_name: appointment.doctor ? `${appointment.doctor.name} (${appointment.doctor.specialization})` : 'N/A',
        department_name: appointment.department ? appointment.department.name : 'N/A',
        date: new Date(appointment.date).toLocaleDateString(),
        time: appointment.time
      }));

      setAppointments(formattedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch appointments',
        variant: 'destructive',
      });
    }
  };

  // Add this function to handle appointment booking
  const handleBookAppointment = async (appointmentData: any) => {
    try {
      console.log('Raw appointment data:', appointmentData);
      
      // Validate required fields
      if (!appointmentData.patient_id || !appointmentData.doctor_id || !appointmentData.department_id || !appointmentData.date || !appointmentData.time) {
        console.error('Missing required fields:', {
          patient_id: appointmentData.patient_id,
          doctor_id: appointmentData.doctor_id,
          department_id: appointmentData.department_id,
          date: appointmentData.date,
          time: appointmentData.time
        });
        toast.error('Please fill in all required fields');
        return;
      }

      // Format the date to YYYY-MM-DD
      const formattedDate = new Date(appointmentData.date).toISOString().split('T')[0];
      
      const appointmentInsert: AppointmentInsert = {
        patient_id: appointmentData.patient_id,
        doctor: appointmentData.doctor_id,
        department: appointmentData.department_id,
        date: formattedDate,
        time: appointmentData.time,
        status: 'Scheduled',
        notes: appointmentData.notes || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log('Attempting to insert appointment with data:', appointmentInsert);

      const { data, error } = await supabase
        .from('appointments')
        .insert([appointmentInsert])
        .select()
        .single();

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        toast.error(`Failed to book appointment: ${error.message}`);
        throw error;
      }

      console.log('Successfully created appointment:', data);
      toast.success('Appointment booked successfully');
      fetchAppointments(); // Refresh the appointments list
      return data;
    } catch (error: any) {
      console.error('Error booking appointment:', error);
      toast.error(error.message || 'Failed to book appointment');
      throw error;
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as DataEntity | 'dashboard');
    if (value === 'dashboard') {
      navigate('/admin');
    } else {
      navigate(`/admin/${value}`);
    }
  };

  // Update the patients state type and add loading state
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientsLoading, setPatientsLoading] = useState(false);

  // Update the fetchPatients function to match the schema
  const fetchPatients = async () => {
    setPatientsLoading(true);
    try {
      const { data, error } = await supabase
        .from('patients')
        .select(`
          id,
          first_name,
          last_name,
          email,
          phone,
          appointments:appointments (
            id,
            date,
            time,
            status,
            doctor:doctors (
              name,
              specialization
            ),
            department:departments (
              name
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching patients:', error);
        toast.error('Failed to fetch patients');
        return;
      }

      setPatients(data || []);
    } catch (error) {
      console.error('Error in fetchPatients:', error);
      toast.error('An error occurred while fetching patients');
    } finally {
      setPatientsLoading(false);
    }
  };

  // Add useEffect to fetch patients when the patients tab is active
  useEffect(() => {
    if (activeTab === 'patients') {
      fetchPatients();
    }
  }, [activeTab]);

  // Update the patients tab content
  const renderPatientsTab = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Patient Management</CardTitle>
          <CardDescription>View and manage all patients</CardDescription>
        </div>
        <Button onClick={() => handleAddNew('patient')} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Patient
        </Button>
      </CardHeader>
      <CardContent>
        {patientsLoading ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : patients.length === 0 ? (
          <div className="text-center p-4 text-gray-500">
            No patients found. Add a new patient to get started.
          </div>
        ) : (
          <DataTable 
            data={patients}
            columns={[
              { key: "id", label: "ID" },
              { 
                key: "name", 
                label: "Name", 
                render: (patient: Patient) => (
                  <span>{`${patient.first_name || ''} ${patient.last_name || ''}`.trim() || 'N/A'}</span>
                )
              },
              { key: "email", label: "Email" },
              { key: "phone", label: "Phone" },
              { 
                key: "appointments", 
                label: "Appointments",
                render: (patient: Patient) => {
                  if (!patient.appointments || patient.appointments.length === 0) {
                    return <span>No appointments</span>;
                  }
                  return (
                    <div className="space-y-1">
                      {patient.appointments.map((appointment) => (
                        <div key={appointment.id} className="text-sm">
                          <div>{new Date(appointment.date).toLocaleDateString()} {appointment.time}</div>
                          <div className="text-gray-500">
                            {appointment.doctor?.name || 'N/A'} - {appointment.department?.name || 'N/A'}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }
              }
            ]}
            title="Patients"
            onView={(item) => console.log("View patient", item)}
            onEdit={(item) => console.log("Edit patient", item)}
            onDelete={(item) => console.log("Delete patient", item)}
          />
        )}
      </CardContent>
    </Card>
  );

  // Mock data
  const departments = [
    {
      id: 1,
      name: "Cardiology",
      head: "Dr. Smith",
      doctors: 5,
      staff: 10,
      patients: 150
    },
    // ... existing code ...
  ];

  const inventory = [
    {
      id: 1,
      item: "Aspirin",
      category: "Medication",
      quantity: 1000,
      unit: "tablets",
      status: "In Stock"
    },
    // ... existing code ...
  ];

  const billing = [
    {
      id: 1,
      patient: "John Doe",
      amount: 150.00,
      date: "2024-03-20",
      services: "Consultation",
      status: "Paid"
    },
    // ... existing code ...
  ];

  const handleViewAppointment = (appointment: any) => {
    // TODO: Implement view appointment details in a modal or new page
    console.log('View appointment:', appointment);
    toast.info('View functionality coming soon');
  };

  const handleEditAppointment = (appointment: any) => {
    setEditingAppointment(appointment);
    setFormData({
      date: appointment.date || '',
      time: appointment.time || '',
      doctor: appointment.doctor || '',
      department: appointment.department || '',
      status: appointment.status || '',
      notes: appointment.notes || ''
    });
    setShowEditDialog(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = async () => {
    if (!editingAppointment) return;

    try {
      const { error } = await supabase
        .from('appointments')
        .update({
          date: formData.date,
          time: formData.time,
          doctor: formData.doctor,
          department: formData.department,
          status: formData.status,
          notes: formData.notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingAppointment.id);

      if (error) throw error;

      toast.success('Appointment updated successfully');
      fetchAppointments(); // Refresh the list
      setShowEditDialog(false);
      setEditingAppointment(null);
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast.error('Failed to update appointment');
    }
  };

  const handleDeleteAppointment = async (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowDeleteDialog(true);
  };

  const confirmDeleteAppointment = async () => {
    if (!selectedAppointment) return;

    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', selectedAppointment.id);

      if (error) throw error;

      toast.success('Appointment deleted successfully');
      fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error('Error deleting appointment:', error);
      toast.error('Failed to delete appointment');
    } finally {
      setShowDeleteDialog(false);
      setSelectedAppointment(null);
    }
  };

  const handleAddNew = (type: 'patient' | 'doctor' | 'inventory') => {
    setAddType(type);
    setAddFormData({});
    setShowAddDialog(true);
  };

  const handleAddFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSave = async () => {
    if (!addType) return;

    try {
      let data: any = {};

      switch (addType) {
        case 'patient':
          data = {
            first_name: addFormData.first_name,
            last_name: addFormData.last_name,
            email: addFormData.email,
            phone: addFormData.phone,
            address: addFormData.address,
            date_of_birth: addFormData.date_of_birth,
            created_at: new Date().toISOString()
          };
          await supabase.from('patients').insert([data]);
          break;
        case 'doctor':
          // Validate required fields
          if (!addFormData.name || !addFormData.specialization) {
            toast.error('Name and specialization are required');
            return;
          }

          data = {
            name: addFormData.name,
            specialization: addFormData.specialization,
            experience: addFormData.experience || '0 years',
            phone: addFormData.phone || '',
            email: addFormData.email || '',
            status: 'Active',
            created_at: new Date().toISOString()
          };

          console.log('Adding doctor with data:', data);

          const { data: insertedDoctor, error: insertError } = await supabase
            .from('doctors')
            .insert([data])
            .select()
            .single();

          if (insertError) {
            console.error('Error inserting doctor:', insertError);
            throw insertError;
          }

          console.log('Successfully inserted doctor:', insertedDoctor);
          
          // Immediately fetch updated doctors list
          await fetchDoctors();
          break;
        case 'inventory':
          data = {
            item: addFormData.item,
            category: addFormData.category,
            quantity: parseInt(addFormData.quantity),
            unit: addFormData.unit,
            status: 'In Stock',
            created_at: new Date().toISOString()
          };
          await supabase.from('inventory').insert([data]);
          break;
      }

      toast.success(`${addType.charAt(0).toUpperCase() + addType.slice(1)} added successfully`);
      setShowAddDialog(false);
      setAddType(null);
      setAddFormData({}); // Clear form data
      
    } catch (error: any) {
      console.error(`Error adding ${addType}:`, error);
      toast.error(error.message || `Failed to add ${addType}`);
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'dashboard':
        return <ClipboardList className="w-4 h-4" />;
      case 'appointments':
        return <Calendar className="w-4 h-4" />;
      case 'patients':
        return <Users className="w-4 h-4" />;
      case 'doctors':
        return <Stethoscope className="w-4 h-4" />;
      case 'departments':
        return <Building2 className="w-4 h-4" />;
      case 'inventory':
        return <Package className="w-4 h-4" />;
      case 'billing':
        return <DollarSign className="w-4 h-4" />;
      case 'reports':
        return <FileText className="w-4 h-4" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const checkDatabase = async () => {
      try {
        // Test database connection
        const isConnected = await testDatabaseConnection();
        if (!isConnected) {
          toast.error('Database connection failed');
          return;
        }

        // Initialize database
        const isInitialized = await initializeDatabase();
        if (!isInitialized) {
          toast.error('Database not initialized');
          return;
        }

        // If both checks pass, refresh data
    refreshData();
      } catch (err) {
        console.error('Database check failed:', err);
        toast.error('Failed to check database status');
      }
    };

    checkDatabase();
  }, [refreshData]);

  // Update the appointments tab content
  const renderAppointmentsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Appointments</h2>
        <Button onClick={fetchAppointments} disabled={loadingAppointments}>
          {loadingAppointments ? 'Loading...' : 'Refresh'}
        </Button>
      </div>
      <DataTable
        data={appointments}
        columns={appointmentColumns}
        title="Appointments"
        onView={(item) => handleViewAppointment(item)}
        onEdit={(item) => handleEditAppointment(item)}
        onDelete={(item) => handleDeleteAppointment(item)}
      />
    </div>
  );

  // Update the tab content rendering
  const renderTabContent = () => {
    switch (activeTab) {
      case 'appointments':
        return renderAppointmentsTab();
      case 'patients':
        return renderPatientsTab();
      // ... other cases ...
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Search and Actions Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="flex-1 sm:flex-none">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3 xl:col-span-2">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {[
                    { id: 'dashboard', label: 'Dashboard' },
                    { id: 'appointments', label: 'Appointments' },
                    { id: 'patients', label: 'Patients' },
                    { id: 'doctors', label: 'Doctors' },
                    { id: 'departments', label: 'Departments' },
                    { id: 'inventory', label: 'Inventory' },
                    { id: 'billing', label: 'Billing' },
                    { id: 'reports', label: 'Reports' },
                  ].map((tab) => (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => handleTabChange(tab.id)}
                    >
                      {getTabIcon(tab.id)}
                      <span className="ml-2">{tab.label}</span>
                    </Button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 xl:col-span-10">
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Total Patients</p>
                          <h3 className="text-2xl font-bold">{stats.patients.toLocaleString()}</h3>
                        </div>
                        <Users className="w-8 h-8 text-medical-500" />
                      </div>
                      <div className="mt-4">
                        <Badge variant="secondary">+2% from last month</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
                          <h3 className="text-2xl font-bold">{stats.appointments.toLocaleString()}</h3>
                        </div>
                        <Calendar className="w-8 h-8 text-medical-500" />
                      </div>
                      <div className="mt-4">
                        <Badge variant="secondary">+5% from last week</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Total Doctors</p>
                          <h3 className="text-2xl font-bold">{stats.doctors.toLocaleString()}</h3>
                        </div>
                        <Stethoscope className="w-8 h-8 text-medical-500" />
                      </div>
                      <div className="mt-4">
                        <Badge variant="secondary">4 on leave</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Revenue</p>
                          <h3 className="text-2xl font-bold">₹{(stats.revenue / 1000000).toFixed(1)}M</h3>
                        </div>
                        <DollarSign className="w-8 h-8 text-medical-500" />
                      </div>
                      <div className="mt-4">
                        <Badge variant="secondary">+8% from last month</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Content Tabs */}
                <Card>
                  <CardContent className="p-6">
                    <Tabs value={activeTab} className="space-y-4" onValueChange={handleTabChange}>
                      <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                        <TabsTrigger value="appointments">Appointments</TabsTrigger>
                        <TabsTrigger value="patients">Patients</TabsTrigger>
                        <TabsTrigger value="doctors">Doctors</TabsTrigger>
                        <TabsTrigger value="departments">Departments</TabsTrigger>
                        <TabsTrigger value="inventory">Inventory</TabsTrigger>
                        <TabsTrigger value="billing">Billing</TabsTrigger>
                        <TabsTrigger value="reports">Reports</TabsTrigger>
                      </TabsList>
                      
                      {/* Tab Contents */}
                      <TabsContent value="dashboard">
                        <div className="grid gap-4 md:grid-cols-2">
                          <Card>
                            <CardHeader>
                              <CardTitle>Department Stats</CardTitle>
                              <CardDescription>
                                Patient distribution by department
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart
                                    data={departments.map(dept => ({
                                      name: dept.name,
                                      value: dept.patients
                                    }))}
                                    layout="vertical"
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis
                                      dataKey="name"
                                      type="category"
                                      tickLine={false}
                                      width={100}
                                    />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                      dataKey="value"
                                      name="Patients"
                                      fill="#1E88E5"
                                      radius={[0, 4, 4, 0]}
                                    />
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>

                      <TabsContent value="appointments">
                        {renderAppointmentsTab()}
                      </TabsContent>

                      <TabsContent value="patients">
                        {renderPatientsTab()}
                      </TabsContent>

                      <TabsContent value="doctors">
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                              <CardTitle>Doctor Management</CardTitle>
                              <CardDescription>View and manage all doctors</CardDescription>
                            </div>
                            <Button onClick={() => handleAddNew('doctor')} className="flex items-center gap-2">
                              <Plus className="h-4 w-4" />
                              Add New Doctor
                            </Button>
                          </CardHeader>
                          <CardContent>
                            {doctorsLoading ? (
                              <div>Loading doctors...</div>
                            ) : doctors.length === 0 ? (
                              <div>No doctors found. Add a new doctor to get started.</div>
                            ) : (
                              <DataTable 
                                data={doctors}
                                columns={[
                                  { key: "id", label: "ID" },
                                  { key: "name", label: "Name" },
                                  { key: "specialization", label: "Specialization" },
                                  { key: "experience", label: "Experience" },
                                  { key: "phone", label: "Phone" },
                                  { key: "email", label: "Email" },
                                  { key: "status", label: "Status" }
                                ]}
                                title="Doctors"
                                onView={(item) => console.log("View doctor", item)}
                                onEdit={(item) => console.log("Edit doctor", item)}
                                onDelete={(item) => console.log("Delete doctor", item)}
                              />
                            )}
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="departments">
                        <Card>
                          <CardHeader>
                            <CardTitle>Department Management</CardTitle>
                            <CardDescription>View and manage all departments</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <DataTable 
                              data={departments}
                              columns={[
                                { key: "id", label: "ID" },
                                { key: "name", label: "Name" },
                                { key: "head", label: "Head Doctor" },
                                { key: "doctors", label: "No. of Doctors" },
                                { key: "staff", label: "Staff" },
                                { key: "patients", label: "Patients" }
                              ]}
                              title="Departments"
                              onView={(item) => console.log("View department", item)}
                              onEdit={(item) => console.log("Edit department", item)}
                              onDelete={(item) => console.log("Delete department", item)}
                            />
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="inventory">
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                              <CardTitle>Inventory Management</CardTitle>
                              <CardDescription>View and manage inventory items</CardDescription>
                            </div>
                            <Button onClick={() => handleAddNew('inventory')} className="flex items-center gap-2">
                              <Plus className="h-4 w-4" />
                              Add New Item
                            </Button>
                          </CardHeader>
                          <CardContent>
                            <DataTable 
                              data={inventory}
                              columns={[
                                { key: "id", label: "ID" },
                                { key: "item", label: "Item" },
                                { key: "category", label: "Category" },
                                { key: "quantity", label: "Quantity" },
                                { key: "unit", label: "Unit" },
                                { key: "status", label: "Status" }
                              ]}
                              title="Inventory"
                              onView={(item) => console.log("View inventory", item)}
                              onEdit={(item) => console.log("Edit inventory", item)}
                              onDelete={(item) => console.log("Delete inventory", item)}
                            />
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="billing">
                        <Card>
                          <CardHeader>
                            <CardTitle>Billing Management</CardTitle>
                            <CardDescription>View and manage billing records</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <DataTable 
                              data={billing}
                              columns={[
                                { key: "id", label: "ID" },
                                { key: "patient", label: "Patient" },
                                { key: "amount", label: "Amount" },
                                { key: "date", label: "Date" },
                                { key: "services", label: "Services" },
                                { key: "status", label: "Status" }
                              ]}
                              title="Billing"
                              onView={(item) => console.log("View billing", item)}
                              onEdit={(item) => console.log("Edit billing", item)}
                              onDelete={(item) => console.log("Delete billing", item)}
                            />
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the appointment
              for {selectedAppointment?.patient_name} on {selectedAppointment?.date}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteAppointment}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="doctor" className="text-right">
                Doctor
              </Label>
              <Select
                value={formData.doctor}
                onValueChange={(value) => handleSelectChange('doctor', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentDoctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.name}>
                      {doctor.name} - {doctor.specialization}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Select
                value={formData.department}
                onValueChange={(value) => handleSelectChange('department', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Neurology">Neurology</SelectItem>
                  <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="Dermatology">Dermatology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                  <SelectItem value="No Show">No Show</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Input
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleFormChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Add New {addType ? addType.charAt(0).toUpperCase() + addType.slice(1) : ''}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {addType === 'patient' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="first_name" className="text-right">First Name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={addFormData.first_name || ''}
                    onChange={handleAddFormChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="last_name" className="text-right">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={addFormData.last_name || ''}
                    onChange={handleAddFormChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={addFormData.email || ''}
                    onChange={handleAddFormChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={addFormData.phone || ''}
                    onChange={handleAddFormChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date_of_birth" className="text-right">Date of Birth</Label>
                  <Input
                    id="date_of_birth"
                    name="date_of_birth"
                    type="date"
                    value={addFormData.date_of_birth || ''}
                    onChange={handleAddFormChange}
                    className="col-span-3"
                  />
                </div>
              </>
            )}

            {addType === 'doctor' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={addFormData.name || ''}
                    onChange={handleAddFormChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="specialization" className="text-right">
                    Specialization <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="specialization"
                    name="specialization"
                    value={addFormData.specialization || ''}
                    onChange={handleAddFormChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="experience" className="text-right">
                    Experience
                  </Label>
                  <Input
                    id="experience"
                    name="experience"
                    value={addFormData.experience || ''}
                    onChange={handleAddFormChange}
                    className="col-span-3"
                    placeholder="e.g., 5 years"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={addFormData.email || ''}
                    onChange={handleAddFormChange}
                    className="col-span-3"
                    placeholder="doctor@example.com"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={addFormData.phone || ''}
                    onChange={handleAddFormChange}
                    className="col-span-3"
                    placeholder="+91 1234567890"
                  />
                </div>
              </>
            )}

            {addType === 'inventory' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="item" className="text-right">Item Name</Label>
                  <Input
                    id="item"
                    name="item"
                    value={addFormData.item || ''}
                    onChange={handleAddFormChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={addFormData.category || ''}
                    onChange={handleAddFormChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={addFormData.quantity || ''}
                    onChange={handleAddFormChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="unit" className="text-right">Unit</Label>
                  <Input
                    id="unit"
                    name="unit"
                    value={addFormData.unit || ''}
                    onChange={handleAddFormChange}
                    className="col-span-3"
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSave}>Add {addType}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
