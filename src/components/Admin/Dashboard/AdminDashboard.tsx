
import { useState } from "react";
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
import { RefreshCw } from "lucide-react";

const appointmentsData = [
  { day: "Mon", count: 25 },
  { day: "Tue", count: 40 },
  { day: "Wed", count: 35 },
  { day: "Thu", count: 45 },
  { day: "Fri", count: 30 },
  { day: "Sat", count: 20 },
  { day: "Sun", count: 15 },
];

const departmentData = [
  { name: "Cardiology", value: 20 },
  { name: "Orthopedics", value: 15 },
  { name: "General Medicine", value: 25 },
  { name: "Pediatrics", value: 18 },
  { name: "Neurology", value: 12 },
];

const revenueData = [
  {
    name: "Jan",
    primary: 40000,
    secondary: 24000,
  },
  {
    name: "Feb",
    primary: 30000,
    secondary: 18000,
  },
  {
    name: "Mar",
    primary: 45000,
    secondary: 28000,
  },
  {
    name: "Apr",
    primary: 50000,
    secondary: 31000,
  },
  {
    name: "May",
    primary: 65000,
    secondary: 36000,
  },
  {
    name: "Jun",
    primary: 60000,
    secondary: 40000,
  },
];

// Mock data for each section
const mockAppointments = [
  { id: 'A001', patient: "Rahul Sharma", doctor: "Dr. Patel", department: "Cardiology", date: "2024-05-13", time: "10:00 AM", status: "Scheduled" },
  { id: 'A002', patient: "Priya Singh", doctor: "Dr. Gupta", department: "Orthopedics", date: "2024-05-13", time: "11:30 AM", status: "Completed" },
  { id: 'A003', patient: "Amit Kumar", doctor: "Dr. Reddy", department: "Neurology", date: "2024-05-14", time: "09:15 AM", status: "Scheduled" },
  { id: 'A004', patient: "Sunita Verma", doctor: "Dr. Shah", department: "General Medicine", date: "2024-05-14", time: "02:00 PM", status: "Cancelled" },
  { id: 'A005', patient: "Kiran Desai", doctor: "Dr. Khan", department: "Pediatrics", date: "2024-05-15", time: "10:45 AM", status: "Scheduled" },
];

const mockPatients = [
  { id: 'P001', name: "Rahul Sharma", age: 45, gender: "Male", phone: "+91 9876543210", address: "Mumbai", lastVisit: "2024-05-01", status: "Active" },
  { id: 'P002', name: "Priya Singh", age: 32, gender: "Female", phone: "+91 8765432109", address: "Delhi", lastVisit: "2024-04-28", status: "Active" },
  { id: 'P003', name: "Amit Kumar", age: 56, gender: "Male", phone: "+91 7654321098", address: "Bangalore", lastVisit: "2024-05-10", status: "Active" },
  { id: 'P004', name: "Sunita Verma", age: 28, gender: "Female", phone: "+91 6543210987", address: "Hyderabad", lastVisit: "2024-03-15", status: "Inactive" },
  { id: 'P005', name: "Kiran Desai", age: 8, gender: "Female", phone: "+91 5432109876", address: "Chennai", lastVisit: "2024-05-05", status: "Active" },
];

const mockDoctors = [
  { id: 'D001', name: "Dr. Patel", specialization: "Cardiology", experience: "15 years", phone: "+91 9876543210", email: "patel@hospital.com", status: "Active" },
  { id: 'D002', name: "Dr. Gupta", specialization: "Orthopedics", experience: "10 years", phone: "+91 8765432109", email: "gupta@hospital.com", status: "Active" },
  { id: 'D003', name: "Dr. Reddy", specialization: "Neurology", experience: "12 years", phone: "+91 7654321098", email: "reddy@hospital.com", status: "Active" },
  { id: 'D004', name: "Dr. Shah", specialization: "General Medicine", experience: "8 years", phone: "+91 6543210987", email: "shah@hospital.com", status: "On Leave" },
  { id: 'D005', name: "Dr. Khan", specialization: "Pediatrics", experience: "14 years", phone: "+91 5432109876", email: "khan@hospital.com", status: "Active" },
];

const mockDepartments = [
  { id: 'DEP001', name: "Cardiology", head: "Dr. Patel", doctors: 8, staff: 15, patients: 120 },
  { id: 'DEP002', name: "Orthopedics", head: "Dr. Gupta", doctors: 6, staff: 12, patients: 95 },
  { id: 'DEP003', name: "Neurology", head: "Dr. Reddy", doctors: 5, staff: 10, patients: 78 },
  { id: 'DEP004', name: "General Medicine", head: "Dr. Shah", doctors: 10, staff: 20, patients: 200 },
  { id: 'DEP005', name: "Pediatrics", head: "Dr. Khan", doctors: 7, staff: 14, patients: 150 },
];

const mockInventory = [
  { id: 'INV001', item: "Surgical Masks", category: "PPE", quantity: 5000, unit: "pieces", status: "In Stock" },
  { id: 'INV002', item: "Paracetamol", category: "Medication", quantity: 2000, unit: "strips", status: "Low Stock" },
  { id: 'INV003', item: "Surgical Gloves", category: "PPE", quantity: 3000, unit: "pairs", status: "In Stock" },
  { id: 'INV004', item: "Insulin", category: "Medication", quantity: 500, unit: "vials", status: "In Stock" },
  { id: 'INV005', item: "IV Sets", category: "Equipment", quantity: 1000, unit: "pieces", status: "In Stock" },
];

const mockBilling = [
  { id: 'B001', patient: "Rahul Sharma", amount: 15000, date: "2024-05-01", services: "Consultation, ECG", status: "Paid" },
  { id: 'B002', patient: "Priya Singh", amount: 8500, date: "2024-04-28", services: "X-ray, Consultation", status: "Paid" },
  { id: 'B003', patient: "Amit Kumar", amount: 25000, date: "2024-05-10", services: "MRI, Consultation", status: "Pending" },
  { id: 'B004', patient: "Sunita Verma", amount: 5000, date: "2024-03-15", services: "Blood Test, Consultation", status: "Paid" },
  { id: 'B005', patient: "Kiran Desai", amount: 3500, date: "2024-05-05", services: "Consultation", status: "Paid" },
];

const AdminDashboard = () => {
  const { stats, loading, error, refreshData } = useRealTimeData();
  const [activeTab, setActiveTab] = useState<DataEntity | 'dashboard'>('dashboard');
  
  const handleRefresh = () => {
    refreshData();
  };

  return (
    <div className="flex flex-1 flex-col space-y-6 p-4 md:p-6">
      <div className="flex justify-between items-center">
        <Header />
        <Button 
          onClick={handleRefresh} 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-4 w-4" /> Refresh Data
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.patients.toLocaleString()}</div>
            <p className="text-xs text-gray-500">+10% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.appointments.toLocaleString()}</div>
            <p className="text-xs text-gray-500">+5% from last week</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹ {stats.billing.toLocaleString()}</div>
            <p className="text-xs text-gray-500">+15% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Doctors</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.doctors}</div>
            <p className="text-xs text-gray-500">+2 new this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4" onValueChange={(val) => setActiveTab(val as any)}>
        <TabsList className="grid grid-cols-4 md:grid-cols-8 gap-2">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                  Monthly revenue breakdown for the current year.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={revenueData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="primary"
                        name="Total Revenue"
                        stroke="#42A5F5"
                        fill="#E3F2FD"
                      />
                      <Area
                        type="monotone"
                        dataKey="secondary"
                        name="Net Revenue"
                        stroke="#1976D2"
                        fill="#90CAF9"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
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
                      data={departmentData}
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
          <Card>
            <CardHeader>
              <CardTitle>Weekly Appointments</CardTitle>
              <CardDescription>
                Number of appointments for the current week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={appointmentsData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="count"
                      name="Appointments"
                      stroke="#0D47A1"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Management</CardTitle>
              <CardDescription>View and manage all appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable 
                data={mockAppointments}
                columns={[
                  { key: "id", label: "ID" },
                  { key: "patient", label: "Patient" },
                  { key: "doctor", label: "Doctor" },
                  { key: "department", label: "Department" },
                  { key: "date", label: "Date" },
                  { key: "time", label: "Time" },
                  { key: "status", label: "Status" }
                ]}
                title="Appointments"
                onView={(item) => console.log("View appointment", item)}
                onEdit={(item) => console.log("Edit appointment", item)}
                onDelete={(item) => console.log("Delete appointment", item)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Management</CardTitle>
              <CardDescription>View and manage all patients</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable 
                data={mockPatients}
                columns={[
                  { key: "id", label: "ID" },
                  { key: "name", label: "Name" },
                  { key: "age", label: "Age" },
                  { key: "gender", label: "Gender" },
                  { key: "phone", label: "Phone" },
                  { key: "lastVisit", label: "Last Visit" },
                  { key: "status", label: "Status" }
                ]}
                title="Patients"
                onView={(item) => console.log("View patient", item)}
                onEdit={(item) => console.log("Edit patient", item)}
                onDelete={(item) => console.log("Delete patient", item)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="doctors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Doctor Management</CardTitle>
              <CardDescription>View and manage all doctors</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable 
                data={mockDoctors}
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Management</CardTitle>
              <CardDescription>View and manage all departments</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable 
                data={mockDepartments}
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

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>View and manage hospital inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable 
                data={mockInventory}
                columns={[
                  { key: "id", label: "ID" },
                  { key: "item", label: "Item" },
                  { key: "category", label: "Category" },
                  { key: "quantity", label: "Quantity" },
                  { key: "unit", label: "Unit" },
                  { key: "status", label: "Status" }
                ]}
                title="Inventory"
                onView={(item) => console.log("View inventory item", item)}
                onEdit={(item) => console.log("Edit inventory item", item)}
                onDelete={(item) => console.log("Delete inventory item", item)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing Management</CardTitle>
              <CardDescription>View and manage billing information</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable 
                data={mockBilling}
                columns={[
                  { key: "id", label: "Bill ID" },
                  { key: "patient", label: "Patient" },
                  { key: "amount", label: "Amount (₹)" },
                  { key: "date", label: "Date" },
                  { key: "services", label: "Services" },
                  { key: "status", label: "Status" }
                ]}
                title="Billing"
                onView={(item) => console.log("View bill", item)}
                onEdit={(item) => console.log("Edit bill", item)}
                onDelete={(item) => console.log("Delete bill", item)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>View and generate various reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Patient Statistics</h3>
                  <p className="text-sm text-gray-500 mb-4">Patient demographics and visit analysis</p>
                  <Button size="sm">Generate Report</Button>
                </Card>
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Financial Summary</h3>
                  <p className="text-sm text-gray-500 mb-4">Revenue and expense breakdown</p>
                  <Button size="sm">Generate Report</Button>
                </Card>
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Department Performance</h3>
                  <p className="text-sm text-gray-500 mb-4">Efficiency and utilization metrics</p>
                  <Button size="sm">Generate Report</Button>
                </Card>
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Inventory Status</h3>
                  <p className="text-sm text-gray-500 mb-4">Current stock and usage patterns</p>
                  <Button size="sm">Generate Report</Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
