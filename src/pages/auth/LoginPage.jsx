import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield, Building2, Sparkles } from 'lucide-react';
import registerimg from '../../assets/image.png';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
    // Handle login logic
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Background Image */}
      <div className="hidden lg:flex lg:flex-1 relative bg-gray-900">
        <img
          src={registerimg}
          alt="Inventory Management"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        
        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-xl">
              <Building2 size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">stockeflow</h1>
              <p className="text-blue-200 text-sm">Inventory Management</p>
            </div>
          </div>

          {/* Featured Content */}
          <div className="max-w-md">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="text-blue-400" size={20} />
              <span className="text-blue-200 font-medium">Enterprise Ready</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Streamline Your Inventory Management
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Join thousands of businesses optimizing their stock levels, reducing costs, 
              and making data-driven decisions with our intelligent inventory platform.
            </p>
          </div>

          {/* Stats */}
          <div className="flex space-x-8">
            <div>
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-blue-200 text-sm">Businesses</div>
            </div>
            <div>
              <div className="text-2xl font-bold">99.9%</div>
              <div className="text-blue-200 text-sm">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-blue-200 text-sm">Support</div>
            </div>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-blue-900/80 to-purple-900/60"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Header */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-8">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Building2 size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">stockeflow</h1>
                <p className="text-gray-500 text-sm">Inventory Management</p>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back
            </h2>
            <p className="text-gray-600 mb-8">
              Sign in to your account to continue
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={20} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
            </div>

            <Link to={'/dashboard'}
              type="submit"
              className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
            >
              <span>Sign in</span>
              <ArrowRight size={18} />
            </Link>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link to={'/dashboard'}
                  type="button"
                  className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="ml-2">Google</span>
                </Link>

                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  <span className="ml-2">Twitter</span>
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <a href="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                  Sign up now
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;