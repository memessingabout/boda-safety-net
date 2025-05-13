
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MemberProfile from "@/components/members/MemberProfile";
import NoticeBoard from "@/components/members/NoticeBoard";
import CausesContributions from "@/components/members/CausesContributions";
import Leaderboard from "@/components/members/Leaderboard";
import EmergencyContacts from "@/components/members/EmergencyContacts";
import TrustedPlaces from "@/components/members/TrustedPlaces";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MemberDashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  if (!isLoggedIn) {
    return null; // Don't render anything while checking auth
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-primary mb-6">Member Dashboard</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8 w-full max-w-4xl mx-auto flex flex-wrap justify-center">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notices">Notices & Updates</TabsTrigger>
            <TabsTrigger value="causes">Causes & Contributions</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
            <TabsTrigger value="places">Trusted Places</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <MemberProfile />
          </TabsContent>
          
          <TabsContent value="notices" className="mt-6">
            <NoticeBoard />
          </TabsContent>
          
          <TabsContent value="causes" className="mt-6">
            <CausesContributions />
          </TabsContent>
          
          <TabsContent value="leaderboard" className="mt-6">
            <Leaderboard />
          </TabsContent>
          
          <TabsContent value="emergency" className="mt-6">
            <EmergencyContacts />
          </TabsContent>
          
          <TabsContent value="places" className="mt-6">
            <TrustedPlaces />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default MemberDashboard;
