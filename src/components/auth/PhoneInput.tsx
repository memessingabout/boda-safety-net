
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}

const PhoneInput = ({ value, onChange, error, className }: PhoneInputProps) => {
  const [focused, setFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    
    // Remove any non-digit characters
    input = input.replace(/\D/g, '');
    
    // Apply formatting - Kenya phone number format
    if (input.length > 0) {
      if (input.startsWith('254')) {
        // Allow full format with country code
        input = input;
      } else if (input.startsWith('0')) {
        // Convert 0XXX to 254XXX
        input = '254' + input.substring(1);
      } else if (input.length <= 9) {
        // Assume user is typing without prefix, auto-add 254
        input = '254' + input;
      }
    }
    
    // Limit length
    if (input.length > 12) {
      input = input.slice(0, 12);
    }
    
    onChange(input);
  };

  const formatForDisplay = (phoneNumber: string) => {
    if (!phoneNumber) return '';
    
    if (phoneNumber.startsWith('254')) {
      // Format: 254 XXX XXXXXX
      if (phoneNumber.length > 3) {
        return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6)}`;
      }
      return `+${phoneNumber}`;
    }
    
    return phoneNumber;
  };

  return (
    <div className={className}>
      <Label htmlFor="phone" className={cn("mb-2", error && "text-destructive")}>
        Phone Number
      </Label>
      <div className="relative">
        <Input
          id="phone"
          type="tel"
          value={formatForDisplay(value)}
          onChange={handleChange}
          placeholder="+254 7XX XXXXXX"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "pl-12",
            error && "border-destructive focus-visible:ring-destructive"
          )}
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {!value && !focused ? "+254" : ""}
        </div>
      </div>
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
};

export default PhoneInput;
