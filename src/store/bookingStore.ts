import { create } from 'zustand';
import { Booking } from '@types/index';

interface BookingStore {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;
  getBookings: (userId: string) => Booking[];
}

const BOOKING_STORAGE_KEY = 'smartstay_bookings';

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookings: (() => {
    try {
      const stored = localStorage.getItem(BOOKING_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  })(),

  addBooking: (booking: Booking) =>
    set((state) => {
      const updated = [...state.bookings, booking];
      localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(updated));
      return { bookings: updated };
    }),

  cancelBooking: (bookingId: string) =>
    set((state) => {
      const updated = state.bookings.map((b) =>
        b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
      );
      localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(updated));
      return { bookings: updated };
    }),

  getBookings: (userId: string) => {
    const state = get();
    return state.bookings.filter((b) => b.userId === userId);
  },
}));
