
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Award, ArrowDown, ArrowUp, Minus } from "lucide-react";

// Mock types for leaderboard
interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  county: string;
  points: number;
  contributionsAmount: number;
  safetyScore: number;
  changeDirection: "up" | "down" | "same";
  changeAmount: number;
}

// Mock leaderboard data
const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: "1",
    rank: 1,
    name: "John Kamau",
    county: "Nairobi",
    points: 9850,
    contributionsAmount: 15000,
    safetyScore: 98,
    changeDirection: "same",
    changeAmount: 0
  },
  {
    id: "2",
    rank: 2,
    name: "David Ochieng",
    county: "Kisumu",
    points: 9740,
    contributionsAmount: 18500,
    safetyScore: 95,
    changeDirection: "up",
    changeAmount: 2
  },
  {
    id: "3",
    rank: 3,
    name: "Michael Mwangi",
    county: "Nakuru",
    points: 9680,
    contributionsAmount: 12000,
    safetyScore: 96,
    changeDirection: "down",
    changeAmount: 1
  },
  {
    id: "4",
    rank: 4,
    name: "Sarah Wanjiku",
    county: "Mombasa",
    points: 9520,
    contributionsAmount: 9800,
    safetyScore: 97,
    changeDirection: "up",
    changeAmount: 3
  },
  {
    id: "5",
    rank: 5,
    name: "Peter Kariuki",
    county: "Nairobi",
    points: 9340,
    contributionsAmount: 14200,
    safetyScore: 94,
    changeDirection: "same",
    changeAmount: 0
  },
  {
    id: "6",
    rank: 6,
    name: "James Omondi",
    county: "Mombasa",
    points: 9210,
    contributionsAmount: 8500,
    safetyScore: 93,
    changeDirection: "down",
    changeAmount: 2
  },
  {
    id: "7",
    rank: 7,
    name: "Lucy Njeri",
    county: "Nakuru",
    points: 9100,
    contributionsAmount: 11000,
    safetyScore: 92,
    changeDirection: "up",
    changeAmount: 1
  },
  {
    id: "8",
    rank: 8,
    name: "Francis Gitau",
    county: "Nairobi",
    points: 8950,
    contributionsAmount: 13000,
    safetyScore: 91,
    changeDirection: "down",
    changeAmount: 3
  },
  {
    id: "9",
    rank: 9,
    name: "Elizabeth Akinyi",
    county: "Kisumu",
    points: 8820,
    contributionsAmount: 7500,
    safetyScore: 90,
    changeDirection: "up",
    changeAmount: 2
  },
  {
    id: "10",
    rank: 10,
    name: "Daniel Kimani",
    county: "Nairobi",
    points: 8700,
    contributionsAmount: 10000,
    safetyScore: 89,
    changeDirection: "same",
    changeAmount: 0
  }
];

const Leaderboard = () => {
  const getUserRankStyle = (rank: number) => {
    if (rank === 1) return "bg-secondary text-secondary-foreground font-bold";
    if (rank === 2) return "bg-gray-300 text-gray-800 font-semibold";
    if (rank === 3) return "bg-amber-600 text-white font-semibold";
    return "";
  };

  const getChangeIcon = (direction: string) => {
    if (direction === "up") return <ArrowUp className="h-4 w-4 text-green-500" />;
    if (direction === "down") return <ArrowDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getRankSuffix = (rank: number) => {
    if (rank === 1) return "st";
    if (rank === 2) return "nd";
    if (rank === 3) return "rd";
    return "th";
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/10">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl text-primary">Member Leaderboard</CardTitle>
          </div>
          <CardDescription>
            Top performing members based on contributions, safety record, and participation
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Member</TableHead>
                <TableHead className="hidden md:table-cell">County</TableHead>
                <TableHead className="text-right">Points</TableHead>
                <TableHead className="hidden md:table-cell text-right">Contributions</TableHead>
                <TableHead className="hidden md:table-cell text-right">Safety Score</TableHead>
                <TableHead className="w-20">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLeaderboard.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <Badge className={`${getUserRankStyle(entry.rank)} w-8 h-8 flex items-center justify-center rounded-full p-0`}>
                      {entry.rank}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10">
                          {entry.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      {entry.name}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{entry.county}</TableCell>
                  <TableCell className="font-semibold text-right">{entry.points.toLocaleString()}</TableCell>
                  <TableCell className="hidden md:table-cell text-right">KSh {entry.contributionsAmount.toLocaleString()}</TableCell>
                  <TableCell className="hidden md:table-cell text-right">{entry.safetyScore}/100</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 justify-center">
                      {getChangeIcon(entry.changeDirection)}
                      {entry.changeAmount > 0 && <span className="text-xs">{entry.changeAmount}</span>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">Your Current Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">32<span className="text-base text-muted-foreground">{getRankSuffix(32)}</span></span>
              <Badge variant="outline" className="ml-2 gap-1">
                <ArrowUp className="h-3 w-3 text-green-500" />
                <span className="text-xs">5</span>
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">Your Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5,280</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">Your Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">KSh 4,500</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">Safety Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">84<span className="text-base text-muted-foreground">/100</span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
