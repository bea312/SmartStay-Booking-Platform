import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContext';
import { useBookingStore } from '../../store/bookingStore';
import { AirbnbProperty } from '../../services/listings';

interface BookingFormProps {
  property: AirbnbProperty;
}

const BookingForm: React.FC<BookingFormProps> = ({ property }) => {
  const { isAuthenticated, user } = useAuthContext();
  const { addBooking } = useBookingStore();
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateTotalDays = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const days = calculateTotalDays();
  const basePrice = (property.price || 0) * days;
  const serviceFee = Math.round(basePrice * 0.1);
  const total = basePrice + serviceFee;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!checkIn || !checkOut || !user) return;

    setIsSubmitting(true);
    
    // Simulate booking delay
    setTimeout(() => {
      addBooking({
        id: `book_${Date.now()}`,
        listingId: property.id,
        userId: user.id,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guests,
        totalPrice: total,
        status: 'confirmed',
        createdAt: new Date(),
        propertySnapshot: { // Save a snapshot for the UI
          name: property.name,
          image: property.picture_url || '',
          location: property.location?.address || ''
        }
      } as any); // Type assertion for snapshot since it's an extension of Booking model
      
      setIsSubmitting(false);
      navigate('/bookings');
    }, 1500);
  };

  return (
    <div className="bg-white border text-gray-900 border-gray-200 rounded-2xl p-6 shadow-xl shadow-gray-200/50 sticky top-24">
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-2xl font-bold">${property.price}</span>
        <span className="text-gray-500">/ night</span>
      </div>

      <form onSubmit={handleBooking} className="space-y-4">
        {/* Date Picker Split Input */}
        <div className="grid grid-cols-2 rounded-xl overflow-hidden border border-gray-300">
          <div className="p-3 border-r border-gray-300 bg-white">
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Check-in</label>
            <input 
              type="date" 
              required
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-sm focus:outline-none placeholder-gray-400"
            />
          </div>
          <div className="p-3 bg-white">
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Check-out</label>
            <input 
              type="date" 
              required
              min={checkIn}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-sm focus:outline-none placeholder-gray-400"
            />
          </div>
        </div>

      
        <div className="p-3 rounded-xl border border-gray-300 bg-white">
          <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Guests</label>
          <select 
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-transparent text-sm focus:outline-none appearance-none cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
            ))}
          </select>
        </div>

       
        <button
          type="submit"
          disabled={isSubmitting || !checkIn || !checkOut}
          className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-primary-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? 'Confirming...' : (isAuthenticated ? 'Reserve' : 'Log in to Reserve')}
        </button>

        
        {days > 0 && (
          <div className="pt-4 space-y-3">
            <p className="text-center text-gray-500 text-sm mb-4">You won't be charged yet</p>
            <div className="flex justify-between text-gray-600">
              <span className="underline decoration-gray-300">${property.price} x {days} nights</span>
              <span>${basePrice}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span className="underline decoration-gray-300">Service Fee</span>
              <span>${serviceFee}</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between font-bold text-gray-900 text-lg pt-1">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;
