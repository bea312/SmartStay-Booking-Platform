import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Wifi, Car, Coffee, Tv } from 'lucide-react';
import { Navbar } from '@components/Layout/Navbar';
import { BookingForm } from '@components/Layout/BookingForm';
import { Loader, ErrorState } from '@components/Common';
import { useListingDetails } from '@hooks/useListings';
import { formatCurrency, getRatingLabel } from '@utils/formatting';

export const ListingDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id: listingId } = useParams<{ id: string }>();

  const { data: listing, isLoading, isError, error, refetch } = useListingDetails(listingId);

  if (!listingId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <ErrorState
          title="Invalid Listing"
          message="No listing ID provided"
          retry={() => navigate('/')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {isLoading && <Loader message="Loading property details..." />}

      {isError && (
        <div className="container-custom py-8">
          <ErrorState
            title="Unable to load property"
            message={
              error instanceof Error ? error.message : 'Please try again later'
            }
            retry={() => refetch()}
          />
        </div>
      )}

      {!isLoading && listing && (
        <main className="container-custom py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Images */}
              <div className="rounded-lg overflow-hidden mb-6">
                <img
                  src={listing.picture_url}
                  alt={listing.name}
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Property Info */}
              <div className="card mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {listing.name}
                </h1>

                {/* Location & Rating */}
                <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-5 w-5" />
                    <span>{listing.location?.address || 'Location not available'}</span>
                  </div>
                  {listing.rating && (
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">⭐ {listing.rating.toFixed(1)}</span>
                      <span className="text-gray-600">
                        {getRatingLabel(listing.rating)} · {listing.reviews_count} reviews
                      </span>
                    </div>
                  )}
                </div>

                {/* Host Info */}
                {listing.host && (
                  <div className="mb-6 pb-6 border-b flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      👤
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Hosted by {listing.host.name}</p>
                      <p className="text-sm text-gray-600">Superhost</p>
                    </div>
                  </div>
                )}

                {/* Key Features */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 pb-6 border-b">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{listing.bedrooms || 0}</p>
                    <p className="text-sm text-gray-600">Bedroom{(listing.bedrooms || 0) > 1 ? 's' : ''}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{listing.beds || 0}</p>
                    <p className="text-sm text-gray-600">Bed{(listing.beds || 0) > 1 ? 's' : ''}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{listing.bathrooms || 0}</p>
                    <p className="text-sm text-gray-600">Bath{(listing.bathrooms || 0) > 1 ? 's' : ''}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">📍</p>
                    <p className="text-sm text-gray-600">{listing.room_type}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6 pb-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">About this place</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {listing.description || 'No description available'}
                  </p>
                </div>

                {/* Amenities */}
                {listing.amenities && listing.amenities.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[
                        { icon: Wifi, label: 'WiFi' },
                        { icon: Car, label: 'Parking' },
                        { icon: Coffee, label: 'Kitchen' },
                        { icon: Tv, label: 'TV' },
                      ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2 p-2">
                          <Icon className="h-5 w-5 text-primary-600" />
                          <span className="text-sm text-gray-700">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Form Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <BookingForm property={listing} />
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};
