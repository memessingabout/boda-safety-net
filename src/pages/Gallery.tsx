
import { useState } from 'react';
import MainLayout from "@/components/layout/MainLayout";

// Define the interface for an image item
interface ImageItem {
  id: number;
  url: string;
  title: string;
  category: string;
}

const Gallery = () => {
  // Sample gallery images
  const images: ImageItem[] = [
    {
      id: 1,
      url: "https://digitalboda.co.ke/wp-content/uploads/2024/05/about-digitalboda.png",
      title: "Boda Boda Riders Association Meeting",
      category: "events"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1605195784770-0ea428c5d1d9?q=80&w=600&auto=format&fit=crop",
      title: "Rider training session",
      category: "training"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1508357710528-af7a9dc891d2?q=80&w=600&auto=format&fit=crop",
      title: "Delivery in action",
      category: "delivery"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1622899505136-8426e0f3f135?q=80&w=600&auto=format&fit=crop",
      title: "Safety equipment distribution",
      category: "safety"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1637050065275-6f0ba3cd5bf6?q=80&w=600&auto=format&fit=crop",
      title: "Community outreach program",
      category: "community"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1607338509396-a29a0be6a4ce?q=80&w=600&auto=format&fit=crop",
      title: "Emergency response training",
      category: "training"
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=600&auto=format&fit=crop",
      title: "Fleet of motorcycles",
      category: "general"
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1508775012313-38840f914cdc?q=80&w=600&auto=format&fit=crop",
      title: "Rider recognition ceremony",
      category: "events"
    }
  ];

  // State for the currently selected filter
  const [activeFilter, setActiveFilter] = useState('all');
  
  // All available categories
  const categories = ['all', ...Array.from(new Set(images.map(img => img.category)))];
  
  // Filtered images based on selected category
  const filteredImages = activeFilter === 'all' 
    ? images 
    : images.filter(img => img.category === activeFilter);

  return (
    <MainLayout>
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Gallery</h1>
          <p className="text-white text-lg">See our activities and events in pictures.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full capitalize transition-colors ${
                activeFilter === category
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div key={image.id} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-square relative">
                <img 
                  src={image.url} 
                  alt={image.title} 
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 bg-white">
                <h3 className="font-medium text-dark">{image.title}</h3>
                <span className="text-xs text-muted-foreground capitalize">{image.category}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No images found in this category.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Gallery;
