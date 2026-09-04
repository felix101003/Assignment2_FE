// Split from AuthContext.jsx so that file can export only the AuthProvider
// component (react-refresh/only-export-components wants one or the other,
// not a component mixed with a plain hook, per file). Named distinctly from
// AuthContext.jsx (not authContext.js) since Windows filesystems are
// case-insensitive and the two would otherwise collide.
import { createContext, useContext } from 'react';

export const AuthContext = createContext(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used inside <AuthProvider>');
    return context;
}
