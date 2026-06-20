import React, { useState, useEffect } from 'react';
import { Menu, FileText, Users, CheckCircle, Trophy, AlertCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getCasesForLawyer } from '../services/caseService';
import { getAllLawyers } from '../services/authService';
import { Sidebar, Navbar } from '../components/Layout/Navbar';
import { Card, Button, Table, Badge, LoadingSpinner, Modal, Alert } from '../components/UI';
import { formatDate, getStatusColor, truncateText } from '../utils/formatting';
import { useModal } from '../hooks/useCustom';

/**
 * Lawyer Dashboard Page
 */
export const LawyerDashboard = () => {
  const { userData } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cases, setCases] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const caseModal = useModal();
  const [updatingCaseId, setUpdatingCaseId] = useState(null);

  // Fetch lawyer's cases
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (userData?.uid) {
          const casesData = await getCasesForLawyer(userData.uid);
          setCases(casesData);

          // Extract unique clients
          const uniqueClients = [];
          const clientIds = new Set();
          casesData.forEach((c) => {
            if (c.clientId && !clientIds.has(c.clientId)) {
              clientIds.add(c.clientId);
              uniqueClients.push({
                id: c.clientId,
                fullName: c.clientName,
                email: c.clientEmail,
                phone: c.clientPhone,
                address: c.clientAddress,
              });
            }
          });
          setClients(uniqueClients);
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
    activeClients: new Set(cases.filter(c => c.status !== 'cleared').map(c => c.clientId)).size,
    totalCases: cases.length,
    activeCases: cases.filter(c => c.status === 'active' || c.status === 'pending').length,
    clearedCases: cases.filter(c => c.status === 'cleared').length,
    casesWon: cases.filter(c => c.outcome === 'won').length,
    casesLost: cases.filter(c => c.outcome === 'lost').length,
  };

  // Filter cases
  const filteredCases = filter === 'all'
    ? cases
    : cases.filter(c => c.status === filter);

  const handleCaseModal = (caseData) => {
    caseModal.open(caseData);
  };

  const handleUpdateStatus = async (caseId, newStatus, outcome = null) => {
    try {
      setUpdatingCaseId(caseId);
      // This would call updateCaseStatus from caseService
      console.log(`Updating case ${caseId} to status ${newStatus}`);
      caseModal.close();
      // Refresh cases
      if (userData?.uid) {
        const casesData = await getCasesForLawyer(userData.uid);
        setCases(casesData);
      }
    } catch (err) {
      setError('Failed to update case');
    } finally {
      setUpdatingCaseId(null);
    }
  };

  const sidebarItems = [
    { label: 'Dashboard', path: '/dashboard/lawyer', icon: FileText },
    { label: 'My Cases', path: '/dashboard/lawyer/cases', icon: FileText },
    { label: 'My Clients', path: '/dashboard/lawyer/clients', icon: Users },
    { label: 'Profile', path: '/profile', icon: Users },
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
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {userData?.fullName}</p>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-700 hover:text-primary-600"
            >
              <Menu className="w-6 h-6" />
            </button>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Clients</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeClients}</p>
                </div>
                <Users className="w-8 h-8 text-primary-600" />
              </div>
            </Card>

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
                <Clock className="w-8 h-8 text-blue-600" />
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

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Lost</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.casesLost}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </Card>
          </div>

          {/* Cases and Clients Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Cases */}
            <Card>
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-900">My Cases</h2>
                <div className="flex gap-2 mt-4">
                  {['all', 'pending', 'active', 'cleared'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilter(status)}
                      className={`px-3 py-1 rounded text-sm font-medium transition ${
                        filter === status
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {filteredCases.slice(0, 5).map((caseItem) => (
                  <div
                    key={caseItem.id}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleCaseModal(caseItem)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{caseItem.caseType}</h3>
                        <p className="text-sm text-gray-600">{caseItem.clientName}</p>
                        <p className="text-xs text-gray-500 mt-1">{truncateText(caseItem.description, 60)}</p>
                      </div>
                      <Badge
                        text={caseItem.status}
                        variant={caseItem.status === 'active' ? 'primary' : caseItem.status === 'cleared' ? 'success' : 'warning'}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {filteredCases.length > 5 && (
                <Button variant="outline" fullWidth className="mt-4">
                  View All Cases
                </Button>
              )}
            </Card>

            {/* My Clients */}
            <Card>
              <h2 className="text-lg font-bold text-gray-900 mb-4">My Clients</h2>
              <div className="space-y-3">
                {clients.slice(0, 5).map((client) => (
                  <div key={client.id} className="p-3 border rounded-lg">
                    <h3 className="font-semibold text-gray-900">{client.fullName}</h3>
                    <p className="text-sm text-gray-600">{client.email}</p>
                    <p className="text-sm text-gray-600">{client.phone}</p>
                  </div>
                ))}
              </div>
              {clients.length > 5 && (
                <Button variant="outline" fullWidth className="mt-4">
                  View All Clients
                </Button>
              )}
            </Card>
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
                  <p className="text-sm text-gray-600">Client</p>
                  <p className="font-semibold text-gray-900">{caseModal.data.clientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="text-gray-900">{caseModal.data.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge text={caseModal.data.status} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Assigned Date</p>
                    <p className="text-gray-900">{formatDate(caseModal.data.assignedAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Urgency</p>
                    <p className="text-gray-900 capitalize">{caseModal.data.urgencyLevel}</p>
                  </div>
                </div>
                {caseModal.data.status !== 'cleared' && (
                  <div className="flex gap-2 mt-6">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleUpdateStatus(caseModal.data.id, 'active')}
                      disabled={caseModal.data.status === 'active'}
                    >
                      Mark Active
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleUpdateStatus(caseModal.data.id, 'cleared', 'won')}
                    >
                      Mark Won
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleUpdateStatus(caseModal.data.id, 'cleared', 'lost')}
                    >
                      Mark Lost
                    </Button>
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
