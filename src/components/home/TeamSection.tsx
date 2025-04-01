
import { Card, CardContent } from "@/components/ui/card";

interface TeamMemberProps {
  name: string;
  role: string;
  imageSrc: string;
  bio?: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, imageSrc, bio }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[4/5] relative overflow-hidden">
        <img 
          src={imageSrc} 
          alt={name} 
          className="object-cover w-full h-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80";
          }}
        />
      </div>
      <CardContent className="p-6 text-center">
        <h3 className="font-bold text-xl text-primary mb-1">{name}</h3>
        <p className="text-secondary mb-3">{role}</p>
        {bio && <p className="text-muted-foreground text-sm line-clamp-3">{bio}</p>}
      </CardContent>
    </Card>
  );
};

const TeamSection = () => {
  const team = [
    {
      name: "Calvince Okumu",
      role: "Association President",
      imageSrc: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      bio: "Calvince Okumu is a leading figure in Kenya's digital boda boda and delivery services industry. As the President of DBDDAK, he advocates for the safety, welfare, and fair treatment of riders."
    },
    {
      name: "Jaffary Samia Yusuf",
      role: "Association Vice - president",
      imageSrc: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      bio: "As Vice-President, Jaffary is dedicated to advocating for the rights of our members and ensuring that their voices are heard."
    },
    {
      name: "Boniface",
      role: "Secretary",
      imageSrc: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      bio: "As Secretary, Boniface is responsible for the efficient and effective operation of the association."
    }
  ];

  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark mb-4">
            Our Professional Team
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Our team of experts brings a wealth of knowledge and experience to the association, ensuring that our members receive the best possible support.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              imageSrc={member.imageSrc}
              bio={member.bio}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
