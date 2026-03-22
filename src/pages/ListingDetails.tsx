import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Share, Heart, CheckCircle2 } from 'lucide-react';
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return <Loader fullScreen message="Preparing detailed view..." />;
  }

  if (isError || !property) {
    return <ErrorState fullScreen message={(error as Error)?.message || 'Could not load the property details'} onRetry={refetch} />;
  }

  const favorited = isFavorite(property.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      
      {/* Header and Nav */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to search
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-800">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current" />
              {property.rating} · {property.reviews_count} reviews
            </span>
            <span className="flex items-center gap-1 text-gray-500 underline decoration-gray-300">
              <MapPin className="w-4 h-4" />
              {property.location?.address}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">
            <Share className="w-4 h-4" /> Share
          </button>
          <button 
            onClick={() => toggleFavorite(property.id)}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-red-500 text-red-500' : ''}`} /> 
            {favorited ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full h-[50vh] min-h-[400px] mb-12 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
        <img 
          src={property.picture_url || property.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80'} 
          alt={property.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content Info */}
        <div className="flex-1 lg:max-w-[65%]">
          
          <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {property.room_type} hosted by {property.host?.name || 'SmartStay Host'}
              </h2>
              <p className="text-gray-500">
                {property.guests != null && `${property.guests} guests · `}
                {property.bedrooms} bedrooms · {property.beds} beds · {property.bathrooms} baths
              </p>
            </div>
            {property.host?.picture_url && (
              <img src={property.host.picture_url} alt="Host" className="w-14 h-14 rounded-full border border-gray-200 shadow-sm" />
            )}
          </div>

          <div className="space-y-6 text-gray-600 border-b border-gray-200 pb-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">About this space</h3>
            <div className="prose max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: property.description || 'No description available for this property.' }} />
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">What this place offers</h3>
            <div className="grid grid-cols-2 gap-4">
              {property.amenities?.slice(0, 10).map((amenity: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-gray-400" />
                  <span className="capitalize">{amenity.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Sidebar widget */}
        <div className="w-full lg:w-[35%] relative">
          <BookingForm property={property} />
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
