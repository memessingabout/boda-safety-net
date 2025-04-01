
import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import PhoneInput from "@/components/auth/PhoneInput";
import OtpInput from "@/components/auth/OtpInput";
import MainLayout from "@/components/layout/MainLayout";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  idNumber: z.string().min(1, "ID number is required"),
  phoneNumber: z.string()
    .min(12, "Phone number must be at least 12 digits")
    .refine(val => /^254\d{9}$/.test(val), "Please enter a valid Kenyan phone number"),
  email: z.string().email("Please enter a valid email address"),
  county: z.string().min(1, "Please select a county"),
  subCounty: z.string().min(1, "Sub county is required"),
  ward: z.string().min(1, "Ward is required"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"form" | "verification">("form");
  const [phoneNumber, setPhoneNumber] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      idNumber: "",
      phoneNumber: "",
      email: "",
      county: "",
      subCounty: "",
      ward: "",
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API request
    try {
      console.log("Form submitted with data:", data);
      
      // Save phone number for verification step
      setPhoneNumber(data.phoneNumber);
      
      // Mock sending verification code
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Verification code sent to your phone");
      setStep("verification");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    setIsSubmitting(true);
    
    // Simulate OTP verification
    try {
      console.log("Verifying OTP:", otp, "for phone:", phoneNumber);
      
      // Mock verification delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Registration successful! Please login.");
      
      // Redirect to login page after successful verification
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("Invalid verification code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const kenyanCounties = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Machakos", 
    "Meru", "Nyeri", "Kakamega", "Kisii", "Garissa", "Narok"
  ];

  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto">
          {step === "form" ? (
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary">Register</CardTitle>
                <CardDescription>
                  Join the Digital Boda Drivers and Deliveries Association
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      name="idNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your ID number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
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
                      name="county"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>County</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your county" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {kenyanCounties.map((county) => (
                                <SelectItem key={county} value={county.toLowerCase()}>
                                  {county}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="subCounty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sub County</FormLabel>
                            <FormControl>
                              <Input placeholder="Sub county" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="ward"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ward</FormLabel>
                            <FormControl>
                              <Input placeholder="Ward" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-normal">
                              I agree to the{" "}
                              <Link to="/terms" className="text-primary hover:underline">
                                terms and conditions
                              </Link>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
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
                        "Register"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Login
                  </Link>
                </p>
              </CardFooter>
            </Card>
          ) : (
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary">Verify Your Phone</CardTitle>
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
                  onClick={() => setStep("form")}
                >
                  Back
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
