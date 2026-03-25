import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Share2, Heart, CheckCircle2, Bed, Bath, Users } from 'lucide-react';
import { useListingDetails } from '../hooks/useListings';
import { useFavoritesContext } from '../context/FavoritesContext';
import Loader from '../components/Common/Loader';
import ErrorState from '../components/Common/ErrorState';
import BookingForm from '../components/Layout/BookingForm';

const ListingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: property, isLoading, isError, error, refetch } = useListingDetails(id);
  const { isFavorite, toggleFavorite } = useFavoritesContext();

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (isLoading) return <Loader fullScreen message="Preparing detailed view..." />;
  if (isError || !property) return <ErrorState fullScreen message={(error as Error)?.message || 'Could not load property details'} onRetry={refetch} />;

  const favorited = isFavorite(property.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">

      {/* Back + Title */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to search
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{property.name}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-700">
            <span className="flex items-center gap-1 text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-gray-900">{property.rating}</span>
              <span className="text-gray-500">· {property.reviews_count} reviews</span>
            </span>
            <span className="text-gray-300">·</span>
            <span className="flex items-center gap-1 text-gray-500">
              <MapPin className="w-4 h-4" />
              {property.location?.address}
            </span>
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-sm rounded-xl border border-gray-300 transition-colors">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button
            onClick={() => toggleFavorite(property.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 font-bold text-sm rounded-xl border transition-colors ${
              favorited
                ? 'bg-red-500 text-white border-red-500 hover:bg-red-600'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-red-500 text-red-500' : ''}`} />
            {favorited ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full h-[45vh] min-h-[320px] mb-10 rounded-2xl overflow-hidden shadow-md">
        <img
          src={property.picture_url || property.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80'}
          alt={property.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Details */}
        <div className="flex-1 lg:max-w-[62%]">

          {/* Host + Quick Stats */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {property.room_type} · hosted by {property.host?.name || 'SmartStay Host'}
              </h2>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {property.guests ?? '—'} guests</span>
                <span className="flex items-center gap-1.5"><Bed className="w-4 h-4" /> {property.bedrooms} bedrooms · {property.beds} beds</span>
                <span className="flex items-center gap-1.5"><Bath className="w-4 h-4" /> {property.bathrooms} baths</span>
              </div>
            </div>
            {property.host?.picture_url && (
              <img src={property.host.picture_url} alt="Host" className="w-14 h-14 rounded-full border-2 border-gray-100 shadow-sm shrink-0" />
            )}
          </div>

          {/* Description */}
          <div className="border-b border-gray-200 pb-8 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3">About this space</h3>
            <p className="text-gray-600 leading-relaxed">
              {property.description || 'No description available for this property.'}
            </p>
          </div>

          {/* Amenities */}
          {(property.amenities?.length ?? 0) > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">What this place offers</h3>
              <div className="grid grid-cols-2 gap-3">
                {(property.amenities ?? []).slice(0, 10).map((amenity: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0" />
                    <span className="capitalize">{amenity.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Booking Widget */}
        <div className="w-full lg:w-[38%]">
          <BookingForm property={property} />
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
