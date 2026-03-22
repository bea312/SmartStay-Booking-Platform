import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, MapPin } from 'lucide-react';
import { useFavoritesContext } from '../../context/FavoritesContext';
import { AirbnbProperty } from '../../services/listings';

interface ListingCardProps {
  property: AirbnbProperty;
}

const ListingCard: React.FC<ListingCardProps> = ({ property }) => {
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const favorited = isFavorite(property.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  return (
    <Link to={`/listing/${property.id}`} className="group block h-full">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-4 bg-gray-100">
        <img
          src={property.picture_url || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80'}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-md bg-white/30 hover:bg-white/50 hover:scale-110 transition-all z-10"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${favorited ? 'fill-red-500 text-red-500' : 'text-white'}`} 
          />
        </button>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {property.name}
          </h3>
          <div className="flex items-center gap-1 font-medium text-sm text-gray-800 shrink-0">
            <Star className="w-4 h-4 fill-current" />
            <span>{property.rating?.toFixed(1) || 'New'}</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm flex items-center gap-1 line-clamp-1">
          <MapPin className="w-3.5 h-3.5" />
          {property.location?.address || 'Unknown Location'}
        </p>

        <p className="text-gray-500 text-sm capitalize">
          {property.room_type} · {property.bedrooms} beds
        </p>

        <div className="mt-2 pt-2 flex items-baseline gap-1">
          <span className="font-bold text-gray-900">${property.price}</span>
          <span className="text-sm text-gray-500">/{property.currency || 'night'}</span>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
