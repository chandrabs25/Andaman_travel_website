'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, Calendar, Clock, User, MapPin, Phone, Mail, Shield, Package, Activity, Settings, LogOut, Home, Users as UsersIcon, FileText, Star } from 'lucide-react';

export default function VendorDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [vendorData, setVendorData] = useState({
    name: 'Andaman Adventures',
    email: 'vendor@example.com',
    phone: '+91 9876543210',
    address: 'Beach No. 5, Havelock Island',
    verified: true,
    joinedDate: 'January 2023',
    stats: {
      totalServices: 4,
      activeBookings: 12,
      totalEarnings: 156000,
      reviewScore: 4.8
    }
  });
  
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Scuba Diving',
      price: 4500,
      duration: '3 hours',
      bookings: 28,
      rating: 4.9,
      status: 'active'
    },
    {
      id: 2,
      name: 'Glass Bottom Boat Tour',
      price: 1800,
      duration: '2 hours',
      bookings: 45,
      rating: 4.7,
      status: 'active'
    },
    {
      id: 3,
      name: 'Night Kayaking',
      price: 2500,
      duration: '2 hours',
      bookings: 15,
      rating: 4.6,
      status: 'active'
    },
    {
      id: 4,
      name: 'Island Camping',
      price: 6000,
      duration: '24 hours',
      bookings: 8,
      rating: 4.8,
      status: 'active'
    }
  ]);
  
  const [bookings, setBookings] = useState([
    {
      id: 101,
      service: 'Scuba Diving',
      customer: 'John Doe',
      date: '2025-04-15',
      people: 2,
      amount: 9000,
      status: 'confirmed'
    },
    {
      id: 102,
      service: 'Glass Bottom Boat Tour',
      customer: 'Alice Smith',
      date: '2025-04-16',
      people: 4,
      amount: 7200,
      status: 'confirmed'
    },
    {
      id: 103,
      service: 'Night Kayaking',
      customer: 'Robert Johnson',
      date: '2025-04-18',
      people: 2,
      amount: 5000,
      status: 'pending'
    },
    {
      id: 104,
      service: 'Island Camping',
      customer: 'Emily Brown',
      date: '2025-04-20',
      people: 3,
      amount: 18000,
      status: 'confirmed'
    },
    {
      id: 105,
      service: 'Scuba Diving',
      customer: 'Michael Wilson',
      date: '2025-04-22',
      people: 1,
      amount: 4500,
      status: 'pending'
    }
  ]);
  
  const [reviews, setReviews] = useState([
    {
      id: 201,
      service: 'Scuba Diving',
      customer: 'John Doe',
      date: '2025-03-15',
      rating: 5,
      comment: 'Amazing experience! The instructor was very professional and made sure we were safe throughout.'
    },
    {
      id: 202,
      service: 'Glass Bottom Boat Tour',
      customer: 'Alice Smith',
      date: '2025-03-18',
      rating: 4,
      comment: 'Great tour, we saw lots of colorful fish and coral. Would recommend!'
    },
    {
      id: 203,
      service: 'Night Kayaking',
      customer: 'Robert Johnson',
      date: '2025-03-20',
      rating: 5,
      comment: 'The bioluminescence was magical! A must-do experience in Andaman.'
    }
  ]);
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Activity className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Services</p>
                    <h3 className="text-2xl font-bold">{vendorData.stats.totalServices}</h3>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-600 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active Bookings</p>
                    <h3 className="text-2xl font-bold">{vendorData.stats.activeBookings}</h3>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-600 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Review Score</p>
                    <h3 className="text-2xl font-bold">{vendorData.stats.reviewScore}/5</h3>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-purple-600 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <FileText className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Earnings</p>
                    <h3 className="text-2xl font-bold">₹{vendorData.stats.totalEarnings.toLocaleString()}</h3>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-yellow-600 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 text-left text-sm font-medium text-gray-500">Service</th>
                        <th className="py-2 text-left text-sm font-medium text-gray-500">Date</th>
                        <th className="py-2 text-left text-sm font-medium text-gray-500">Amount</th>
                        <th className="py-2 text-left text-sm font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 3).map(booking => (
                        <tr key={booking.id} className="border-b">
                          <td className="py-3 text-sm">{booking.service}</td>
                          <td className="py-3 text-sm">{booking.date}</td>
                          <td className="py-3 text-sm">₹{booking.amount.toLocaleString()}</td>
                          <td className="py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-right">
                  <button 
                    onClick={() => setActiveTab('bookings')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View all bookings →
                  </button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>
                <div className="space-y-4">
                  {reviews.slice(0, 2).map(review => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{review.service}</p>
                          <p className="text-sm text-gray-600">{review.customer} • {review.date}</p>
                        </div>
                        <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">{review.rating}/5</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-right">
                  <button 
                    onClick={() => setActiveTab('reviews')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View all reviews →
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'services':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your Services</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Add New Service
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Service Name</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Price</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Duration</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Bookings</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Rating</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map(service => (
                      <tr key={service.id} className="border-b">
                        <td className="py-3 px-4 text-sm font-medium">{service.name}</td>
                        <td className="py-3 px-4 text-sm">₹{service.price.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm">{service.duration}</td>
                        <td className="py-3 px-4 text-sm">{service.bookings}</td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span>{service.rating}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            {service.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">Edit</button>
                            <button className="text-red-600 hover:text-red-800">Disable</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        
      case 'bookings':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Bookings</h2>
              <div className="flex space-x-2">
                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option value="all">All Bookings</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <input 
                  type="date" 
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Filter by date"
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Booking ID</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Service</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Customer</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Date</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">People</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Amount</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(booking => (
                      <tr key={booking.id} className="border-b">
                        <td className="py-3 px-4 text-sm font-medium">#{booking.id}</td>
                        <td className="py-3 px-4 text-sm">{booking.service}</td>
                        <td className="py-3 px-4 text-sm">{booking.customer}</td>
                        <td className="py-3 px-4 text-sm">{booking.date}</td>
                        <td className="py-3 px-4 text-sm">{booking.people}</td>
                        <td className="py-3 px-4 text-sm">₹{booking.amount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">View</button>
                            {booking.status === 'pending' && (
                              <button className="text-green-600 hover:text-green-800">Confirm</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        
      case 'reviews':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Customer Reviews</h2>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option value="all">All Services</option>
                <option value="scuba">Scuba Diving</option>
                <option value="boat">Glass Bottom Boat Tour</option>
                <option value="kayaking">Night Kayaking</option>
                <option value="camping">Island Camping</option>
              </select>
            </div>
            
            <div className="space-y-6">
              {reviews.map(review => (
                <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{review.service}</h3>
                      <p className="text-sm text-gray-600">{review.customer} • {review.date}</p>
                    </div>
                    <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                      <Star className="h-5 w-5 text-yellow-500 mr-1" />
                      <span className="font-medium">{review.rating}/5</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  <div className="mt-4 flex justify-end">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Reply to review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'profile':
        return (
          <div>
            <h2 className="text-xl font-bold mb-6">Business Profile</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                  <div className="relative w-40 h-40 mx-auto md:mx-0 bg-gray-200 rounded-lg overflow-hidden mb-4">
                    <Image 
                      src="/images/vendor-logo.jpg" 
                      alt="Business Logo" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold">{vendorData.name}</h3>
                    <p className="text-gray-600 mb-2">
                      {vendorData.verified && (
                        <span className="inline-flex items-center text-green-600 mr-2">
                          <Shield className="h-4 w-4 mr-1" />
                          Verified
                        </span>
                      )}
                      Member since {vendorData.joinedDate}
                    </p>
                    <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Change Logo
                    </button>
                  </div>
                </div>
                
                <div className="md:w-2/3 md:border-l md:pl-8">
                  <h4 className="text-lg font-semibold mb-4">Business Information</h4>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={vendorData.name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={vendorData.email}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={vendorData.phone}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Business Address
                      </label>
                      <textarea
                        rows={3}
                        value={vendorData.address}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Business Description
                      </label>
                      <textarea
                        rows={4}
                        defaultValue="Premier adventure sports provider in Andaman Islands. We offer a range of exciting activities including scuba diving, glass bottom boat tours, night kayaking, and island camping experiences. Our team of certified professionals ensures safety and quality in all our services."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 bg-blue-800 text-white z-10 transform transition-transform duration-300 lg:translate-x-0 -translate-x-full lg:static lg:inset-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-blue-700">
              <h1 className="text-xl font-bold">Vendor Dashboard</h1>
              <p className="text-blue-300 text-sm mt-1">Andaman Adventures</p>
            </div>
            
            <nav className="flex-grow p-4">
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${
                      activeTab === 'overview' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700'
                    }`}
                  >
                    <Home className="h-5 w-5 mr-3" />
                    Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('services')}
                    className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${
                      activeTab === 'services' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700'
                    }`}
                  >
                    <Package className="h-5 w-5 mr-3" />
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${
                      activeTab === 'bookings' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700'
                    }`}
                  >
                    <Calendar className="h-5 w-5 mr-3" />
                    Bookings
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${
                      activeTab === 'reviews' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700'
                    }`}
                  >
                    <Star className="h-5 w-5 mr-3" />
                    Reviews
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${
                      activeTab === 'profile' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700'
                    }`}
                  >
                    <User className="h-5 w-5 mr-3" />
                    Profile
                  </button>
                </li>
              </ul>
            </nav>
            
            <div className="p-4 border-t border-blue-700">
              <Link 
                href="/"
                className="flex items-center text-blue-100 hover:text-white transition-colors"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </Link>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:ml-64 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'services' && 'Manage Services'}
              {activeTab === 'bookings' && 'Booking Management'}
              {activeTab === 'reviews' && 'Customer Reviews'}
              {activeTab === 'profile' && 'Business Profile'}
            </h1>
          </div>
          
          {renderTabContent()}
        </div>
      </div>
    </>
  );
}
