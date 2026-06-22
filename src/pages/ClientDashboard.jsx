import React, { useState, useEffect } from 'react';
import { Menu, Plus, FileText, CheckCircle, Trophy, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getCasesForClient } from '../services/caseService';
import { getUserById } from '../services/authService';
import { Sidebar, Navbar } from '../components/Layout/Navbar';
import { Card, Button, Badge, LoadingSpinner, Modal, Alert } from '../components/UI';
import { formatDate, truncateText } from '../utils/formatting';
import { useModal } from '../hooks/useCustom';

/**
 * Client Dashboard Page
 */
export const ClientDashboard = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cases, setCases] = useState([]);
  const [lawyers, setLawyers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const caseModal = useModal();

  // Fetch client's cases
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (userData?.uid) {
          const casesData = await getCasesForClient(userData.uid);
          setCases(casesData);

          // Fetch lawyer details for each case
          const lawyerData = {};
          for (const caseItem of casesData) {
            if (caseItem.lawyerId && !lawyerData[caseItem.lawyerId]) {
              try {
                const lawyer = await getUserById(caseItem.lawyerId);
                lawyerData[caseItem.lawyerId] = lawyer;
              } catch (err) {
                console.error('Error fetching lawyer:', err);
              }
            }
          }
          setLawyers(lawyerData);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userData?.uid]);

  // Calculate stats
  const stats = {
    totalCases: cases.length,
    activeCases: cases.filter(c => c.status === 'active' || c.status === 'pending').length,
    clearedCases: cases.filter(c => c.status === 'cleared').length,
    casesWon: cases.filter(c => c.outcome === 'won').length,
  };

  const handleCaseModal = (caseData) => {
    caseModal.open(caseData);
  };

  const sidebarItems = [
    { label: 'Dashboard', path: '/dashboard/client', icon: FileText },
    { label: 'My Cases', path: '/dashboard/client/cases', icon: FileText },
    { label: 'New Case', path: '/new-case', icon: Plus },
    { label: 'Profile', path: '/profile', icon: AlertCircle },
  ];

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        <Sidebar items={sidebarItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
              <p className="text-gray-600">Welcome, {userData?.fullName}</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="primary"
                onClick={() => navigate('/new-case')}
              >
                <Plus className="w-5 h-5" />
                New Case
              </Button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-gray-700 hover:text-primary-600"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert
              type="error"
              message={error}
              onClose={() => setError('')}
            />
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Cases</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCases}</p>
                </div>
                <FileText className="w-8 h-8 text-primary-600" />
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeCases}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-blue-600" />
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Cleared</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.clearedCases}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Won</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.casesWon}</p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-600" />
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* My Cases */}
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-lg font-bold text-gray-900 mb-4">My Cases</h2>
                {cases.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-semibold mb-2">No Cases Yet</p>
                    <p className="text-gray-500 text-sm mb-6">Start your legal journey by creating your first case.</p>
                    <p className="text-gray-500 text-sm mb-4">Our AI will match you with an experienced lawyer specializing in your case type.</p>
                    <Button onClick={() => navigate('/new-case')} size="lg">
                      Create Your First Case
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cases.map((caseItem) => (
                      <div
                        key={caseItem.id}
                        className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition"
                        onClick={() => handleCaseModal(caseItem)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900">{caseItem.caseType}</h3>
                              <Badge text={caseItem.status} />
                            </div>
                            <p className="text-sm text-gray-600">{truncateText(caseItem.description, 80)}</p>
                            <div className="grid grid-cols-2 gap-4 mt-3 text-sm text-gray-500">
                              <span>Created: {formatDate(caseItem.createdAt)}</span>
                              {caseItem.lawyerName && (
                                <span>Lawyer: {caseItem.lawyerName}</span>
                              )}
                            </div>
                          </div>
                          <div className="ml-4">
                            {caseItem.outcome && (
                              <Badge
                                text={caseItem.outcome}
                                variant={caseItem.outcome === 'won' ? 'success' : 'error'}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            {/* Assigned Lawyer */}
            {cases.some(c => c.lawyerId) && (
              <Card>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Assigned Lawyer</h2>
                {Array.from(new Set(cases.filter(c => c.lawyerId).map(c => c.lawyerId))).map((lawyerId) => {
                  const lawyer = lawyers[lawyerId];
                  if (!lawyer) return null;
                  return (
                    <div key={lawyerId} className="space-y-3">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-gray-900">{lawyer.fullName}</h3>
                        <div className="space-y-2 mt-3 text-sm text-gray-600">
                          <p>Email: {lawyer.email}</p>
                          <p>Phone: {lawyer.phone}</p>
                          <p>Address: {lawyer.address}</p>
                          {lawyer.specializations && (
                            <p className="mt-2">
                              Specializations: {lawyer.specializations.join(', ')}
                            </p>
                          )}
                          {lawyer.hourlyRate && (
                            <p>Rate: ${lawyer.hourlyRate}/hour</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Card>
            )}
          </div>

          {/* Case Detail Modal */}
          <Modal
            isOpen={caseModal.isOpen}
            onClose={caseModal.close}
            title="Case Details"
            size="lg"
          >
            {caseModal.data && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Case Type</p>
                  <p className="font-semibold text-gray-900">{caseModal.data.caseType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="text-gray-900">{caseModal.data.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge text={caseModal.data.status} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Urgency</p>
                    <Badge text={caseModal.data.urgencyLevel} />
                  </div>
                </div>
                {caseModal.data.lawyerId && (
                  <div>
                    <p className="text-sm text-gray-600">Assigned Lawyer</p>
                    <p className="font-semibold text-gray-900">{caseModal.data.lawyerName}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Created</p>
                  <p className="text-gray-900">{formatDate(caseModal.data.createdAt)}</p>
                </div>
                {caseModal.data.outcome && (
                  <div>
                    <p className="text-sm text-gray-600">Outcome</p>
                    <Badge text={caseModal.data.outcome} variant={caseModal.data.outcome === 'won' ? 'success' : 'error'} />
                  </div>
                )}
              </div>
            )}
          </Modal>
        </main>
      </div>
    </div>
  );
};
