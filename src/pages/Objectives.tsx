
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Scale, Award, PiggyBank, FileCheck, UserCheck, Heart, UsersRound, Smartphone } from "lucide-react";

const ObjectiveCard = ({ icon: Icon, title, description }: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) => (
  <Card className="hover:shadow-lg transition-all duration-300 h-full">
    <CardHeader className="pb-2">
      <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <CardTitle className="text-xl font-semibold text-dark">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const ObjectivesPage = () => {
  const objectives = [
    {
      icon: ShieldCheck,
      title: "Promoting Safety Standards",
      description: "Ensuring the highest safety standards for all members and customers, minimizing accidents and encouraging responsible riding through training programs and awareness campaigns."
    },
    {
      icon: PiggyBank,
      title: "Fostering Financial Empowerment",
      description: "Facilitating links to access financial services, savings, loans, and investment opportunities for economic independence and growth of our members and their families."
    },
    {
      icon: Scale,
      title: "Advocate for Fair Working Conditions",
      description: "Lobby for fair compensation, favorable working conditions, and legal protections for all digital boda drivers to ensure they are treated with dignity and respect."
    },
    {
      icon: Heart,
      title: "Support Health and Welfare",
      description: "Championing for health insurance and welfare programs that enhance the well-being and quality of life of members and provide essential support during challenging times."
    },
    {
      icon: UsersRound,
      title: "Build Professional Community",
      description: "Creating a strong, unified community of professional riders who support each other, share best practices, and collectively work to improve standards in the industry."
    },
    {
      icon: Award,
      title: "Recognize Excellence",
      description: "Acknowledging and rewarding riders who demonstrate exceptional professionalism, safety standards, and customer service to motivate continuous improvement."
    },
    {
      icon: FileCheck,
      title: "Ensure Compliance",
      description: "Helping members understand and comply with relevant regulations, licensing requirements, and industry standards to avoid legal issues and promote legitimacy."
    },
    {
      icon: Smartphone,
      title: "Embrace Technology",
      description: "Encouraging the adoption of technology solutions that enhance service delivery, improve safety, and increase efficiency for riders and customers alike."
    }
  ];

  return (
    <MainLayout>
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Our Objectives</h1>
          <p className="text-white text-lg">Learn about the key goals driving our organization forward.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Digital Boda Drivers and Deliveries Association's Key Objectives</h2>
          <p className="text-lg text-muted-foreground">
            Our association is guided by a comprehensive set of objectives aimed at improving the lives and working conditions of boda boda drivers while promoting professionalism and safety in the industry.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {objectives.map((objective, index) => (
            <ObjectiveCard
              key={index}
              icon={objective.icon}
              title={objective.title}
              description={objective.description}
            />
          ))}
        </div>

        <Card className="bg-light border-none">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-primary mb-4 text-center">Our Commitment</h3>
            <p className="text-center mb-6">
              We are dedicated to achieving these objectives through collaborative efforts with all stakeholders including government agencies, digital platforms, customers, and the broader community. By working together, we can create a safer, more professional, and economically empowering environment for all digital boda drivers in Kenya.
            </p>
            <div className="flex justify-center">
              <div className="bg-secondary-light/20 text-primary-dark p-4 rounded-lg max-w-2xl">
                <p className="italic text-center">
                  "Together, we can transform the digital boda sector into a model of professionalism, safety, and economic empowerment in Kenya."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ObjectivesPage;
