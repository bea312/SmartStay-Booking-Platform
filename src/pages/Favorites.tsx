import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, MapPin, Search } from 'lucide-react';
import { useFavoritesContext } from '../context/FavoritesContext';
import { AirbnbProperty } from '../services/listings';

const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useFavoritesContext();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Properties</h1>
        <p className="text-gray-500">Every property you've saved while browsing.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center shadow-sm mb-4">
            <Heart className="w-8 h-8 text-gray-400 stroke-[1.5]" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No saved properties</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">As you search, tap the heart icon to save your favorite places and experiences to a wishlist.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors shadow-sm">
            <Search className="w-4 h-4" />
            Start Exploring
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10">
          {favorites.map((property: AirbnbProperty) => (
            <Link key={property.id} to={`/listing/${property.id}`} className="group block h-full">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-4 bg-gray-100">
                <img
                  src={property.picture_url || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80'}
                  alt={property.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(property.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-md bg-white/30 hover:bg-white/50 hover:scale-110 transition-all z-10"
                >
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
                    {property.name}
                  </h3>
                  <div className="flex items-center gap-1 font-medium text-sm text-gray-800 shrink-0">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{property.rating ? property.rating.toFixed(1) : 'New'}</span>
                  </div>
                </div>
                
                <p className="text-gray-500 text-sm flex items-center gap-1 line-clamp-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {property.location?.address || 'Unknown Location'}
                </p>

                <p className="text-gray-500 text-sm capitalize">
                  {property.room_type || 'Entire home'} · {property.bedrooms || 1} beds
                </p>

                <div className="mt-2 pt-2 flex items-baseline gap-1">
                  <span className="font-bold text-gray-900">${property.price || '--'}</span>
                  <span className="text-sm text-gray-500">/{property.currency || 'night'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
