// Session storage for the real login/password flow (see AuthContext.jsx) —
// a plain module, not a hook, so apiClient.js can read the current token
// without needing to be a React component. localStorage is the source of
// truth; AuthContext just wraps it so React re-renders on login/logout.
const STORAGE_KEY = 'auth.session'

export function getSession() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

export function setSession(session) {
    try {
        if (session) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
        } else {
            localStorage.removeItem(STORAGE_KEY)
        }
    } catch {
        // Private browsing / storage disabled — session just won't persist across reloads.
    }
}
