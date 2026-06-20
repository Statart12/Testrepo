import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUpUser } from '../services/authService';
import { Button, Input, Select, Textarea, Checkbox, Alert } from '../components/UI';
import { useForm } from '../hooks/useCustom';
import { validateLawyerSignup, validateClientSignup } from '../utils/validation';
import { CASE_TYPES } from '../utils/constants';

/**
 * Signup Page
 */
export const SignupPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('client');
  const [alertError, setAlertError] = useState('');
  const [alertSuccess, setAlertSuccess] = useState('');

  const form = useForm(
    userType === 'lawyer'
      ? {
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
          address: '',
          specializations: [],
          licenseNumber: '',
          yearsOfExperience: '',
          hourlyRate: '',
          bio: '',
        }
      : {
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
          address: '',
        },
    async (values) => {
      try {
        setAlertError('');
        
        // Validate form
        const validation = userType === 'lawyer'
          ? validateLawyerSignup(values)
          : validateClientSignup(values);

        if (!validation.isValid) {
          const firstError = Object.values(validation.errors)[0];
          setAlertError(firstError);
          return;
        }

        // Prepare user data
        const userData = userType === 'lawyer'
          ? {
              phone: values.phone,
              address: values.address,
              specializations: values.specializations,
              licenseNumber: values.licenseNumber,
              yearsOfExperience: parseInt(values.yearsOfExperience),
              hourlyRate: parseFloat(values.hourlyRate),
              bio: values.bio || '',
            }
          : {
              phone: values.phone,
              address: values.address,
            };

        await signUpUser(values.email, values.password, values.fullName, userData, userType);

        setAlertSuccess(`Account created successfully! Redirecting to ${userType} dashboard...`);
        setTimeout(() => {
          navigate(userType === 'lawyer' ? '/dashboard/lawyer' : '/dashboard/client');
        }, 2000);
      } catch (error) {
        setAlertError(error.message || 'Sign up failed. Please try again.');
      }
    }
  );

  const handleSpecializationChange = (specialization) => {
    const current = form.values.specializations || [];
    const updated = current.includes(specialization)
      ? current.filter((s) => s !== specialization)
      : [...current, specialization];
    form.setFieldValue('specializations', updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-600 text-white rounded-lg flex items-center justify-center font-bold mx-auto mb-4">
            ⚖
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Join LegalMatch today</p>
        </div>

        {/* Alerts */}
        {alertError && (
          <Alert
            type="error"
            message={alertError}
            onClose={() => setAlertError('')}
          />
        )}
        {alertSuccess && (
          <Alert
            type="success"
            message={alertSuccess}
          />
        )}

        {/* Form */}
        <form onSubmit={form.handleSubmit} className="mt-6 space-y-6">
          {/* User Type Selection */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <label className="flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer" style={{borderColor: userType === 'client' ? '#7d42ff' : '#ddd'}}>
              <input
                type="radio"
                name="userType"
                value="client"
                checked={userType === 'client'}
                onChange={(e) => {
                  setUserType(e.target.value);
                  form.resetForm();
                }}
                className="cursor-pointer"
              />
              <span className="text-sm font-medium">I'm a Client</span>
            </label>
            <label className="flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer" style={{borderColor: userType === 'lawyer' ? '#7d42ff' : '#ddd'}}>
              <input
                type="radio"
                name="userType"
                value="lawyer"
                checked={userType === 'lawyer'}
                onChange={(e) => {
                  setUserType(e.target.value);
                  form.resetForm();
                }}
                className="cursor-pointer"
              />
              <span className="text-sm font-medium">I'm a Lawyer</span>
            </label>
          </div>

          {/* Common Fields */}
          <Input
            type="text"
            label="Full Name"
            placeholder="John Doe"
            name="fullName"
            value={form.values.fullName}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.errors.fullName}
            touched={form.touched.fullName}
            required
          />

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
            helperText="At least 8 characters with uppercase, lowercase, and numbers"
            required
          />

          <Input
            type="password"
            label="Confirm Password"
            placeholder="••••••••"
            name="confirmPassword"
            value={form.values.confirmPassword}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.errors.confirmPassword}
            touched={form.touched.confirmPassword}
            required
          />

          <Input
            type="tel"
            label="Phone"
            placeholder="(123) 456-7890"
            name="phone"
            value={form.values.phone}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.errors.phone}
            touched={form.touched.phone}
            required
          />

          <Input
            type="text"
            label="Address"
            placeholder="123 Main St, City, State 12345"
            name="address"
            value={form.values.address}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.errors.address}
            touched={form.touched.address}
            required
          />

          {/* Lawyer-specific fields */}
          {userType === 'lawyer' && (
            <>
              {/* Specializations */}
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-sm text-gray-700">
                  Specializations *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {CASE_TYPES.map((caseType) => (
                    <Checkbox
                      key={caseType}
                      label={caseType}
                      checked={form.values.specializations?.includes(caseType) || false}
                      onChange={() => handleSpecializationChange(caseType)}
                    />
                  ))}
                </div>
                {form.errors.specializations && form.touched.specializations && (
                  <span className="text-sm text-red-600">{form.errors.specializations}</span>
                )}
              </div>

              <Input
                type="text"
                label="License Number"
                placeholder="BAR123456"
                name="licenseNumber"
                value={form.values.licenseNumber}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.errors.licenseNumber}
                touched={form.touched.licenseNumber}
                required
              />

              <Input
                type="number"
                label="Years of Experience"
                placeholder="5"
                name="yearsOfExperience"
                value={form.values.yearsOfExperience}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.errors.yearsOfExperience}
                touched={form.touched.yearsOfExperience}
                min="0"
                required
              />

              <Input
                type="number"
                label="Hourly Rate ($)"
                placeholder="150"
                name="hourlyRate"
                value={form.values.hourlyRate}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.errors.hourlyRate}
                touched={form.touched.hourlyRate}
                min="0"
                step="0.01"
                required
              />

              <Textarea
                label="Bio"
                placeholder="Tell us about yourself and your experience..."
                name="bio"
                value={form.values.bio}
                onChange={form.handleChange}
                rows={4}
              />
            </>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            loading={form.loading}
            disabled={form.loading}
          >
            Create Account
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary-600 font-semibold hover:text-primary-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
