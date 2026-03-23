import { AirbnbProperty } from './listings';

export const MOCK_PROPERTIES: AirbnbProperty[] = [
  {
    id: 'mock-1',
    name: 'Luxury Villa with Private Pool and Ocean View',
    picture_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
    price: 350,
    currency: 'USD',
    rating: 4.9,
    reviews_count: 128,
    room_type: 'Entire home',
    bedrooms: 4,
    beds: 5,
    bathrooms: 3,
    description: "Experience ultimate luxury in this beautiful villa. Features a stunning infinity pool overlooking the ocean, spacious living areas, and a fully equipped chef's kitchen. Perfect for family vacations or group getaways.",
    amenities: ['Pool', 'Wifi', 'Kitchen', 'Free parking', 'Air conditioning', 'Ocean view', 'BBQ grill'],
    location: {
      latitude: 34.0259,
      longitude: -118.4907,
      address: 'Malibu, California, United States'
    },
    host: {
      id: 'host-1',
      name: 'Sarah Anderson',
      picture_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'mock-2',
    name: 'Cozy Downtown Loft with City Skyline Views',
    picture_url: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80',
    price: 150,
    currency: 'USD',
    rating: 4.8,
    reviews_count: 245,
    room_type: 'Entire apartment',
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    description: 'Stay in the heart of the city in this stylish, modern loft. Featuring exposed brick walls, giant windows with panoramic skyline views, and high-speed internet. Walking distance to the best restaurants and museums.',
    amenities: ['Wifi', 'Kitchen', 'Air conditioning', 'Gym', 'Elevator', 'Workspace', 'City skyline view'],
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      address: 'Downtown, New York, United States'
    },
    host: {
      id: 'host-2',
      name: 'Michael Chen',
      picture_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'mock-3',
    name: 'Serene Forest Cabin Hideaway',
    picture_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80',
    price: 120,
    currency: 'USD',
    rating: 4.95,
    reviews_count: 89,
    room_type: 'Entire cabin',
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    description: 'Disconnect and relax in this beautiful A-frame cabin surrounded by pine trees. Enjoy the cozy wood-burning stove, outdoor hot tub, and miles of hiking trails right from the back door.',
    amenities: ['Wifi', 'Kitchen', 'Indoor fireplace', 'Hot tub', 'Pets allowed', 'Self check-in', 'Mountain view'],
    location: {
      latitude: 39.5501,
      longitude: -105.7821,
      address: 'Breckenridge, Colorado, United States'
    },
    host: {
      id: 'host-3',
      name: 'Emily Davis',
      picture_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'mock-4',
    name: 'Modern Beachfront Guest House',
    picture_url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80',
    price: 220,
    currency: 'USD',
    rating: 4.75,
    reviews_count: 156,
    room_type: 'Entire guest house',
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    description: 'Step right out onto the sand from this newly renovated guest house. Wake up to the sound of waves and watch the sunset from your private patio. Includes kayaks and beach gear.',
    amenities: ['Wifi', 'Kitchen', 'Beachfront', 'Patio', 'Free parking', 'TV', 'Air conditioning'],
    location: {
      latitude: 25.7617,
      longitude: -80.1918,
      address: 'Miami Beach, Florida, United States'
    },
    host: {
      id: 'host-4',
      name: 'Carlos Rodriguez',
      picture_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80'
    }
  }
];
