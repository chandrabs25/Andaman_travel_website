// Path: ./src/app/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  // ... (keep your existing state and data)
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [travelers, setTravelers] = useState('');

  const featuredDestinations = [
    { id: 'havelock-island', name: 'Havelock Island', image: '/images/havelock.jpg', description: 'Home to Radhanagar Beach, one of Asia\'s best beaches' },
    { id: 'neil-island', name: 'Neil Island', image: '/images/neil.jpg', description: 'Pristine beaches & natural bridge' },
    { id: 'port-blair', name: 'Port Blair', image: '/images/port_blair.jpg', description: 'Capital city with historical Cellular Jail' },
    { id: 'baratang-island', name: 'Baratang Island', image: '/images/baratang.jpg', description: 'Limestone caves & mud volcanoes' },
  ];

   const popularActivities = [
    { id: 1, name: 'Scuba Diving', image: '/images/scuba.jpg', description: 'Explore vibrant coral reefs' },
    { id: 2, name: 'Sea Walking', image: '/images/sea-walking.jpg', description: 'Walk on the ocean floor' },
    { id: 3, name: 'Trekking', image: '/images/trekking.jpg', description: 'Trek through the lush forests...' },
    { id: 4, name: 'Glass Bottom Boat Ride', image: '/images/glass-boat.jpg', description: 'View the colorful coral reefs...' },
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.append('destination', destination);
    if (startDate) params.append('startDate', startDate.toISOString().split('T')[0]);
    if (endDate) params.append('endDate', endDate.toISOString().split('T')[0]);
    if (travelers) params.append('travelers', travelers);
    window.location.href = `/search-results?${params.toString()}`;
  };
  // ... (keep your existing handleSearch, featuredDestinations, popularActivities)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[550px] md:h-[600px]">
        {/* Background overlays */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10"></div>

        {/* --- Image Container --- */}
        <div className="absolute inset-0 z-0">
          {/* Desktop Image (Hidden on mobile, shown on medium screens and up) */}
          <Image
            src="/images/hero.jpg" // Your desktop image
            alt="Andaman Islands scenery - Desktop"
            fill
            className="object-cover hidden md:block" // Hide on mobile, show on md+
            priority // Prioritize loading on desktop
          />
          {/* Mobile Image (Shown on mobile, hidden on medium screens and up) */}
          <Image
            src="/images/hero-mobile.jpg" // Your mobile-specific image
            alt="Andaman Islands scenery - Mobile"
            fill
            className="object-cover block md:hidden" // Show on mobile, hide on md+
            priority // Also prioritize if mobile is the primary target
          />
        </div>
        {/* --- End Image Container --- */}


        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-20">
           {/* Adjusted text sizes for mobile */}
           <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white text-center mb-4 md:mb-6"> Discover Paradise in Andaman </h1>
           <p className="text-base sm:text-lg md:text-xl text-white text-center mb-6 md:mb-8 max-w-2xl"> Explore pristine beaches, vibrant coral reefs, and unforgettable experiences. </p> {/* Shortened */}

          {/* Search Form (using the previous mobile-optimized version) */}
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4 md:p-6">
            <form onSubmit={handleSearch}>
               <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-4">

                {/* Destination */}
                <div className="flex-1 min-w-0">
                  <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1"> Destination </label>
                  <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white overflow-hidden">
                    <MapPin className="ml-3 text-gray-400 flex-shrink-0 pointer-events-none" size={18} />
                    <select
                      id="destination"
                      value={destination}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDestination(e.target.value)}
                      className="pl-2 pr-8 py-2 w-full text-sm border-none focus:ring-0 bg-transparent appearance-none truncate"
                      style={{ backgroundImage: 'none' }}
                    >
                      <option value="">Anywhere</option>
                      {featuredDestinations.map(dest => (
                        <option key={dest.id} value={dest.id}>{dest.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Start Date */}
                <div className="flex-1 min-w-0">
                   <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1"> Start Date </label>
                   <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white overflow-hidden">
                       <Calendar className="ml-3 text-gray-400 flex-shrink-0 pointer-events-none" size={18} />
                       <DatePicker
                           selected={startDate}
                           onChange={(date: Date | null) => setStartDate(date)}
                           selectsStart
                           startDate={startDate}
                           endDate={endDate}
                           minDate={new Date()}
                           placeholderText="Start date"
                           className="pl-2 pr-4 py-2 w-full text-sm border-none focus:ring-0 bg-transparent truncate"
                           dateFormat="yyyy-MM-dd"
                           required
                        />
                    </div>
                 </div>

                 {/* End Date */}
                 <div className="flex-1 min-w-0">
                   <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1"> End Date </label>
                    <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white overflow-hidden">
                        <Calendar className="ml-3 text-gray-400 flex-shrink-0 pointer-events-none" size={18} />
                        <DatePicker
                           selected={endDate}
                           onChange={(date: Date | null) => setEndDate(date)}
                           selectsEnd
                           startDate={startDate}
                           endDate={endDate}
                           minDate={startDate || new Date()}
                           placeholderText="End date"
                           className="pl-2 pr-4 py-2 w-full text-sm border-none focus:ring-0 bg-transparent truncate"
                           dateFormat="yyyy-MM-dd"
                           disabled={!startDate}
                           required
                        />
                    </div>
                 </div>

                {/* Travelers */}
                <div className="flex-1 min-w-0">
                   <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1"> Travelers </label>
                   <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white overflow-hidden">
                       <Users className="ml-3 text-gray-400 flex-shrink-0 pointer-events-none" size={18} />
                       <select
                         id="travelers"
                         value={travelers}
                         onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTravelers(e.target.value)}
                         required
                         className="pl-2 pr-8 py-2 w-full text-sm border-none focus:ring-0 bg-transparent appearance-none truncate"
                         style={{ backgroundImage: 'none' }}
                       >
                         <option value="">Select</option>
                         <option value="1">1 Person</option>
                         <option value="2">2 People</option>
                         <option value="3">3 People</option>
                         <option value="4">4 People</option>
                         <option value="5+">5+ People</option>
                       </select>
                    </div>
                 </div>

                {/* Search Button */}
                <div className="md:flex-shrink-0 mt-2 md:mt-0">
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-6 rounded-md transition duration-300 flex items-center justify-center"
                  >
                    <Search size={18} className="mr-2"/> Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Destinations (Using Image components) */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Featured Destinations</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
             {featuredDestinations.map((destination) => (
               <div key={destination.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                  <div className="h-48 w-full relative">
                    <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">{destination.name}</h3>
                    <p className="text-gray-600 mb-3 md:mb-4 text-sm line-clamp-2">{destination.description}</p>
                    <Link href={`/destinations/${destination.id}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm"> Explore More → </Link>
                  </div>
               </div>
             ))}
           </div>
           <div className="text-center mt-10 md:mt-12"> <Link href="/destinations" className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-5 md:py-3 md:px-6 rounded-md transition duration-300"> View All Destinations </Link> </div>
        </div>
      </section>

      {/* Popular Activities (Using Image components) */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Popular Activities</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
             {popularActivities.map((activity) => (
               <div key={activity.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                 <div className="h-48 w-full relative">
                    <Image
                        src={activity.image}
                        alt={activity.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                 <div className="p-4">
                   <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">{activity.name}</h3>
                   <p className="text-gray-600 mb-3 md:mb-4 text-sm line-clamp-2">{activity.description}</p>
                   <Link href={`/activities/${activity.id}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm"> Learn More → </Link>
                 </div>
               </div>
             ))}
           </div>
           <div className="text-center mt-10 md:mt-12"> <Link href="/activities" className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-5 md:py-3 md:px-6 rounded-md transition duration-300"> Explore All Activities </Link> </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 bg-blue-50">
         <div className="container mx-auto px-4">
           <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Why Choose Us</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
             {/* Card 1 */} <div className="bg-white p-6 rounded-lg shadow-md text-center"> <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"> <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> </div> <h3 className="text-lg md:text-xl font-semibold mb-2">Expert Local Knowledge</h3> <p className="text-gray-600 text-sm">Authentic experiences curated by local experts.</p> </div>
             {/* Card 2 */} <div className="bg-white p-6 rounded-lg shadow-md text-center"> <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"> <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> </div> <h3 className="text-lg md:text-xl font-semibold mb-2">Best Price Guarantee</h3> <p className="text-gray-600 text-sm">Competitive, transparent pricing with no hidden fees.</p> </div>
             {/* Card 3 */} <div className="bg-white p-6 rounded-lg shadow-md text-center"> <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"> <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> </div> <h3 className="text-lg md:text-xl font-semibold mb-2">24/7 Customer Support</h3> <p className="text-gray-600 text-sm">Dedicated support available round the clock to assist.</p> </div>
           </div>
         </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Ready to Experience Andaman?</h2>
           <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto"> Book your dream vacation today and create memories that will last a lifetime. </p>
           <div className="flex flex-col sm:flex-row justify-center gap-4"> <Link href="/packages" className="bg-white text-blue-600 hover:bg-gray-100 py-2.5 px-5 md:py-3 md:px-6 rounded-md font-semibold transition duration-300"> Browse Packages </Link> <Link href="/contact" className="bg-transparent hover:bg-blue-700 border-2 border-white py-2.5 px-5 md:py-3 md:px-6 rounded-md font-semibold transition duration-300"> Contact Us </Link> </div>
        </div>
      </section>
    </div>
  );
}