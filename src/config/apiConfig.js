// Single source of truth for the backend origin + REST paths.
// Mirrors template-backend's CustomerController / BookingController / DevTokenController.
//
// TODO(real-topic): customers/bookings are this template's example entities —
// once the real test's topic is known (recipes, products, tickets...), swap
// these endpoint paths and enum lists for the real ones.

export const API_BASE_URL = 'http://localhost:8080'

export const ENDPOINTS = {
    devToken: '/api/dev/token',
    customers: '/api/customers',
    customerById: (id) => `/api/customers/${id}`,
    bookings: '/api/bookings',
    bookingById: (id) => `/api/bookings/${id}`,
}

// template-backend/customer/entity/CustomerRole.java
export const CUSTOMER_ROLES = ['CUSTOMER', 'ADMIN']

// template-backend/booking/entity/BookingStatus.java
export const BOOKING_STATUSES = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']
