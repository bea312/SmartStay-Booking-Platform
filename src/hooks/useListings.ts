import { useQuery, useQueryClient, QueryKey } from '@tanstack/react-query';
import { searchProperties, getPropertyDetails, normalizeProperty, AirbnbProperty } from '../services/listings';

const QUERY_STALE_TIME = 5 * 60 * 1000;
const QUERY_CACHE_TIME = 30 * 60 * 1000;

export const useListings = (placeId?: string, params?: Record<string, any>) => {
  // Serialize params so the query key is stable across renders
  const stableParams = params ? JSON.stringify(params) : null;
  const queryKey: QueryKey = ['listings', placeId, stableParams];

  return useQuery({
    queryKey,
    queryFn: async () => {
      if (!placeId) throw new Error('Place ID is required');
      const results = await searchProperties(placeId, params);
      return results.map(normalizeProperty);
    },
    enabled: !!placeId,
    staleTime: QUERY_STALE_TIME,
    gcTime: QUERY_CACHE_TIME,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useListingDetails = (listingId?: string) => {
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ['listing', listingId];

  return useQuery({
    queryKey,
    queryFn: async () => {
      if (!listingId) throw new Error('Listing ID is required');

      // Try to resolve from any cached listings query first
      const cachedQueries = queryClient.getQueriesData<AirbnbProperty[]>({ queryKey: ['listings'] });
      for (const [, data] of cachedQueries) {
        if (Array.isArray(data)) {
          const found = data.find((p) => p.id === listingId);
          if (found) return normalizeProperty(found);
        }
      }

      const result = await getPropertyDetails(listingId);
      return normalizeProperty(result);
    },
    enabled: !!listingId,
    staleTime: QUERY_STALE_TIME,
    gcTime: QUERY_CACHE_TIME,
    retry: 2,
  });
};
