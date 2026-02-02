function normalize(base, path) {
  if (!base) return path
  if (!path) return base
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

/* ======================
   API (JSON, auth)
====================== */
export function apiUrl(path = '') {
  return normalize(import.meta.env.VITE_API_BASE, path)
}

/* ======================
   Assets (uploads/images)
   ❌ NO auth headers
====================== */
export function assetUrl(path = '') {
  const base = import.meta.env.DEV
    ? '' // via Vite proxy
    : import.meta.env.VITE_ASSET_BASE

  return normalize(base, path)
}

/* ======================
   Fetch helper (API only)
====================== */
export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token')
  // console.log("apiFetch", apiUrl(path), options, token)
  const res = await fetch(apiUrl(path), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
  })

  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem('token')
    window.location.href = '/login'
    throw new Error('Unauthorized')
  }

  return res
}
