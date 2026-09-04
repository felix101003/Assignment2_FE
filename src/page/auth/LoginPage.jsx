import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import CustomAlert from '../../reusable/CustomAlert';
import CustomButton from '../../reusable/CustomButton';
import CustomCard from '../../reusable/CustomCard';
import CustomInput from '../../reusable/CustomInput';

const EMPTY_LOGIN = { email: '', password: '' };
const EMPTY_REGISTER = { firstName: '', lastName: '', email: '', password: '', phone: '' };

const LoginPage = () => {
    const { login, register } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from?.pathname || '/customers';

    const [mode, setMode] = useState('login'); // 'login' | 'register'
    const [loginForm, setLoginForm] = useState(EMPTY_LOGIN);
    const [registerForm, setRegisterForm] = useState(EMPTY_REGISTER);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            await login(loginForm);
            navigate(redirectTo, { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            const phone = registerForm.phone.trim() || null;
            await register({ ...registerForm, phone });
            navigate(redirectTo, { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <CustomCard
                title={mode === 'login' ? 'Log In' : 'Create an Account'}
                subtitle={mode === 'login' ? 'Sign in to manage customers and bookings.' : 'Register a new customer account.'}
            >
                {error && <CustomAlert variant="error" message={error} onClose={() => setError('')} />}

                {mode === 'login' ? (
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <CustomInput
                            label="Email"
                            type="email"
                            required
                            value={loginForm.email}
                            onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })}
                        />
                        <CustomInput
                            label="Password"
                            type="password"
                            required
                            value={loginForm.password}
                            onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
                        />
                        <CustomButton type="submit" variant="primary" className="w-full" disabled={submitting}>
                            {submitting ? 'Logging in...' : 'Log In'}
                        </CustomButton>
                    </form>
                ) : (
                    <form className="space-y-4" onSubmit={handleRegister}>
                        <CustomInput
                            label="First Name"
                            required
                            value={registerForm.firstName}
                            onChange={(event) => setRegisterForm({ ...registerForm, firstName: event.target.value })}
                        />
                        <CustomInput
                            label="Last Name"
                            required
                            value={registerForm.lastName}
                            onChange={(event) => setRegisterForm({ ...registerForm, lastName: event.target.value })}
                        />
                        <CustomInput
                            label="Email"
                            type="email"
                            required
                            value={registerForm.email}
                            onChange={(event) => setRegisterForm({ ...registerForm, email: event.target.value })}
                        />
                        <CustomInput
                            label="Password"
                            type="password"
                            required
                            helperText="8-72 characters."
                            value={registerForm.password}
                            onChange={(event) => setRegisterForm({ ...registerForm, password: event.target.value })}
                        />
                        <CustomInput
                            label="Phone"
                            value={registerForm.phone}
                            onChange={(event) => setRegisterForm({ ...registerForm, phone: event.target.value })}
                            placeholder="0912345678"
                        />
                        <CustomButton type="submit" variant="primary" className="w-full" disabled={submitting}>
                            {submitting ? 'Creating account...' : 'Create Account'}
                        </CustomButton>
                    </form>
                )}

                <p className="text-sm text-gray-500 mt-4 text-center">
                    {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                    <button
                        type="button"
                        className="text-blue-600 font-semibold hover:underline cursor-pointer"
                        onClick={() => {
                            setMode(mode === 'login' ? 'register' : 'login');
                            setError('');
                        }}
                    >
                        {mode === 'login' ? 'Create one' : 'Log in'}
                    </button>
                </p>
            </CustomCard>
        </div>
    );
};

export default LoginPage;
