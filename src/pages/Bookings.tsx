import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@components/Layout/Navbar';
import { EmptyState } from '@components/Common';
import { useAuthContext } from '@context/AuthContext';
import { useBookingStore } from '@store/bookingStore';
import { formatCurrency, formatDate } from '@utils/formatting';
import { Calendar, X } from 'lucide-react';

export const Bookings: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthContext();
  const { bookings, cancelBooking, getBookings } = useBookingStore();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container-custom py-12">
          <EmptyState
            icon="🔐"
            title="Sign in to view bookings"
            message="You need to be logged in to manage your reservations"
            action={{
              label: 'Go to Login',
              onClick: () => navigate('/login'),
            }}
          />
        </div>
      </div>
    );
  }

  const userBookings = user?.id ? getBookings(user.id) : [];
  const activeBookings = userBookings.filter((b) => b.status !== 'cancelled');
  const cancelledBookings = userBookings.filter((b) => b.status === 'cancelled');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container-custom py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <EmptyState
            icon="📅"
            title="No bookings yet"
            message="Start exploring and book your first stay today"
            action={{
              label: 'Explore Properties',
              onClick: () => navigate('/'),
            }}
          />
        ) : (
          <div className="space-y-8">
            {/* Active Bookings */}
            {activeBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Active Bookings ({activeBookings.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="card border-l-4 border-green-500 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-sm font-semibold text-green-600 uppercase">
                            ✓ Confirmed
                          </p>
                          <p className="text-lg font-bold text-gray-900 mt-1">
                            Booking #{booking.id.slice(-8)}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                'Are you sure you want to cancel this booking?'
                              )
                            ) {
                              cancelBooking(booking.id);
                            }
                          }}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="h-5 w-5 text-red-600" />
                        </button>
                      </div>

                      <div className="space-y-3 pb-4 border-b">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {formatDate(booking.checkIn)} – {formatDate(booking.checkOut)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          🧑‍🤝‍🧑 {booking.guests} Guest{booking.guests > 1 ? 's' : ''}
                        </p>
                      </div>

                      <div className="mt-4 flex items-end justify-between">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Total Amount</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(booking.totalPrice)}
                          </p>
                        </div>
                        <button
                          onClick={() => navigate(`/listing/${booking.listingId}`)}
                          className="btn-secondary text-sm"
                        >
                          View Property
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cancelled Bookings */}
            {cancelledBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Cancelled Bookings ({cancelledBookings.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cancelledBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="card border-l-4 border-gray-300 opacity-75"
                    >
                      <p className="text-sm font-semibold text-gray-500 uppercase">
                        ✗ Cancelled
                      </p>
                      <p className="text-lg font-bold text-gray-900 mt-1">
                        Booking #{booking.id.slice(-8)}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        {formatDate(booking.checkIn)} – {formatDate(booking.checkOut)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
