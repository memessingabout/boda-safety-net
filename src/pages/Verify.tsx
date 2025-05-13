
import { useState } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, Check, X, AlertTriangle } from "lucide-react";

const Verify = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'initial' | 'valid' | 'invalid' | 'loading'>('initial');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registrationNumber.trim()) {
      return;
    }

    setVerificationStatus('loading');

    // Simulate verification API call
    setTimeout(() => {
      // For demo purposes, consider specific numbers as valid or invalid
      // In a real app, this would check against your database
      if (registrationNumber.toLowerCase() === 'kdd123' || registrationNumber.toLowerCase() === 'kaa456') {
        setVerificationStatus('valid');
      } else {
        setVerificationStatus('invalid');
      }
    }, 1500);
  };

  const renderVerificationResult = () => {
    switch (verificationStatus) {
      case 'loading':
        return (
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <span className="ml-3">Verifying...</span>
          </div>
        );
      case 'valid':
        return (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
            <div className="flex items-center mb-3">
              <div className="bg-green-100 rounded-full p-2 mr-3">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold">Verified Digital Boda Member</h3>
            </div>
            <p className="mb-3">Registration Number: <strong>{registrationNumber.toUpperCase()}</strong></p>
            <p>This vehicle is registered with Digital Boda and Deliveries Association of Kenya. The rider has undergone proper training and verification.</p>
          </div>
        );
      case 'invalid':
        return (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            <div className="flex items-center mb-3">
              <div className="bg-red-100 rounded-full p-2 mr-3">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold">Unverified Registration</h3>
            </div>
            <p className="mb-3">Registration Number: <strong>{registrationNumber.toUpperCase()}</strong></p>
            <p>This registration number is not found in our database. If you believe this is an error, please contact us.</p>
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm">If you're concerned about the authenticity of a Digital Boda rider, please contact our support team at +254 702 423004.</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-center text-blue-800">Enter a registration number and click "Verify" to check its status.</p>
            <p className="text-center text-sm text-blue-600 mt-2">For demo purposes, try KDD123 or KAA456 for valid examples.</p>
          </div>
        );
    }
  };

  return (
    <MainLayout>
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Verify a Bike</h1>
          <p className="text-white text-lg">Check if a motorcycle is registered with Digital Boda.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Bike Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground">
                Enter the registration number of the motorcycle you want to verify. This will help you confirm if the boda boda is registered with our association.
              </p>
              
              <form onSubmit={handleSubmit} className="mb-8">
                <div className="space-y-2 mb-4">
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <div className="flex gap-3">
                    <Input
                      id="registrationNumber"
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      placeholder="e.g. KDD123"
                      className="flex-1"
                      disabled={verificationStatus === 'loading'}
                    />
                    <Button 
                      type="submit"
                      className="bg-secondary text-secondary-foreground hover:bg-secondary-dark"
                      disabled={verificationStatus === 'loading' || !registrationNumber.trim()}
                    >
                      {verificationStatus !== 'loading' ? (
                        <>
                          <Search className="h-4 w-4 mr-2" /> Verify
                        </>
                      ) : 'Verifying...'}
                    </Button>
                  </div>
                </div>
              </form>
              
              {renderVerificationResult()}
            </CardContent>
          </Card>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-primary mb-4">Why Verify?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">For Passengers</h3>
                <p>Verifying a boda boda ensures you're riding with a trained professional who adheres to our safety standards and code of conduct.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">For Businesses</h3>
                <p>Confirm that delivery personnel are registered members of our association, ensuring reliable and accountable service for your customers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Verify;
