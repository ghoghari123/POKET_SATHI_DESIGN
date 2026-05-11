import React, { useState } from 'react';
import { User, UserData } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User as UserIcon, 
  Mail, 
  Wallet, 
  Target, 
  MessageSquare, 
  Calculator, 
  BookOpen, 
  TrendingUp,
  Edit3,
  LogOut,
  ChevronRight,
  Sparkles,
  Trash2,
  AlertTriangle,
  X,
  Phone,
  MapPin,
  Building
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../hooks/useData';

interface ProfileProps {
  currentUser: User | null;
  userData: UserData;
  onEditProfile: () => void;
  onLogout: () => void;
  onDeleteAccount: (email: string) => void;
  onUpdateUserDetails: (email: string, details: Partial<User>) => void;
}

export default function Profile({ currentUser, userData, onEditProfile, onLogout, onDeleteAccount, onUpdateUserDetails }: ProfileProps) {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEditPersonalInfo, setShowEditPersonalInfo] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    phone_no: currentUser?.phone_no || '',
    county: currentUser?.county || '',
    city: currentUser?.city || ''
  });

  if (!currentUser) {
    return null;
  }

  const stats = [
    { 
      label: 'Chat Sessions', 
      value: userData.chatHistory.length, 
      icon: MessageSquare, 
      color: 'bg-blue-500',
      path: '/coach'
    },
    { 
      label: 'Saved Calculations', 
      value: userData.savedCalculations.length, 
      icon: Calculator, 
      color: 'bg-brand-amber',
      path: '/investment'
    },
    { 
      label: 'Courses Progress', 
      value: Object.keys(userData.courseProgress).length, 
      icon: BookOpen, 
      color: 'bg-emerald-500',
      path: '/learn'
    },
    { 
      label: 'Transactions', 
      value: userData.transactions.length, 
      icon: TrendingUp, 
      color: 'bg-purple-500',
      path: '/upi'
    },
  ];

  const getInitial = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleDeleteAccount = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDeleteAccount(currentUser.email);
      window.location.href = '/';
    }, 1500);
  };

  return (
    <section className="flex-grow py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-brand-navy/50 min-h-screen">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="space-y-4 sm:space-y-6"
        >
          {/* Profile Header */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-brand-navy to-brand-navy/80 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-brand-amber/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-brand-amber/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="w-20 sm:w-28 h-20 sm:h-28 rounded-full bg-brand-amber flex items-center justify-center text-brand-navy text-3xl sm:text-4xl font-extrabold shadow-2xl border-4 border-white/20"
              >
                {getInitial(currentUser.name)}
              </motion.div>
              
              <div className="text-center sm:text-left flex-1">
                <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                  <h1 className="text-2xl sm:text-3xl font-display font-extrabold">{currentUser.name}</h1>
                  <Sparkles className="text-brand-amber w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex items-center gap-2 text-gray-300 justify-center sm:justify-start">
                  <Mail size={14} className="sm:w-4 sm:h-4" />
                  <span className="text-sm font-medium truncate max-w-[200px] sm:max-w-none">{currentUser.email}</span>
                </div>
                
              </div>

              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onEditProfile}
                className="p-3 sm:p-4 bg-white/10 hover:bg-white/20 rounded-xl sm:rounded-2xl transition-colors"
              >
                <Edit3 size={20} className="sm:w-6 sm:h-6" />
              </motion.button>
            </div>
          </motion.div>

          {/* Personal Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white dark:bg-brand-navy rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200 dark:border-white/10 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-display font-extrabold flex items-center gap-2">
                <UserIcon size={20} className="sm:w-6 sm:h-6 text-brand-amber" />
                Personal Information
              </h2>
              <button 
                onClick={() => setShowEditPersonalInfo(true)}
                className="text-sm text-brand-amber font-medium hover:underline flex items-center gap-1"
              >
                <Edit3 size={14} />
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {currentUser?.phone_no ? (
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Phone</p>
                    <p className="text-sm font-bold">{currentUser.phone_no}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-400">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Phone</p>
                    <p className="text-sm font-medium text-gray-400">Not added</p>
                  </div>
                </div>
              )}
              
              {currentUser?.county ? (
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-brand-amber/10 flex items-center justify-center text-brand-amber">
                    <Building size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">County</p>
                    <p className="text-sm font-bold">{currentUser.county}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-400">
                    <Building size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">County</p>
                    <p className="text-sm font-medium text-gray-400">Not added</p>
                  </div>
                </div>
              )}
              
              {currentUser?.city ? (
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">City</p>
                    <p className="text-sm font-bold">{currentUser.city}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-400">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">City</p>
                    <p className="text-sm font-medium text-gray-400">Not added</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Financial Overview */}
          <AnimatePresence>
            {userData.onboarding && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
              >
                <motion.div 
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-brand-navy rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200 dark:border-white/10 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-brand-amber/10 flex items-center justify-center text-brand-amber">
                      <Wallet size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Monthly Income</p>
                      <p className="text-xl sm:text-2xl font-extrabold">{formatCurrency(userData.onboarding.salary)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 p-2 sm:p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Needs</p>
                      <p className="text-sm sm:text-base font-bold">{formatCurrency((userData.onboarding.salary * 50) / 100)}</p>
                    </div>
                    <div className="flex-1 p-2 sm:p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Wants</p>
                      <p className="text-sm sm:text-base font-bold">{formatCurrency((userData.onboarding.salary * 30) / 100)}</p>
                    </div>
                    <div className="flex-1 p-2 sm:p-3 bg-emerald-500/10 rounded-xl">
                      <p className="text-[10px] text-emerald-600 uppercase font-bold">Save</p>
                      <p className="text-sm sm:text-base font-bold text-emerald-600">{formatCurrency((userData.onboarding.salary * 20) / 100)}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-brand-navy rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200 dark:border-white/10 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <Target size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Savings Goal</p>
                      <p className="text-xl sm:text-2xl font-extrabold">{formatCurrency(userData.onboarding.savingsGoal)}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Monthly target</span>
                      <span className="font-bold">{formatCurrency(userData.onboarding.savingsGoal / 12)}</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '33%' }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-brand-amber to-emerald-500 rounded-full" 
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Activity Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-brand-navy rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200 dark:border-white/10 shadow-lg"
          >
            <h2 className="text-lg sm:text-xl font-display font-extrabold mb-4 sm:mb-6 flex items-center gap-2">
              <UserIcon size={20} className="sm:w-6 sm:h-6 text-brand-amber" />
              Your Activity
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {stats.map((stat, index) => (
                <motion.button
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(stat.path)}
                  className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-all text-left group relative"
                >
                  <div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl ${stat.color} flex items-center justify-center text-white mb-2 sm:mb-3`}>
                    <stat.icon size={16} className="sm:w-5 sm:h-5" />
                  </div>
                  <p className="text-xl sm:text-2xl font-extrabold">{stat.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <ChevronRight size={14} className="sm:w-4 sm:h-4 absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-300 group-hover:text-brand-amber opacity-0 group-hover:opacity-100 transition-all" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Expense Categories */}
          <AnimatePresence>
            {userData.onboarding?.categories && userData.onboarding.categories.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-brand-navy rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200 dark:border-white/10 shadow-lg"
              >
                <h2 className="text-lg sm:text-xl font-display font-extrabold mb-3 sm:mb-4">Tracked Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {userData.onboarding.categories.map((cat, index) => (
                    <motion.span 
                      key={cat}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-amber/10 text-brand-navy dark:text-brand-amber font-bold text-xs sm:text-sm rounded-lg sm:rounded-xl"
                    >
                      {cat}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={onEditProfile}
              className="w-full flex items-center justify-between p-4 sm:p-5 bg-white dark:bg-brand-navy rounded-2xl border border-gray-200 dark:border-white/10 hover:border-brand-amber transition-all group"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-brand-amber/10 flex items-center justify-center text-brand-amber">
                  <Edit3 size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm sm:text-base">Edit Financial Profile</p>
                  <p className="text-xs text-gray-500">Update your budget & goals</p>
                </div>
              </div>
              <ChevronRight size={18} className="sm:w-5 sm:h-5 text-gray-400 group-hover:text-brand-amber transition-colors" />
            </motion.button>

            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={onLogout}
              className="w-full flex items-center justify-between p-4 sm:p-5 bg-white dark:bg-brand-navy rounded-2xl border border-gray-200 dark:border-white/10 hover:border-red-500 transition-all group"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                  <LogOut size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-red-500 text-sm sm:text-base">Logout</p>
                  <p className="text-xs text-gray-500">Sign out of your account</p>
                </div>
              </div>
              <ChevronRight size={18} className="sm:w-5 sm:h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
            </motion.button>

            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowDeleteModal(true)}
              className="w-full flex items-center justify-between p-4 sm:p-5 bg-white dark:bg-brand-navy rounded-2xl border border-gray-200 dark:border-white/10 hover:border-red-500 transition-all group"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                  <Trash2 size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-red-500 text-sm sm:text-base">Delete Account Permanently</p>
                  <p className="text-xs text-gray-500">Remove all data & account</p>
                </div>
              </div>
              <ChevronRight size={18} className="sm:w-5 sm:h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4"
          >
            <div 
              className="absolute inset-0 bg-brand-navy/80 backdrop-blur-md"
              onClick={() => !isDeleting && setShowDeleteModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-brand-navy border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 sm:p-8 text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center"
                >
                  <AlertTriangle size={32} className="text-red-500" />
                </motion.div>
                
                <h2 className="text-xl sm:text-2xl font-display font-extrabold mb-2">
                  Delete Account?
                </h2>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6">
                  This action cannot be undone. All your data, chat history, calculations, and progress will be permanently deleted.
                </p>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className={`w-full py-3 sm:py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                      isDeleting 
                        ? 'bg-red-500 text-white' 
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                  >
                    {isDeleting ? (
                      <>
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 size={18} className="sm:w-5 sm:h-5" />
                        Yes, Delete Permanently
                      </>
                    )}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowDeleteModal(false)}
                    disabled={isDeleting}
                    className="w-full py-3 sm:py-4 rounded-2xl font-bold border-2 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>

              <button
                onClick={() => !isDeleting && setShowDeleteModal(false)}
                disabled={isDeleting}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Personal Info Modal */}
      <AnimatePresence>
        {showEditPersonalInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4"
          >
            <div 
              className="absolute inset-0 bg-brand-navy/80 backdrop-blur-md"
              onClick={() => setShowEditPersonalInfo(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-brand-navy border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-display font-extrabold">
                    Edit Personal Info
                  </h2>
                  <button
                    onClick={() => setShowEditPersonalInfo(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 ml-1 text-gray-700 dark:text-gray-300">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 text-gray-400" size={18} />
                      <input
                        type="tel"
                        value={personalInfo.phone_no}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, phone_no: e.target.value })}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-amber transition-all"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 ml-1 text-gray-700 dark:text-gray-300">County</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-3.5 text-gray-400" size={18} />
                      <input
                        type="text"
                        value={personalInfo.county}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, county: e.target.value })}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-amber transition-all"
                        placeholder="Enter county"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 ml-1 text-gray-700 dark:text-gray-300">City</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-3.5 text-gray-400" size={18} />
                      <input
                        type="text"
                        value={personalInfo.city}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-amber transition-all"
                        placeholder="Enter city"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (currentUser) {
                        onUpdateUserDetails(currentUser.email, {
                          phone_no: personalInfo.phone_no,
                          county: personalInfo.county,
                          city: personalInfo.city
                        });
                        setShowEditPersonalInfo(false);
                      }
                    }}
                    className="w-full btn-primary py-4 flex items-center justify-center gap-2"
                  >
                    Save Changes
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowEditPersonalInfo(false)}
                    className="w-full py-4 rounded-2xl font-bold border-2 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}