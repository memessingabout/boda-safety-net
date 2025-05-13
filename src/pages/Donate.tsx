
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { Heart, HandCoins, Users, Package } from "lucide-react";

const Donate = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState<number | ''>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePresetAmount = (value: number) => {
    setAmount(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !name || !email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Thank you for your donation!",
        description: `Your donation of KES ${amount} has been received.`,
      });
      setAmount('');
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Support Our Cause</h1>
          <p className="text-white text-lg">Your donation helps us promote safety and empower boda boda drivers.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Why Donate?</h2>
              <p className="mb-6">
                Your donation to Digital Boda and Deliveries Association of Kenya supports our mission to promote professionalism, safety, and economic empowerment within the boda boda sector in Kenya.
              </p>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <HandCoins className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Financial Support</h3>
                    <p className="text-muted-foreground">Your donation helps us provide financial literacy training and access to savings and loan facilities for our members.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Welfare Programs</h3>
                    <p className="text-muted-foreground">We provide welfare support including health insurance options and emergency assistance for riders and their families.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Training & Development</h3>
                    <p className="text-muted-foreground">We organize regular training on road safety, customer service, and professional development for our members.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Equipment & Resources</h3>
                    <p className="text-muted-foreground">Your donations help provide safety equipment, educational materials, and other resources needed by our members.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary">Make a Donation</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Donation Amount (KES)</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value ? parseInt(e.target.value) : '')}
                        placeholder="Enter amount"
                        required
                      />
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className={`${amount === 500 ? 'bg-secondary text-secondary-foreground' : ''}`}
                          onClick={() => handlePresetAmount(500)}
                        >
                          KES 500
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          className={`${amount === 1000 ? 'bg-secondary text-secondary-foreground' : ''}`}
                          onClick={() => handlePresetAmount(1000)}
                        >
                          KES 1,000
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          className={`${amount === 5000 ? 'bg-secondary text-secondary-foreground' : ''}`}
                          onClick={() => handlePresetAmount(5000)}
                        >
                          KES 5,000
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          className={`${amount === 10000 ? 'bg-secondary text-secondary-foreground' : ''}`}
                          onClick={() => handlePresetAmount(10000)}
                        >
                          KES 10,000
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Leave a message"
                        rows={3}
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary-dark"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Processing...' : 'Donate Now'}
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground">
                      Your donation is securely processed. You will receive a confirmation email with your donation details.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="bg-light p-6 rounded-lg">
            <h2 className="text-xl font-bold text-primary mb-4 text-center">Other Ways to Support</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2">Volunteer</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Share your skills and time to support our programs and initiatives.
                  </p>
                  <Link to="/contact">
                    <Button variant="outline" className="w-full">Contact Us</Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2">Corporate Sponsorship</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Partner with us for events, training programs, or ongoing initiatives.
                  </p>
                  <Link to="/contact">
                    <Button variant="outline" className="w-full">Learn More</Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2">Equipment Donation</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Donate safety gear, educational materials, or technology.
                  </p>
                  <Link to="/contact">
                    <Button variant="outline" className="w-full">Get Details</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Donate;
