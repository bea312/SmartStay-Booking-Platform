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
    toggleFavorite(property);
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
          className={`absolute top-3 right-3 p-2 rounded-full transition-all z-10 shadow-md ${
            favorited
              ? 'bg-white text-black'
              : 'bg-black/30 hover:bg-black/50 text-white'
          }`}
        >
          <Heart className={`w-5 h-5 transition-colors ${favorited ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>
      </div>

      <div className="space-y-1.5 pt-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors text-sm">
            {property.name}
          </h3>
          <div className="flex items-center gap-0.5 font-semibold text-sm text-amber-500 shrink-0">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-gray-800">{property.rating?.toFixed(1) || 'New'}</span>
          </div>
        </div>

        <p className="text-gray-500 text-xs flex items-center gap-1 line-clamp-1">
          <MapPin className="w-3 h-3 shrink-0" />
          {property.location?.address || 'Unknown Location'}
        </p>

        <p className="text-gray-400 text-xs capitalize">
          {property.room_type} · {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
        </p>

        <div className="flex items-baseline gap-1 pt-1">
          <span className="font-bold text-gray-900">${property.price}</span>
          <span className="text-xs text-gray-500">/ night</span>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
