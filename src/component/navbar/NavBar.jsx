// ============================================
// NAVBAR COMPONENT
// ============================================
// TODO(real-topic): brand name + the two Customers/Bookings links below are
// tied to the template's example entities — update alongside RouteConfig.jsx.

import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

                <Link to="/" className="text-2xl font-bold text-blue-600 no-underline">
                    Booking Admin
                </Link>

                <div className="flex gap-6 items-center">
                    <Link to="/customers"
                        className="text-base text-gray-600 hover:text-blue-600 no-underline transition-colors">
                        Customers
                    </Link>
                    <Link to="/bookings"
                        className="text-base text-gray-600 hover:text-blue-600 no-underline transition-colors">
                        Bookings
                    </Link>
                </div>

            </div>
        </nav>
    )
}

export default Navbar;
