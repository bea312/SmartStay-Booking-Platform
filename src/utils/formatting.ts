/**
 * Format currency with proper locale
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Format date to readable string
 */
export const formatDate = (date: Date | string, format: 'short' | 'long' = 'short'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format === 'short'
    ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

/**
 * Calculate number of nights between dates
 */
export const calculateNights = (checkIn: Date, checkOut: Date): number => {
  const time = Math.abs(checkOut.getTime() - checkIn.getTime());
  return Math.ceil(time / (1000 * 60 * 60 * 24));
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Truncate text
 */
export const truncateText = (text: string, length: number = 100): string => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

/**
 * Get rating color
 */
export const getRatingColor = (rating: number): string => {
  if (rating >= 4.7) return 'text-green-600';
  if (rating >= 4.5) return 'text-blue-600';
  if (rating >= 4.0) return 'text-yellow-600';
  return 'text-gray-600';
};

/**
 * Get rating label
 */
export const getRatingLabel = (rating: number): string => {
  if (rating >= 4.7) return 'Excellent';
  if (rating >= 4.5) return 'Great';
  if (rating >= 4.0) return 'Good';
  if (rating >= 3.5) return 'Fair';
  return 'Not rated';
};
