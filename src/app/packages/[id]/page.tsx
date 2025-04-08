'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Clock, Users, Check, Info, ArrowRight } from 'lucide-react'; // Added ArrowRight back if needed later
export const runtime = 'edge';

// --- Interfaces (Keep as they are) ---
interface ItineraryActivity {
    name: string;
    time: string;
    duration: string;
}
interface ItineraryDay {
    day: number;
    title: string;
    description: string;
    activities: ItineraryActivity[];
    meals: string[];
    accommodation: string;
}
interface ItineraryData {
    id: number;
    name: string;
    duration: string;
    price: number;
    description: string;
    highlights: string[];
    inclusions: string[];
    exclusions: string[];
    days: ItineraryDay[];
}
// --- End Interfaces ---

export default function ItineraryPage() {
  const [selectedDay, setSelectedDay] = useState(1);

  // --- Mock Data (Keep as is) ---
  const itinerary: ItineraryData = { // Use the ItineraryData type
    id: 1,
    name: 'Andaman Explorer',
    duration: '5 Days / 4 Nights',
    price: 15999,
    description: 'Explore the best of Andaman with this comprehensive package covering the major islands and attractions.',
    highlights: [
      'Visit the historic Cellular Jail in Port Blair',
      'Experience the pristine Radhanagar Beach in Havelock Island',
      'Explore the natural bridge in Neil Island',
      'Enjoy water activities like snorkeling and scuba diving',
      'Witness the Light and Sound show at Cellular Jail'
    ],
    inclusions: [
      'Accommodation in 3-star hotels',
      'All transfers by AC vehicle',
      'Ferry tickets between islands',
      'Daily breakfast and dinner',
      'All sightseeing as per itinerary',
      'Experienced tour guide'
    ],
    exclusions: [
      'Airfare to and from Port Blair',
      'Lunch and personal expenses',
      'Optional activities not mentioned in itinerary',
      'Travel insurance',
      'Additional expenses during free time'
    ],
    days: [
      { day: 1, title: 'Arrival in Port Blair', description: 'Arrive...', activities: [ { name: 'Airport pickup', time: '10:00 AM', duration: '30 mins' }, { name: 'Hotel check-in', time: '12:00 PM', duration: '1 hour' }, { name: 'Cellular Jail visit', time: '3:00 PM', duration: '2 hours' }, { name: 'Light & Sound show', time: '6:00 PM', duration: '1 hour' }], meals: ['Dinner'], accommodation: 'Hotel Sea Shell, Port Blair' },
      { day: 2, title: 'Port Blair to Havelock', description: 'After breakfast...', activities: [ { name: 'Breakfast', time: '7:30 AM', duration: '1 hour' }, { name: 'Transfer to jetty', time: '9:00 AM', duration: '30 mins' }, { name: 'Ferry to Havelock', time: '10:30 AM', duration: '2 hours' }, { name: 'Resort check-in', time: '1:00 PM', duration: '1 hour' }, { name: 'Radhanagar Beach', time: '3:30 PM', duration: '3 hours' }], meals: ['Breakfast', 'Dinner'], accommodation: 'Symphony Palms, Havelock' },
      { day: 3, title: 'Havelock Activities', description: 'Full day...', activities: [ { name: 'Breakfast', time: '8:00 AM', duration: '1 hour' }, { name: 'Elephant Beach Trip', time: '9:30 AM', duration: '45 mins' }, { name: 'Snorkeling', time: '10:30 AM', duration: '1 hour' }, { name: 'Lunch', time: '12:30 PM', duration: '1 hour' }, { name: 'Water sports', time: '2:00 PM', duration: '3 hours' }], meals: ['Breakfast', 'Dinner'], accommodation: 'Symphony Palms, Havelock' },
      { day: 4, title: 'Havelock to Neil Island', description: 'After breakfast...', activities: [ { name: 'Breakfast', time: '7:30 AM', duration: '1 hour' }, { name: 'Check-out', time: '9:00 AM', duration: '30 mins' }, { name: 'Ferry to Neil', time: '10:30 AM', duration: '1 hour' }, { name: 'Hotel check-in', time: '12:00 PM', duration: '1 hour' }, { name: 'Bharatpur Beach', time: '2:00 PM', duration: '1.5 hours' }, { name: 'Natural Bridge', time: '4:00 PM', duration: '1 hour' }, { name: 'Laxmanpur Sunset', time: '5:30 PM', duration: '1.5 hours' }], meals: ['Breakfast', 'Dinner'], accommodation: 'Summer Sand, Neil' },
      { day: 5, title: 'Neil to Port Blair - Departure', description: 'After breakfast...', activities: [ { name: 'Breakfast', time: '7:30 AM', duration: '1 hour' }, { name: 'Check-out', time: '9:00 AM', duration: '30 mins' }, { name: 'Ferry to Port Blair', time: '10:30 AM', duration: '1.5 hours' }, { name: 'Shopping', time: '12:30 PM', duration: '2 hours' }, { name: 'Airport Transfer', time: '3:00 PM', duration: '30 mins' }], meals: ['Breakfast'], accommodation: 'N/A' }
    ]
  };
  // --- End Mock Data ---


  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12"> {/* Adjusted padding */}
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {/* Header Part */}
          <div className="bg-blue-600 text-white p-4 md:p-6"> {/* Adjusted padding */}
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{itinerary.name}</h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm"> {/* Wrap items, smaller gap */}
              <div className="flex items-center"> <Clock size={16} className="mr-1" /> <span>{itinerary.duration}</span> </div>
              <div className="flex items-center"> <MapPin size={16} className="mr-1" /> <span>Port Blair, Havelock, Neil</span> </div> {/* Shortened */}
              <div className="flex items-center"> <Users size={16} className="mr-1" /> <span>Max 15 people</span> </div>
            </div>
          </div>

          <div className="p-4 md:p-6"> {/* Adjusted padding */}
            <p className="text-gray-700 mb-6 text-sm md:text-base">{itinerary.description}</p>

            {/* Price, Highlights, Inclusions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8"> {/* Adjusted gap */}
              {/* Price Box */}
              <div className="border border-gray-200 rounded-lg p-4 order-1 md:order-1">
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-blue-600">Price</h3>
                <p className="text-xl md:text-2xl font-bold">₹{itinerary.price.toLocaleString('en-IN')}</p>
                <p className="text-xs md:text-sm text-gray-500">per person</p>
                <Link
                  href={`/packages/${itinerary.id}/book`}
                  className="mt-3 md:mt-4 block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-md transition duration-300 text-sm md:text-base" // Adjusted size
                >
                  Book Now
                </Link>
              </div>

              {/* Highlights */}
              <div className="border border-gray-200 rounded-lg p-4 order-2 md:order-2">
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-blue-600">Highlights</h3>
                <ul className="space-y-1.5 md:space-y-2"> {/* Adjusted spacing */}
                  {itinerary.highlights.slice(0, 4).map((highlight, index) => (
                    <li key={`hl-${index}`} className="flex items-start">
                      <Check size={14} className="mr-2 text-green-500 flex-shrink-0 mt-0.5 md:mt-1" /> {/* Adjusted size/margin */}
                      <span className="text-xs md:text-sm">{highlight}</span>
                    </li>
                  ))}
                  {itinerary.highlights.length > 4 && (
                    <li className="text-xs md:text-sm text-blue-600 mt-1">+ {itinerary.highlights.length - 4} more highlights</li>
                  )}
                </ul>
              </div>

              {/* Inclusions */}
              <div className="border border-gray-200 rounded-lg p-4 order-3 md:order-3">
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-blue-600">Inclusions</h3>
                 <ul className="space-y-1.5 md:space-y-2"> {/* Adjusted spacing */}
                  {itinerary.inclusions.slice(0, 4).map((inclusion, index) => (
                    <li key={`inc-${index}`} className="flex items-start">
                      <Check size={14} className="mr-2 text-green-500 flex-shrink-0 mt-0.5 md:mt-1" /> {/* Adjusted size/margin */}
                      <span className="text-xs md:text-sm">{inclusion}</span>
                    </li>
                  ))}
                  {itinerary.inclusions.length > 4 && (
                    <li className="text-xs md:text-sm text-blue-600 mt-1">+ {itinerary.inclusions.length - 4} more inclusions</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Day Selector */}
            <div className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Itinerary</h2>
              {/* Use overflow-x-auto to allow horizontal scrolling on mobile */}
              <div className="flex overflow-x-auto pb-2 space-x-2 border-b border-gray-200 mb-4">
                {itinerary.days.map((day) => (
                  <button
                    key={day.day}
                    onClick={() => setSelectedDay(day.day)}
                    className={`px-3 py-2 rounded-t-md whitespace-nowrap text-sm transition-colors ${ // Adjusted padding/text size
                      selectedDay === day.day
                        ? 'bg-blue-600 text-white font-medium'
                        : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                    }`}
                  >
                    Day {day.day}
                    <span className="hidden sm:inline">: {day.title}</span> {/* Hide title on very small screens */}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Day Details */}
            {itinerary.days.map((day) => (
              <div key={day.day} className={`${selectedDay === day.day ? 'block animate-fadeIn' : 'hidden'}`}> {/* Added fade-in animation */}
                <div className="border-l-4 border-blue-600 pl-3 md:pl-4 mb-5 md:mb-6"> {/* Adjusted padding/margin */}
                  <h3 className="text-lg md:text-xl font-semibold">Day {day.day}: {day.title}</h3>
                  <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">{day.description}</p>
                </div>

                {/* Use grid for mobile stacking */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-6">
                  {/* Activities */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-base">Activities</h4>
                    <div className="space-y-3">
                      {day.activities.map((activity, index) => (
                        <div key={`act-${index}`} className="flex items-start"> {/* Use items-start */}
                           <div className="w-16 sm:w-20 flex-shrink-0 text-xs sm:text-sm text-gray-500 pt-0.5">{activity.time}</div> {/* Adjusted size/padding */}
                          <div className="flex-1">
                            <div className="text-sm font-medium">{activity.name}</div>
                            <div className="text-xs text-gray-500">{activity.duration}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Meals */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-base">Meals</h4>
                    <div className="space-y-1">
                      {day.meals.length > 0 ? (
                        day.meals.map((meal, index) => (
                          <div key={`meal-${index}`} className="flex items-center">
                            <Check size={14} className="mr-1.5 text-green-500" /> {/* Adjusted size */}
                            <span className="text-sm">{meal}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-gray-500 italic">No meals included</div>
                      )}
                    </div>
                  </div>

                  {/* Accommodation */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-base">Accommodation</h4>
                    <div className="text-sm">
                      {day.accommodation !== 'N/A' ? (
                        <div className="flex items-start">
                          <MapPin size={14} className="mr-1.5 text-gray-500 flex-shrink-0 mt-0.5" /> {/* Adjusted size */}
                          <span>{day.accommodation}</span>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500 italic">No accommodation (departure day)</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Next Day Button */}
                {day.day < itinerary.days.length && (
                  <div className="flex justify-end mt-4"> {/* Added margin top */}
                    <button
                      onClick={() => setSelectedDay(day.day + 1)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                    >
                      Next Day <ArrowRight size={16} className="ml-1" /> {/* Replaced arrow text */}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
           <div className="p-4 md:p-6"> {/* Adjusted padding */}
             <h2 className="text-xl md:text-2xl font-bold mb-4">Important Information</h2>

             <div className="mb-5 md:mb-6"> {/* Adjusted margin */}
               <h3 className="text-base md:text-lg font-semibold mb-2">Exclusions</h3>
               <ul className="space-y-1.5 md:space-y-2"> {/* Adjusted spacing */}
                 {itinerary.exclusions.map((exclusion, index) => (
                   <li key={`excl-${index}`} className="flex items-start">
                     <Info size={14} className="mr-2 text-red-500 flex-shrink-0 mt-0.5 md:mt-1" /> {/* Adjusted size */}
                     <span className="text-sm md:text-base">{exclusion}</span>
                   </li>
                 ))}
               </ul>
             </div>

             <div className="mb-5 md:mb-6"> {/* Adjusted margin */}
               <h3 className="text-base md:text-lg font-semibold mb-2">Cancellation Policy</h3>
               <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700"> {/* Use list-disc */}
                 <li>Free cancellation up to 7 days before the start date</li>
                 <li>50% refund for cancellations between 3-7 days before start date</li>
                 <li>No refund for cancellations less than 3 days before start date</li>
                 <li>All refunds processed within 7 working days</li>
               </ul>
             </div>

             <div>
               <h3 className="text-base md:text-lg font-semibold mb-2">Additional Notes</h3>
               <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700"> {/* Use list-disc */}
                 <li>Itinerary subject to change based on weather conditions</li>
                 <li>Ferry timings may vary; confirm before travel</li>
                 <li>Carry valid government-issued ID proof</li>
                 <li>Children below 5 years join free (no extra bed)</li>
                 <li>Inform dietary needs during booking</li>
               </ul>
             </div>
           </div>
        </div>

        {/* Booking CTA */}
        <div className="bg-blue-50 rounded-lg p-6 md:p-8 text-center"> {/* Adjusted padding */}
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Ready to Explore Andaman?</h2>
          <p className="text-gray-600 mb-5 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
            Book this package now to secure your spot. Limited availability during peak season.
          </p>
          <Link
            href={`/packages/${itinerary.id}/book`}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-6 md:py-3 md:px-8 rounded-md transition duration-300 text-sm md:text-base" // Adjusted padding/text size
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

// Add a simple fade-in animation to globals.css if you don't have it
/* Add to src/app/globals.css */
/*
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}
*/