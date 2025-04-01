
import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/home/Hero";
import MissionValues from "@/components/home/MissionValues";
import Stats from "@/components/home/Stats";
import Objectives from "@/components/home/Objectives";
import TeamSection from "@/components/home/TeamSection";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <MissionValues />
      <Stats />
      <Objectives />
      <TeamSection />
      <CallToAction />
    </MainLayout>
  );
};

export default Index;
