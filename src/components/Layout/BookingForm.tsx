import React from 'react';

function BookingForm() {
  return (
    <div>
      BookingForm
    </div>
  );
}

export default BookingForm;
'@utils/formatting';
import { AirbnbProperty } from '@services/listings';
import { useAuthContext } from '@context/AuthContext';
import { useBookingStore } from '@store/bookingStore';
import { useNavigate } from 'react-router-dom';

interface BookingFormProps {
  property: AirbnbProperty;
}

export const BookingForm: React.FC<BookingFormProps> = ({ property }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthContext();
  const addBooking = useBookingStore((state) => state.addBooking);

  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [guests, setGuests] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const price = property.price || 0;
  const currency = property.currency || 'USD';

  const nights =
    checkIn && checkOut
      ? calculateNights(new Date(checkIn), new Date(checkOut))
      : 0;

  const totalPrice = nights > 0 ? price * nights : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!checkIn || !checkOut || guests < 1) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const booking = {
        id: `booking_${Date.now()}`,
        listingId: property.id || '',
        userId: user?.id || '',
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guests,
        totalPrice,
        status: 'confirmed' as const,
        createdAt: new Date(),
      };

      addBooking(booking);

      // Simulate booking confirmation
      setTimeout(() => {
        alert('Booking confirmed! Check your bookings page.');
        navigate('/bookings');
      }, 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card space-y-4 bg-gradient-to-b from-white to-gray-50"
    >
      <h3 className="font-bold text-xl text-gray-900">
        {formatCurrency(price, currency)} per night
      </h3>

      {/* Check-in Date */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          <Calendar className="inline h-4 w-4 mr-2" />
          Check-in
        </label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="input-field w-full"
          required
        />
      </div>

      {/* Check-out Date */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          <Calendar className="inline h-4 w-4 mr-2" />
          Check-out
        </label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="input-field w-full"
          required
          min={checkIn}
        />
      </div>

      {/* Guests */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          <Users className="inline h-4 w-4 mr-2" />
          Number of Guests
        </label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="input-field w-full"
          required
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <option key={num} value={num}>
              {num} Guest{num > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Price Breakdown */}
      {nights > 0 && (
        <div className="border-t pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>
              {formatCurrency(price, currency)} × {nights} night
              {nights > 1 ? 's' : ''}
            </span>
            <span>{formatCurrency(totalPrice, currency)}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 text-base border-t pt-2">
            <span>Total</span>
            <span>{formatCurrency(totalPrice, currency)}</span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || nights <= 0}
        className="btn-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting
          ? 'Processing...'
          : isAuthenticated
            ? nights > 0
              ? `Book Now`
              : 'Select Dates'
            : 'Sign in to Book'}
      </button>

      {!isAuthenticated && (
        <p className="text-xs text-gray-500 text-center">
          You must be signed in to make a reservation
        </p>
      )}
    </form>
  );
};
