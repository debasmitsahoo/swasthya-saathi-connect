import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const appointmentSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  gender: z.string({ required_error: "Please select your gender" }),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string({ required_error: "Please select a time" }),
  department: z.string().uuid({ message: "Please select a department" }),
  doctor: z.string().uuid({ message: "Please select a doctor" }),
  message: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

const availableTimes = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", 
  "12:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"
];

const departments = [
  { value: "550e8400-e29b-41d4-a716-446655440000", label: "General Medicine" },
  { value: "550e8400-e29b-41d4-a716-446655440001", label: "Cardiology" },
  { value: "550e8400-e29b-41d4-a716-446655440002", label: "Orthopedics" },
  { value: "550e8400-e29b-41d4-a716-446655440003", label: "Neurology" },
  { value: "550e8400-e29b-41d4-a716-446655440004", label: "Dermatology" },
  { value: "550e8400-e29b-41d4-a716-446655440005", label: "Gynecology" },
  { value: "550e8400-e29b-41d4-a716-446655440006", label: "Pediatrics" },
];

const doctorsByDepartment: Record<string, Array<{ value: string; label: string }>> = {
  "550e8400-e29b-41d4-a716-446655440000": [
    { value: "660e8400-e29b-41d4-a716-446655440000", label: "Dr. Sharma" },
    { value: "660e8400-e29b-41d4-a716-446655440001", label: "Dr. Patel" },
  ],
  "550e8400-e29b-41d4-a716-446655440001": [
    { value: "660e8400-e29b-41d4-a716-446655440002", label: "Dr. Gupta" },
    { value: "660e8400-e29b-41d4-a716-446655440003", label: "Dr. Verma" },
  ],
  "550e8400-e29b-41d4-a716-446655440002": [
    { value: "660e8400-e29b-41d4-a716-446655440004", label: "Dr. Singh" },
    { value: "660e8400-e29b-41d4-a716-446655440005", label: "Dr. Reddy" },
  ],
  "550e8400-e29b-41d4-a716-446655440003": [
    { value: "660e8400-e29b-41d4-a716-446655440006", label: "Dr. Kumar" },
    { value: "660e8400-e29b-41d4-a716-446655440007", label: "Dr. Mishra" },
  ],
  "550e8400-e29b-41d4-a716-446655440004": [
    { value: "660e8400-e29b-41d4-a716-446655440008", label: "Dr. Joshi" },
    { value: "660e8400-e29b-41d4-a716-446655440009", label: "Dr. Das" },
  ],
  "550e8400-e29b-41d4-a716-446655440005": [
    { value: "660e8400-e29b-41d4-a716-446655440010", label: "Dr. Shah" },
    { value: "660e8400-e29b-41d4-a716-446655440011", label: "Dr. Desai" },
  ],
  "550e8400-e29b-41d4-a716-446655440006": [
    { value: "660e8400-e29b-41d4-a716-446655440012", label: "Dr. Khanna" },
    { value: "660e8400-e29b-41d4-a716-446655440013", label: "Dr. Chauhan" },
  ],
};

const AppointmentForm = () => {
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      gender: "",
      message: "",
    },
  });

  const onSubmit = async (values: AppointmentFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Generate a reference number
      const refNumber = "SS-" + Math.floor(100000 + Math.random() * 900000);

      // Get department and doctor names for better display
      const departmentName = departments.find(d => d.value === values.department)?.label;
      const doctorName = doctorsByDepartment[values.department]?.find(d => d.value === values.doctor)?.label;

      if (!departmentName || !doctorName) {
        throw new Error("Invalid department or doctor selection");
      }

      console.log("Creating patient record with values:", {
        first_name: values.fullName,
        last_name: '',
        email: values.email,
        phone: values.phone,
        gender: values.gender,
        status: 'Active'
      });

      // First, create or get the patient record
      const { data: patientData, error: patientError } = await supabase
        .from('patients')
        .upsert({
          first_name: values.fullName,
          last_name: '',
          email: values.email,
          phone: values.phone,
          gender: values.gender,
          status: 'Active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (patientError) {
        console.error("Error creating patient:", patientError);
        throw new Error(`Failed to create patient record: ${patientError.message}`);
      }

      if (!patientData) {
        throw new Error("Failed to create patient record: No data returned");
      }

      console.log("Patient record created:", patientData);

      // Create the appointment record with the correct types
      const appointmentRecord = {
        patient_id: patientData.id,
        doctor_id: values.doctor,
        department_id: values.department,
        date: format(values.date, 'yyyy-MM-dd'),
        time: values.time,
        status: 'Scheduled',
        notes: values.message,
        created_at: new Date().toISOString()
      };

      console.log("Creating appointment with record:", appointmentRecord);

      const { data: appointmentData, error: appointmentError } = await supabase
        .from('appointments')
        .insert(appointmentRecord)
        .select()
        .single();

      if (appointmentError) {
        console.error("Error creating appointment:", appointmentError);
        throw new Error(`Failed to create appointment: ${appointmentError.message}`);
      }

      if (!appointmentData) {
        throw new Error("Failed to create appointment record: No data returned");
      }

      console.log("Appointment created successfully:", appointmentData);

      // Navigate to confirmation page with the appointment details
      navigate("/appointment/confirmation", { 
        state: { 
          firstName: values.fullName,
          lastName: '',
          email: values.email,
          phone: values.phone,
          date: format(values.date, 'MMMM d, yyyy'),
          time: values.time,
          departmentName,
          doctorName,
          refNumber,
          notes: values.message
        } 
      });
    } catch (error) {
      console.error("Error processing appointment:", error);
      toast.error(error instanceof Error ? error.message : "There was a problem booking your appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-none shadow-lg">
        <CardHeader className="bg-gradient-to-r from-medical-600 to-medical-700 rounded-t-lg text-white">
          <CardTitle className="text-2xl">Book an Appointment</CardTitle>
          <CardDescription className="text-gray-100">
            Fill in the form below to schedule your appointment
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Appointment Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full text-left font-normal ${
                                !field.value && "text-muted-foreground"
                              }`}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "PPP") : "Select a date"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return date < today || date > new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appointment Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableTimes.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedDepartment(value);
                          // Reset doctor selection when department changes
                          form.setValue('doctor', '');
                        }} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Departments</SelectLabel>
                            {departments.map((department) => (
                              <SelectItem key={department.value} value={department.value}>
                                {department.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="doctor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Doctor</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedDepartment}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={selectedDepartment ? "Select doctor" : "Select department first"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedDepartment && doctorsByDepartment[selectedDepartment]?.map((doctor) => (
                            <SelectItem key={doctor.value} value={doctor.value}>
                              {doctor.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your symptoms or any specific requirements (optional)"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This will help the doctor prepare for your appointment
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-end">
                <Button 
                  type="submit" 
                  className="bg-medical-600 hover:bg-medical-700 text-white px-8"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Book Appointment"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentForm;

