// template-backend has no real login flow — POST /api/dev/token is a test
// utility (see DevTokenController) that mints a token for any role with no
// credential check. We mint one ADMIN token on first use and reuse it, so
// create/update/delete calls work whether app.security.jwt.enabled is on or
// off. Do not carry this pattern into a real app.
import { API_BASE_URL, ENDPOINTS } from '../config/apiConfig'

let cachedToken = null

export async function getDevToken() {
    if (cachedToken) return cachedToken

    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.devToken}?role=ADMIN`, {
        method: 'POST',
    })
    if (!response.ok) return null

    const data = await response.json()
    cachedToken = data.token
    return cachedToken
}
