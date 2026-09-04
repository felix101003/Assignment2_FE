// Customer endpoints — see CustomerController in template-backend.
// TODO(real-topic): rename/replace this whole file for the real entity — the
// shape here (search/create/update/remove) is generic, just the field names
// inside `filters`/`payload` and the endpoint are Customer-specific.
import apiRequest from './apiClient'
import { ENDPOINTS } from '../config/apiConfig'

export const customerApi = {
    // filters: { firstName, lastName, email, role }, page is 0-indexed.
    search: (filters, page, size, sort) =>
        apiRequest(ENDPOINTS.customers, { params: { ...filters, page, size, sort } }),

    create: (payload) =>
        apiRequest(ENDPOINTS.customers, { method: 'POST', body: payload }),

    update: (id, payload) =>
        apiRequest(ENDPOINTS.customerById(id), { method: 'PUT', body: payload }),

    remove: (id) =>
        apiRequest(ENDPOINTS.customerById(id), { method: 'DELETE' }),
}
