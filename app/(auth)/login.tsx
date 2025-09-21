import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, CheckSquare } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) { alert('Please fill all fields'); return; }
    if (!email.includes('@')) { alert('Enter a valid email'); return; }

    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); alert('Login successful!'); }, 2000);
  };

  const handleForgotPassword = () => alert('Reset link sent to email');
  const handleSignUp = () => alert('Navigate to Sign Up');

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-300 via-purple-200 to-indigo-150 flex items-center justify-center p-2">
      <div className="w-full max-w-md h-screen sm:h-auto flex flex-col justify-center">
        <div className="bg-slate-200/80 backdrop-blur-md rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between h-full">

          {/* Header */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <CheckSquare color="white" size={28} />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back!</h1>
            <p className="text-gray-600 text-sm">Sign in to access your tasks</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <Mail color="#6B7280" size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-white/70 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <Lock color="#6B7280" size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-white/70 border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm text-gray-900 shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                onClick={handleForgotPassword}
                className="text-blue-600 text-xs font-semibold hover:text-indigo-600 transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl py-3 text-white text-sm font-semibold hover:from-blue-600 hover:to-indigo-700 active:scale-95 transform transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              <span className="mx-2 text-gray-500 text-xs font-medium">or continue with</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            </div>

            {/* Social Login */}
            <div className="space-y-2">
              <button className="w-full bg-white/70 border border-gray-200 rounded-xl py-3 text-gray-700 text-sm font-semibold hover:bg-white/90 shadow-lg flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
              
              <button className="w-full bg-white/70 border border-gray-200 rounded-xl py-3 text-gray-700 text-sm font-semibold hover:bg-white/90 shadow-lg flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Continue with Apple
              </button>
            </div>

            {/* Sign Up */}
            <div className="text-center mt-3">
              <span className="text-gray-600 text-xs">Don't have an account? </span>
              <button onClick={handleSignUp} className="text-blue-600 text-xs font-semibold">Sign Up</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
