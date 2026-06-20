import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Layout/Navbar';
import { Card, Button, Input, Select, Textarea, Alert } from '../components/UI';
import { createCase, assignLawyerToCase } from '../services/caseService';
import { matchCaseWithLawyer } from '../services/caseMatchingService';
import { createCaseMatchedNotification } from '../services/notificationService';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useCustom';
import { validateCaseForm } from '../utils/validation';
import { CASE_TYPES, URGENCY_LEVELS } from '../utils/constants';

/**
 * New Case Page
 */
export const NewCasePage = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [alertError, setAlertError] = useState('');
  const [alertSuccess, setAlertSuccess] = useState('');
  const [matchedLawyer, setMatchedLawyer] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm(
    {
      caseType: '',
      description: '',
      urgencyLevel: '',
    },
    async (values) => {
      try {
        setAlertError('');

        // Validate form
        const validation = validateCaseForm(values);
        if (!validation.isValid) {
          const firstError = Object.values(validation.errors)[0];
          setAlertError(firstError);
          return;
        }

        // Create case
        const caseData = {
          clientId: userData.uid,
          clientName: userData.fullName,
          clientEmail: userData.email,
          clientPhone: userData.phone,
          clientAddress: userData.address,
          caseType: values.caseType,
          description: values.description,
          urgencyLevel: values.urgencyLevel,
          status: 'pending',
          outcome: null,
          lawyerId: null,
          lawyerName: null,
          lawyerEmail: null,
        };

        // Try to match lawyer
        const lawyer = await matchCaseWithLawyer(caseData);
        
        if (lawyer) {
          setMatchedLawyer(lawyer);
          setShowConfirm(true);
        } else {
          // Create case without lawyer
          const caseId = await createCase(caseData);
          setAlertSuccess('Case created successfully! We will match you with a lawyer soon.');
          setTimeout(() => {
            navigate('/dashboard/client');
          }, 2000);
        }
      } catch (error) {
        setAlertError(error.message || 'Failed to create case');
      }
    }
  );

  const handleConfirmMatch = async () => {
    try {
      setAlertError('');
      
      const caseData = {
        clientId: userData.uid,
        clientName: userData.fullName,
        clientEmail: userData.email,
        clientPhone: userData.phone,
        clientAddress: userData.address,
        caseType: form.values.caseType,
        description: form.values.description,
        urgencyLevel: form.values.urgencyLevel,
        status: 'pending',
        outcome: null,
        lawyerId: matchedLawyer.uid,
        lawyerName: matchedLawyer.fullName,
        lawyerEmail: matchedLawyer.email,
      };

      const caseId = await createCase(caseData);
      
      // Assign lawyer to case
      await assignLawyerToCase(caseId, matchedLawyer.uid, matchedLawyer.fullName, matchedLawyer.email);

      // Create notification for lawyer
      await createCaseMatchedNotification(
        matchedLawyer.uid,
        userData.fullName,
        form.values.caseType,
        caseId
      );

      setAlertSuccess(`Case created and matched with ${matchedLawyer.fullName}!`);
      setTimeout(() => {
        navigate('/dashboard/client');
      }, 2000);
    } catch (error) {
      setAlertError(error.message || 'Failed to create case');
    }
  };

  if (!userData?.userType === 'client') {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <Alert type="error" message="Only clients can create cases" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Case</h1>
          <p className="text-gray-600 mt-2">
            Submit your legal case details and we'll match you with the best lawyer
          </p>
        </div>

        {/* Error Alert */}
        {alertError && (
          <Alert
            type="error"
            message={alertError}
            onClose={() => setAlertError('')}
          />
        )}

        {/* Success Alert */}
        {alertSuccess && (
          <Alert type="success" message={alertSuccess} />
        )}

        {/* Form */}
        {!showConfirm ? (
          <Card>
            <form onSubmit={form.handleSubmit} className="space-y-6">
              <Select
                label="Case Type"
                name="caseType"
                value={form.values.caseType}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.errors.caseType}
                touched={form.touched.caseType}
                options={CASE_TYPES.map((type) => ({
                  value: type,
                  label: type,
                }))}
                required
              />

              <Textarea
                label="Case Description"
                placeholder="Describe your legal case in detail..."
                name="description"
                value={form.values.description}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.errors.description}
                touched={form.touched.description}
                rows={5}
                required
              />

              <Select
                label="Urgency Level"
                name="urgencyLevel"
                value={form.values.urgencyLevel}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.errors.urgencyLevel}
                touched={form.touched.urgencyLevel}
                options={URGENCY_LEVELS.map((level) => ({
                  value: level.value,
                  label: level.label,
                }))}
                required
              />

              <div className="flex gap-4">
                <Button
                  type="submit"
                  fullWidth
                  loading={form.loading}
                  disabled={form.loading}
                >
                  Find Lawyer
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  fullWidth
                  onClick={() => navigate('/dashboard/client')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        ) : (
          // Lawyer Confirmation
          <Card>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Great Match Found!
                </h2>
                <p className="text-gray-600">
                  We found an excellent lawyer for your case. Please review their profile below.
                </p>
              </div>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  {matchedLawyer?.fullName}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">{matchedLawyer?.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p className="font-semibold text-gray-900">{matchedLawyer?.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Experience</p>
                    <p className="font-semibold text-gray-900">
                      {matchedLawyer?.yearsOfExperience} years
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Rate</p>
                    <p className="font-semibold text-gray-900">
                      ${matchedLawyer?.hourlyRate}/hour
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">Specializations</p>
                    <p className="font-semibold text-gray-900">
                      {matchedLawyer?.specializations?.join(', ')}
                    </p>
                  </div>
                  {matchedLawyer?.bio && (
                    <div className="col-span-2">
                      <p className="text-gray-600">About</p>
                      <p className="text-gray-900">{matchedLawyer.bio}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Your Case</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium text-gray-900">Type:</span> {form.values.caseType}</p>
                  <p><span className="font-medium text-gray-900">Urgency:</span> {form.values.urgencyLevel}</p>
                  <p><span className="font-medium text-gray-900">Description:</span> {form.values.description}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  fullWidth
                  onClick={handleConfirmMatch}
                  loading={form.loading}
                  disabled={form.loading}
                >
                  Confirm & Create Case
                </Button>
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => setShowConfirm(false)}
                >
                  Decline & Try Again
                </Button>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};
