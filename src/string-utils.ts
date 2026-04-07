/**
 * String utility functions.
 */

export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function reverse(str: string): string {
  return str.split("").reverse().join("");
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  const end = maxLength - 3;
  const last = str.lastIndexOf(" ", end);
  return (last > 0 ? str.slice(0, last) : str.slice(0, end)) + "...";
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// BUG: This doesn't handle multiple consecutive spaces
export function wordCount(str: string): number {
  if (!str.trim()) return 0;
  return str.split(" ").length;
}
