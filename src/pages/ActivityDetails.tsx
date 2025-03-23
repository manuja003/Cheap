
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { activitiesData } from '@/data/activitiesData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, MapPin, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ActivityDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState(activitiesData.find(a => a.id === id));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      const foundActivity = activitiesData.find(a => a.id === id);
      setActivity(foundActivity);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Activity Not Found</h1>
        <p className="text-gray-600 mb-8">The activity you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/" 
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={activity.image} 
              alt={activity.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
            <div className="max-w-7xl mx-auto">
              <Link to="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors">
                <ArrowLeft size={18} />
                <span>Back to all activities</span>
              </Link>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-3 py-1 bg-primary/80 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                  {activity.category}
                </span>
                <div className="flex items-center text-white/80 text-sm">
                  <MapPin size={14} className="mr-1" />
                  {activity.location}
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{activity.title}</h1>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
              <TabsTrigger value="providers">Providers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="space-y-8">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">About this activity</h2>
                <p className="text-gray-700 leading-relaxed">{activity.longDescription}</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-6">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activity.gallery.map((image, index) => (
                    <div key={index} className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow aspect-[4/3]">
                      <img 
                        src={image.url} 
                        alt={image.alt} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="locations" className="space-y-8">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-semibold mb-6">Where to experience {activity.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {activity.locations.map((location, index) => (
                    <div key={index} className="border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <div className="bg-gray-100 rounded-full p-3 mr-4">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">{location.name}</h3>
                          <p className="text-gray-600">{location.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="providers" className="space-y-8">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-semibold mb-6">Recommended service providers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {activity.companies.map((company, index) => (
                    <div key={index} className="border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-medium mb-2">{company.name}</h3>
                      <p className="text-gray-600 mb-4">{company.description}</p>
                      {company.website && (
                        <a 
                          href={company.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                        >
                          <Globe size={16} className="mr-1" />
                          Visit website
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-6">Ready to explore {activity.title}?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/"
                className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
              >
                Discover more activities
              </Link>
              <a 
                href="#contact"
                className="bg-white text-primary border border-primary px-6 py-3 rounded-full hover:bg-gray-50 transition-colors"
              >
                Contact us for details
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ActivityDetails;
