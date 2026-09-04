// Real login/register endpoints — see AuthController in template-backend.
// Only reachable when AUTH_ENABLED (apiConfig.js) is true on the frontend
// AND app.security.auth.enabled is true on the backend; otherwise these 404.
import apiRequest from './apiClient'
import { ENDPOINTS } from '../config/apiConfig'

export const authApi = {
    register: (payload) => apiRequest(ENDPOINTS.authRegister, { method: 'POST', body: payload }),
    login: (payload) => apiRequest(ENDPOINTS.authLogin, { method: 'POST', body: payload }),
}
