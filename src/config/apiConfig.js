// Single source of truth for the backend origin + REST paths.
// Mirrors template-backend's CustomerController / BookingController / DevTokenController.
//
// TODO(real-topic): customers/bookings are this template's example entities —
// once the real test's topic is known (recipes, products, tickets...), swap
// these endpoint paths and enum lists for the real ones.

export const API_BASE_URL = 'http://localhost:8080'

// Real credential-based login (register + password) — OFF by default, same
// as template-backend's app.security.auth.enabled (which actually gates
// whether POST /api/auth/register and /api/auth/login exist at all; flipping
// this flag without also setting AUTH_ENABLED=true on the backend just gets
// you 404s). When false, the app behaves exactly as before: no /login route
// guard, no login/logout UI, mutating requests use the dev-token flow in
// authToken.js. See src/auth/ for the login flow itself.
export const AUTH_ENABLED = false

export const ENDPOINTS = {
    devToken: '/api/dev/token',
    authRegister: '/api/auth/register',
    authLogin: '/api/auth/login',
    customers: '/api/customers',
    customerById: (id) => `/api/customers/${id}`,
    bookings: '/api/bookings',
    bookingById: (id) => `/api/bookings/${id}`,
}

// template-backend/customer/entity/CustomerRole.java
export const CUSTOMER_ROLES = ['CUSTOMER', 'ADMIN']

// template-backend/booking/entity/BookingStatus.java
export const BOOKING_STATUSES = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']
