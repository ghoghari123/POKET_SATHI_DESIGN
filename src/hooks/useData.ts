import React, { useState, useEffect } from 'react';
import { User, UserData, OnboardingData } from '../types';

export const useLocalStorage = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('ps_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('ps_current_user');
  });

  const signup = (user: User) => {
    const newUsers = [...users, user];
    setUsers(newUsers);
    localStorage.setItem('ps_users', JSON.stringify(newUsers));
    login(user.email);
  };

  const login = (email: string) => {
    setCurrentUserEmail(email);
    localStorage.setItem('ps_current_user', email);
  };

  const logout = () => {
    setCurrentUserEmail(null);
    localStorage.removeItem('ps_current_user');
  };

  const deleteAccount = (email: string) => {
    // Mark user as deleted (soft delete) but keep data for a period
    const updatedUsers = users.map(u => u.email === email ? { 
      ...u, 
      deleted: true, 
      deletedAt: new Date().toISOString(),
      name: 'Deleted Account',
      email: `deleted_${email}`
    } : u);
    setUsers(updatedUsers);
    localStorage.setItem('ps_users', JSON.stringify(updatedUsers));
    
    // Clear current user
    setCurrentUserEmail(null);
    localStorage.removeItem('ps_current_user');
    
    // Remove user data
    localStorage.removeItem(`ps_data_${email}`);
  };

  const updateUser = (email: string, newPassword: string) => {
    const updatedUsers = users.map(u => u.email === email ? { ...u, password: newPassword } : u);
    setUsers(updatedUsers);
    localStorage.setItem('ps_users', JSON.stringify(updatedUsers));
  };

  const updateUserDetails = (email: string, details: Partial<User>) => {
    const updatedUsers = users.map(u => u.email === email ? { ...u, ...details } : u);
    setUsers(updatedUsers);
    localStorage.setItem('ps_users', JSON.stringify(updatedUsers));
  };

  const currentUser = users.find(u => u.email === currentUserEmail) || null;

  return { users, currentUser, signup, login, logout, deleteAccount, currentUserEmail, updateUser, updateUserDetails };
};

export const useUserData = (email: string | null) => {
  const [userData, setUserData] = useState<UserData>(() => {
    if (!email) return getDefaultUserData();
    const saved = localStorage.getItem(`ps_data_${email}`);
    return saved ? JSON.parse(saved) : getDefaultUserData();
  });

  useEffect(() => {
    if (email) {
      const saved = localStorage.getItem(`ps_data_${email}`);
      setUserData(saved ? JSON.parse(saved) : getDefaultUserData());
    } else {
      setUserData(getDefaultUserData());
    }
  }, [email]);

  const updateUserData = (newData: Partial<UserData>) => {
    if (!email) return;
    const updated = { ...userData, ...newData };
    setUserData(updated);
    localStorage.setItem(`ps_data_${email}`, JSON.stringify(updated));
  };

  const addTransaction = (t: any) => {
    updateUserData({ transactions: [t, ...userData.transactions] });
  };

  const updateTransactions = (ts: any[]) => {
    updateUserData({ transactions: ts });
  };

  const saveOnboarding = (data: OnboardingData) => {
    updateUserData({ onboarding: data });
    // Also update users list to mark as onboarded
    const users = JSON.parse(localStorage.getItem('ps_users') || '[]');
    const updatedUsers = users.map((u: User) => u.email === email ? { ...u, onboarded: true } : u);
    localStorage.setItem('ps_users', JSON.stringify(updatedUsers));
  };

  return { userData, updateUserData, addTransaction, updateTransactions, saveOnboarding };
};

function getDefaultUserData(): UserData {
  return {
    transactions: [],
    debtAnalyses: [],
    savedCalculations: [],
    chatHistory: [],
    onboarding: null,
    courseProgress: {},
    savedAiBlogs: []
  };
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
