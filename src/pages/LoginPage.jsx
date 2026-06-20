import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import { Button, Input, Alert } from '../../components/UI';
import { useForm } from '../../hooks/useCustom';

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
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-600 text-white rounded-lg flex items-center justify-center font-bold mx-auto mb-4">
            ⚖
          </div>
          <h1 className="text-2xl font-bold text-gray-900">LegalMatch</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {/* Error Alert */}
        {alertError && (
          <Alert
            type="error"
            message={alertError}
            onClose={() => setAlertError('')}
          />
        )}

        {/* Form */}
        <form onSubmit={form.handleSubmit} className="space-y-6 mt-6">
          {/* User Type Selection */}
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

          {/* Email */}
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

          {/* Password */}
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

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            loading={form.loading}
            disabled={form.loading}
          >
            Sign In
          </Button>
        </form>

        {/* Footer */}
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
  );
};
