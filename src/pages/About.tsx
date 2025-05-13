
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <MainLayout>
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
          <p className="text-white text-lg">Learn about our organization's mission, vision, and values.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="md:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Our Story</h2>
              <p className="mb-4">
                Digital Boda and Deliveries Association of Kenya (DBDDAK) was formed to bring together all digital boda boda riders and drivers in Kenya under one umbrella. The association aims to address the unique challenges faced by digital platform riders and drivers while promoting professionalism, safety, and economic empowerment.
              </p>
              <p className="mb-4">
                Founded in 2020, our association has grown rapidly and now represents thousands of riders across Kenya. We work closely with government agencies, digital platforms, and other stakeholders to ensure the rights and welfare of our members are protected.
              </p>
              <p>
                Our focus on professionalism, safety standards, and economic empowerment has positioned DBDDAK as a leading voice in the transportation and delivery sector in Kenya.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="aspect-video w-full bg-primary-light/20 flex items-center justify-center mb-4">
                <img 
                  src="https://digitalboda.co.ke/wp-content/uploads/2024/05/about-digitalboda.png" 
                  alt="Digital Boda riders" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Our Impact</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Over 90,000 motorcycles represented</li>
                <li>Present in 6,000+ motorcycle zones</li>
                <li>More than 500 Saccos affiliated</li>
                <li>Partnerships with major digital platforms</li>
                <li>Ongoing training and safety programs</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-light p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">Our Approach</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-primary-dark mb-2">Advocacy</h3>
              <p>
                We advocate for fair working conditions, appropriate regulations, and policies that benefit our members while promoting the growth of the industry.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary-dark mb-2">Training</h3>
              <p>
                We provide regular training on road safety, customer service, and financial literacy to enhance the skills and knowledge of our members.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary-dark mb-2">Welfare</h3>
              <p>
                We champion for welfare programs including health insurance, accident cover, and emergency assistance for our members.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary-dark mb-2">Community</h3>
              <p>
                We foster a sense of community among digital riders, providing a platform for networking, knowledge sharing, and mutual support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
