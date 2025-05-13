
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4 text-center text-secondary-foreground">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Now It's Your Turn
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Hundreds of People Join Our Association Every Single Day!
        </p>
        <Link to="/register">
          <Button size="lg" className="bg-primary text-white hover:bg-primary-dark">
            Register
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
