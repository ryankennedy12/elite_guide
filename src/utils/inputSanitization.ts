// Input sanitization utilities to prevent XSS and injection attacks

/**
 * Sanitizes HTML content by removing potentially dangerous elements and attributes
 */
export function sanitizeHTML(input: string): string {
  if (typeof input !== 'string') return '';
  
  // Remove script tags and their content
  let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove potentially dangerous HTML attributes
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, ''); // Remove event handlers
  sanitized = sanitized.replace(/\s*javascript\s*:/gi, ''); // Remove javascript: URLs
  sanitized = sanitized.replace(/\s*vbscript\s*:/gi, ''); // Remove vbscript: URLs
  sanitized = sanitized.replace(/\s*data\s*:/gi, ''); // Remove data: URLs
  
  return sanitized;
}

/**
 * Sanitizes user input for database storage
 */
export function sanitizeUserInput(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') return '';
  
  // Trim whitespace and limit length
  let sanitized = input.trim().slice(0, maxLength);
  
  // Remove null bytes that could cause issues
  sanitized = sanitized.replace(/\0/g, '');
  
  return sanitized;
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && 
         email.length <= 254 && 
         emailRegex.test(email);
}

/**
 * Validates UUID format
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return typeof uuid === 'string' && uuidRegex.test(uuid);
}

/**
 * Sanitizes search query to prevent injection attacks
 */
export function sanitizeSearchQuery(query: string): string {
  if (typeof query !== 'string') return '';
  
  // Remove potentially dangerous characters for search
  return query
    .replace(/[<>'";&()]/g, '') // Remove HTML and SQL injection chars
    .trim()
    .slice(0, 100); // Limit length
}

/**
 * Validates and sanitizes URL inputs
 */
export function sanitizeURL(url: string): string | null {
  if (typeof url !== 'string') return null;
  
  try {
    const parsedURL = new URL(url);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsedURL.protocol)) {
      return null;
    }
    
    return parsedURL.toString();
  } catch {
    return null;
  }
}

/**
 * Escapes special characters for safe display in HTML
 */
export function escapeHTML(text: string): string {
  if (typeof text !== 'string') return '';
  
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
  };
  
  return text.replace(/[&<>"'/]/g, (s) => map[s]);
}