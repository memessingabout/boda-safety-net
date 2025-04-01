
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-green-900 to-primary py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Promoting professionalism, safety, and economic empowerment
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Supporting the boda boda sector in Kenya with a commitment to safety, welfare, and fair treatment of drivers and riders.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Learn More
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" className="bg-accent text-white hover:bg-accent-dark">
                Join Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-full md:w-1/2 h-full opacity-10 md:opacity-20">
        <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1534732806146-b3bf32171b48')] bg-no-repeat bg-cover bg-center"></div>
      </div>
    </section>
  );
};

export default Hero;
