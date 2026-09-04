// Shared fetch wrapper for every backend call — JSON in/out, query string
// building, and attaching a bearer token on mutating requests.
import { API_BASE_URL, AUTH_ENABLED } from '../config/apiConfig'
import { getDevToken } from './authToken'
import { getSession } from '../auth/session'

function toQueryString(params = {}) {
    const query = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            query.append(key, value)
        }
    })
    const queryString = query.toString()
    return queryString ? `?${queryString}` : ''
}

export default async function apiRequest(path, { method = 'GET', body, params } = {}) {
    const headers = { 'Content-Type': 'application/json' }

    if (method !== 'GET') {
        // AUTH_ENABLED off (default): unchanged dev-token flow. On: use the real
        // logged-in user's token instead — null if nobody's logged in yet, which
        // just means the request 401s and RequireAuth sends them to /login.
        const token = AUTH_ENABLED ? getSession()?.token : await getDevToken()
        if (token) headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}${path}${toQueryString(params)}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    })

    const data = response.status === 204 ? null : await response.json().catch(() => null)

    if (!response.ok) {
        // GlobalExceptionHandler puts field errors in `detail` as [{field, error}, ...]
        // for validation failures — surface those instead of the generic message.
        const fieldErrors = Array.isArray(data?.detail)
            ? data.detail.map((item) => `${item.field}: ${item.error}`).join('; ')
            : null
        throw new Error(fieldErrors || data?.message || `Request failed with status ${response.status}`)
    }

    return data
}
