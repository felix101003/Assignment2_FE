import { Routes, Route } from 'react-router-dom';
import HomePage from '../page/home/HomePage';
import CustomerPage from '../page/customer/CustomerPage';
import BookingPage from '../page/booking/BookingPage';
import LoginPage from '../page/auth/LoginPage';
import RequireAuth from '../auth/RequireAuth';

// TODO(real-topic): /customers and /bookings are the template's example
// routes — update alongside NavBar.jsx (and the page components themselves)
// once the real topic is known.
//
// RequireAuth is a no-op when AUTH_ENABLED (apiConfig.js) is false — the
// default — so these two routes behave exactly as before that flow existed.
const RouteConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/customers" element={<RequireAuth><CustomerPage /></RequireAuth>} />
            <Route path="/bookings" element={<RequireAuth><BookingPage /></RequireAuth>} />
        </Routes>
    );
};

export default RouteConfig;
