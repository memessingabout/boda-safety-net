
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { PhoneCall, UserRoundPlus, Edit2, Save, Trash2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock types for emergency contacts
interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phoneNumber: string;
  isNextOfKin: boolean;
}

const EmergencyContacts = () => {
  // Mock initial data
  const initialContacts: EmergencyContact[] = [
    {
      id: "1",
      name: "Mary Wanjiku",
      relationship: "Spouse",
      phoneNumber: "254712345678",
      isNextOfKin: true
    },
    {
      id: "2",
      name: "James Kamau",
      relationship: "Brother",
      phoneNumber: "254723456789",
      isNextOfKin: false
    }
  ];
  
  const [contacts, setContacts] = useState<EmergencyContact[]>(initialContacts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const [formValues, setFormValues] = useState<Omit<EmergencyContact, 'id'>>({
    name: "",
    relationship: "",
    phoneNumber: "",
    isNextOfKin: false
  });

  // Get stored contacts from localStorage on component mount
  useEffect(() => {
    const storedContacts = localStorage.getItem("emergencyContacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("emergencyContacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = (field: string, value: string | boolean) => {
    setFormValues({
      ...formValues,
      [field]: value
    });
  };

  const startAddContact = () => {
    setFormValues({
      name: "",
      relationship: "",
      phoneNumber: "",
      isNextOfKin: false
    });
    setIsAdding(true);
    setEditingId(null);
  };

  const startEditContact = (contact: EmergencyContact) => {
    setFormValues({
      name: contact.name,
      relationship: contact.relationship,
      phoneNumber: contact.phoneNumber,
      isNextOfKin: contact.isNextOfKin
    });
    setEditingId(contact.id);
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast.success("Contact deleted successfully");
  };

  const validateForm = () => {
    if (!formValues.name.trim()) {
      toast.error("Please enter a name");
      return false;
    }
    if (!formValues.relationship.trim()) {
      toast.error("Please select a relationship");
      return false;
    }
    if (!formValues.phoneNumber.trim() || !/^\d{12}$/.test(formValues.phoneNumber)) {
      toast.error("Please enter a valid 12-digit phone number");
      return false;
    }
    return true;
  };

  const saveContact = () => {
    if (!validateForm()) return;

    if (isAdding) {
      // If adding a new contact
      const newContact: EmergencyContact = {
        id: Date.now().toString(),
        ...formValues
      };
      
      // If this is set as next of kin, update others
      if (formValues.isNextOfKin) {
        setContacts(prevContacts => 
          prevContacts.map(contact => ({
            ...contact,
            isNextOfKin: false
          })).concat(newContact)
        );
      } else {
        setContacts([...contacts, newContact]);
      }
      
      toast.success("Contact added successfully");
    } else if (editingId) {
      // If editing an existing contact
      setContacts(prevContacts => 
        prevContacts.map(contact => {
          // If this is the edited contact
          if (contact.id === editingId) {
            return {
              ...contact,
              ...formValues
            };
          }
          
          // If setting this as next of kin, remove that status from others
          if (formValues.isNextOfKin && contact.id !== editingId) {
            return {
              ...contact,
              isNextOfKin: false
            };
          }
          
          return contact;
        })
      );
      
      toast.success("Contact updated successfully");
    }

    setIsAdding(false);
    setEditingId(null);
  };

  const formatPhoneNumber = (phone: string) => {
    if (phone.startsWith('254')) {
      return `+${phone.replace(/(\d{3})(\d{3})(\d{6})/, '$1 $2 $3')}`;
    }
    return phone;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Emergency Contacts</h2>
        <Button onClick={startAddContact} disabled={isAdding || editingId !== null}>
          <UserRoundPlus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </div>
      
      <Alert variant="default" className="bg-primary/5 border-primary/20">
        <PhoneCall className="h-4 w-4 text-primary" />
        <AlertTitle>Next of Kin & Emergency Contacts</AlertTitle>
        <AlertDescription>
          Add important contacts to be reached in case of emergency. Designate one contact as your next of kin.
        </AlertDescription>
      </Alert>
      
      {(isAdding || editingId !== null) && (
        <Card>
          <CardHeader>
            <CardTitle>{isAdding ? "Add New Contact" : "Edit Contact"}</CardTitle>
            <CardDescription>
              {isAdding 
                ? "Add details of your emergency contact" 
                : "Update details of your emergency contact"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={formValues.name} 
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Select 
                    value={formValues.relationship} 
                    onValueChange={(value) => handleChange("relationship", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Spouse">Spouse</SelectItem>
                      <SelectItem value="Parent">Parent</SelectItem>
                      <SelectItem value="Child">Child</SelectItem>
                      <SelectItem value="Sibling">Sibling</SelectItem>
                      <SelectItem value="Friend">Friend</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={formValues.phoneNumber} 
                  onChange={(e) => handleChange("phoneNumber", e.target.value.replace(/\D/g, ''))}
                  placeholder="254XXXXXXXXX"
                  maxLength={12}
                />
                <p className="text-xs text-muted-foreground">Enter a 12-digit number starting with 254</p>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="nextOfKin"
                  checked={formValues.isNextOfKin}
                  onChange={(e) => handleChange("isNextOfKin", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="nextOfKin" className="text-sm font-normal">
                  Set as Next of Kin
                </Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={cancelEdit}>
              Cancel
            </Button>
            <Button onClick={saveContact}>
              <Save className="mr-2 h-4 w-4" />
              Save Contact
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contacts.map((contact) => (
          <Card key={contact.id} className={contact.isNextOfKin ? "border-primary" : ""}>
            <CardHeader className={contact.isNextOfKin ? "pb-2" : "pb-6"}>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  {contact.name}
                </CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => startEditContact(contact)}
                    disabled={isAdding || editingId !== null}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive hover:text-destructive/90"
                    onClick={() => deleteContact(contact.id)}
                    disabled={isAdding || editingId !== null}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {contact.isNextOfKin && (
                <Badge className="bg-primary text-white mt-2">Next of Kin</Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Relationship</p>
                  <p>{contact.relationship}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <div className="flex items-center">
                    <PhoneCall className="h-4 w-4 mr-2 text-primary" />
                    <p>{formatPhoneNumber(contact.phoneNumber)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {contacts.length === 0 && !isAdding && (
          <div className="col-span-full text-center py-8 border border-dashed rounded-lg">
            <p className="text-muted-foreground">No emergency contacts added yet.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={startAddContact}
            >
              <UserRoundPlus className="mr-2 h-4 w-4" />
              Add Your First Contact
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Missing Badge import
const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
};

export default EmergencyContacts;
