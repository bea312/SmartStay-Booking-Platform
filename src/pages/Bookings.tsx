import React from 'react';
import { format } from 'date-fns';
import { Calendar, Users, MapPin, XCircle } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import { useBookingStore } from '../store/bookingStore';

const Bookings: React.FC = () => {
  const { user } = useAuthContext();
  const { getBookings, cancelBooking } = useBookingStore();

  const bookings = user ? getBookings(user.id) : [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Trips</h1>
        <p className="text-gray-500">Manage your upcoming stays and past bookings.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center shadow-sm mb-4">
            <Calendar className="w-8 h-8 text-black" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No trips booked... yet!</h3>
          <p className="text-gray-500 mb-6">Time to dust off your bags and start planning your next adventure.</p>
          <a href="/" className="px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors shadow-sm inline-block">
            Start Searching
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => {
            const property = booking.propertySnapshot as any; 
            const isCancelled = booking.status === 'cancelled';
            const isActive = !isCancelled && new Date(booking.checkOut) >= new Date();

            return (
              <div key={booking.id} className={`flex flex-col sm:flex-row bg-white rounded-2xl border ${isCancelled ? 'border-red-100 bg-red-50/30' : 'border-gray-200'} shadow-sm overflow-hidden group`}>
                
                
                <div className="sm:w-64 h-48 sm:h-auto shrink-0 relative overflow-hidden bg-gray-100">
                  <img 
                    src={property?.image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80'} 
                    alt={property?.name || 'Property'}
                    className={`w-full h-full object-cover transition-transform duration-500 ${!isCancelled && 'group-hover:scale-105'} ${isCancelled ? 'grayscale opacity-60' : ''}`}
                  />
                  {isCancelled && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-full shadow-sm">Cancelled</span>
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  {/* Top Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`text-xl font-bold mb-1 ${isCancelled ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {property?.name || 'SmartStay Property'}
                      </h3>
                      <p className="text-gray-500 text-sm flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {property?.location || 'Unknown location'}
                      </p>
                    </div>
                    <div className={`text-right ${isCancelled ? 'opacity-50' : ''}`}>
                      <p className="text-2xl font-bold text-gray-900">${booking.totalPrice}</p>
                      <p className="text-xs text-gray-500 font-medium">Total Price</p>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className={`grid grid-cols-2 gap-4 mb-6 ${isCancelled ? 'opacity-50' : ''}`}>
                    <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <Calendar className="w-5 h-5 text-primary-500" />
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Dates</p>
                        <p className="text-sm font-medium">
                          {format(new Date(booking.checkIn), 'MMM d, yyyy')} - {format(new Date(booking.checkOut), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <Users className="w-5 h-5 text-primary-500" />
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Guests</p>
                        <p className="text-sm font-medium">{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-3 mt-auto">
                    {isActive && (
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white font-bold hover:bg-red-700 rounded-xl transition-colors text-sm shadow-sm"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel Reservation
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Bookings;
