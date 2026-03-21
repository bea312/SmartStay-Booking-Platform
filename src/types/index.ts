export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAuthenticated: boolean;
}

export interface Listing {
  id: string;
  name: string;
  image: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  location: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  roomType: string;
  description: string;
  amenities: string[];
  host: {
    id: string;
    name: string;
    avatar?: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Booking {
  id: string;
  listingId: string;
  userId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

export interface FilterState {
  priceRange: [number, number];
  location: string;
  minRating: number;
  roomType: string;
  bedrooms: number;
  checkIn?: Date;
  checkOut?: Date;
  guests: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface BookingState {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
}

export interface FavoritesState {
  favorites: string[]; // Array of listing IDs
  isLoading: boolean;
}
