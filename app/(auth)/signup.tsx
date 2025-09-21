import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, CheckSquare, Check } from 'lucide-react';
import { register } from '@/service/AuthService';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

  const validateForm = () => {
    const { fullName, email, password, confirmPassword } = formData;
    if (!fullName.trim()) { alert('Enter your full name'); return false; }
    if (!email.includes('@')) { alert('Enter valid email'); return false; }
    if (password.length < 6) { alert('Password must be 6+ chars'); return false; }
    if (password !== confirmPassword) { alert('Passwords do not match'); return false; }
    if (!agreeTerms) { alert('Agree to Terms'); return false; }
    return true;
  };


  const getPasswordStrength = () => {
    const pwd = formData.password;
    if (!pwd) return { strength: 0, text: '', color: '' };
    if (pwd.length < 4) return { strength: 25, text: 'Weak', color: 'bg-red-500' };
    if (pwd.length < 6) return { strength: 50, text: 'Fair', color: 'bg-yellow-500' };
    if (pwd.length < 8) return { strength: 75, text: 'Good', color: 'bg-blue-500' };
    return { strength: 100, text: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength();

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
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Join TO DO App!</h1>
            <p className="text-gray-600 text-sm">Create your account and start organizing</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <User color="#6B7280" size={20} />
                </div>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-white/70 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <Mail color="#6B7280" size={20} />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-white/70 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <Lock color="#6B7280" size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Create a password"
                  className="w-full bg-white/70 border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm text-gray-900 shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-gray-600">Password strength</span>
                    <span className={`${passwordStrength.strength < 50 ? 'text-red-600' : passwordStrength.strength < 75 ? 'text-yellow-600' : passwordStrength.strength < 100 ? 'text-blue-600' : 'text-green-600'}`}>
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div className={`h-2 rounded-full ${passwordStrength.color}`} style={{ width: `${passwordStrength.strength}%` }}></div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <Lock color="#6B7280" size={20} />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm password"
                  className={`w-full bg-white/70 border rounded-xl pl-10 pr-10 py-3 text-sm text-gray-900 shadow-lg focus:ring-2 focus:outline-none ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : formData.confirmPassword && formData.password === formData.confirmPassword
                      ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <span className="absolute right-10 top-1/2 transform -translate-y-1/2 text-green-500"><Check size={18} /></span>
                )}
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-3 py-1">
              <div
                onClick={() => setAgreeTerms(!agreeTerms)}
                className={`mt-1 w-5 h-5 rounded-lg border-2 flex items-center justify-center cursor-pointer ${
                  agreeTerms ? 'bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-500' : 'bg-white/70 border-gray-300 hover:border-blue-400'
                }`}
              >
                {agreeTerms && <Check color="white" size={16} />}
              </div>
              <div className="text-xs text-gray-600 leading-relaxed">
                I agree to <button className="text-blue-600 font-semibold">Terms</button> and <button className="text-blue-600 font-semibold">Privacy</button>
              </div>
            </div>

            {/* Register */}
            <button
              onClick={handleRegister}
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl py-3 text-white text-sm font-semibold hover:from-blue-600 hover:to-indigo-700 active:scale-95 transform transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>

            {/* Sign In */}
            <div className="text-center mt-3">
              <span className="text-gray-600 text-xs">Already have an account? </span>
              <button onClick={handleSignIn} className="text-blue-600 text-xs font-semibold">Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
