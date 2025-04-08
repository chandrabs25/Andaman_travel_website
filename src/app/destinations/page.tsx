// Path: .\src\app\destinations\page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

// Interfaces (Keep as they are)
interface Destination {
  id: string | number;
  name: string;
  description: string;
  location: string;
  image_url: string;
  highlights?: string[];
}
interface ApiSearchData { // Renamed for clarity if used elsewhere
  destinations: Destination[];
  packages: Destination[]; // Reusing Destination type for simplicity
  activities: Destination[]; // Reusing Destination type
}
interface ApiResponse {
  success: boolean;
  data?: Destination[]; // Changed to match API if it only returns destinations
  message?: string;
}
// Type guard to check for successful API response structure
function isApiSuccessResponse(response: any): response is ApiResponse & { success: true; data: Destination[] } {
    return response && response.success === true && Array.isArray(response.data);
}
// --- End Interfaces ---


export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sample destinations (Keep as is)
  const sampleDestinations: Destination[] = [
    { id: 'havelock-island', name: 'Havelock Island', description: 'Home to Radhanagar Beach...', location: 'Andaman Islands', image_url: '/images/havelock.jpg', highlights: ['Radhanagar Beach', 'Elephant Beach'] },
    { id: 'neil-island', name: 'Neil Island', description: 'Known for pristine beaches...', location: 'Andaman Islands', image_url: '/images/neil.jpg', highlights: ['Natural Bridge', 'Bharatpur Beach'] },
    { id: 'port-blair', name: 'Port Blair', description: 'The capital city...', location: 'Andaman Islands', image_url: '/images/port_blair.jpg', highlights: ['Cellular Jail', 'Ross Island'] },
    { id: 'baratang-island', name: 'Baratang Island', description: 'Famous for limestone caves...', location: 'Andaman Islands', image_url: '/images/baratang.jpg', highlights: ['Limestone Caves', 'Mud Volcanoes'] }
  ];


  useEffect(() => {
    async function fetchDestinations() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/destinations');
        const parsedData: unknown = await response.json();

        if (!response.ok) {
          const errorResponse = parsedData as Partial<ApiResponse>;
          const message = errorResponse?.message || `HTTP error! Status: ${response.status}`;
          throw new Error(message);
        }

        if (isApiSuccessResponse(parsedData)) {
          setDestinations(parsedData.data || []);
          if (!parsedData.data || parsedData.data.length === 0) {
              console.log("API returned success but no destinations, using sample data.");
              setDestinations(sampleDestinations);
          }
        } else {
          const errorResponse = parsedData as Partial<ApiResponse>;
          const message = errorResponse?.message || 'API returned unsuccessful status.';
          throw new Error(message);
        }

      } catch (err) {
        console.error('Error fetching destinations:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        setDestinations(sampleDestinations);
      } finally {
        setLoading(false);
      }
    }

    fetchDestinations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayDestinations = destinations;

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-blue-900 h-64 md:h-80">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/70 z-10"></div>

        {/* Image Container */}
        <div className="absolute inset-0 z-0">
           {/* Desktop Image */}
          <Image
            src="/images/destinations-hero.jpg" // Desktop image
            alt="Panoramic view of Andaman Islands - Desktop"
            fill
            className="object-cover hidden md:block" // Hide on mobile
            priority
          />
           {/* Mobile Image */}
          <Image
            src="/images/destinations-hero-mobile.jpg" // Mobile image (ensure this exists)
            alt="Beautiful Andaman beach - Mobile"
            fill
            className="object-cover block md:hidden" // Show on mobile
            priority
          />
        </div>

        {/* Text Content */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-20">
          {/* Adjusted text sizes */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-2 md:mb-4">
            Explore Andaman Destinations
          </h1>
          <p className="text-lg sm:text-xl text-white text-center max-w-2xl opacity-90">
            Discover paradise islands with pristine beaches, vibrant coral reefs, and lush forests
          </p>
        </div>
      </div>

      {/* Destinations List */}
      <div className="container mx-auto px-4 py-10 md:py-16"> {/* Adjusted padding */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-lg">Loading destinations...</span>
          </div>
        ) : error ? (
            <div className="text-center py-10 px-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 font-medium">Could not load destinations.</p>
                <p className="text-red-600 text-sm mt-1">{error}</p>
                <p className="text-gray-600 text-sm mt-3">Displaying sample destinations instead.</p>
                {/* Render sample data */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-6"> {/* Adjusted gap */}
                     {sampleDestinations.map((destination) => (
                       <DestinationCard key={`sample-${destination.id}`} destination={destination} />
                     ))}
                  </div>
            </div>
        ) : (
           displayDestinations.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"> {/* Adjusted gap */}
                 {displayDestinations.map((destination) => (
                    <DestinationCard key={destination.id} destination={destination} />
                 ))}
               </div>
            ) : (
               <div className="text-center py-16"> {/* Adjusted padding */}
                  <h2 className="text-xl md:text-2xl font-semibold mb-4">No Destinations Found</h2>
                  <p className="text-gray-600">Check back later or explore our packages!</p>
               </div>
            )
        )}
      </div>
    </>
  );
}


// --- Extracted Destination Card Component ---
interface DestinationCardProps {
    destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105">
            {/* Image */}
            <div className="h-48 sm:h-56 w-full relative flex-shrink-0"> {/* Adjusted height */}
                <Image
                    src={destination.image_url || '/images/placeholder.jpg'}
                    alt={destination.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Optimize
                />
            </div>
            {/* Content */}
            <div className="p-4 flex flex-col flex-grow"> {/* Use flex-grow */}
                <h2 className="text-lg md:text-xl font-semibold mb-1">{destination.name}</h2>
                <p className="text-xs text-gray-500 mb-2">{destination.location}</p>
                <p className="text-sm text-gray-700 mb-3 line-clamp-3 flex-grow">{destination.description}</p> {/* Added flex-grow */}
                {/* Optional: Display highlights if needed
                {destination.highlights && destination.highlights.length > 0 && (
                    <div className="mb-3">
                        <p className="text-xs font-medium text-gray-500">Highlights:</p>
                        <p className="text-xs text-gray-600 line-clamp-2">{destination.highlights.join(', ')}</p>
                    </div>
                )}
                */}
                <div className="mt-auto pt-3 border-t border-gray-100 text-right"> {/* Pushes button to bottom */}
                    <Link
                        href={`/destinations/${destination.id}`}
                        className="inline-block bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors text-sm" // Adjusted button size
                    >
                        Explore More
                    </Link>
                </div>
            </div>
        </div>
    );
};