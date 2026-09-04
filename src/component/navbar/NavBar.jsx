// ============================================
// NAVBAR COMPONENT
// ============================================
// TODO(real-topic): brand name + the two Customers/Bookings links below are
// tied to the template's example entities — update alongside RouteConfig.jsx.

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import CustomButton from '../../reusable/CustomButton';

const Navbar = () => {
    const { enabled, isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

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

                    {/* Entirely absent when AUTH_ENABLED is false (the default). */}
                    {enabled && (
                        isAuthenticated ? (
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-500">
                                    {user?.firstName} {user?.lastName}
                                </span>
                                <CustomButton variant="outline" size="sm" onClick={handleLogout}>
                                    Log Out
                                </CustomButton>
                            </div>
                        ) : (
                            <Link to="/login"
                                className="text-base text-gray-600 hover:text-blue-600 no-underline transition-colors">
                                Log In
                            </Link>
                        )
                    )}
                </div>

            </div>
        </nav>
    )
}

export default Navbar;
