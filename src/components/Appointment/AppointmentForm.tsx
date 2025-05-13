
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
  date: z.date({ required_error: "Please select a date" }),
  time: z.string({ required_error: "Please select a time" }),
  department: z.string({ required_error: "Please select a department" }),
  doctor: z.string({ required_error: "Please select a doctor" }),
  message: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

const availableTimes = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", 
  "12:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"
];

const departments = [
  { value: "general", label: "General Medicine" },
  { value: "cardiology", label: "Cardiology" },
  { value: "orthopedics", label: "Orthopedics" },
  { value: "neurology", label: "Neurology" },
  { value: "dermatology", label: "Dermatology" },
  { value: "gynecology", label: "Gynecology" },
  { value: "pediatrics", label: "Pediatrics" },
];

const doctorsByDepartment: Record<string, Array<{ value: string; label: string }>> = {
  general: [
    { value: "dr-sharma", label: "Dr. Sharma" },
    { value: "dr-patel", label: "Dr. Patel" },
  ],
  cardiology: [
    { value: "dr-gupta", label: "Dr. Gupta" },
    { value: "dr-verma", label: "Dr. Verma" },
  ],
  orthopedics: [
    { value: "dr-singh", label: "Dr. Singh" },
    { value: "dr-reddy", label: "Dr. Reddy" },
  ],
  neurology: [
    { value: "dr-kumar", label: "Dr. Kumar" },
    { value: "dr-mishra", label: "Dr. Mishra" },
  ],
  dermatology: [
    { value: "dr-joshi", label: "Dr. Joshi" },
    { value: "dr-das", label: "Dr. Das" },
  ],
  gynecology: [
    { value: "dr-shah", label: "Dr. Shah" },
    { value: "dr-desai", label: "Dr. Desai" },
  ],
  pediatrics: [
    { value: "dr-khanna", label: "Dr. Khanna" },
    { value: "dr-chauhan", label: "Dr. Chauhan" },
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

      // Send email notification
      const { error } = await supabase.functions.invoke("send-appointment-email", {
        body: {
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          date: format(values.date, "EEEE, MMMM d, yyyy"),
          time: values.time,
          doctorName,
          departmentName,
          refNumber,
        },
      });

      if (error) {
        console.error("Error sending email:", error);
        toast.error("Could not send confirmation email. Your appointment is still booked.");
      } else {
        toast.success("Appointment confirmed! Details sent to your email.");
      }

      // Navigate to confirmation page with the appointment details
      navigate("/appointment/confirmation", { 
        state: { 
          ...values, 
          refNumber,
          departmentName,
          doctorName
        } 
      });
    } catch (error) {
      console.error("Error processing appointment:", error);
      toast.error("There was a problem booking your appointment. Please try again.");
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
