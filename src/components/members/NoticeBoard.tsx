
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, BellRing, Calendar, ChevronDown, ChevronUp } from "lucide-react";

// Mock notice type
interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  isImportant: boolean;
  isRead: boolean;
}

// Mock notices data
const mockNotices: Notice[] = [
  {
    id: "1",
    title: "New Traffic Rules Implementation",
    content: "The government has announced new traffic rules to be implemented starting next month. All boda boda drivers must attend the orientation session organized by the association. Dates and venues will be communicated soon.",
    date: "2025-05-10T10:00:00Z",
    isImportant: true,
    isRead: false
  },
  {
    id: "2",
    title: "Annual General Meeting Announcement",
    content: "The Digital Boda Drivers Association Annual General Meeting will be held on June 15th, 2025 at Kenyatta International Convention Centre from 9:00 AM. All members are required to attend. Agenda includes election of new officials and financial report presentation.",
    date: "2025-05-08T14:30:00Z",
    isImportant: true,
    isRead: true
  },
  {
    id: "3",
    title: "New Insurance Partner",
    content: "We are pleased to announce our partnership with SafeRide Insurance. Members will get a 15% discount on all insurance products. Visit their offices with your membership ID to claim your discount.",
    date: "2025-05-05T09:15:00Z",
    isImportant: false,
    isRead: true
  },
  {
    id: "4",
    title: "Upcoming Training Sessions",
    content: "Free defensive driving and first aid training sessions will be conducted across all counties in the next three months. Check our calendar for dates in your region.",
    date: "2025-04-28T11:00:00Z",
    isImportant: false,
    isRead: true
  },
  {
    id: "5",
    title: "Mobile App Update Available",
    content: "We've released a new version of our mobile app with improved features including emergency assistance and real-time traffic updates. Please update your app to the latest version.",
    date: "2025-04-25T16:45:00Z",
    isImportant: false,
    isRead: false
  }
];

const NoticeBoard = () => {
  const [notices, setNotices] = useState<Notice[]>(mockNotices);
  const [expandedNotice, setExpandedNotice] = useState<string | null>(null);

  const markAsRead = (id: string) => {
    setNotices(notices.map(notice => 
      notice.id === id ? { ...notice, isRead: true } : notice
    ));
  };

  const toggleExpand = (id: string) => {
    if (expandedNotice === id) {
      setExpandedNotice(null);
    } else {
      setExpandedNotice(id);
      markAsRead(id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const unreadCount = notices.filter(notice => !notice.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">Notice Board</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} New
            </Badge>
          )}
        </div>
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          View Archive
        </Button>
      </div>
      
      <div className="space-y-4">
        {notices.map((notice) => (
          <Card 
            key={notice.id} 
            className={`transition-all duration-200 ${
              !notice.isRead ? 'border-l-4 border-l-primary' : ''
            }`}
          >
            <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleExpand(notice.id)}>
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  {notice.isImportant ? (
                    <BellRing className={`h-5 w-5 mt-1 ${!notice.isRead ? 'text-primary' : 'text-muted-foreground'}`} />
                  ) : (
                    <Bell className={`h-5 w-5 mt-1 ${!notice.isRead ? 'text-primary' : 'text-muted-foreground'}`} />
                  )}
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {notice.title}
                      {notice.isImportant && <Badge>Important</Badge>}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {formatDate(notice.date)}
                    </CardDescription>
                  </div>
                </div>
                {expandedNotice === notice.id ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </CardHeader>
            {expandedNotice === notice.id && (
              <CardContent>
                <div className="pt-2 whitespace-pre-line">
                  {notice.content}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;
