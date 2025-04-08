// Path: .\src\app\vendor\bookings\page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Calendar, AlertTriangle } from 'lucide-react';

// Define Interfaces (as before)
type BookingStatusVendor = 'pending' | 'confirmed' | 'completed' | 'cancelled';
type PaymentStatusVendor = 'pending' | 'completed' | 'failed';

interface VendorBooking {
  id: string;
  packageId: string;
  packageName: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  startDate: string;
  endDate: string;
  guests: number;
  amount: number;
  commission: number;
  netAmount: number;
  status: BookingStatusVendor;
  paymentStatus: PaymentStatusVendor;
  createdAt: string;
}

interface VendorStats {
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
    totalRevenue: number;
}

interface ApiErrorResponse {
    message?: string;
}

// Added interface for successful response structure
interface ApiSuccessResponse {
    success?: boolean; // Optional success flag
    bookings: any[]; // Expect bookings array
}


export default function VendorBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<VendorBooking[]>([]);
  const [stats, setStats] = useState<VendorStats>({
    pending: 0, confirmed: 0, completed: 0, cancelled: 0, totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<BookingStatusVendor>('pending');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const vendorId = 'vendor_456'; // Example Vendor ID
      const response = await fetch(`/api/bookings?vendorId=${vendorId}`);

      // --- FIX: Check response.ok BEFORE parsing JSON ---
      if (!response.ok) {
         let errorMessage = `Failed to fetch bookings. Status: ${response.status}`;
         try {
             // Try to parse error message from body
             const errorData = await response.json() as ApiErrorResponse;
             if (typeof errorData?.message === 'string' && errorData.message) {
                 errorMessage = errorData.message;
             }
         } catch (e) {
             // Ignore JSON parsing errors for error responses if body is not JSON
             console.warn("Could not parse error response body as JSON.");
         }
         throw new Error(errorMessage);
      }

      // If response.ok, parse the expected success data
      const data = await response.json() as ApiSuccessResponse; // Assert success type
      // --- End FIX ---


      // Validate the structure of the received success data
       if (!data || !Array.isArray(data.bookings)) {
         throw new Error("Invalid data structure received from bookings API.");
       }

       const fetchedBookings: VendorBooking[] = data.bookings.map((b: any): VendorBooking => {
           // ... (mapping logic remains the same) ...
             const status = ['pending', 'confirmed', 'completed', 'cancelled'].includes(b.status) ? b.status : 'pending';
             const paymentStatus = ['pending', 'completed', 'failed'].includes(b.paymentStatus) ? b.paymentStatus : 'pending';
             return {
                 id: String(b.id ?? `unknown-${Math.random()}`),
                 packageId: String(b.packageId ?? ''),
                 packageName: String(b.packageName || 'Unknown Package'),
                 userId: String(b.userId ?? ''),
                 userName: String(b.userName || 'Unknown User'),
                 userEmail: String(b.userEmail || ''),
                 userPhone: String(b.userPhone || ''),
                 startDate: String(b.startDate || ''),
                 endDate: String(b.endDate || ''),
                 guests: Number(b.guests) || 0,
                 amount: Number(b.amount) || 0,
                 commission: Number(b.commission) || 0,
                 netAmount: Number(b.netAmount) || 0,
                 status: status as VendorBooking['status'],
                 paymentStatus: paymentStatus as VendorBooking['paymentStatus'],
                 createdAt: String(b.createdAt || new Date().toISOString()),
             };
       });

       // --- MOCK DATA SECTION (Comment/Uncomment as needed) ---
        console.log("Using MOCK data instead of fetched data");
        const mockBookings: VendorBooking[] = [ /* ... mock data ... */ ];
        setBookings(mockBookings);
        const currentBookings = mockBookings;
       // --- END MOCK DATA SECTION ---

      // Use fetched data if not using mock
      // setBookings(fetchedBookings);
      // const currentBookings = fetchedBookings;

      // Calculate stats
      const calculatedStats = currentBookings.reduce((acc, booking) => {
        acc[booking.status] = (acc[booking.status] || 0) + 1;
        if (booking.paymentStatus === 'completed') {
          acc.totalRevenue += Number(booking.netAmount) || 0;
        }
        return acc;
      }, { pending: 0, confirmed: 0, completed: 0, cancelled: 0, totalRevenue: 0 } as VendorStats);

      setStats(calculatedStats);

    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err instanceof Error ? err.message : 'Failed to load bookings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Other functions (handleViewBooking, handleUpdateStatus, etc.) remain the same...
  const handleViewBooking = (bookingId: string) => { router.push(`/vendor/bookings/${bookingId}`); };
  const handleUpdateStatus = async (bookingId: string, newStatus: BookingStatusVendor) => {
      setError(null);
      try {
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API
          let oldStatus: BookingStatusVendor | undefined;
          setBookings(currentBookings => currentBookings.map(booking => {
              if (booking.id === bookingId) { oldStatus = booking.status; return { ...booking, status: newStatus }; }
              return booking;
          }));
          if (oldStatus) { setStats(prevStats => ({ ...prevStats, [newStatus]: (prevStats[newStatus] || 0) + 1, [oldStatus!]: (prevStats[oldStatus!] || 1) - 1 })); }
          alert(`Booking status updated to ${newStatus}`);
      } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to update booking status.';
          setError(message); alert(message);
      }
  };
  const filterBookings = (status: BookingStatusVendor): VendorBooking[] => { return bookings.filter(booking => booking.status === status); };
  const getStatusBadge = (status: BookingStatusVendor) => {
       const statusClasses: Record<BookingStatusVendor, string> = { confirmed: 'bg-green-100 text-green-800', pending: 'bg-yellow-100 text-yellow-800', completed: 'bg-blue-100 text-blue-800', cancelled: 'bg-red-100 text-red-800' };
       return ( <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}> {status.charAt(0).toUpperCase() + status.slice(1)} </span> );
  };
  const formatDate = (dateString: string | null | undefined) => { if (!dateString) return 'N/A'; try { return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }); } catch { return 'Invalid Date'; } };

  const displayedBookings = filterBookings(activeTab);

  // JSX return statement remains the same...
  return (
     <div className="container mx-auto px-4 py-8">
        {/* ... Heading, Stats, Tabs ... */}
         <h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"> <div className="bg-white p-4 rounded-lg shadow"> <p>Pending</p> <p>{stats.pending}</p> </div> <div className="bg-white p-4 rounded-lg shadow"> <p>Confirmed</p> <p>{stats.confirmed}</p> </div> <div className="bg-white p-4 rounded-lg shadow"> <p>Completed</p> <p>{stats.completed}</p> </div> <div className="bg-white p-4 rounded-lg shadow"> <p>Cancelled</p> <p>{stats.cancelled}</p> </div> <div className="bg-white p-4 rounded-lg shadow"> <p>Total Revenue</p> <p>₹{stats.totalRevenue.toLocaleString()}</p> </div> </div>
          <div className="mb-6"> <div className="border-b border-gray-200"> <nav className="-mb-px flex space-x-8"> {(['pending', 'confirmed', 'completed', 'cancelled'] as const).map(tab => ( <button key={tab} onClick={() => setActiveTab(tab)} className={`py-4 px-1 border-b-2 font-medium text-sm ${ activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300' }`}> {tab.charAt(0).toUpperCase() + tab.slice(1)} ({stats[tab]}) </button> ))} </nav> </div> </div>


        {/* Loading / Error / Content */}
         {loading ? ( <div className="text-center py-10"> <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" /> <p>Loading...</p> </div> )
         : error ? ( <div className="bg-red-50 border-l-4 border-red-400 p-4"> <p>{error}</p> </div> )
         : ( <div> {displayedBookings.length === 0 ? ( <div className="text-center py-10 bg-gray-50 rounded-lg"> <p>No {activeTab} bookings.</p> </div> )
                  : ( <div className="bg-white shadow overflow-hidden sm:rounded-md"> <ul className="divide-y divide-gray-200"> {displayedBookings.map((booking) => ( <li key={booking.id}> <div className="px-4 py-4 sm:px-6"> {/* Booking Item */} <div className="flex items-center justify-between"> <p>{booking.packageName}</p> {getStatusBadge(booking.status)} </div> <div className="mt-2 text-sm text-gray-500"> <p>{booking.userName} • {booking.userPhone}</p> <p>{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</p> <p>₹{booking.amount.toLocaleString()} (Net: ₹{booking.netAmount.toLocaleString()})</p> <p>Booked: {formatDate(booking.createdAt)}</p> </div> <div className="mt-4 flex justify-end space-x-3 text-sm"> <button onClick={() => handleViewBooking(booking.id)}>View</button> {activeTab === 'pending' && ( <button onClick={() => handleUpdateStatus(booking.id, 'confirmed')}>Confirm</button> )} {activeTab === 'confirmed' && ( <button onClick={() => handleUpdateStatus(booking.id, 'completed')}>Complete</button> )} {(activeTab === 'pending' || activeTab === 'confirmed') && ( <button onClick={() => handleUpdateStatus(booking.id, 'cancelled')}>Cancel</button> )} </div> </div> </li> ))} </ul> </div> )
              } </div> )
        }
    </div>
  );
}