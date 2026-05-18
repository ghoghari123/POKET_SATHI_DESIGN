import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, ArrowRight, Chrome, ArrowLeft, Phone, MapPin, Building, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from '../types';
import { signInWithGoogle } from '../lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
  users: User[];
  onUpdateUser: (email: string, details: Partial<User> | string) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess, users, onUpdateUser }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetPasswordSent, setResetPasswordSent] = useState(false);
  const [registerStep, setRegisterStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone_no: '', county: '', city: '' });
  const [resetData, setResetData] = useState({ newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [resetEmail, setResetEmail] = useState('');

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', phone_no: '', county: '', city: '' });
    setRegisterStep(1);
    setError('');
  };

  const handleLogin = () => {
    const user = users.find(u => u.email === formData.email);
    if (user) {
      if (user.password === 'google_oauth') {
        setError('Please sign in with Google');
        return;
      }
      if (user.password === formData.password) {
        onSuccess(user);
        onClose();
      } else {
        setError('Invalid email or password');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  const handleRegisterStep1 = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError('Name, email and password are required');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    const existingUser = users.find(u => u.email === formData.email);
    if (existingUser) {
      if (existingUser.password === 'google_oauth') {
        setError('This email is registered with Google. Please sign in with Google.');
        return;
      }
      setError('Email already exists');
      return;
    }
    setError('');
    setRegisterStep(2);
  };

  const handleRegisterComplete = () => {
    const newUser: User = { 
      name: formData.name, 
      email: formData.email, 
      password: formData.password,
      onboarded: false,
      phone_no: formData.phone_no,
      county: formData.county,
      city: formData.city
    };
    onSuccess(newUser);
    resetForm();
    onClose();
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = users.find(u => u.email === formData.email);
    if (!user) {
      setError('No account found with this email');
      return;
    }
    setResetEmail(formData.email);
    setResetPasswordSent(true);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (resetData.newPassword !== resetData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (resetData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    onUpdateUser(resetEmail, resetData.newPassword);
    setIsForgotPassword(false);
    setResetPasswordSent(false);
    setResetData({ newPassword: '', confirmPassword: '' });
    setFormData({ ...formData, password: '' });
    setError('');
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      const googleUser = await signInWithGoogle() as { name?: string; email: string; photoURL?: string };
      const existingUser = users.find((u: User) => u.email === googleUser.email);
      
      if (existingUser) {
        onSuccess(existingUser);
      } else {
        const newUser: User = {
          name: googleUser.name || 'User',
          email: googleUser.email,
          password: 'google_oauth',
          photoURL: googleUser.photoURL || '',
          onboarded: false,
          phone_no: '',
          county: '',
          city: ''
        };
        onSuccess(newUser);
      }
      onClose();
    } catch (err: any) {
      if (err.message === 'Firebase not configured') {
        setError('Google sign-in is not available. Please configure Firebase in your .env file.');
      } else if (err.message !== 'Sign-in was cancelled') {
        setError(err.message || 'Google sign-in failed. Please try again.');
      }
    }
  };

  const handleSwitchMode = (toLogin: boolean) => {
    setError('');
    if (toLogin) {
      setIsLogin(true);
      setRegisterStep(1);
    } else {
      resetForm();
      setIsLogin(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-white dark:bg-brand-navy border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8 min-h-[480px] flex flex-col">
          <div className="flex-1">
          <AnimatePresence mode="wait">
            {isForgotPassword ? (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-display font-extrabold mb-2">
                    {resetPasswordSent ? 'Set New Password' : 'Reset Password'}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    {resetPasswordSent ? 'Enter your new password' : 'Enter your email to reset password'}
                  </p>
                </div>

                <form onSubmit={resetPasswordSent ? handleResetPassword : handleForgotPassword} className="space-y-4">
                  {!resetPasswordSent ? (
                    <div>
                      <label className="block text-sm font-medium mb-1 ml-1 text-gray-700 dark:text-gray-300">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-amber transition-all"
                          placeholder="name@email.com"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1 ml-1 text-gray-700 dark:text-gray-300">New Password</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                          <input
                            type="password"
                            required
                            value={resetData.newPassword}
                            onChange={(e) => setResetData({ ...resetData, newPassword: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-amber transition-all"
                            placeholder="New password"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 ml-1 text-gray-700 dark:text-gray-300">Confirm Password</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                          <input
                            type="password"
                            required
                            value={resetData.confirmPassword}
                            onChange={(e) => setResetData({ ...resetData, confirmPassword: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-amber transition-all"
                            placeholder="Confirm password"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {error && <p className="text-red-500 text-sm font-medium ml-1">{error}</p>}

                  <button type="submit" className="w-full btn-primary py-4 mt-4 flex items-center justify-center gap-2">
                    {resetPasswordSent ? 'Reset Password' : 'Send Reset Link'}
                    <ArrowRight size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => { setIsForgotPassword(false); setResetPasswordSent(false); setError(''); }}
                    className="w-full py-3 mt-2 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-brand-amber transition-colors font-medium"
                  >
                    <ArrowLeft size={18} />
                    Back to Login
                  </button>
                </form>
              </motion.div>
            ) : isLogin ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-display font-extrabold mb-2">Welcome Back</h2>
                  <p className="text-gray-500 dark:text-gray-400">Manage your finances with confidence</p>
                </div>

                <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl mb-8">
                  <button
                    onClick={() => handleSwitchMode(true)}
                    className="flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all bg-white dark:bg-brand-amber dark:text-brand-navy shadow-md"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleSwitchMode(false)}
                    className="flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all text-gray-500"
                  >
                    Sign Up
                  </button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 ml-1 text-gray-700 dark:text-gray-300">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-amber transition-all"
                        placeholder="name@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 ml-1 text-gray-700 dark:text-gray-300">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                      <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-amber transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => { setIsForgotPassword(true); setError(''); }}
                      className="text-sm text-brand-amber font-medium mt-1 ml-1 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {error && <p className="text-red-500 text-sm font-medium ml-1">{error}</p>}

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-brand-navy text-gray-500">or</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full py-3 mb-4 flex items-center justify-center gap-2 border-2 border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors font-semibold text-gray-700 dark:text-gray-300"
                  >
                    <Chrome size={20} className="text-red-500" />
                    Sign in with Google
                  </button>

                  <button type="submit" className="w-full btn-primary py-4 mt-4 flex items-center justify-center gap-2">
                    Login Now
                    <ArrowRight size={18} />
                  </button>
                </form>

                <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
                  Don't have an account?{' '}
                  <button onClick={() => handleSwitchMode(false)} className="text-brand-amber font-bold hover:underline">
                    Sign up
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-display font-extrabold mb-2">Join PocketSathi</h2>
                  <p className="text-gray-500 dark:text-gray-400">Your journey to financial freedom starts here</p>
                </div>

                <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl mb-6">
                  <button
                    onClick={() => handleSwitchMode(true)}
                    className="flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all text-gray-500"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleSwitchMode(false)}
                    className="flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all bg-white dark:bg-brand-amber dark:text-brand-navy shadow-md"
                  >
                    Sign Up
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${registerStep >= 1 ? 'bg-brand-amber text-brand-navy' : 'bg-gray-200 dark:bg-white/10 text-gray-400'}`}>
                    {registerStep > 1 ? <Check size={16} /> : '1'}
                  </div>
                  <div className={`w-12 h-1 rounded-full transition-all ${registerStep >= 2 ? 'bg-brand-amber' : 'bg-gray-200 dark:bg-white/10'}`} />
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${registerStep >= 2 ? 'bg-brand-amber text-brand-navy' : 'bg-gray-200 dark:bg-white/10 text-gray-400'}`}>
                    2
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {registerStep === 1 ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-1 ml-1 text-gray-700 dark:text-gray-300">Full Name</label>
                        <div className="relative">
                          <UserIcon className="absolute left-4 top-3.5 text-gray-400" size={18} />
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-amber transition-all"
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1 ml-1 text-gray-700 dark:text-gray-300">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-amber transition-all"
                            placeholder="name@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1 ml-1 text-gray-700 dark:text-gray-300">Password</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                          <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-amber transition-all"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>

                      {error && <p className="text-red-500 text-sm font-medium ml-1">{error}</p>}

                      <button
                        type="button"
                        onClick={handleRegisterStep1}
                        className="w-full btn-primary py-4 mt-4 flex items-center justify-center gap-2"
                      >
                        Continue
                        <ArrowRight size={18} />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="bg-brand-amber/10 border border-brand-amber/20 rounded-xl p-4 mb-4">
                        <p className="text-sm text-brand-navy dark:text-brand-amber font-medium">
                          Welcome, {formData.name.split(' ')[0]}! Add your details to continue.
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-sm font-medium ml-1 text-gray-700 dark:text-gray-300">Email Address</label>
                          <button
                            type="button"
                            onClick={() => { setRegisterStep(1); setError(''); }}
                            className="text-xs text-brand-amber hover:underline"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                          <input
                            type="email"
                            value={formData.email}
                            disabled
                            className="w-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1 ml-1 text-gray-700 dark:text-gray-300">Phone Number (Optional)</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-3.5 text-gray-400" size={18} />
                          <input
                            type="tel"
                            value={formData.phone_no}
                            onChange={(e) => setFormData({ ...formData, phone_no: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-amber transition-all"
                            placeholder="Enter phone number"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1 ml-1 text-gray-700 dark:text-gray-300">County</label>
                          <div className="relative">
                            <Building className="absolute left-4 top-3.5 text-gray-400" size={18} />
                            <input
                              type="text"
                              value={formData.county}
                              onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-amber transition-all"
                              placeholder="County"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 ml-1 text-gray-700 dark:text-gray-300">City</label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-3.5 text-gray-400" size={18} />
                            <input
                              type="text"
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-amber transition-all"
                              placeholder="City"
                            />
                          </div>
                        </div>
                      </div>

                      {error && <p className="text-red-500 text-sm font-medium ml-1">{error}</p>}

                      <div className="flex gap-3 mt-4">
                        <button
                          type="button"
                          onClick={() => { setRegisterStep(1); setError(''); }}
                          className="flex-1 py-4 rounded-xl font-bold border-2 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                        >
                          <ArrowLeft size={18} />
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handleRegisterComplete}
                          className="flex-[2] btn-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                        >
                          Create Account
                          <Check size={18} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full py-3 mt-4 flex items-center justify-center gap-2 border-2 border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors font-semibold text-gray-700 dark:text-gray-300"
                >
                  <Chrome size={20} className="text-red-500" />
                  Continue with Google
                </button>

                <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <button onClick={() => handleSwitchMode(true)} className="text-brand-amber font-bold hover:underline">
                    Log in
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}