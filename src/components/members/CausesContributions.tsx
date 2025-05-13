
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Heart, Users, Calendar } from "lucide-react";

// Mock type for a cause
interface Cause {
  id: string;
  title: string;
  description: string;
  reason: string;
  targetAmount: number;
  currentAmount: number;
  contributorsCount: number;
  deadline: string;
  isActive: boolean;
}

// Mock causes data
const mockCauses: Cause[] = [
  {
    id: "1",
    title: "Medical Fund for Injured Drivers",
    description: "Supporting our members during medical emergencies from road accidents",
    reason: "Many of our members lack comprehensive insurance coverage. This fund aims to provide immediate financial assistance to drivers who get injured while working.",
    targetAmount: 500000,
    currentAmount: 325000,
    contributorsCount: 134,
    deadline: "2025-07-15",
    isActive: true
  },
  {
    id: "2",
    title: "Boda Boda Shelters Project",
    description: "Building weather-proof shelters at major waiting points",
    reason: "Boda operators often wait for long hours in adverse weather conditions. These shelters will provide protection from rain and sun, enhancing working conditions.",
    targetAmount: 350000,
    currentAmount: 98000,
    contributorsCount: 67,
    deadline: "2025-08-30",
    isActive: true
  },
  {
    id: "3",
    title: "Riders' Children Education Fund",
    description: "Supporting education for children of association members",
    reason: "Education is key to breaking cycles of poverty. This fund will provide scholarships to members' children for primary and secondary education.",
    targetAmount: 750000,
    currentAmount: 283000,
    contributorsCount: 95,
    deadline: "2025-09-01",
    isActive: true
  },
  {
    id: "4",
    title: "Road Safety Campaign",
    description: "Public awareness and rider training on road safety",
    reason: "Reducing accidents through education and training. The fund will support production of training materials and organizing workshops across counties.",
    targetAmount: 200000,
    currentAmount: 178500,
    contributorsCount: 112,
    deadline: "2025-06-30",
    isActive: true
  }
];

const CausesContributions = () => {
  const [causes, setCauses] = useState<Cause[]>(mockCauses);
  const [selectedCause, setSelectedCause] = useState<Cause | null>(null);
  const [contributionAmount, setContributionAmount] = useState<string>("");

  const handleContribute = (cause: Cause) => {
    setSelectedCause(cause);
    setContributionAmount("");
  };

  const submitContribution = () => {
    const amount = parseFloat(contributionAmount);

    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (selectedCause) {
      // Update the cause with new contribution
      const updatedCauses = causes.map(cause => 
        cause.id === selectedCause.id 
          ? { 
              ...cause, 
              currentAmount: cause.currentAmount + amount,
              contributorsCount: cause.contributorsCount + 1
            } 
          : cause
      );
      
      setCauses(updatedCauses);
      setSelectedCause(null);
      toast.success(`Thank you for contributing KSh ${amount.toLocaleString()} to ${selectedCause.title}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Causes & Contributions</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {causes.map((cause) => (
          <Card key={cause.id}>
            <CardHeader>
              <CardTitle>{cause.title}</CardTitle>
              <CardDescription>{cause.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>
                    KSh {cause.currentAmount.toLocaleString()} of KSh {cause.targetAmount.toLocaleString()}
                  </span>
                </div>
                <Progress 
                  value={(cause.currentAmount / cause.targetAmount) * 100} 
                  className="h-2"
                />
              </div>
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{cause.contributorsCount} Contributors</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Deadline: {formatDate(cause.deadline)}</span>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <p className="text-sm mb-4">{cause.reason}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" onClick={() => handleContribute(cause)}>
                    <Heart className="mr-2 h-4 w-4" />
                    Contribute
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Contribute to {cause.title}</DialogTitle>
                    <DialogDescription>
                      Enter the amount you would like to contribute to this cause.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (KSh)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={contributionAmount}
                        onChange={(e) => setContributionAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={submitContribution}>
                      <Heart className="mr-2 h-4 w-4" />
                      Contribute
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CausesContributions;
