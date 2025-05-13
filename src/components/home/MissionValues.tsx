
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MissionValues = () => {
  const values = [
    "Professionalism",
    "Safety",
    "Integrity",
    "Inclusivity",
    "Innovation"
  ];

  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Mission */}
          <Card className="bg-white border-t-4 border-t-primary shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-dark">
                To promote professionalism, safety, and economic empowerment within the boda boda and courier sector in Kenya.
              </p>
            </CardContent>
          </Card>

          {/* Values */}
          <Card className="bg-white border-t-4 border-t-secondary shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-secondary-dark">Values</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {values.map((value, index) => (
                  <li key={index} className="flex items-center">
                    <Check size={18} className="text-secondary-dark mr-2" />
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card className="bg-white border-t-4 border-t-accent shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-accent-dark">Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-dark">
                To be the leading voice and advocate for boda boda drivers and delivery riders in Kenya, ensuring their rights, welfare, and sustainable development.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MissionValues;
