import { useState, useCallback } from 'react';
import { AirbnbProperty } from '../services/listings';

const FAVORITES_STORAGE_KEY = 'smartstay_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<AirbnbProperty[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const isFavorite = useCallback((id: string) => {
    return favorites.some(fav => fav.id === id);
  }, [favorites]);

  const toggleFavorite = useCallback((idOrProperty: string | AirbnbProperty) => {
    setFavorites(prev => {
      const id = typeof idOrProperty === 'string' ? idOrProperty : idOrProperty.id;
      const isAlreadyFav = prev.some(fav => fav.id === id);
      
      let newFavorites;
      if (isAlreadyFav) {
        newFavorites = prev.filter(fav => fav.id !== id);
      } else {
        if (typeof idOrProperty === 'string') {
          // If only ID was passed, we can't add it cleanly without details.
          // In a real app we'd fetch it, but here we expect the full property when adding.
          console.warn('Cannot add to favorites with only an ID. Full property required.');
          return prev;
        }
        newFavorites = [...prev, idOrProperty];
      }
      
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    localStorage.removeItem(FAVORITES_STORAGE_KEY);
  }, []);

  return { favorites, isFavorite, toggleFavorite, clearFavorites };
};
