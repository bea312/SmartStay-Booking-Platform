import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useListings } from '../hooks/useListings';
import { useFilterContext } from '../context/FilterContext';
import Sidebar from '../components/Layout/Sidebar';
import ListingCard from '../components/Common/ListingCard';
import Loader from '../components/Common/Loader';
import ErrorState from '../components/Common/ErrorState';

const Home: React.FC = () => {
  const { filters, updateFilter } = useFilterContext();
  const [searchParams, setSearchParams] = useSearchParams();

  // Sync URL param → filter on mount
  useEffect(() => {
    const loc = searchParams.get('location');
    if (loc && loc !== filters.location) {
      updateFilter('location', loc);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync filter → URL param
  useEffect(() => {
    if (filters.location) {
      setSearchParams({ location: filters.location }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [filters.location]); // eslint-disable-line react-hooks/exhaustive-deps

  const placeId = filters.location || '1015254'; // default: New York

  const { data: listings, isLoading, isError, error, refetch } = useListings(placeId, {
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    guests: filters.guests,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 w-full">
      <div className="w-full lg:w-72 shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 min-w-0">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {placeId === '1015254' ? 'Trending in New York' : 'Available Properties'}
          </h1>
          {listings && !isLoading && (
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {listings.length} stays
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="py-20">
            <Loader message="Discovering perfect stays..." />
          </div>
        ) : isError ? (
          <ErrorState
            message={(error as Error)?.message || 'Failed to fetch properties.'}
            onRetry={refetch}
          />
        ) : listings && listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10 w-full animate-in fade-in slide-in-from-bottom-8 duration-500">
            {listings.map((property) => (
              <ListingCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No matching properties</h3>
            <p className="text-gray-500 text-sm">Try adjusting your filters or searching a different location.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
