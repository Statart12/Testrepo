import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Layout/Navbar';
import { Button, Card } from '../components/UI';
import { CheckCircle, Users, FileText, Zap } from 'lucide-react';

/**
 * Home Page
 */
export const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: 'Expert Lawyers',
      description: 'Connect with experienced lawyers specialized in your case type',
    },
    {
      icon: <Zap className="w-8 h-8 text-primary-600" />,
      title: 'Smart Matching',
      description: 'Our AI matches you with the best available lawyer for your needs',
    },
    {
      icon: <FileText className="w-8 h-8 text-primary-600" />,
      title: 'Easy Case Management',
      description: 'Track your case progress in real-time with our intuitive dashboard',
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary-600" />,
      title: 'Transparent Process',
      description: 'Clear communication and updates throughout your legal journey',
    },
  ];

  const caseTypes = [
    'Criminal Law',
    'Civil Law',
    'Corporate Law',
    'Immigration',
    'Family Law',
    'Tax Law',
    'Intellectual Property',
    'Real Estate',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect <span className="text-primary-600">Legal Match</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Connect with experienced lawyers matched to your specific legal needs. Fast, transparent, and affordable legal solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400 rounded-lg blur-3xl opacity-20"></div>
              <div className="relative bg-white rounded-lg shadow-xl p-8">
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="pt-4">
                    <div className="h-32 bg-gray-100 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Why Choose LegalMatch?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <Card key={idx} className="text-center">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Case Types Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          We Handle All Types of Cases
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {caseTypes.map((type, idx) => (
            <Card key={idx} className="text-center py-6">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <span className="font-medium text-gray-900">{type}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-900 text-white py-16 sm:py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-400">
                Create your account as a client or lawyer
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Submit Case</h3>
              <p className="text-gray-400">
                Describe your legal needs in detail
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Matched</h3>
              <p className="text-gray-400">
                We match you with the perfect lawyer for your case
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
        <Card className="bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-primary-100 mb-8">
            Join thousands of clients and lawyers using LegalMatch
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/signup')}
              className="bg-white text-primary-600 hover:bg-gray-100"
            >
              Create Account
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary-600"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">For Clients</a></li>
                <li><a href="#" className="hover:text-white">For Lawyers</a></li>
                <li><a href="#" className="hover:text-white">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Social</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 LegalMatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
