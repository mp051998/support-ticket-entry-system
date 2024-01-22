
/**
 * Converts a timestamp to a date string.
 * @param timestamp - The timestamp in milliseconds.
 * @returns The formatted date string.
 */
export function timestampToDatestring(timestamp: number) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}
