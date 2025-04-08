// Path: .\src\app\packages\page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Make sure Image is imported
import { MapPin, Clock, Star, ArrowRight, Filter, X, Loader2 } from 'lucide-react'; // Added Loader2 back
export const runtime = 'edge';

// --- Interfaces (Keep as they are) ---
interface Package {
  id: number;
  name: string;
  image: string; // Keep as 'image' to match your mock data structure
  duration: string;
  destinations: string[];
  price: number;
  rating: number;
  activities: string[];
  description: string;
}

interface FiltersState {
  destination: string;
  duration: string;
  priceRange: string;
  activities: string[];
}
// --- End Interfaces ---

export default function Packages() {
  const [filters, setFilters] = useState<FiltersState>({
    destination: '',
    duration: '',
    priceRange: '',
    activities: []
  });

  // --- Mock Data (Using placeholder images as in your provided code) ---
  const initialPackagesData: Package[] = [
    { id: 1, name: 'Andaman Explorer', image: '/images/placeholder.jpg', duration: '5 Days / 4 Nights', destinations: ['Port Blair', 'Havelock Island', 'Neil Island'], price: 15999, rating: 4.8, activities: ['Scuba Diving', 'Island Hopping', 'Beach Activities', 'Sightseeing'], description: 'Explore the best of Andaman...' },
    { id: 2, name: 'Honeymoon Special', image: '/images/placeholder.jpg', duration: '6 Days / 5 Nights', destinations: ['Port Blair', 'Havelock Island', 'Neil Island'], price: 24999, rating: 4.9, activities: ['Candlelight Dinner', 'Couple Spa', 'Private Beach Tour', 'Snorkeling'], description: 'A romantic getaway...' },
    { id: 3, name: 'Adventure Seeker', image: '/images/placeholder.jpg', duration: '7 Days / 6 Nights', destinations: ['Port Blair', 'Havelock Island', 'Baratang', 'North Bay'], price: 19999, rating: 4.7, activities: ['Scuba Diving', 'Trekking', 'Kayaking', 'Snorkeling', 'Jet Skiing'], description: 'For the thrill-seekers...' },
    { id: 4, name: 'Budget Friendly', image: '/images/placeholder.jpg', duration: '4 Days / 3 Nights', destinations: ['Port Blair', 'Havelock Island'], price: 12999, rating: 4.5, activities: ['Sightseeing', 'Beach Activities', 'Cellular Jail Visit'], description: 'Experience the beauty of Andaman...' },
    { id: 5, name: 'Family Vacation', image: '/images/placeholder.jpg', duration: '6 Days / 5 Nights', destinations: ['Port Blair', 'Havelock Island', 'Neil Island', 'Ross Island'], price: 18999, rating: 4.6, activities: ['Glass Bottom Boat', 'Light & Sound Show', 'Beach Activities', 'Museum Visit'], description: 'A family-friendly package...' },
    { id: 6, name: 'Island Explorer Plus', image: '/images/placeholder.jpg', duration: '8 Days / 7 Nights', destinations: ['Port Blair', 'Havelock Island', 'Neil Island', 'Baratang', 'Diglipur'], price: 27999, rating: 4.8, activities: ['Scuba Diving', 'Trekking', 'Limestone Caves', 'Mud Volcano', 'Turtle Nesting Watch'], description: 'The most comprehensive package...' }
  ];
  // --- End Mock Data ---

  const [packages, setPackages] = useState<Package[]>(initialPackagesData);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>(packages);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state for completeness, although not fetching real data here
  const [error, setError] = useState<string | null>(null); // Added error state

  // --- handleFilterChange, handleActivityToggle, applyFilters (keep as they are) ---
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleActivityToggle = (activity: string) => {
    setFilters((prev) => {
      const current = [...prev.activities];
      if (current.includes(activity)) {
        return { ...prev, activities: current.filter(a => a !== activity) };
      } else {
        return { ...prev, activities: [...current, activity] };
      }
    });
  };

  const applyFilters = () => {
    // console.log("Applying filters:", filters); // Debugging
    let tempFiltered = [...packages];

    if (filters.destination) {
      tempFiltered = tempFiltered.filter(pkg => pkg.destinations.some(dest => dest.toLowerCase().includes(filters.destination.toLowerCase())));
    }
    if (filters.duration) {
      const durationDays = parseInt(filters.duration);
      if (!isNaN(durationDays)) {
          tempFiltered = tempFiltered.filter(pkg => {
              const pkgDaysMatch = pkg.duration.match(/^(\d+)\s*Days/i);
              const pkgDays = pkgDaysMatch ? parseInt(pkgDaysMatch[1]) : 0;
              return filters.duration.includes('+') ? pkgDays >= durationDays : pkgDays === durationDays;
          });
      }
    }
    if (filters.priceRange) {
        const range = filters.priceRange.split('-').map(Number);
        const min = range[0];
        const max = range.length > 1 ? range[1] : Infinity;
        if (!isNaN(min)) {
            tempFiltered = tempFiltered.filter(pkg => pkg.price >= min && pkg.price <= max);
        }
    }
    if (filters.activities.length > 0) {
        tempFiltered = tempFiltered.filter(pkg =>
            filters.activities.every(filterActivity =>
                pkg.activities.some(pkgActivity => pkgActivity.toLowerCase().includes(filterActivity.toLowerCase()))
            )
        );
    }
    // console.log("Filtered results:", tempFiltered.length); // Debugging
    setFilteredPackages(tempFiltered);
  };

  useEffect(() => {
    // Simulate loading for demonstration if needed, otherwise just apply filters
    // setLoading(true);
    applyFilters();
    // setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, packages]); // React to changes in filters or the base package list
  // --- End handler/effect functions ---


  return (
    <> {/* Use Fragment */}
      {/* --- MODIFIED Hero Section --- */}
      <div className="relative bg-gradient-to-r from-cyan-600 to-blue-700 h-64 md:h-80">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div> {/* Adjusted overlay */}

        {/* Image Container */}
        <div className="absolute inset-0 z-0">
           {/* Desktop Image */}
          <Image
            src="/images/packages-hero.jpg" // Desktop image path
            alt="Scenic Andaman view for packages - Desktop" // Descriptive Alt Text
            fill
            className="object-cover hidden md:block" // Hide on mobile
            priority
          />
           {/* Mobile Image */}
          <Image
            src="/images/packages-hero-mobile.jpg" // Mobile image path (ensure this file exists)
            alt="Andaman beach activity - Mobile" // Descriptive Alt Text
            fill
            className="object-cover block md:hidden" // Show on mobile
            priority
          />
        </div>

        {/* Text Content */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-20">
          {/* Adjusted text sizes */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-2 md:mb-4">
            Our Andaman Packages
          </h1>
          <p className="text-lg sm:text-xl text-white text-center max-w-2xl opacity-90">
            Find the perfect curated experience for your island getaway.
          </p>
        </div>
      </div>
      {/* --- End MODIFIED Hero Section --- */}


      <div className="bg-gray-50 min-h-screen py-8 md:py-12"> {/* Main content area */}
          <div className="container mx-auto px-4">
              {/* Mobile Filter Toggle Button */}
              <div className="md:hidden mb-4 text-center">
                  <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                      <Filter size={16} className="mr-2" />
                      {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </button>
              </div>

              {/* Filters Section - Conditional rendering for mobile */}
              <div className={`bg-white rounded-lg shadow-md p-4 md:p-6 mb-8 ${showFilters ? 'block' : 'hidden'} md:block`}>
                  <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg md:text-xl font-semibold">Filter Packages</h2>
                      <button className="md:hidden text-gray-500 hover:text-gray-700" onClick={() => setShowFilters(false)}>
                          <X size={20} />
                      </button>
                  </div>
                  {/* Filters Grid (Keep the improved layout) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {/* Destination */}
                      <div>
                          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1"> Destination </label>
                          <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white overflow-hidden">
                             <MapPin className="ml-3 text-gray-400 flex-shrink-0 pointer-events-none" size={16} />
                             <select id="destination" name="destination" value={filters.destination} onChange={handleFilterChange} className="pl-2 pr-8 py-2 w-full text-sm border-none focus:ring-0 bg-transparent appearance-none" style={{ backgroundImage: 'none' }}>
                                <option value="">All</option>
                                <option value="Port Blair">Port Blair</option>
                                <option value="Havelock">Havelock</option>
                                <option value="Neil">Neil Island</option>
                                <option value="Baratang">Baratang</option>
                                <option value="Diglipur">Diglipur</option>
                             </select>
                          </div>
                      </div>
                      {/* Duration */}
                      <div>
                           <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1"> Duration </label>
                            <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white overflow-hidden">
                               <Clock className="ml-3 text-gray-400 flex-shrink-0 pointer-events-none" size={16} />
                               <select id="duration" name="duration" value={filters.duration} onChange={handleFilterChange} className="pl-2 pr-8 py-2 w-full text-sm border-none focus:ring-0 bg-transparent appearance-none" style={{ backgroundImage: 'none' }}>
                                 <option value="">Any</option>
                                 <option value="4">4 Days</option>
                                 <option value="5">5 Days</option>
                                 <option value="6">6 Days</option>
                                 <option value="7">7 Days</option>
                                 <option value="8+">8+ Days</option>
                               </select>
                            </div>
                         </div>
                      {/* Price Range */}
                       <div>
                           <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1"> Price Range </label>
                           <select id="priceRange" name="priceRange" value={filters.priceRange} onChange={handleFilterChange} className="pl-3 pr-8 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none text-sm" style={{ backgroundImage: 'none' }}>
                             <option value="">Any Price</option>
                             <option value="10000-15000">₹10k - ₹15k</option>
                             <option value="15000-20000">₹15k - ₹20k</option>
                             <option value="20000-25000">₹20k - ₹25k</option>
                             <option value="25000-30000">₹25k - ₹30k</option>
                             <option value="30000">₹30k+</option>
                           </select>
                       </div>
                      {/* Activities Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1"> Activities </label>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                           {['Scuba Diving', 'Snorkeling', 'Trekking', 'Beach'].map(activity => (
                             <button key={activity} onClick={() => handleActivityToggle(activity)} className={`text-xs px-2 py-1 rounded-full transition-colors ${ filters.activities.includes(activity) ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200' }`}>
                               {activity}
                             </button>
                           ))}
                         </div>
                      </div>
                  </div>
              </div>

              {/* Loading / Error / Package Listings */}
              {loading ? (
                 <LoadingSpinner />
              ) : error ? (
                  <div className="text-center py-10 px-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-700 font-medium">Could not load packages.</p>
                      <p className="text-red-600 text-sm mt-1">{error}</p>
                      <p className="text-gray-600 text-sm mt-3">Displaying sample packages instead.</p>
                      {/* Render sample data */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-6">
                          {initialPackagesData.map((pkg) => <PackageCard key={`sample-${pkg.id}`} pkg={pkg} />)}
                      </div>
                  </div>
              ) : (
                  filteredPackages.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                          {filteredPackages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
                      </div>
                  ) : (
                      <div className="col-span-full text-center py-12">
                          <h3 className="text-xl font-semibold mb-2">No packages found</h3>
                          <p className="text-gray-600">Try adjusting your filters to find available packages.</p>
                      </div>
                  )
              )}


              {/* Custom Package CTA */}
              <div className="mt-12 md:mt-16 bg-blue-50 rounded-lg p-6 md:p-8 text-center">
                  <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Can't find what you're looking for?</h2>
                  <p className="text-gray-600 mb-5 md:mb-6 max-w-2xl mx-auto text-sm md:text-base"> Let us create a custom package tailored to your preferences, budget, and travel dates. </p>
                  <Link href="/custom-package" className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-5 md:py-3 md:px-6 rounded-md transition duration-300 text-sm md:text-base">
                      Create Custom Package
                  </Link>
              </div>
          </div>
      </div>
    </>
  );
}


// --- Extracted Package Card Component ---
interface PackageCardProps {
    pkg: Package;
}

const PackageCard = ({ pkg }: PackageCardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]">
            <div className="h-48 w-full relative flex-shrink-0">
                <Image
                   src={pkg.image || '/images/placeholder.jpg'}
                   alt={pkg.name}
                   fill
                   className="object-cover"
                   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
               <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs sm:text-sm font-semibold text-blue-700"> ₹{pkg.price.toLocaleString('en-IN')} </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
               <div className="flex justify-between items-start mb-1">
                 <h3 className="text-base sm:text-lg font-semibold leading-tight flex-1 mr-2">{pkg.name}</h3> {/* Added flex-1 mr-2 */}
                 <div className="flex items-center text-yellow-500 flex-shrink-0"> <Star size={14} fill="currentColor" /> <span className="ml-1 text-xs font-medium">{pkg.rating}</span> </div>
               </div>
               <div className="flex items-center text-gray-500 text-xs mb-2"> <Clock size={12} className="mr-1" /> <span>{pkg.duration}</span> </div>
               <div className="flex items-start mb-3 text-xs text-gray-500"> <MapPin size={14} className="mr-1 mt-0.5 flex-shrink-0" /> <span>{pkg.destinations.join(' • ')}</span> </div>
               <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">{pkg.description}</p>
               <div className="flex flex-wrap gap-1.5 mb-3">
                 {pkg.activities.slice(0, 3).map((activity, index) => ( <span key={index} className="bg-blue-50 text-blue-700 text-[11px] px-1.5 py-0.5 rounded-full"> {activity} </span> ))}
                 {pkg.activities.length > 3 && ( <span className="bg-gray-100 text-gray-600 text-[11px] px-1.5 py-0.5 rounded-full"> +{pkg.activities.length - 3} more </span> )}
               </div>
               <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                  <span className="text-gray-600 text-xs"> Starting from <span className="font-semibold text-blue-600 text-sm">₹{pkg.price.toLocaleString('en-IN')}</span> </span>
                  <Link href={`/packages/${pkg.id}`} className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm"> View Details <ArrowRight size={14} className="ml-1" /> </Link>
               </div>
            </div>
       </div>
    );
};