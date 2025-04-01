
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Scale, Award, PiggyBank, FileCheck, UserCheck, Heart, UsersRound, Smartphone } from "lucide-react";

const ObjectiveCard = ({ icon: Icon, title, description }: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) => (
  <Card className="hover:shadow-lg transition-all duration-300">
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

const Objectives = () => {
  const objectives = [
    {
      icon: ShieldCheck,
      title: "Promoting Safety Standards",
      description: "Ensuring the highest safety standards for all members and customers, minimizing accidents and encouraging responsible riding."
    },
    {
      icon: PiggyBank,
      title: "Fostering Financial Empowerment",
      description: "Facilitating links to access financial services, savings, loans, and investment opportunities for economic independence."
    },
    {
      icon: Scale,
      title: "Advocate for Fair Working Conditions",
      description: "Lobby for fair compensation, favorable working conditions, and legal protections for all digital boda drivers."
    },
    {
      icon: Heart,
      title: "Support Health and Welfare",
      description: "Championing for health insurance and welfare programs that enhance the well-being and quality of life of members."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark mb-4">
            Objectives of the Digital Boda Drivers and Deliveries Association
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Our aim is to improve the livelihoods of our members and contribute to the growth of the industry.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {objectives.map((objective, index) => (
            <ObjectiveCard
              key={index}
              icon={objective.icon}
              title={objective.title}
              description={objective.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Objectives;
