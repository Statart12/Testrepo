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
              <svg className="relative w-full h-full" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7d42ff" stopOpacity="1" />
                    <stop offset="100%" stopColor="#5a3cde" stopOpacity="1" />
                  </linearGradient>
                  <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#7d42ff"/>
                  </marker>
                </defs>

                {/* Background */}
                <rect width="400" height="500" fill="#ffffff" rx="16"/>

                {/* Top decorative elements */}
                <circle cx="100" cy="60" r="40" fill="url(#grad1)" opacity="0.1"/>
                <circle cx="320" cy="80" r="30" fill="url(#grad1)" opacity="0.15"/>

                {/* Lawyer profile card */}
                <rect x="30" y="80" width="140" height="180" fill="#f8f9ff" rx="12" stroke="#e5e0ff" strokeWidth="2"/>
                <circle cx="100" cy="120" r="25" fill="url(#grad1)"/>
                <text x="100" y="190" textAnchor="middle" fontSize="14" fill="#1f2937" fontWeight="600">
                  Expert Lawyer
                </text>
                <text x="100" y="210" textAnchor="middle" fontSize="12" fill="#6b7280">
                  10+ years experience
                </text>

                {/* Client profile card */}
                <rect x="230" y="80" width="140" height="180" fill="#f0f4ff" rx="12" stroke="#d4d8ff" strokeWidth="2"/>
                <circle cx="300" cy="120" r="25" fill="#7d42ff" opacity="0.8"/>
                <text x="300" y="190" textAnchor="middle" fontSize="14" fill="#1f2937" fontWeight="600">
                  Your Case
                </text>
                <text x="300" y="210" textAnchor="middle" fontSize="12" fill="#6b7280">
                  Find perfect match
                </text>

                {/* Matching arrows */}
                <path d="M 180 150 L 220 150" stroke="#7d42ff" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)"/>

                {/* AI/Matching indicator */}
                <rect x="150" y="130" width="100" height="40" fill="url(#grad1)" rx="8"/>
                <text x="200" y="158" textAnchor="middle" fontSize="12" fill="white" fontWeight="600">
                  AI Matching
                </text>

                {/* Bottom section - Process steps */}
                <text x="200" y="310" textAnchor="middle" fontSize="14" fill="#1f2937" fontWeight="600">
                  Simple 3-Step Process
                </text>

                {/* Step 1 */}
                <circle cx="80" cy="360" r="18" fill="#7d42ff" opacity="0.9"/>
                <text x="80" y="368" textAnchor="middle" fontSize="16" fill="white" fontWeight="700">1</text>
                <text x="80" y="395" textAnchor="middle" fontSize="11" fill="#6b7280">Sign Up</text>

                {/* Step 2 */}
                <circle cx="200" cy="360" r="18" fill="#7d42ff" opacity="0.7"/>
                <text x="200" y="368" textAnchor="middle" fontSize="16" fill="white" fontWeight="700">2</text>
                <text x="200" y="395" textAnchor="middle" fontSize="11" fill="#6b7280">Submit Case</text>

                {/* Step 3 */}
                <circle cx="320" cy="360" r="18" fill="#7d42ff" opacity="0.5"/>
                <text x="320" y="368" textAnchor="middle" fontSize="16" fill="white" fontWeight="700">3</text>
                <text x="320" y="395" textAnchor="middle" fontSize="11" fill="#6b7280">Get Matched</text>

                {/* Connecting line */}
                <line x1="98" y1="360" x2="182" y2="360" stroke="#e5e0ff" strokeWidth="2"/>
                <line x1="218" y1="360" x2="302" y2="360" stroke="#e5e0ff" strokeWidth="2"/>

                {/* Bottom badge */}
                <rect x="120" y="440" width="160" height="35" fill="#f0f4ff" rx="8" stroke="#d4d8ff" strokeWidth="1"/>
                <text x="200" y="463" textAnchor="middle" fontSize="13" fill="#7d42ff" fontWeight="600">
                  ✓ Fast, Transparent &amp; Affordable
                </text>
              </svg>
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
