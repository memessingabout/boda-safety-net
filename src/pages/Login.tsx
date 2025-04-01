
import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import PhoneInput from "@/components/auth/PhoneInput";
import OtpInput from "@/components/auth/OtpInput";
import MainLayout from "@/components/layout/MainLayout";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const loginSchema = z.object({
  phoneNumber: z.string()
    .min(12, "Phone number must be at least 12 digits")
    .refine(val => /^254\d{9}$/.test(val), "Please enter a valid Kenyan phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    
    // Save phone for potential OTP step
    setPhoneNumber(data.phoneNumber);
    
    try {
      console.log("Login submitted with:", data);
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, show OTP verification 50% of the time
      if (Math.random() > 0.5) {
        setShowOtp(true);
        toast.info("For added security, please verify your identity with the code sent to your phone.");
      } else {
        // Successful login
        toast.success("Login successful!");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      toast.error("Invalid login credentials. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    setIsSubmitting(true);
    
    try {
      console.log("Verifying OTP:", otp, "for phone:", phoneNumber);
      
      // Mock verification delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Login successful!");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      toast.error("Invalid verification code. Please try again.");
      console.error("OTP verification error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showOtp) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-md mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary">Verify Your Identity</CardTitle>
                <CardDescription>
                  Enter the 6-digit code sent to{" "}
                  <span className="font-semibold">+{phoneNumber.replace(/(\d{3})(\d{3})(\d{6})/, '$1 $2 $3')}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <OtpInput
                    length={6}
                    onComplete={handleVerifyOtp}
                    className="mx-auto"
                  />
                  
                  <div className="text-center">
                    <Button
                      variant="link"
                      className="text-sm text-primary"
                      disabled={isSubmitting}
                      onClick={() => toast.info("New code sent to your phone")}
                    >
                      Resend code
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={isSubmitting}
                  onClick={() => setShowOtp(false)}
                >
                  Back to Login
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">Login</CardTitle>
              <CardDescription>
                Access your Digital Boda Drivers account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <PhoneInput
                          value={field.value}
                          onChange={field.onChange}
                          error={form.formState.errors.phoneNumber?.message}
                        />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              {...field}
                              className="pr-10" 
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={form.watch("rememberMe")}
                        onCheckedChange={(checked) => 
                          form.setValue("rememberMe", checked as boolean)
                        }
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm text-muted-foreground"
                      >
                        Remember me
                      </label>
                    </div>
                    
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Register
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
