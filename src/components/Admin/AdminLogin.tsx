
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    setIsLoading(true);
    
    // Simulate API call - in a real app this would verify credentials with a backend
    setTimeout(() => {
      // For demo purposes, we'll use hardcoded credentials
      if (values.email === "admin@swasthyasaathi.com" && values.password === "admin123") {
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="border-none shadow-xl">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-gradient-to-r from-medical-700 to-medical-500 p-2">
              <span className="text-white font-bold text-xl px-2">SS</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold text-medical-900">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="admin@swasthyasaathi.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="bg-medical-600 hover:bg-medical-700 w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </div>

              <div className="text-center text-sm text-gray-500">
                <p>Demo credentials:</p>
                <p>Email: admin@swasthyasaathi.com</p>
                <p>Password: admin123</p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
