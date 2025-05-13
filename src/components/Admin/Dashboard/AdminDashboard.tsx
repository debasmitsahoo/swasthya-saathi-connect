
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "./Header";
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

const AdminDashboard = () => {
  return (
    <div className="flex flex-1 flex-col space-y-6 p-4 md:p-6">
      <Header />
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
            <div className="text-2xl font-bold">12,345</div>
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
            <div className="text-2xl font-bold">235</div>
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
            <div className="text-2xl font-bold">₹ 65,432</div>
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
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-gray-500">+2 new this month</p>
          </CardContent>
        </Card>
      </div>
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
      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="patients">Recent Patients</TabsTrigger>
        </TabsList>
        <TabsContent value="appointments" className="space-y-4">
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
        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Patients</CardTitle>
              <CardDescription>
                Last 5 patients registered in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-5 font-medium text-gray-500">
                  <div>ID</div>
                  <div>Name</div>
                  <div>Date</div>
                  <div>Department</div>
                  <div>Status</div>
                </div>
                <div className="grid grid-cols-5">
                  <div>P-1234</div>
                  <div>Rahul Sharma</div>
                  <div>2023-05-12</div>
                  <div>Cardiology</div>
                  <div>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Active
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-5">
                  <div>P-1235</div>
                  <div>Priya Singh</div>
                  <div>2023-05-12</div>
                  <div>Orthopedics</div>
                  <div>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Active
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-5">
                  <div>P-1236</div>
                  <div>Amit Patel</div>
                  <div>2023-05-11</div>
                  <div>Neurology</div>
                  <div>
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      Pending
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-5">
                  <div>P-1237</div>
                  <div>Sunita Gupta</div>
                  <div>2023-05-11</div>
                  <div>Dermatology</div>
                  <div>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Active
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-5">
                  <div>P-1238</div>
                  <div>Vikram Reddy</div>
                  <div>2023-05-10</div>
                  <div>General Medicine</div>
                  <div>
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                      Discharged
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
