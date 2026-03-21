import { useState, useCallback } from 'react';

const STORAGE_KEY = 'smartstay_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return new Set(stored ? JSON.parse(stored) : []);
    } catch {
      return new Set();
    }
  });

  const toggleFavorite = useCallback(
    (listingId: string) => {
      setFavorites((prev) => {
        const updated = new Set(prev);
        if (updated.has(listingId)) {
          updated.delete(listingId);
        } else {
          updated.add(listingId);
        }
        // Persist to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(updated)));
        return updated;
      });
    },
    []
  );

  const isFavorite = useCallback(
    (listingId: string) => favorites.has(listingId),
    [favorites]
  );

  const clearFavorites = useCallback(() => {
    setFavorites(new Set());
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    favorites: Array.from(favorites),
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
};
