// Path: .\src\app\vendor\services\page.tsx
'use client';

import React, { useState } from 'react'; // Import React
import Link from 'next/link';
import { CreditCard, Check, AlertTriangle, Loader2 } from 'lucide-react'; // Added Loader2

// Define Interfaces
interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string; // Optional
  isActive: boolean;
  bookings: number;
  availability?: AvailabilitySlot[]; // Add availability array
  rating?: number; // Add optional rating
}

interface AvailabilitySlot {
    day: string;
    time: string;
}

interface ServiceFormData {
  name: string;
  description: string;
  price: string; // Keep as string for input, parse on submit
  image_url: string;
  availability: AvailabilitySlot[];
}

interface FormErrors {
    name?: string;
    description?: string;
    price?: string;
    availability?: string;
}
// --- End Interfaces ---


export default function VendorServiceManagement() {
  const [services, setServices] = useState<Service[]>([ // Type the state
    { id: 1, name: 'Scuba Diving - Beginners', description: 'Experience the underwater world with our beginner-friendly scuba diving package. No prior experience needed.', price: 2500, image_url: '/images/services/scuba-beginners.jpg', isActive: true, bookings: 24, rating: 4.8, availability: [{ day: 'Monday', time: '10:00 AM'}] }, // Example availability
    { id: 2, name: 'Advanced Scuba Certification', description: 'Take your diving skills to the next level with our PADI Advanced Open Water certification course.', price: 15000, image_url: '/images/services/scuba-advanced.jpg', isActive: true, bookings: 12, rating: 4.9, availability: [] },
    { id: 3, name: 'Night Diving Experience', description: 'Discover the magical underwater world after dark with our guided night diving experience.', price: 3500, image_url: '/images/services/night-diving.jpg', isActive: false, bookings: 8, rating: 4.7, availability: [] }
  ]);

  const [currentService, setCurrentService] = useState<Service | null>(null); // Type the state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ServiceFormData>({ // Type the state
    name: '',
    description: '',
    price: '',
    image_url: '',
    availability: []
  });
  const [errors, setErrors] = useState<FormErrors>({}); // Type the state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Days of the week for availability
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  // Time slots for availability
  const timeSlots = [ '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM' ];

  // --- FIX: Add type annotation for 'e' ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  // --- End FIX ---
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name as keyof FormErrors]) { // Clear specific error on change
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }
     if (successMessage) setSuccessMessage(''); // Clear success message on change
  };

  const handleAvailabilityChange = (day: string, timeSlot: string, isAvailable: boolean) => {
    const updatedAvailability = [...formData.availability];
    const existingIndex = updatedAvailability.findIndex(
      item => item.day === day && item.time === timeSlot
    );

    if (isAvailable) {
      if (existingIndex === -1) {
        updatedAvailability.push({ day, time: timeSlot });
      }
    } else {
      if (existingIndex !== -1) {
        updatedAvailability.splice(existingIndex, 1);
      }
    }

    setFormData({ ...formData, availability: updatedAvailability });
    if (errors.availability) { // Clear availability error on change
        setErrors(prev => ({ ...prev, availability: undefined }));
    }
     if (successMessage) setSuccessMessage('');
  };

  const isTimeSlotAvailable = (day: string, timeSlot: string): boolean => { // Add types
    return formData.availability.some(
      item => item.day === day && item.time === timeSlot
    );
  };

  const handleEditService = (service: Service) => { // Type parameter
    setCurrentService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price.toString(), // Convert number to string for input
      image_url: service.image_url || '',
      availability: service.availability || [] // Use existing or empty array
    });
    setIsEditing(true);
    setSuccessMessage('');
    setErrors({});
    window.scrollTo(0, 0);
  };

  const handleAddNewService = () => {
    setCurrentService(null);
    setFormData({ // Reset form data
      name: '',
      description: '',
      price: '',
      image_url: '',
      availability: []
    });
    setIsEditing(true);
    setSuccessMessage('');
    setErrors({});
    window.scrollTo(0, 0);
  };

  const validateForm = (): boolean => { // Add return type
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Service name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else {
        const priceNum = parseFloat(formData.price);
        if (isNaN(priceNum) || priceNum <= 0) {
            newErrors.price = 'Price must be a positive number';
        }
    }

    if (formData.availability.length === 0) {
      newErrors.availability = 'Please select at least one availability slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { // Type event
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSuccessMessage(''); // Clear previous success message

    // Simulate API call
    console.log("Submitting Service Data:", {
        ...formData,
        price: parseFloat(formData.price) // Convert price back to number for submission
    });
    setTimeout(() => {
      if (currentService) {
        // Update existing service
        const updatedServices = services.map(service =>
          service.id === currentService.id
            ? {
                ...service,
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price), // Convert back to number
                image_url: formData.image_url,
                availability: formData.availability
              }
            : service
        );
        setServices(updatedServices);
        setSuccessMessage('Service updated successfully!');
      } else {
        // Add new service
        const newService: Service = { // Use Service type
          id: Math.max(0, ...services.map(s => s.id)) + 1, // Simple ID generation
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price), // Convert back to number
          image_url: formData.image_url,
          availability: formData.availability,
          isActive: true, // Default to active
          bookings: 0,
          rating: undefined // Default rating
        };
        setServices([...services, newService]);
        setSuccessMessage('New service added successfully!');
      }

      setIsSubmitting(false);
      setIsEditing(false); // Close the form on success
    }, 1000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({}); // Clear errors on cancel
  };

  const handleDeleteService = (serviceId: number) => { // Type parameter
    if (window.confirm('Are you sure you want to delete this service? This cannot be undone.')) {
       // Simulate API call
       console.log(`Deleting service with ID: ${serviceId}`);
      setServices(currentServices => currentServices.filter(service => service.id !== serviceId));
      setSuccessMessage('Service deleted successfully!');
       // Ensure form closes if the deleted service was being edited
       if (currentService?.id === serviceId) {
           setIsEditing(false);
           setCurrentService(null);
       }
    }
  };

  const handleToggleServiceStatus = (serviceId: number) => { // Type parameter
     // Simulate API call
     const service = services.find(s => s.id === serviceId);
     console.log(`Toggling status for service ID: ${serviceId} (Current: ${service?.isActive})`);
    setServices(currentServices => currentServices.map(service =>
      service.id === serviceId
        ? { ...service, isActive: !service.isActive }
        : service
    ));

    const updatedService = services.find(s => s.id === serviceId); // Get status *before* update
    setSuccessMessage(`Service "${updatedService?.name}" ${updatedService?.isActive ? 'deactivated' : 'activated'} successfully!`);
  };


  // --- JSX remains largely the same ---
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header and Back Link */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Manage Services</h1>
          <Link href="/vendor/dashboard" className="text-sm text-blue-600 hover:text-blue-800"> ← Back to Dashboard </Link>
        </div>

        {/* Success Message */}
         {successMessage && ( <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert"> <span className="block sm:inline">{successMessage}</span> </div> )}

        {/* Add/Edit Form */}
        {isEditing ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 border border-blue-200"> {/* Highlight form */}
             <div className="px-6 py-4 border-b bg-gray-50"> <h2 className="font-semibold text-lg">{currentService ? 'Edit Service' : 'Add New Service'}</h2> </div>
             <div className="p-6">
               <form onSubmit={handleSubmit} noValidate> {/* Add noValidate */}
                 {/* Form Fields */}
                  <div className="mb-4"> <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1"> Name* </label> <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500`} required/> {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>} </div>
                  <div className="mb-4"> <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1"> Description* </label> <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={3} className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500`} required></textarea> {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>} </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div> <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1"> Price (₹)* </label> <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} min="0" step="0.01" className={`w-full border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500`} required/> {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>} </div>
                      <div> <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1"> Image URL </label> <input type="url" id="image_url" name="image_url" value={formData.image_url} onChange={handleInputChange} placeholder="https://..." className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"/> </div>
                  </div>
                  {/* Availability Grid */}
                  <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2"> Availability* <span className="text-xs text-gray-500">(Select available time slots)</span> </label>
                      {errors.availability && <p className="mb-2 text-sm text-red-600">{errors.availability}</p>}
                      <div className="border border-gray-300 rounded-md overflow-hidden"> <div className="overflow-x-auto"> <table className="min-w-full divide-y divide-gray-200 text-xs"> <thead className="bg-gray-50"> <tr> <th className="px-2 py-2 text-left font-medium text-gray-500 uppercase"> Day </th> {timeSlots.map((ts) => <th key={ts} className="px-1 py-2 text-center font-medium text-gray-500 uppercase"> {ts.replace(' AM','a').replace(' PM','p')} </th>)} </tr> </thead> <tbody className="bg-white divide-y divide-gray-200"> {daysOfWeek.map((day) => ( <tr key={day}> <td className="px-2 py-2 whitespace-nowrap font-medium text-gray-900"> {day.substring(0,3)} </td> {timeSlots.map((ts) => ( <td key={`${day}-${ts}`} className="px-1 py-2 whitespace-nowrap text-center"> <input type="checkbox" checked={isTimeSlotAvailable(day, ts)} onChange={(e) => handleAvailabilityChange(day, ts, e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" /> </td> ))} </tr> ))} </tbody> </table> </div> </div>
                  </div>
                 {/* Form Actions */}
                  <div className="flex justify-end space-x-3"> <button type="button" onClick={handleCancel} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm"> Cancel </button> <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50 flex items-center"> {isSubmitting && <Loader2 className="animate-spin h-4 w-4 mr-2"/>} {isSubmitting ? 'Saving...' : currentService ? 'Update Service' : 'Add Service'} </button> </div>
               </form>
             </div>
          </div>
        ) : (
          <div className="mb-6">
            <button onClick={handleAddNewService} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"> + Add New Service </button>
          </div>
        )}

        {/* Services List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
           <div className="px-6 py-4 border-b bg-gray-50"> <h2 className="font-semibold">Your Services</h2> </div>
            {services.length === 0 && !isEditing ? (
               <div className="p-8 text-center text-gray-500"> You haven't added any services yet. </div>
           ) : (
             <div className="overflow-x-auto">
               <table className="min-w-full divide-y divide-gray-200">
                 <thead className="bg-gray-50">
                    <tr>
                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Service </th>
                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Price </th>
                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Status </th>
                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Bookings </th>
                       <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"> Actions </th>
                    </tr>
                 </thead>
                 <tbody className="bg-white divide-y divide-gray-200">
                   {services.map((service) => (
                     <tr key={service.id}>
                       <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                              <div className="h-10 w-10 bg-gray-200 rounded-md flex-shrink-0"> {/* Placeholder */} </div>
                              <div className="ml-3"> <div className="text-sm font-medium text-gray-900">{service.name}</div> <div className="text-xs text-gray-500 truncate max-w-xs">{service.description}</div> </div>
                          </div>
                       </td>
                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900"> ₹{service.price.toLocaleString()} </td>
                       <td className="px-4 py-4 whitespace-nowrap"> <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800' }`}> {service.isActive ? 'Active' : 'Inactive'} </span> </td>
                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500"> {service.bookings} </td>
                       <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                           <button onClick={() => handleEditService(service)} className="text-blue-600 hover:text-blue-900"> Edit </button>
                           <button onClick={() => handleToggleServiceStatus(service.id)} className={service.isActive ? "text-yellow-600 hover:text-yellow-900" : "text-green-600 hover:text-green-900"}> {service.isActive ? 'Deactivate' : 'Activate'} </button>
                           <button onClick={() => handleDeleteService(service.id)} className="text-red-600 hover:text-red-900"> Delete </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           )}
        </div>

        {/* Tips Section */}
         <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6"> <h3 className="text-lg font-medium text-blue-800 mb-4">Service Management Tips</h3> <ul className="space-y-2 text-sm text-blue-700"> {/* ... Tips list items ... */} </ul> </div>

      </div>
    </div>
  );
}