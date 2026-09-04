import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

// No-op passthrough when AUTH_ENABLED is false (the default) — isAuthenticated
// is hardcoded true in that case, so this never redirects. Only becomes a
// real guard once the flag is on and nobody's logged in.
const RequireAuth = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
