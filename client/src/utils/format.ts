/**
 * Format a number as Indian Rupees (₹)
 */
export function formatPrice(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}

/**
 * Calculate discount percentage
 */
export function calcDiscount(mrp: number, sellingPrice: number): number {
  if (mrp <= 0) return 0;
  return Math.round(((mrp - sellingPrice) / mrp) * 100);
}

/**
 * Generate star rating array for rendering
 */
export function getStarRating(rating: number): ('full' | 'half' | 'empty')[] {
  const stars: ('full' | 'half' | 'empty')[] = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push('full');
    else if (rating >= i - 0.5) stars.push('half');
    else stars.push('empty');
  }
  return stars;
}

/**
 * Format a date string to a readable format
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Capitalize first letter of each word
 */
export function titleCase(str: string): string {
  return str
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}
