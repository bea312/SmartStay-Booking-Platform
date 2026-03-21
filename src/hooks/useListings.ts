import { useQuery, QueryKey } from '@tanstack/react-query';
import { searchProperties, getPropertyDetails, normalizeProperty, AirbnbProperty } from '@services/listings';

const QUERY_STALE_TIME = 5 * 60 * 1000; // 5 minutes
const QUERY_CACHE_TIME = 30 * 60 * 1000; // 30 minutes

/**
 * Hook to fetch listings with caching
 */
export const useListings = (placeId?: string, params?: Record<string, any>) => {
  const queryKey: QueryKey = ['listings', placeId, params];

  return useQuery({
    queryKey,
    queryFn: async () => {
      if (!placeId) throw new Error('Place ID is required');
      const results = await searchProperties(placeId, params);
      return results.map(normalizeProperty);
    },
    enabled: !!placeId,
    staleTime: QUERY_STALE_TIME,
    gcTime: QUERY_CACHE_TIME, // renamed from cacheTime in React Query v5
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * Hook to fetch single listing details
 */
export const useListingDetails = (listingId?: string) => {
  const queryKey: QueryKey = ['listing', listingId];

  return useQuery({
    queryKey,
    queryFn: async () => {
      if (!listingId) throw new Error('Listing ID is required');
      const result = await getPropertyDetails(listingId);
      return normalizeProperty(result);
    },
    enabled: !!listingId,
    staleTime: QUERY_STALE_TIME,
    gcTime: QUERY_CACHE_TIME,
    retry: 2,
  });
};
