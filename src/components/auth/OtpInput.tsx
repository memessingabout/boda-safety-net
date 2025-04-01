
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  className?: string;
}

const OtpInput = ({ length = 6, onComplete, className }: OtpInputProps) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  
  useEffect(() => {
    // Focus the first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    
    // Allow only one digit per input
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input if current input is filled
      if (value && index < length - 1) {
        inputRefs.current[index + 1].focus();
      }
      
      // Call onComplete if all inputs are filled
      if (newOtp.every(val => val) && newOtp.length === length) {
        onComplete?.(newOtp.join(""));
      }
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Navigate inputs with arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (e.key === "Backspace" && !otp[index]) {
      // Move to previous input on backspace if current is empty
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    
    // Extract digits only
    const digits = pastedData.match(/\d/g) || [];
    
    // Fill OTP fields with pasted digits
    const newOtp = [...otp];
    digits.forEach((digit, idx) => {
      if (idx < length) {
        newOtp[idx] = digit;
      }
    });
    
    setOtp(newOtp);
    
    // Focus appropriate field
    const lastFilledIndex = Math.min(digits.length, length) - 1;
    if (lastFilledIndex >= 0) {
      inputRefs.current[lastFilledIndex].focus();
    }
    
    // Call onComplete if all inputs are filled
    if (newOtp.every(val => val) && newOtp.length === length) {
      onComplete?.(newOtp.join(""));
    }
  };
  
  return (
    <div className={cn("flex justify-center gap-2", className)}>
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(el) => {
            if (el) inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className={cn(
            "w-12 h-12 text-center text-lg font-bold rounded-md border border-input",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        />
      ))}
    </div>
  );
};

export default OtpInput;
