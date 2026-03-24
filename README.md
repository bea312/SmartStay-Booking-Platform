# SmartStay Booking Platform

A production-grade accommodation booking platform built with React, TypeScript, and Vite — inspired by Airbnb. Demonstrates complex state management, real-world API integration, caching strategies, and responsive UI design.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript + Vite |
| Routing | React Router DOM v6 |
| Server State | TanStack Query (React Query v5) |
| Global State | Zustand |
| Context State | React Context API |
| HTTP Client | Axios |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Date Utilities | date-fns |

---

## Features

- **Live property listings** fetched from the Airbnb RapidAPI with graceful mock data fallback
- **TanStack Query caching** — navigating between pages never triggers redundant API calls
- **Listing detail page** — resolves from cache first, falls back to API only when needed
- **Booking system** — create and cancel bookings, persisted to `localStorage` via Zustand
- **Favorites** — save/unsave properties, persisted to `localStorage`
- **Filter panel** — filter by location, max price, and guest count; triggers API refetch automatically
- **Navbar search** — free-text search updates the location filter and navigates to the feed
- **Protected routes** — `/bookings` and `/favorites` require authentication
- **Mock auth** — simulated login/logout with `localStorage` persistence
- **Responsive design** — mobile, tablet, and desktop layouts

---

## Project Structure

```
src/
├── components/
│   ├── Common/          # Loader, ErrorState, EmptyState, ListingCard, UserProfileCard
│   └── Layout/          # Navbar, Sidebar, BookingForm
├── context/             # AuthContext, FilterContext, FavoritesContext
├── hooks/               # useListings, useListingDetails, useFavorites, useAuth
├── pages/               # Home, ListingDetails, Bookings, Favorites, Login
├── services/            # api.ts (Axios instance), listings.ts, mockData.ts
├── store/               # bookingStore.ts (Zustand), searchStore.ts (Zustand)
├── types/               # Shared TypeScript interfaces
└── utils/               # formatting helpers
```

---

## State Management Architecture

| State Type | Tool | Manages |
|---|---|---|
| Local | `useState` | Forms, UI toggles |
| Global (Context) | React Context API | Auth, Filters, Favorites |
| Advanced Global | Zustand | Bookings, Search query |
| Server State | TanStack Query | API listings, listing details |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A RapidAPI account with access to the [Airbnb19 API](https://rapidapi.com/DataCrawler/api/airbnb19)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_RAPID_API_KEY=your_rapidapi_key_here
VITE_RAPID_API_HOST=airbnb19.p.rapidapi.com
VITE_API_BASE_URL=https://airbnb19.p.rapidapi.com/api/v2
```

> **Never hardcode API keys in source files.** The `.env` file is listed in `.gitignore`.

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## API Integration

**Base URL:** `https://airbnb19.p.rapidapi.com/api/v2`

**Endpoint used:** `GET /searchPropertyByPlaceId`

**Required headers** (configured centrally in `src/services/api.ts`):

```json
{
  "x-rapidapi-key": "<from .env>",
  "x-rapidapi-host": "airbnb19.p.rapidapi.com",
  "Content-Type": "application/json"
}
```

**Query parameters:**

| Param | Description |
|---|---|
| `placeId` | Required. Identifies the search location |
| `adults` | Number of guests |
| `checkin` | Check-in date (YYYY-MM-DD) |
| `checkout` | Check-out date (YYYY-MM-DD) |

**Rate limit handling:** If the API returns a 429 or a `status: false` response with a rate-limit message, the app automatically falls back to curated mock data so the UI never crashes.

---

## Caching Strategy

- `staleTime: 5 minutes` — cached data is served instantly without a network request
- `gcTime: 30 minutes` — unused cache entries are kept in memory for 30 minutes
- Listing detail pages resolve from the listings cache first — no extra API call needed when navigating from the feed

---

## Routes

| Path | Page | Protected |
|---|---|---|
| `/` | Home / Listings Feed | No |
| `/listing/:id` | Listing Details | No |
| `/login` | Login | No |
| `/bookings` | My Trips | Yes |
| `/favorites` | Saved Properties | Yes |

---

## Persistence

| Data | Storage |
|---|---|
| Auth session | `localStorage` (`smartstay_user`) |
| Bookings | `localStorage` (`smartstay_bookings`) |
| Favorites | `localStorage` (`smartstay_favorites`) |

---

## License

MIT
