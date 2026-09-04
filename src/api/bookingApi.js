// Booking endpoints — see BookingController in template-backend.
// TODO(real-topic): rename/replace this whole file for the real entity — the
// shape here (search/create/update/remove) is generic, just the field names
// inside `filters`/`payload` and the endpoint are Booking-specific.
import apiRequest from './apiClient'
import { ENDPOINTS } from '../config/apiConfig'

export const bookingApi = {
    // filters: { customerId, serviceName, status }, page is 0-indexed.
    search: (filters, page, size, sort) =>
        apiRequest(ENDPOINTS.bookings, { params: { ...filters, page, size, sort } }),

    create: (payload) =>
        apiRequest(ENDPOINTS.bookings, { method: 'POST', body: payload }),

    update: (id, payload) =>
        apiRequest(ENDPOINTS.bookingById(id), { method: 'PUT', body: payload }),

    remove: (id) =>
        apiRequest(ENDPOINTS.bookingById(id), { method: 'DELETE' }),
}
