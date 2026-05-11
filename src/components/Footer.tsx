import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { IndianRupee, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-navy text-white pt-12 md:pt-20 pb-8 md:pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-20">
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-amber rounded-lg flex items-center justify-center text-brand-navy">
                <IndianRupee size={24} strokeWidth={3} />
              </div>
              <span className="text-2xl font-display font-extrabold">
                PocketSathi
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
             <h4 className="font-bold mb-4 md:mb-6 uppercase text-xs tracking-[0.2em] text-brand-amber">{t('footer.features')}</h4>
             <ul className="space-y-3 md:space-y-4 text-sm text-gray-400">
                <li><Link to="/coach" className="hover:text-white transition-colors">{t('nav.coach')}</Link></li>
                <li><Link to="/upi" className="hover:text-white transition-colors">{t('nav.upiAnalyzer')}</Link></li>
                <li><Link to="/debt" className="hover:text-white transition-colors">{t('nav.debtDetector')}</Link></li>
                <li><Link to="/investment" className="hover:text-white transition-colors">{t('nav.investment')}</Link></li>
                <li><Link to="/learn" className="hover:text-white transition-colors">{t('nav.learnHub')}</Link></li>
             </ul>
          </div>

          <div>
             <h4 className="font-bold mb-4 md:mb-6 uppercase text-xs tracking-[0.2em] text-brand-amber">Support</h4>
             <ul className="space-y-3 md:space-y-4 text-sm text-gray-400">
                <li className="flex items-center gap-3"><Mail size={16} /> help@pocketsathi.in</li>
                <li className="flex items-center gap-3"><Phone size={16} /> +91 9876543210</li>
                <li className="flex items-center gap-3"><MapPin size={16} /> Ring Road, Surat</li>
             </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 md:pt-10 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-[10px] uppercase font-bold tracking-widest text-gray-500">
           <p>© {new Date().getFullYear()} PocketSathi. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
