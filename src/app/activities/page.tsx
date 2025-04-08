// Path: .\src\app\activities\page.tsx
'use client';

import React, { useState, useEffect } from 'react'; // Import React
import Link from 'next/link';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

// Define interfaces (keep as they are)
interface Activity {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  image_url: string;
  destination_name: string;
}
interface ApiSearchData {
  destinations: Activity[]; // Reusing Activity type for simplicity here, adjust if needed
  packages: Activity[]; // Reusing Activity type
  activities: Activity[];
}
interface ApiResponse {
  success: boolean;
  data?: ApiSearchData;
  message?: string;
}
function isApiSearchSuccessResponse(response: any): response is ApiResponse & { success: true; data: ApiSearchData } {
    return response &&
           response.success === true &&
           typeof response.data === 'object' &&
           response.data !== null &&
           Array.isArray(response.data.destinations) &&
           Array.isArray(response.data.packages) &&
           Array.isArray(response.data.activities);
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sample activities for development (used as fallback)
  const sampleActivities: Activity[] = [
    { id: 1, name: 'Scuba Diving', description: 'Explore the vibrant underwater world...', price: 3500, duration: '3 hours', image_url: '/images/scuba.jpg', destination_name: 'Havelock Island' },
    { id: 2, name: 'Sea Walking', description: 'Walk on the ocean floor...', price: 2500, duration: '2 hours', image_url: '/images/sea-walking.jpg', destination_name: 'North Bay Island' },
    { id: 3, name: 'Jet Skiing', description: 'Feel the adrenaline rush...', price: 1500, duration: '30 minutes', image_url: '/images/jet-ski.jpg', destination_name: 'Corbyn\'s Cove Beach' },
    { id: 4, name: 'Glass Bottom Boat Ride', description: 'View the colorful coral reefs...', price: 1200, duration: '1 hour', image_url: '/images/glass-boat.jpg', destination_name: 'North Bay Island' },
    { id: 5, name: 'Trekking', description: 'Trek through the lush forests...', price: 1800, duration: '4 hours', image_url: '/images/trekking.jpg', destination_name: 'Mount Harriet' },
    { id: 6, name: 'Snorkeling', description: 'Explore the shallow coral reefs...', price: 1500, duration: '2 hours', image_url: '/images/snorkeling.jpg', destination_name: 'Elephant Beach' }
  ];

  useEffect(() => {
    async function fetchActivities() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/activities');
        const parsedData: unknown = await response.json();

        if (!response.ok) {
          const errorResponse = parsedData as Partial<ApiResponse>;
          const message = errorResponse?.message || `HTTP error! Status: ${response.status}`;
          throw new Error(message);
        }

        if (isApiSearchSuccessResponse(parsedData)) { // Use type guard
          const fetchedData = parsedData.data.activities; // Access the activities array
          setActivities(fetchedData || []);
           if (!fetchedData || fetchedData.length === 0) {
               console.log("API returned success but no activities, using sample data.");
               setActivities(sampleActivities); // Fallback if API returns empty
           }
        } else {
          const errorResponse = parsedData as Partial<ApiResponse>;
          const message = errorResponse?.message || 'API returned unsuccessful status.';
          throw new Error(message);
        }
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        setActivities(sampleActivities); // Fallback on error
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array

  // Determine which data to display
  const displayActivities = activities; // Always use the state after fetch logic

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-green-900 h-64 md:h-80">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-700/70 z-10"></div>

        {/* Image Container */}
        <div className="absolute inset-0 z-0">
          {/* Desktop Image */}
          <Image
            src="/images/activities-hero.jpg" // Desktop image path
            alt="Andaman Activities - Desktop"
            fill
            className="object-cover hidden md:block" // Hidden on mobile, shown md+
            priority
          />
          {/* Mobile Image */}
          <Image
            src="/images/activities-hero-mobile.jpg" // Mobile image path (ensure this file exists)
            alt="Andaman Activities - Mobile"
            fill
            className="object-cover block md:hidden" // Shown on mobile, hidden md+
            priority
          />
        </div>

        {/* Text Content */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-3 md:mb-4">
            Exciting Andaman Activities
          </h1>
          <p className="text-lg sm:text-xl text-white text-center max-w-2xl opacity-90">
            Experience thrilling adventures and create unforgettable memories
          </p>
        </div>
      </div>

      {/* Activities List */}
      <div className="container mx-auto px-4 py-10 md:py-16"> {/* Adjusted padding */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            <span className="ml-2 text-lg">Loading activities...</span>
          </div>
        ) : error ? (
            <div className="text-center py-10 px-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 font-medium">Could not load activities.</p>
                <p className="text-red-600 text-sm mt-1">{error}</p>
                <p className="text-gray-600 text-sm mt-3">Displaying sample activities instead.</p>
                 {/* Render sample data here */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-6">
                    {sampleActivities.map((activity) => (
                      <ActivityCard key={`sample-${activity.id}`} activity={activity} />
                    ))}
                 </div>
            </div>
        ) : (
          displayActivities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"> {/* Adjusted gap */}
              {displayActivities.map((activity) => (
                 <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
           ) : (
            <div className="text-center py-16"> {/* Adjusted padding */}
              <h2 className="text-xl md:text-2xl font-semibold mb-4">No Activities Found</h2>
              <p className="text-gray-600">We couldn't find any activities matching your criteria right now.</p>
               {/* Optionally add a link back or suggest other pages */}
            </div>
           )
        )}
      </div>
    </>
  );
}

// --- Extracted Activity Card Component ---
interface ActivityCardProps {
    activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105">
          {/* Image */}
          <div className="h-48 w-full relative flex-shrink-0">
            <Image
              src={activity.image_url || '/images/placeholder.jpg'}
              alt={activity.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Optimize
            />
          </div>
          {/* Content */}
          <div className="p-4 flex flex-col flex-grow"> {/* Use flex-grow */}
            <h2 className="text-lg md:text-xl font-semibold mb-1 leading-tight">{activity.name}</h2> {/* Adjusted text size */}
            <p className="text-xs text-gray-500 mb-2">Location: {activity.destination_name}</p>
            <p className="text-sm text-gray-700 mb-3 line-clamp-3 flex-grow">{activity.description}</p> {/* Added flex-grow */}
            <div className="flex justify-between items-center text-sm mb-3 mt-auto pt-3 border-t border-gray-100"> {/* mt-auto pushes this down */}
              <span className="text-green-700 font-semibold">₹{activity.price.toLocaleString('en-IN')}</span>
              <span className="text-gray-600">{activity.duration}</span>
            </div>
            <Link
              href={`/activities/${activity.id}`} // Adjust if activity ID needs transformation for URL
              className="block w-full text-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
            >
              Book Now
            </Link>
          </div>
        </div>
    );
};