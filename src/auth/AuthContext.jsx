import React, { useState } from 'react';
import { authApi } from '../api/authApi';
import { AUTH_ENABLED } from '../config/apiConfig';
import { AuthContext } from './useAuth';
import { getSession, setSession } from './session';

export const AuthProvider = ({ children }) => {
    const [session, setSessionState] = useState(() => (AUTH_ENABLED ? getSession() : null));

    const applySession = (result) => {
        setSession(result);
        setSessionState(result);
    };

    const login = async (credentials) => {
        const result = await authApi.login(credentials);
        applySession(result);
        return result;
    };

    const register = async (payload) => {
        const result = await authApi.register(payload);
        applySession(result);
        return result;
    };

    const logout = () => applySession(null);

    // When AUTH_ENABLED is false, isAuthenticated is always true — RequireAuth
    // never redirects, and the app behaves exactly as it did before this flow
    // existed. That's the "completely off by default" contract.
    const value = {
        enabled: AUTH_ENABLED,
        isAuthenticated: AUTH_ENABLED ? Boolean(session) : true,
        user: session?.customer ?? null,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
