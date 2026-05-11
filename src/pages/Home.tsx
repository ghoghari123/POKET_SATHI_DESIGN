import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageSquare, Smartphone, ShieldAlert, TrendingUp, BookOpen, ChevronRight, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { OnboardingData, User, UserData } from '../types';
import { formatCurrency } from '../hooks/useData';
import { useLanguage } from '../hooks/useLanguage';

interface HomeProps {
  currentUser: User | null;
  userData: UserData;
  onLoginPrompt: () => void;
  onEditProfile: () => void;
}

export default function Home({ currentUser, userData, onLoginPrompt, onEditProfile }: HomeProps) {
  const { t } = useLanguage();
  return (
    <div className="space-y-12 md:space-y-16 pb-16 md:pb-24">
      <Hero 
        currentUser={currentUser}
        onboarding={userData.onboarding}
        onExploreClick={() => null}
        onTryCoachClick={() => null}
        onEditProfile={onEditProfile}
        transactionsCount={userData.transactions.length}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
        
        {/* Coach Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center"
        >
          <div className="space-y-3 md:space-y-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 bg-brand-amber/10 rounded-xl flex items-center justify-center text-brand-amber"
            >
              <MessageSquare size={20} />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold">{t('home.aiCoach')}</h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg">
              {t('home.aiCoachDesc')}
            </p>
            <Link to="/coach" className="inline-flex items-center gap-2 font-bold text-brand-amber hover:gap-3 transition-all text-sm md:text-base">
              {t('home.chatWithCoach')} <ArrowRight size={18} />
            </Link>
          </div>
          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-card p-4 md:p-6 border-brand-amber/20 shadow-2xl relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <MessageSquare size={60} className="md:w-20 md:h-20" />
             </div>
             <div className="space-y-3 md:space-y-4">
                <div className="bg-gray-100 dark:bg-white/5 p-3 md:p-4 rounded-2xl rounded-tl-none w-4/5">
                   <p className="text-[10px] font-bold text-gray-400 mb-1">COACH</p>
                   <p className="text-xs md:text-sm">"Based on your spendings, you've spent ₹2,400 on Swiggy this week. That's 15% of your 'Wants' budget. Maybe try cooking today?"</p>
                </div>
                <div className="bg-brand-amber text-brand-navy p-3 md:p-4 rounded-2xl rounded-tr-none w-4/5 ml-auto text-right font-bold">
                   <p className="text-xs md:text-sm">Suggest me a better SIP instead of Swiggy!</p>
                </div>
             </div>
          </motion.div>
        </motion.div>

        {/* UPI Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center"
        >
          <div className="order-2 md:order-1 glass-card p-4 md:p-6 border-brand-amber/20 shadow-2xl flex flex-col items-center">
             <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 self-start">Recent Activity</h3>
             <div className="w-full space-y-2">
                {[
                  { name: 'Zomato Order', amount: '₹450' },
                  { name: 'Amazon Shopping', amount: '₹1,200' },
                  { name: 'Uber Auto', amount: '₹85' }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-transparent hover:border-brand-amber/20 transition-all cursor-pointer"
                  >
                     <span className="text-xs font-bold">{item.name}</span>
                     <span className="text-red-500 font-extrabold">- {item.amount}</span>
                  </motion.div>
                ))}
             </div>
          </div>
          <div className="order-1 md:order-2 space-y-3 md:space-y-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 bg-brand-amber/10 rounded-xl flex items-center justify-center text-brand-amber"
            >
              <Smartphone size={20} />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold">Master the UPI Leak</h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg">
              ₹10 here, ₹20 there—it adds up. Our UPI Analyzer scans your transaction history to reveal patterns you didn't know existed. Take control of your digital wallet.
            </p>
            <Link to="/upi" className="inline-flex items-center gap-2 font-bold text-brand-amber hover:gap-3 transition-all text-sm md:text-base">
              Analyze My Spends <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

        {/* Debt Detector Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center"
        >
          <div className="space-y-3 md:space-y-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500"
            >
              <ShieldAlert size={20} />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold">Spot the Loan Traps</h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg">
              Don't be fooled by "No Cost" or "Instant Approval" slogans. We calculate the hidden APR so you know what you're really paying.
            </p>
            <Link to="/debt" className="inline-flex items-center gap-2 font-bold text-brand-amber hover:gap-3 transition-all text-sm md:text-base">
              Check Loan Safety <ArrowRight size={18} />
            </Link>
          </div>
          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-card p-6 md:p-8 bg-red-500/5 border-red-500/20 text-center relative"
          >
             <div className="absolute top-2 right-2 px-3 py-1 bg-red-500 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">High Risk</div>
             <motion.div 
               whileHover={{ scale: 1.1 }}
               className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4"
             >
                <ShieldAlert size={24} />
             </motion.div>
             <p className="text-sm text-gray-500 mb-4">"Effective APR of 32.4%. Standard bank loans are 11-14%."</p>
             <div className="h-1.5 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '85%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-red-500" 
                />
             </div>
          </motion.div>
        </motion.div>

        {/* Investment Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center"
        >
          <div className="order-2 md:order-1 glass-card p-4 md:p-6 border-brand-amber/20 shadow-2xl relative">
             <div className="flex items-center gap-3 mb-4 md:mb-6">
                <TrendingUp size={20} className="text-brand-amber" />
                <h3 className="font-bold text-sm">SIP Goal: ₹1 Crore</h3>
             </div>
             <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between text-[10px] font-bold text-gray-400">
                   <span>MONTHLY SIP</span>
                   <span>₹5,000</span>
                </div>
                <div className="flex justify-between text-base md:text-lg font-extrabold border-t border-white/10 pt-3 md:pt-4">
                   <span>MATURITY</span>
                   <span className="text-brand-amber">₹3.5 Crores</span>
                </div>
                <p className="text-[9px] md:text-[10px] text-center text-gray-500 italic">"Step-up by 10% annually to hit ₹5.2 Crores!"</p>
             </div>
          </div>
          <div className="order-1 md:order-2 space-y-3 md:space-y-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 bg-brand-amber/10 rounded-xl flex items-center justify-center text-brand-amber"
            >
              <TrendingUp size={20} />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold">Build Real Wealth</h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg">
              Use our advanced calculators to see exactly how your money can grow. From standard SIPs to Step-up strategies, plan your financial freedom today.
            </p>
            <Link to="/investment" className="inline-flex items-center gap-2 font-bold text-brand-amber hover:gap-3 transition-all text-sm md:text-base">
              Start Calculating <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

      </section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12"
      >
         <div className="bg-brand-navy rounded-2xl md:rounded-[2.5rem] p-8 md:p-12 lg:p-16 text-center text-white relative overflow-hidden border border-white/10 shadow-2xl">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-brand-amber/10 blur-[80px] md:blur-[100px] rounded-full" 
            />
            <div className="relative z-10 max-w-2xl mx-auto space-y-4 md:space-y-6">
               <h2 className="text-2xl md:text-4xl md:text-5xl font-display font-extrabold tracking-tight">Ready to start?</h2>
               <p className="text-gray-400 text-sm md:text-base">Join thousands of young Indians who are taking control of their money with PocketSathi.</p>
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={currentUser ? () => null : onLoginPrompt} 
                 className="btn-primary py-3 md:py-4 px-8 md:px-12 text-base md:text-lg"
               >
                 {currentUser ? 'Go to Dashboard' : 'Create Free Account'}
               </motion.button>
            </div>
         </div>
      </motion.section>
    </div>
  );
}
