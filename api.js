const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3456';
export function api(path) {
  return `${API_URL}${path}`;
}