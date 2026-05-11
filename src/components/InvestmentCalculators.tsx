import React, { useState, useMemo } from 'react';
import { TrendingUp, PieChart, Landmark, IndianRupee, Save, History } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User, UserData, SavedCalculation } from '../types';
import { formatCurrency } from '../hooks/useData';
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   BarElement,
   Title,
   Tooltip,
   Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   BarElement,
   Title,
   Tooltip,
   Legend
);

interface InvestmentCalculatorsProps {
   currentUser: User | null;
   userData: UserData;
   onUpdateCalculations: (cs: SavedCalculation[]) => void;
   onLoginPrompt: () => void;
}

type TabType = 'sip' | 'stepup' | 'lumpsum' | 'fd' | 'emi';

export default function InvestmentCalculators({ currentUser, userData, onUpdateCalculations, onLoginPrompt }: InvestmentCalculatorsProps) {
   const [activeTab, setActiveTab] = useState<TabType>('sip');

   const tabs = [
      { id: 'sip', label: 'SIP', icon: <TrendingUp size={16} /> },
      { id: 'stepup', label: 'Step-Up SIP', icon: <TrendingUp size={16} /> },
      { id: 'lumpsum', label: 'Lump Sum', icon: <PieChart size={16} /> },
      { id: 'fd', label: 'FD', icon: <Landmark size={16} /> },
      { id: 'emi', label: 'EMI', icon: <IndianRupee size={16} /> },
   ];

return (
       <section id="investment" className="flex-grow pt-8 pb-4 px-6 lg:px-8 bg-white dark:bg-brand-navy h-[calc(100vh-80px)] overflow-hidden flex flex-col">
          <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col overflow-y-auto pr-2 scrollbar-hide">
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
             >
                <motion.div 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ type: "spring", stiffness: 200 }}
                   className="flex items-center gap-3 text-brand-amber mb-2"
                >
                   <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                   >
                      <TrendingUp size={28} />
                   </motion.div>
                   <h2 className="text-3xl font-display font-extrabold">Wealth Calculators</h2>
                </motion.div>
                <p className="text-gray-500 dark:text-gray-400">Project your growth and plan your goals with data-driven insights.</p>
             </motion.div>

<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Tabs */}
                <div className="space-y-4">
                   <motion.div 
                      className="bg-gray-50 dark:bg-white/5 p-1.5 rounded-2xl border border-gray-100 dark:border-white/10"
                   >
                      {tabs.map((tab, index) => (
                         <motion.button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as TabType)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === tab.id
                               ? 'bg-white dark:bg-brand-amber text-brand-navy shadow-md'
                               : 'text-gray-500 hover:bg-white/10'
                               }`}
                         >
                            {tab.icon} {tab.label}
                         </motion.button>
                      ))}
                   </motion.div>

{/* Tips Panel */}
                   <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-brand-amber/5 border border-brand-amber/10 rounded-2xl p-6 space-y-4"
                   >
                      <h4 className="text-xs font-bold uppercase tracking-wider text-brand-amber flex items-center gap-2">
                         <motion.span
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                         >
                            📊
                         </motion.span>
                         Market Insights
                      </h4>
                      <div className="space-y-3">
                         <RecommendationCard text="Nifty 50 Index Fund: Avg 12% CAGR" />
                         <RecommendationCard text="Start ELSS SIP for 80C tax saving" />
                         <RecommendationCard text="SBI FD: 6.8% | HDFC FD: 7.1% (2024)" />
                      </div>
                   </motion.div>
               </div>

               {/* Calculator Area */}
               <div className="lg:col-span-3 space-y-8">
                  <div className="bg-white dark:bg-brand-navy border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-xl">
                     <AnimatePresence mode="wait">
                        {activeTab === 'sip' && <SIPCalc currentUser={currentUser} onSave={(s) => onUpdateCalculations([s, ...userData.savedCalculations])} onLoginPrompt={onLoginPrompt} />}
                        {activeTab === 'stepup' && <StepUpCalc currentUser={currentUser} onSave={(s) => onUpdateCalculations([s, ...userData.savedCalculations])} onLoginPrompt={onLoginPrompt} />}
                        {activeTab === 'lumpsum' && <LumpSumCalc currentUser={currentUser} onSave={(s) => onUpdateCalculations([s, ...userData.savedCalculations])} onLoginPrompt={onLoginPrompt} />}
                        {activeTab === 'fd' && <FDCalc currentUser={currentUser} onSave={(s) => onUpdateCalculations([s, ...userData.savedCalculations])} onLoginPrompt={onLoginPrompt} />}
                        {activeTab === 'emi' && <EMICalc currentUser={currentUser} onSave={(s) => onUpdateCalculations([s, ...userData.savedCalculations])} onLoginPrompt={onLoginPrompt} />}
                     </AnimatePresence>
                  </div>

                  


               </div>
            </div>
         </div>
      </section>
   );
}

function RecommendationCard({ text }: { text: string }) {
   return (
      <div className="p-3 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl text-[11px] font-bold">
         {text}
      </div>
   );
}

// Calculators

function SIPCalc({ currentUser, onSave, onLoginPrompt }: { currentUser: any, onSave: (s: SavedCalculation) => void, onLoginPrompt: () => void }) {
   const [inputs, setInputs] = useState({ investment: 5000, return: 12, years: 10 });
   const [label, setLabel] = useState('My SIP Plan');
   const [saved, setSaved] = useState(false);

   const result = useMemo(() => {
      const P = inputs.investment;
      const r = (inputs.return / 100) / 12;
      const n = inputs.years * 12;
      const maturity = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      const invested = P * n;
      return { maturity, invested, returns: maturity - invested };
   }, [inputs]);

   const handleSave = () => {
      if (!currentUser) return onLoginPrompt();
      onSave({
         id: Date.now().toString(),
         type: 'sip',
         title: label,
         inputs,
         result,
         date: new Date().toISOString()
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
   };

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-6">
            <h3 className="text-xl font-bold">SIP Calculator</h3>
            <div className="space-y-4">
               <CalcInput label="Monthly Investment (₹)" value={inputs.investment} onChange={v => setInputs({ ...inputs, investment: v })} min={500} max={1000000} step={500} />
               <CalcInput label="Expected Return (% p.a)" value={inputs.return} onChange={v => setInputs({ ...inputs, return: v })} min={1} max={30} step={0.5} />
               <CalcInput label="Duration (Years)" value={inputs.years} onChange={v => setInputs({ ...inputs, years: v })} min={1} max={40} step={1} />
            </div>
         </div>
         <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-3">
               <StatBox label="Invested" value={formatCurrency(result.invested)} />
               <StatBox label="Returns" value={formatCurrency(result.returns)} />
               <StatBox label="Maturity" value={formatCurrency(result.maturity)} amber />
            </div>
            <div className="h-48 border border-gray-100 dark:border-white/10 rounded-2xl p-4">
               <Line
                  data={{
                     labels: Array.from({ length: inputs.years + 1 }, (_, i) => i),
                     datasets: [{
                        label: 'Growth',
                        data: Array.from({ length: inputs.years + 1 }, (_, i) => {
                           const r = (inputs.return / 100) / 12;
                           const n = i * 12;
                           return i === 0 ? 0 : inputs.investment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
                        }),
                        borderColor: '#f7a325',
                        backgroundColor: 'rgba(247, 163, 37, 0.1)',
                        fill: true,
                        tension: 0.4
                     }]
                  }}
                  options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { grid: { display: false } } } }}
               />
            </div>
            <button
               onClick={handleSave}
               className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${saved ? 'bg-emerald-500 text-white' : 'bg-brand-amber text-brand-navy hover:scale-[1.02]'}`}
            >
               <Save size={18} />
               {saved ? 'Saved!' : 'Save Calculation'}
            </button>
         </div>
      </div>
   );
}

// Reusable parts for each calculator
function CalcInput({
   label,
   value,
   onChange,
   min,
   max,
   step,
}: {
   label: string
   value: number
   onChange: (v: number) => void
   min: number
   max: number
   step: number
}) {
   return (
      <div className="space-y-2">
         <div className="flex justify-between items-center gap-3">
            <label className="text-xs font-bold text-gray-500 uppercase">{label}</label>

            <input
               type="number"
               value={value}
               min={min}
               max={max}
               step={step}
               onChange={(e) => onChange(Number(e.target.value))}
               className="w-28 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg px-3 py-1 text-sm font-extrabold text-right focus:outline-none focus:border-brand-amber"
            />
         </div>

         <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-amber"
         />
      </div>
   )
}

function StatBox({ label, value, amber }: { label: string, value: string, amber?: boolean }) {
   return (
      <div className={`p-4 rounded-2xl text-center shadow-inner ${amber ? 'bg-brand-amber text-brand-navy' : 'bg-gray-50 dark:bg-white/5'}`}>
         <span className="text-[8px] font-bold uppercase block mb-1 opacity-60">{label}</span>
         <span className="text-xs font-bold whitespace-nowrap">{value}</span>
      </div>
   );
}

// Calculators Implementation

function StepUpCalc({ currentUser, onSave, onLoginPrompt }: { currentUser: any, onSave: (s: SavedCalculation) => void, onLoginPrompt: () => void }) {
   const [inputs, setInputs] = useState({ investment: 5000, return: 12, years: 10, stepUp: 10 });
   const [label, setLabel] = useState('My Step-Up SIP');
   const [saved, setSaved] = useState(false);

   const result = useMemo(() => {
      let maturity = 0;
      let totalInvested = 0;
      let monthlyInvest = inputs.investment;
      const r = (inputs.return / 100) / 12;

      for (let year = 1; year <= inputs.years; year++) {
         for (let month = 1; month <= 12; month++) {
            maturity = (maturity + monthlyInvest) * (1 + r);
            totalInvested += monthlyInvest;
         }
         monthlyInvest = monthlyInvest * (1 + inputs.stepUp / 100);
      }
      return { maturity, invested: totalInvested, returns: maturity - totalInvested };
   }, [inputs]);

   const handleSave = () => {
      if (!currentUser) return onLoginPrompt();
      onSave({
         id: Date.now().toString(),
         type: 'sip-stepup',
         title: label,
         inputs,
         result,
         date: new Date().toISOString()
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
   };

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-6">
            <h3 className="text-xl font-bold">Step-Up SIP Calculator</h3>
            <div className="space-y-4">
               <CalcInput
                  label="Monthly Investment (₹)"
                  value={inputs.investment}
                  onChange={(v) => setInputs({ ...inputs, investment: v })}
                  min={500}
                  max={500000}
                  step={500}
               />
               <CalcInput label="Annual Step-up (%)" value={inputs.stepUp} onChange={v => setInputs({ ...inputs, stepUp: v })} min={1} max={50} step={1} />
               <CalcInput label="Expected Return (% p.a)" value={inputs.return} onChange={v => setInputs({ ...inputs, return: v })} min={1} max={30} step={0.5} />
               <CalcInput label="Duration (Years)" value={inputs.years} onChange={v => setInputs({ ...inputs, years: v })} min={1} max={40} step={1} />
            </div>
         </div>
         <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-3">
               <StatBox label="Invested" value={formatCurrency(result.invested)} />
               <StatBox label="Returns" value={formatCurrency(result.returns)} />
               <StatBox label="Maturity" value={formatCurrency(result.maturity)} amber />
            </div>
            <div className="h-48 border border-gray-100 dark:border-white/10 rounded-2xl p-4">
               <Bar
                  data={{
                     labels: Array.from({ length: inputs.years }, (_, i) => `Yr ${i + 1}`),
                     datasets: [{
                        label: 'Investment',
                        data: Array.from({ length: inputs.years }, (_, i) => {
                           let monthly = inputs.investment;
                           for (let y = 0; y < i; y++) monthly *= (1 + inputs.stepUp / 100);
                           return monthly * 12;
                        }),
                        backgroundColor: 'rgba(247, 163, 37, 0.2)',
                        borderRadius: 4
                     }]
                  }}
                  options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { grid: { display: false } } } }}
               />
            </div>
            <button
               onClick={handleSave}
               className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${saved ? 'bg-emerald-500 text-white' : 'bg-brand-amber text-brand-navy hover:scale-[1.02]'}`}
            >
               <Save size={18} />
               {saved ? 'Saved!' : 'Save Calculation'}
            </button>
         </div>
      </div>
   );
}

function LumpSumCalc({ currentUser, onSave, onLoginPrompt }: { currentUser: any, onSave: (s: SavedCalculation) => void, onLoginPrompt: () => void }) {
   const [inputs, setInputs] = useState({ investment: 100000, return: 12, years: 10 });
   const [label, setLabel] = useState('Investment Goal');
   const [saved, setSaved] = useState(false);

   const result = useMemo(() => {
      const P = inputs.investment;
      const r = inputs.return / 100;
      const n = inputs.years;
      const maturity = P * Math.pow(1 + r, n);
      return { maturity, invested: P, returns: maturity - P };
   }, [inputs]);

   const handleSave = () => {
      if (!currentUser) return onLoginPrompt();
      onSave({
         id: Date.now().toString(),
         type: 'lumpsum',
         title: label,
         inputs,
         result,
         date: new Date().toISOString()
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
   };

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-6">
            <h3 className="text-xl font-bold">Lump Sum Calculator</h3>
            <div className="space-y-4">
               <CalcInput label="Total Investment (₹)" value={inputs.investment} onChange={v => setInputs({ ...inputs, investment: v })} min={500} max={500000} step={500} />
               <CalcInput label="Expected Return (% p.a)" value={inputs.return} onChange={v => setInputs({ ...inputs, return: v })} min={1} max={30} step={0.5} />
               <CalcInput label="Duration (Years)" value={inputs.years} onChange={v => setInputs({ ...inputs, years: v })} min={1} max={40} step={1} />
            </div>
         </div>
         <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-3">
               <StatBox label="Principal" value={formatCurrency(result.invested)} />
               <StatBox label="Returns" value={formatCurrency(result.returns)} />
               <StatBox label="Maturity" value={formatCurrency(result.maturity)} amber />
            </div>
            <div className="h-48 border border-gray-100 dark:border-white/10 rounded-2xl p-4 flex items-center justify-center">
               <div className="text-center">
                  <PieChart size={64} className="text-brand-amber mx-auto mb-4 opacity-50" />
                  <p className="text-xs font-bold text-gray-500 uppercase">Growth Visualization</p>
               </div>
            </div>
            <button
               onClick={handleSave}
               className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${saved ? 'bg-emerald-500 text-white' : 'bg-brand-amber text-brand-navy hover:scale-[1.02]'}`}
            >
               <Save size={18} />
               {saved ? 'Saved!' : 'Save Calculation'}
            </button>
         </div>
      </div>
   );
}

function FDCalc({ currentUser, onSave, onLoginPrompt }: { currentUser: any, onSave: (s: SavedCalculation) => void, onLoginPrompt: () => void }) {
   const [inputs, setInputs] = useState({ principal: 100000, rate: 7, years: 5 });
   const [label, setLabel] = useState('My Fixed Deposit');
   const [saved, setSaved] = useState(false);

   const result = useMemo(() => {
      const P = inputs.principal;
      const r = inputs.rate / 100;
      const n = inputs.years;
      // Compounded quarterly is standard in India for FD
      const maturity = P * Math.pow(1 + (r / 4), 4 * n);
      return { maturity, invested: P, returns: maturity - P };
   }, [inputs]);

   const handleSave = () => {
      if (!currentUser) return onLoginPrompt();
      onSave({
         id: Date.now().toString(),
         type: 'fd',
         title: label,
         inputs,
         result,
         date: new Date().toISOString()
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
   };

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-6">
            <h3 className="text-xl font-bold">Fixed Deposit Calculator</h3>
            <div className="space-y-4">
               <CalcInput label="Principal Amount (₹)" value={inputs.principal} onChange={v => setInputs({ ...inputs, principal: v })} min={5000} max={500000} step={1000} />
               <CalcInput label="Interest Rate (% p.a)" value={inputs.rate} onChange={v => setInputs({ ...inputs, rate: v })} min={1} max={15} step={0.1} />
               <CalcInput label="Tenure (Years)" value={inputs.years} onChange={v => setInputs({ ...inputs, years: v })} min={1} max={25} step={1} />
            </div>
         </div>
         <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-3">
               <StatBox label="Principal" value={formatCurrency(result.invested)} />
               <StatBox label="Interest" value={formatCurrency(result.returns)} />
               <StatBox label="Total Value" value={formatCurrency(result.maturity)} amber />
            </div>
            <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-2xl">
               <div className="flex items-center gap-3 mb-4">
                  <Landmark className="text-brand-amber" />
                  <h4 className="text-sm font-bold">Bank Note</h4>
               </div>
               <p className="text-xs text-gray-500 leading-relaxed">
                  Standard FDs in India compound interest quarterly. Your effective yield is slightly higher than the nominal rate.
               </p>
            </div>
            <button
               onClick={handleSave}
               className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${saved ? 'bg-emerald-500 text-white' : 'bg-brand-amber text-brand-navy hover:scale-[1.02]'}`}
            >
               <Save size={18} />
               {saved ? 'Saved!' : 'Save Calculation'}
            </button>
         </div>
      </div>
   );
}

function EMICalc({ currentUser, onSave, onLoginPrompt }: { currentUser: any, onSave: (s: SavedCalculation) => void, onLoginPrompt: () => void }) {
   const [inputs, setInputs] = useState({ loan: 500000, rate: 9, tenure: 60 });
   const [label, setLabel] = useState('Home/Car Loan');
   const [saved, setSaved] = useState(false);

   const result = useMemo(() => {
      const P = inputs.loan;
      const r = (inputs.rate / 100) / 12;
      const n = inputs.tenure;
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayable = emi * n;
      return { emi, totalPayable, totalInterest: totalPayable - P };
   }, [inputs]);

   const handleSave = () => {
      if (!currentUser) return onLoginPrompt();
      onSave({
         id: Date.now().toString(),
         type: 'emi',
         title: label,
         inputs,
         result,
         date: new Date().toISOString()
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
   };

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-6">
            <h3 className="text-xl font-bold">EMI Calculator</h3>
            <div className="space-y-4">
               <CalcInput label="Loan Amount (₹)" value={inputs.loan} onChange={v => setInputs({ ...inputs, loan: v })} min={5000} max={500000} step={1000} />
               <CalcInput label="Interest Rate (% p.a)" value={inputs.rate} onChange={v => setInputs({ ...inputs, rate: v })} min={5} max={25} step={0.1} />
               <CalcInput label="Tenure (Months)" value={inputs.tenure} onChange={v => setInputs({ ...inputs, tenure: v })} min={6} max={360} step={6} />
            </div>
         </div>
         <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-3">
               <StatBox label="Monthly EMI" value={formatCurrency(result.emi)} amber />
               <StatBox label="Prinicipal" value={formatCurrency(inputs.loan)} />
               <StatBox label="Interest" value={formatCurrency(result.totalInterest)} />
            </div>
            <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-2xl">
               <p className="text-[10px] font-bold text-red-500 uppercase mb-2">Total Payable</p>
               <p className="text-2xl font-extrabold">{formatCurrency(result.totalPayable)}</p>
               <div className="mt-4 h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden flex">
                  <div
                     className="h-full bg-brand-navy dark:bg-white/20"
                     style={{ width: `${(inputs.loan / result.totalPayable) * 100}%` }}
                  />
                  <div
                     className="h-full bg-red-500"
                     style={{ width: `${(result.totalInterest / result.totalPayable) * 100}%` }}
                  />
               </div>
            </div>
            <button
               onClick={handleSave}
               className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${saved ? 'bg-emerald-500 text-white' : 'bg-brand-amber text-brand-navy hover:scale-[1.02]'}`}
            >
               <Save size={18} />
               {saved ? 'Saved!' : 'Save Calculation'}
            </button>
         </div>
      </div>
   );
}

