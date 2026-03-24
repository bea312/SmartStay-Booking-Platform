import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, MapPin, DollarSign, Star } from 'lucide-react';
import { useFilterContext } from '../../context/FilterContext';

const Sidebar: React.FC = () => {
  const { filters, updateFilter, resetFilters } = useFilterContext();
  const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice);

  // Sync external filter changes (like resets)
  useEffect(() => {
    setLocalMaxPrice(filters.maxPrice);
  }, [filters.maxPrice]);

  // Debounce the slider value to prevent 429 API Rate Limits
  useEffect(() => {
    const handler = setTimeout(() => {
      // Only trigger update if it actually changed
      if (localMaxPrice !== filters.maxPrice) {
        updateFilter('maxPrice', localMaxPrice);
      }
    }, 600);
    return () => clearTimeout(handler);
  }, [localMaxPrice]);

  return (
    <aside className="w-full lg:w-72 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-primary-500" />
          Filters
        </h2>
        <button 
          onClick={resetFilters}
          className="text-sm font-bold text-white bg-gray-700 hover:bg-gray-900 px-3 py-1.5 rounded-lg transition-colors"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-6">
        {/* Location Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            Location
          </label>
          <select 
            value={filters.location}
            onChange={(e) => updateFilter('location', e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 transition-colors"
          >
            <option value="">Anywhere</option>
            <option value="1015254">New York, NY</option>
            <option value="1352823">Los Angeles, CA</option>
            <option value="1015252">San Francisco, CA</option>
            <option value="1015253">Chicago, IL</option>
            <option value="1015255">Miami, FL</option>
            <option value="1015256">Las Vegas, NV</option>
          </select>
          <p className="text-xs text-gray-500 mt-2">Required by RapidAPI default configuration</p>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-400" />
            Max Price: ${localMaxPrice} / night
          </label>
          <input 
            type="range" 
            min="50" 
            max="2000" 
            step="50"
            value={localMaxPrice}
            onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
            <span>$50</span>
            <span>$2000+</span>
          </div>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-gray-400" />
            Guests
          </label>
          <div className="flex bg-gray-100 rounded-xl p-1 border border-gray-200 gap-1">
            {[1, 2, 3, 4, '5+'].map((num) => {
              const value = num === '5+' ? 5 : num;
              return (
                <button
                  key={num}
                  onClick={() => updateFilter('guests', value)}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                    filters.guests === value
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
