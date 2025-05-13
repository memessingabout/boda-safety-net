
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { User, Mail, Phone, MapPin, Edit2, Save, X } from "lucide-react";

// Mock user type
interface UserData {
  name: string;
  phoneNumber: string;
  email?: string;
  idNumber?: string;
  county?: string;
  subCounty?: string;
  ward?: string;
  membershipId: string;
  joinDate: string;
  bio?: string;
  address?: string;
}

const MemberProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserData>>({});

  useEffect(() => {
    // Get user data from localStorage
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      
      // Add mock data for profile demo
      const enhancedUser = {
        ...parsedUser,
        email: "member@digitalboda.co.ke", 
        idNumber: "123456789",
        county: "Nairobi",
        subCounty: "Westlands",
        ward: "Parklands",
        bio: "Boda driver with 5 years of experience",
        address: "123 Boda Street, Nairobi"
      };
      
      setUserData(enhancedUser);
      setFormData(enhancedUser);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (userData && formData) {
      const updatedUser = { ...userData, ...formData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUserData(updatedUser);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    }
  };

  const handleCancel = () => {
    setFormData(userData || {});
    setIsEditing(false);
  };

  if (!userData) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" />
                <AvatarFallback className="text-3xl bg-primary text-white">
                  {userData.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>{userData.name}</CardTitle>
            <CardDescription className="mb-2">Member ID: {userData.membershipId}</CardDescription>
            <CardDescription>Member since: {new Date(userData.joinDate).toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="text-primary h-4 w-4" />
                <span>+{userData.phoneNumber.replace(/(\d{3})(\d{3})(\d{6})/, '$1 $2 $3')}</span>
              </div>
              {userData.email && (
                <div className="flex items-center gap-3">
                  <Mail className="text-primary h-4 w-4" />
                  <span>{userData.email}</span>
                </div>
              )}
              {userData.county && (
                <div className="flex items-center gap-3">
                  <MapPin className="text-primary h-4 w-4" />
                  <span>{userData.county}, {userData.subCounty}</span>
                </div>
              )}
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name || ''} 
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idNumber">ID Number</Label>
                    <Input 
                      id="idNumber" 
                      name="idNumber" 
                      value={formData.idNumber || ''} 
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email || ''} 
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input 
                      id="phoneNumber" 
                      name="phoneNumber" 
                      value={formData.phoneNumber || ''} 
                      onChange={handleChange} 
                      disabled
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="county">County</Label>
                    <Input 
                      id="county" 
                      name="county" 
                      value={formData.county || ''} 
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subCounty">Sub County</Label>
                    <Input 
                      id="subCounty" 
                      name="subCounty" 
                      value={formData.subCounty || ''} 
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ward">Ward</Label>
                    <Input 
                      id="ward" 
                      name="ward" 
                      value={formData.ward || ''} 
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    value={formData.address || ''} 
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    name="bio" 
                    rows={4} 
                    value={formData.bio || ''} 
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="mr-2 h-4 w-4" /> Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                    <p className="mt-1">{userData.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">ID Number</h3>
                    <p className="mt-1">{userData.idNumber || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                    <p className="mt-1">{userData.email || "Not provided"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Phone Number</h3>
                    <p className="mt-1">+{userData.phoneNumber.replace(/(\d{3})(\d{3})(\d{6})/, '$1 $2 $3')}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                  <p className="mt-1">
                    {[userData.county, userData.subCounty, userData.ward]
                      .filter(Boolean)
                      .join(", ") || "Not provided"}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                  <p className="mt-1">{userData.address || "Not provided"}</p>
                </div>
                
                {userData.bio && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
                    <p className="mt-1">{userData.bio}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemberProfile;
