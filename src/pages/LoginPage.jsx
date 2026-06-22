import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { Button, Input, Alert } from '../components/UI';
import { useForm } from '../hooks/useCustom';

/**
 * Login Page
 */
export const LoginPage = () => {
  const navigate = useNavigate();
  const [alertError, setAlertError] = useState('');
  const [userType, setUserType] = useState('client');

  const form = useForm(
    {
      email: '',
      password: '',
    },
    async (values) => {
      try {
        setAlertError('');
        const user = await loginUser(values.email, values.password);

        if (user.userType === userType) {
          navigate(userType === 'lawyer' ? '/dashboard/lawyer' : '/dashboard/client');
        } else {
          setAlertError(`This account is registered as a ${user.userType}, not a ${userType}`);
        }
      } catch (error) {
        setAlertError(error.message || 'Login failed. Please try again.');
      }
    }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Illustration */}
        <div className="hidden lg:flex justify-center">
          <svg className="w-full max-w-sm" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="loginGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7d42ff" stopOpacity="1" />
                <stop offset="100%" stopColor="#5a3cde" stopOpacity="1" />
              </linearGradient>
            </defs>

            <circle cx="150" cy="150" r="120" fill="url(#loginGrad)" opacity="0.1"/>

            <g>
              <circle cx="150" cy="100" r="40" fill="url(#loginGrad)"/>
              <circle cx="140" cy="90" r="12" fill="white" opacity="0.4"/>

              <path d="M 110 150 Q 110 130 150 130 Q 190 130 190 150 L 190 180 Q 190 200 150 200 Q 110 200 110 180 Z" fill="url(#loginGrad)" opacity="0.8"/>

              <g transform="translate(150, 220)">
                <rect x="-25" y="-5" width="50" height="35" rx="3" fill="none" stroke="#7d42ff" strokeWidth="2"/>
                <path d="M -15 -5 L -15 -15 Q -15 -25 0 -25 Q 15 -25 15 -15 L 15 -5" fill="none" stroke="#7d42ff" strokeWidth="2"/>
                <circle cx="0" cy="10" r="3" fill="#7d42ff"/>
              </g>
            </g>

            <circle cx="50" cy="50" r="15" fill="#7d42ff" opacity="0.2"/>
            <circle cx="250" cy="350" r="20" fill="#7d42ff" opacity="0.15"/>
            <rect x="30" y="300" width="60" height="60" fill="#7d42ff" opacity="0.1" rx="8"/>

            <text x="150" y="330" textAnchor="middle" fontSize="16" fill="#7d42ff" fontWeight="600">
              Secure Access
            </text>
            <text x="150" y="355" textAnchor="middle" fontSize="12" fill="#7d42ff" opacity="0.7">
              Protected Login
            </text>
          </svg>
        </div>

        {/* Right side - Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-lg flex items-center justify-center font-bold mx-auto mb-4">
              ⚖
            </div>
            <h1 className="text-2xl font-bold text-gray-900">LegalMatch</h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          {alertError && (
            <Alert
              type="error"
              message={alertError}
              onClose={() => setAlertError('')}
            />
          )}

          <form onSubmit={form.handleSubmit} className="space-y-6 mt-6">
            <div className="flex gap-4">
              <label className="flex items-center gap-2 flex-1 p-3 border-2 rounded-lg cursor-pointer" style={{borderColor: userType === 'client' ? '#7d42ff' : '#ddd'}}>
                <input
                  type="radio"
                  name="userType"
                  value="client"
                  checked={userType === 'client'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="cursor-pointer"
                />
                <span className="text-sm font-medium">Client</span>
              </label>
              <label className="flex items-center gap-2 flex-1 p-3 border-2 rounded-lg cursor-pointer" style={{borderColor: userType === 'lawyer' ? '#7d42ff' : '#ddd'}}>
                <input
                  type="radio"
                  name="userType"
                  value="lawyer"
                  checked={userType === 'lawyer'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="cursor-pointer"
                />
                <span className="text-sm font-medium">Lawyer</span>
              </label>
            </div>

            <Input
              type="email"
              label="Email"
              placeholder="your@email.com"
              name="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.errors.email}
              touched={form.touched.email}
              required
            />

            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              name="password"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.errors.password}
              touched={form.touched.password}
              required
            />

            <Button
              type="submit"
              fullWidth
              loading={form.loading}
              disabled={form.loading}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-primary-600 font-semibold hover:text-primary-700"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
