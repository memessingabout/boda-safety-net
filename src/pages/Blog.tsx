
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, User2, Tag, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
}

const Blog = () => {
  // Sample blog posts
  const posts: BlogPost[] = [
    {
      id: "safety-tips",
      title: "Essential Safety Tips for Boda Boda Riders",
      excerpt: "Discover the key safety practices that every professional rider should follow to ensure their wellbeing and that of their passengers.",
      date: "May 18, 2024",
      author: "Calvince Okumu",
      category: "Safety",
      image: "https://images.unsplash.com/photo-1614026480418-bd11fde6f9a2?q=80&w=600&auto=format&fit=crop",
      readTime: "5 min read"
    },
    {
      id: "financial-literacy",
      title: "Financial Literacy for Boda Boda Entrepreneurs",
      excerpt: "Learn how to manage your earnings effectively, save for the future, and create additional income streams as a boda boda rider.",
      date: "May 12, 2024",
      author: "Jaffary Samia Yusuf",
      category: "Finance",
      image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=600&auto=format&fit=crop",
      readTime: "8 min read"
    },
    {
      id: "digital-platforms",
      title: "Navigating Digital Platforms as a Rider",
      excerpt: "A comprehensive guide to working with various digital riding and delivery platforms in Kenya and maximizing your earnings.",
      date: "May 5, 2024",
      author: "Boniface",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1607338509396-a29a0be6a4ce?q=80&w=600&auto=format&fit=crop",
      readTime: "6 min read"
    },
    {
      id: "health-insurance",
      title: "Health Insurance Options for Riders",
      excerpt: "Explore available health insurance packages designed specifically for boda boda riders and their families.",
      date: "April 28, 2024",
      author: "Admin",
      category: "Welfare",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop",
      readTime: "4 min read"
    },
    {
      id: "maintenance-tips",
      title: "Motorcycle Maintenance: Extend Your Bike's Life",
      excerpt: "Simple but effective maintenance tips that will keep your motorcycle running smoothly and save you money on repairs.",
      date: "April 21, 2024",
      author: "Admin",
      category: "Maintenance",
      image: "https://images.unsplash.com/photo-1558980394-0a06c4631733?q=80&w=600&auto=format&fit=crop",
      readTime: "7 min read"
    },
    {
      id: "regulatory-updates",
      title: "2024 Regulatory Updates for Boda Boda Operations",
      excerpt: "Stay informed about the latest regulations and compliance requirements affecting boda boda operations in Kenya.",
      date: "April 14, 2024",
      author: "Calvince Okumu",
      category: "Regulations",
      image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=600&auto=format&fit=crop",
      readTime: "9 min read"
    }
  ];

  // Categories for filtering
  const categories = ['All', ...Array.from(new Set(posts.map(post => post.category)))];
  
  // State for the active filter category
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Filtered posts based on selected category
  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter(post => post.category === activeCategory);

  return (
    <MainLayout>
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Blog</h1>
          <p className="text-white text-lg">Stay updated with the latest news and insights from Digital Boda.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === category
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" /> {post.date}
                  </span>
                  <span className="flex items-center">
                    <User2 className="h-4 w-4 mr-1" /> {post.author}
                  </span>
                </div>
                <Link to={`/blog/${post.id}`}>
                  <h3 className="text-xl font-bold text-primary mb-2 hover:underline">{post.title}</h3>
                </Link>
                <div className="flex items-center mb-3">
                  <Tag className="h-4 w-4 text-secondary-dark mr-1" />
                  <span className="text-xs text-secondary-dark">{post.category}</span>
                </div>
                <p className="text-muted-foreground mb-3">{post.excerpt}</p>
                <p className="text-xs text-muted-foreground mb-3">{post.readTime}</p>
              </CardContent>
              <CardFooter>
                <Link to={`/blog/${post.id}`}>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No blog posts found in this category.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Blog;
