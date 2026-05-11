import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Coach from './components/Coach';
import UPIAnalyzer from './components/UPIAnalyzer';
import DebtDetector from './components/DebtDetector';
import InvestmentCalculators from './components/InvestmentCalculators';
import LearnHub from './components/LearnHub';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import OnboardingModal from './components/OnboardingModal';
import ProfileSummaryModal from './components/ProfileSummaryModal';
import ScrollToTop from './components/ScrollToTop';
import Profile from './pages/Profile';
import { useLocalStorage, useUserData } from './hooks/useData';
import { User, UserData } from './types';
import { motion } from 'motion/react';
import { LanguageProvider } from './hooks/useLanguage';

function AnimatedRoutes({ 
  currentUser, 
  userData, 
  setIsAuthModalOpen, 
  handleProfileClick, 
  updateUserData, 
  handleUpdateCourseProgress,
  logout,
  deleteAccount,
  updateUserDetails
}: { 
  currentUser: User | null; 
  userData: UserData;
  setIsAuthModalOpen: (open: boolean) => void;
  handleProfileClick: () => void;
  updateUserData: (data: Partial<UserData>) => void;
  handleUpdateCourseProgress: (courseId: string, lessonId: string) => void;
  logout: () => void;
  deleteAccount: (email: string) => void;
  updateUserDetails: (email: string, details: Partial<User>) => void;
}) {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Home 
              currentUser={currentUser}
              userData={userData}
              onLoginPrompt={() => setIsAuthModalOpen(true)}
              onEditProfile={handleProfileClick}
            />
          </motion.div>
        } />
        
        <Route path="/coach" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Coach 
              currentUser={currentUser}
              userData={userData}
              onUpdateUserData={updateUserData}
              onLoginPrompt={() => setIsAuthModalOpen(true)}
            />
          </motion.div>
        } />

        <Route path="/upi" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <UPIAnalyzer 
              currentUser={currentUser}
              userData={userData}
              onUpdateTransactions={(ts) => updateUserData({ transactions: ts })}
              onLoginPrompt={() => setIsAuthModalOpen(true)}
            />
          </motion.div>
        } />

        <Route path="/debt" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DebtDetector 
              currentUser={currentUser}
              userData={userData}
              onUpdateAnalyses={(as) => updateUserData({ debtAnalyses: as })}
              onLoginPrompt={() => setIsAuthModalOpen(true)}
            />
          </motion.div>
        } />

        <Route path="/investment" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <InvestmentCalculators 
              currentUser={currentUser}
              userData={userData}
              onUpdateCalculations={(cs) => updateUserData({ savedCalculations: cs })}
              onLoginPrompt={() => setIsAuthModalOpen(true)}
            />
          </motion.div>
        } />

        <Route path="/learn" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <LearnHub 
              currentUser={currentUser}
              userData={userData}
              onUpdateUserData={updateUserData}
              onUpdateCourseProgress={handleUpdateCourseProgress}
              onLoginPrompt={() => setIsAuthModalOpen(true)}
            />
          </motion.div>
        } />

        <Route path="/profile" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Profile 
              currentUser={currentUser}
              userData={userData}
              onEditProfile={handleProfileClick}
              onLogout={logout}
              onDeleteAccount={deleteAccount}
              onUpdateUserDetails={updateUserDetails}
            />
          </motion.div>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const { users, currentUser, signup, login, logout, deleteAccount, currentUserEmail, updateUser, updateUserDetails } = useLocalStorage();
  const { userData, updateUserData, addTransaction, updateTransactions, saveOnboarding } = useUserData(currentUserEmail);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    if (currentUser && !currentUser.onboarded) {
      setIsOnboardingOpen(true);
    }
  }, [currentUser]);

  const handleProfileClick = () => {
    if (currentUser?.onboarded && userData.onboarding) {
       setIsProfileOpen(true);
    } else {
       setIsOnboardingOpen(true);
    }
  };

  const handleUpdateCourseProgress = (courseId: string, lessonId: string) => {
    const currentProgress = userData.courseProgress[courseId] || [];
    const newProgress = currentProgress.includes(lessonId)
      ? currentProgress.filter(id => id !== lessonId)
      : [...currentProgress, lessonId];
    
    updateUserData({
      courseProgress: {
        ...userData.courseProgress,
        [courseId]: newProgress
      }
    });
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <LanguageProvider>
        <div className="min-h-screen font-sans selection:bg-brand-amber selection:text-brand-navy bg-white dark:bg-brand-navy text-brand-navy dark:text-white transition-colors duration-300 flex flex-col">
          <Navbar 
            currentUser={currentUser} 
            onLoginClick={() => setIsAuthModalOpen(true)} 
            onLogout={logout}
            onProfileClick={handleProfileClick}
          />

        <main className="pt-20 w-full flex-1 flex flex-col overflow-hidden">
          <AnimatedRoutes 
            currentUser={currentUser} 
            userData={userData} 
            setIsAuthModalOpen={setIsAuthModalOpen} 
            handleProfileClick={handleProfileClick} 
            updateUserData={updateUserData} 
            handleUpdateCourseProgress={handleUpdateCourseProgress}
            logout={logout}
            deleteAccount={deleteAccount}
            updateUserDetails={updateUserDetails}
          />
        </main>

        <Footer />

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)}
          users={users}
          onUpdateUser={updateUser}
          onSuccess={(user) => {
            if (users.find(u => u.email === user.email)) {
               login(user.email);
            } else {
               signup(user);
            }
            setIsAuthModalOpen(false);
          }}
        />

        <OnboardingModal 
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
          initialData={userData.onboarding}
          onComplete={(data) => {
            saveOnboarding(data);
            setIsOnboardingOpen(false);
          }}
        />

        {userData.onboarding && (
          <ProfileSummaryModal
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            initialData={userData.onboarding}
            onUpdate={(data) => saveOnboarding(data)}
          />
        )}
        </div>
      </LanguageProvider>
    </BrowserRouter>
  );
}
