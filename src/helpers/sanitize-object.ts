export function sanitizeObject<T extends object>(obj: T) {
  const invalid = ['', 'undefined', 'null', 'Invalid Date', 'NaN'];
  const entries = Object.entries(obj);
  const cleared = entries.filter(([, v]) => !invalid.includes(String(v)));
  return Object.fromEntries(cleared) as T;
}
