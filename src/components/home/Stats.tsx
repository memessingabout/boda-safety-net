
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatProps {
  label: string;
  value: number;
  suffix: string;
  delay: number;
}

const StatCard = ({ label, value, suffix, delay }: StatProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setTimeout(() => {
            const duration = 2000;
            const startTime = Date.now();
            
            const updateCounter = () => {
              const currentTime = Date.now();
              const elapsed = currentTime - startTime;
              
              const progress = Math.min(elapsed / duration, 1);
              const currentValue = Math.floor(progress * value);
              
              setDisplayValue(currentValue);
              
              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                setDisplayValue(value);
              }
            };
            
            updateCounter();
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [value, delay]);

  return (
    <Card className="text-center bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="pt-6">
        <div ref={counterRef} className="font-bold text-4xl md:text-5xl text-primary">
          {displayValue}
          <span className="text-secondary">{suffix}</span>
        </div>
        <div className="text-muted-foreground mt-2">{label}</div>
      </CardContent>
    </Card>
  );
};

const Stats = () => {
  const stats = [
    { label: 'Motorcycles', value: 90, suffix: 'k+', delay: 0 },
    { label: 'Motorcycle Zones', value: 6, suffix: 'k+', delay: 300 },
    { label: 'Saccos', value: 500, suffix: '+', delay: 600 },
  ];

  return (
    <section className={cn("py-10 bg-gradient-to-r from-primary-light to-primary")}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Promoting Safety, Financial Empowerment & Development
        </h2>
        <p className="text-center text-white mb-12 max-w-3xl mx-auto">
          With a strong reputation and a wide network of members across Kenya, our association is a trusted leader in the industry
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard 
              key={index} 
              label={stat.label} 
              value={stat.value} 
              suffix={stat.suffix}
              delay={stat.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
