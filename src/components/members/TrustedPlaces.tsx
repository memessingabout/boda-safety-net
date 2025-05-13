
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { MapPin, Phone, Star, Plus, Edit2, Trash2, ExternalLink } from "lucide-react";

// Mock types for trusted places
interface TrustedPlace {
  id: string;
  name: string;
  location: string;
  serviceOffered: string;
  contactInfo: string;
  description: string;
  rating: number;
}

// Mock places data
const mockPlaces: TrustedPlace[] = [
  {
    id: "1",
    name: "Kamau Auto Repair",
    location: "Ngara, Nairobi",
    serviceOffered: "Motorcycle Repair",
    contactInfo: "254712345678",
    description: "Specializes in boda boda repairs with fair prices and quality service. Open 7 days a week from 8am to 8pm.",
    rating: 4.8
  },
  {
    id: "2",
    name: "SafeRider Gear Shop",
    location: "CBD, Nairobi",
    serviceOffered: "Safety Equipment",
    contactInfo: "254723456789",
    description: "Quality helmets, reflective jackets, and other safety gear for riders. Offers discounts for association members.",
    rating: 4.5
  },
  {
    id: "3",
    name: "Quick Tyre Centre",
    location: "Westlands, Nairobi",
    serviceOffered: "Tyre Replacement & Repair",
    contactInfo: "254734567890",
    description: "Specializes in motorcycle tyres. Fast puncture repairs and affordable replacement options.",
    rating: 4.2
  }
];

const TrustedPlaces = () => {
  const [places, setPlaces] = useState<TrustedPlace[]>(mockPlaces);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentPlace, setCurrentPlace] = useState<TrustedPlace | null>(null);
  
  const [formValues, setFormValues] = useState<Omit<TrustedPlace, 'id'>>({
    name: "",
    location: "",
    serviceOffered: "",
    contactInfo: "",
    description: "",
    rating: 5
  });

  // Load places from localStorage on component mount
  useEffect(() => {
    const storedPlaces = localStorage.getItem("trustedPlaces");
    if (storedPlaces) {
      setPlaces(JSON.parse(storedPlaces));
    }
  }, []);

  // Save places to localStorage when they change
  useEffect(() => {
    localStorage.setItem("trustedPlaces", JSON.stringify(places));
  }, [places]);

  const handleChange = (field: keyof typeof formValues, value: string | number) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddPlace = () => {
    if (!validateForm()) return;

    const newPlace: TrustedPlace = {
      id: Date.now().toString(),
      ...formValues
    };

    setPlaces([...places, newPlace]);
    toast.success(`${newPlace.name} added to trusted places`);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditPlace = () => {
    if (!validateForm() || !currentPlace) return;

    const updatedPlaces = places.map(place => 
      place.id === currentPlace.id ? { ...place, ...formValues } : place
    );

    setPlaces(updatedPlaces);
    toast.success(`${formValues.name} updated successfully`);
    setIsEditDialogOpen(false);
    setCurrentPlace(null);
    resetForm();
  };

  const handleDeletePlace = (id: string) => {
    const placeToDelete = places.find(place => place.id === id);
    setPlaces(places.filter(place => place.id !== id));
    toast.success(`${placeToDelete?.name} removed from trusted places`);
  };

  const startEditPlace = (place: TrustedPlace) => {
    setCurrentPlace(place);
    setFormValues({
      name: place.name,
      location: place.location,
      serviceOffered: place.serviceOffered,
      contactInfo: place.contactInfo,
      description: place.description,
      rating: place.rating
    });
    setIsEditDialogOpen(true);
  };

  const validateForm = () => {
    if (!formValues.name.trim()) {
      toast.error("Please enter a name");
      return false;
    }
    if (!formValues.location.trim()) {
      toast.error("Please enter a location");
      return false;
    }
    if (!formValues.serviceOffered.trim()) {
      toast.error("Please enter the service offered");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormValues({
      name: "",
      location: "",
      serviceOffered: "",
      contactInfo: "",
      description: "",
      rating: 5
    });
  };

  const formatPhoneNumber = (phone: string) => {
    if (phone && phone.startsWith('254')) {
      return `+${phone.replace(/(\d{3})(\d{3})(\d{6})/, '$1 $2 $3')}`;
    }
    return phone;
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-secondary text-secondary" />
        ))}
        {hasHalfStar && <Star className="h-4 w-4 fill-secondary text-secondary" />}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground" />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Trusted Places</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Place
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Trusted Place</DialogTitle>
              <DialogDescription>
                Add details of a business or service you recommend to other members.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={formValues.name} 
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Business name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={formValues.location} 
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="Neighborhood, City"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="service">Service Offered</Label>
                <Input 
                  id="service" 
                  value={formValues.serviceOffered} 
                  onChange={(e) => handleChange("serviceOffered", e.target.value)}
                  placeholder="Type of service"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Information</Label>
                <Input 
                  id="contact" 
                  value={formValues.contactInfo} 
                  onChange={(e) => handleChange("contactInfo", e.target.value)}
                  placeholder="Phone number or email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  rows={3}
                  value={formValues.description} 
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe the services, quality, and why you recommend them"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input 
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formValues.rating} 
                  onChange={(e) => handleChange("rating", parseFloat(e.target.value))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPlace}>
                Add Place
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Trusted Place</DialogTitle>
              <DialogDescription>
                Update details of this place.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input 
                  id="edit-name" 
                  value={formValues.name} 
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input 
                  id="edit-location" 
                  value={formValues.location} 
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-service">Service Offered</Label>
                <Input 
                  id="edit-service" 
                  value={formValues.serviceOffered} 
                  onChange={(e) => handleChange("serviceOffered", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-contact">Contact Information</Label>
                <Input 
                  id="edit-contact" 
                  value={formValues.contactInfo} 
                  onChange={(e) => handleChange("contactInfo", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea 
                  id="edit-description" 
                  rows={3}
                  value={formValues.description} 
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-rating">Rating (1-5)</Label>
                <Input 
                  id="edit-rating"
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formValues.rating} 
                  onChange={(e) => handleChange("rating", parseFloat(e.target.value))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditPlace}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {places.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <p className="text-muted-foreground mb-4">No trusted places added yet.</p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Recommendation
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <Card key={place.id}>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="text-lg">{place.name}</CardTitle>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0" 
                      onClick={() => startEditPlace(place)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive/90"
                      onClick={() => handleDeletePlace(place.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {renderStars(place.rating)}
                  <span className="text-sm ml-2">{place.rating.toFixed(1)}</span>
                </div>
                <CardDescription className="mt-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {place.location}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">Service: {place.serviceOffered}</p>
                </div>
                
                {place.contactInfo && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <a 
                      href={`tel:${place.contactInfo}`} 
                      className="text-primary hover:underline"
                    >
                      {formatPhoneNumber(place.contactInfo)}
                    </a>
                  </div>
                )}
                
                <p className="text-sm">{place.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(place.name + ' ' + place.location)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    View on Map
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrustedPlaces;
