import apiClient from './api';

export interface SearchParams {
  placeId?: string;
  checkin?: string;
  checkout?: string;
  adults?: number;
  children?: number;
  infants?: number;
  [key: string]: any;
}

export interface AirbnbProperty {
  id: string;
  name: string;
  images?: string[];
  picture_url?: string;
  price?: number;
  currency?: string;
  rating?: number;
  reviews_count?: number;
  room_type?: string;
  bedrooms?: number;
  beds?: number;
  bathrooms?: number;
  description?: string;
  amenities?: string[];
  location?: {
    latitude?: number;
    longitude?: number;
    address?: string;
  };
  host?: {
    id: string;
    name: string;
    picture_url?: string;
  };
  [key: string]: any;
}

export interface SearchResponse {
  results?: AirbnbProperty[];
  data?: AirbnbProperty[];
  listings?: AirbnbProperty[];
  [key: string]: any;
}

/**
 * Search properties by place ID
 */
export const searchProperties = async (
  placeId: string,
  params?: Partial<SearchParams>
): Promise<AirbnbProperty[]> => {
  try {
    const response = await apiClient.get<SearchResponse>(
      '/searchPropertyByPlaceId',
      {
        params: {
          placeId,
          ...params,
        },
      }
    );

    // Normalize response data structure
    const data = response.data.results || response.data.data || response.data.listings || [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error searching properties:', error);
    throw error;
  }
};

/**
 * Get property details
 */
export const getPropertyDetails = async (propertyId: string): Promise<AirbnbProperty> => {
  try {
    const response = await apiClient.get<AirbnbProperty>(
      `/property/${propertyId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching property details:', error);
    throw error;
  }
};

/**
 * Transform API response to normalized format
 */
export const normalizeProperty = (property: any): AirbnbProperty => {
  return {
    id: property.id || property.property_id || `prop-${Date.now()}`,
    name: property.name || property.title || 'Untitled Property',
    picture_url: property.picture_url || property.image_url || property.images?.[0] || '',
    price: property.price || property.nightly_price || 0,
    currency: property.currency || 'USD',
    rating: property.rating || property.review_scores_rating || 0,
    reviews_count: property.reviews_count || property.number_of_reviews || 0,
    room_type: property.room_type || property.property_type || 'Entire home',
    bedrooms: property.bedrooms || property.beds || 1,
    beds: property.beds || property.bedrooms || 1,
    bathrooms: property.bathrooms || 1,
    description: property.description || property.summary || '',
    amenities: property.amenities || property.amenities_ids || [],
    location: {
      latitude: property.latitude || 0,
      longitude: property.longitude || 0,
      address: property.address || property.neighbourhood || '',
    },
    host: {
      id: property.host?.id || property.host_id || '',
      name: property.host?.name || property.host_name || 'Host',
      picture_url: property.host?.picture_url || '',
    },
    ...property,
  };
};
