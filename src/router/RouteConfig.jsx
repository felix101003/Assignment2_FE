import { Routes, Route } from 'react-router-dom';
import HomePage from '../page/home/HomePage';
import CustomerPage from '../page/customer/CustomerPage';
import BookingPage from '../page/booking/BookingPage';

// TODO(real-topic): /customers and /bookings are the template's example
// routes — update alongside NavBar.jsx (and the page components themselves)
// once the real topic is known.
const RouteConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/customers" element={<CustomerPage />} />
            <Route path="/bookings" element={<BookingPage />} />
        </Routes>
    );
};

export default RouteConfig;
