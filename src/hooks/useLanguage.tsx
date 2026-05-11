import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'gu';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    gu: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.coach': { en: 'Coach', hi: 'कोच', gu: 'કોચ' },
  'nav.upiAnalyzer': { en: 'UPI Analyzer', hi: 'UPI विश्लेषक', gu: 'UPI વિશ્લેષક' },
  'nav.debtDetector': { en: 'Debt Detector', hi: 'ऋण डिटेक्टर', gu: 'દેવું ડિટેક્ટર' },
  'nav.investment': { en: 'Investment', hi: 'निवेश', gu: 'રોકાણ' },
  'nav.learnHub': { en: 'Learn Hub', hi: 'लर्न हब', gu: 'લર્ન હબ' },
  'nav.login': { en: 'Login', hi: 'लॉगिन', gu: 'લોગિન' },
  'nav.logout': { en: 'Logout', hi: 'लॉगઆउટ', gu: 'લોગઆઉટ' },
  'nav.welcome': { en: 'Welcome,', hi: 'स्वागत है,', gu: 'સ્વાગત,' },
  'nav.profile': { en: 'Profile', hi: 'प्रोफ़ाइल', gu: 'પ્રોફાઈલ' },

  // Hero Section
  'hero.title': { en: 'Your AI-Powered', hi: 'आपका AI-संचालित', gu: 'તમારું AI-સંચાલિત' },
  'hero.titleAccent': { en: 'Financial Coach', hi: 'वित्तीय कोच', gu: 'નાણાંકીય કોચ' },
  'hero.subtitle': { en: 'Track expenses, analyze debts, calculate investments, and get personalized financial guidance - all in one place.', hi: 'खर्चों को ट्रैक करें, ऋण का विश्लेषण करें, निवेश की गणना करें, और व्यक्तिगत वित्तीय मार्गदर्शन प्राप्त करें - सब एक जगह।', gu: 'ખર્ચ ટ્રૅક કરો, દેવાંનું વિશ્લેષણ કરો, રોકાણની ગણતરી કરો, અને વ્યક્તિગત નાણાંકીય માર્ગદર્શન મેળવો - બધું એક જગ્યાએ.' },
  'hero.getStarted': { en: 'Get Started', hi: 'शुरू करें', gu: 'શરૂ કરો' },
  'hero.exploreTools': { en: 'Explore Tools', hi: 'टूल्स देखें', gu: 'ટૂલ્સ જુઓ' },
  'hero.analyzing': { en: 'Analyzing your finances...', hi: 'आपकी वित्तीय स्थिति का विश्लेषण हो रहा है...', gu: 'તમારી નાણાંકીય સ્થિતિનું વિશ્લેષણ થઈ રહ્યું છे...' },
  'hero.transactionsFound': { en: 'transactions found', hi: 'लेनदेन मिले', gu: 'ટ્રાંઝેક્શન મળ્યા' },
  'hero.quickInsights': { en: 'Quick Insights', hi: 'त्वरित अंतर्दृष्टि', gu: 'ઝડપી અંદાજ' },
  'hero.monthlySpend': { en: 'Monthly Spending', hi: 'मासिक खर्च', gu: 'માસિક ખર્ચ' },
  'hero.savingsProgress': { en: 'Savings Progress', hi: 'बचत प्रगति', gu: 'બચત પ્રગતિ' },

  // Features Section
  'features.title': { en: 'Everything you need to manage your money', hi: 'अपने पैसे को प्रबंधित करने के लिए जो भी चाहिए', gu: 'તમારા પૈસાનું સંચાલન કરવા માટે જરૂરી બધું' },
  'features.chat': { en: 'AI Financial Coach', hi: 'AI वित्तीय कोच', gu: 'AI નાણાંકીય કોચ' },
  'features.chatDesc': { en: 'Get instant answers to your money questions', hi: 'अपने पैसे के सवालों के तुरंत जवाब पाएं', gu: 'તમારા પૈસાના પ્રશ્નોના તુરંત જવાબ મેળવો' },
  'features.upi': { en: 'UPI Transaction Analyzer', hi: 'UPI लेनदेन विश्लेषक', gu: 'UPI ટ્રાંઝેક્શન વિશ્લેષક' },
  'features.upiDesc': { en: 'Upload bank statements and analyze spending', hi: 'बैंक स्टेटमेंट अपलोड करें और खर्च का विश्लेषण करें', gu: 'બૅંક સ્ટેટમેન્ટ અપલોડ કરો અને ખર્ચનું વિશ્લેષણ કરો' },
  'features.debt': { en: 'Debt Detector', hi: 'ऋण डिटेक्टर', gu: 'દેવું ડિટેક્ટર' },
  'features.debtDesc': { en: 'Analyze loans and check risk levels', hi: 'ऋणों का विश्लेषण करें और जोखिम स्तर जांचें', gu: 'લોનનું વિશ્લેષણ કરો અને જોખમ સ્તર તપાસો' },
  'features.invest': { en: 'Investment Calculators', hi: 'निवेश कैलकुलेटर', gu: 'રોકાણ કૅલ્કુલેટર' },
  'features.investDesc': { en: 'Calculate SIP, FD, and EMI returns', hi: 'SIP, FD और EMI रिटर्न की गणना करें', gu: 'SIP, FD અને EMI રિટર્નની ગણતરી કરો' },
  'features.learn': { en: 'Learn Finance', hi: 'वित्त सीखें', gu: 'નાણાંકીય શીખો' },
  'features.learnDesc': { en: 'Courses to boost your financial literacy', hi: 'वित्तीय साक्षरता बढ़ाने के लिए कोर्स', gu: 'નાણાંકીય સાક્ષરતા વધારવા માટેના કોર્સ' },

  // Home - AI Coach Section
  'home.aiCoach': { en: 'Your Personal AI Coach', hi: 'आपका व्यक्तिगत AI कोच', gu: 'તમારો વ્યક્તિગત AI કોચ' },
  'home.aiCoachDesc': { en: "Stuck on choosing a mutual fund? Not sure if that 'instant loan' SMS is a trap? Ask PocketSathi Coach. Get real-time financial advice tailored to your goals.", hi: 'म्यूचुअल फंड चुनने में अटक हुए? सुनिश्चित नहीं कि वह "तुरंत ऋण" SMS एक जाल है? PocketSathi कोच से पूछें। अपने लक्ष्यों के अनुसार वित्तीय सलाह प्राप्त करें।', gu: 'મ્યુચ્યુઅલ ફંડ પસંદ કરવામાં અટકાયા? ખાતરી નથી કે તે "instant loan" SMS છુતરો છે? PocketSathi કોચને પૂછો. તમારા લક્ષ્યો અનુસાર વાસ્તવિક નાણાંકીય સલાહ મેળવો.' },
  'home.chatWithCoach': { en: 'Chat with Coach Now', hi: 'अभी कोच से चैट करें', gu: 'હવે કોચ સાથે ચૅટ કરો' },

  // Home - Quick Actions
  'home.quickActions': { en: 'Quick Actions', hi: 'त्वरित कार्य', gu: 'ઝડપી કાર્ય' },
  'home.analyzeUpi': { en: 'Analyze UPI Transactions', hi: 'UPI लेनदेन का विश्लेषण करें', gu: 'UPI ટ્રાંઝેક્શનનું વિશ્લેષણ કરો' },
  'home.detectDebt': { en: 'Detect Hidden Debts', hi: 'छिपे ऋण का पता लगाएं', gu: 'છુપાયેલા દેવાંને શોધો' },
  'home.calculateInvest': { en: 'Calculate Investment Returns', hi: 'निवेश रिटर्न की गणना करें', gu: 'રોકાણ રિટર્નની ગણતરી કરો' },
  'home.learnFinance': { en: 'Learn About Finance', hi: 'वित्त के बारे में जानें', gu: 'નાણાંકીય વિશે જાણો' },

  // Footer
  'footer.tagline': { en: 'Your AI-powered financial coach for smart money management.', hi: 'स्मार्ट मनी मैनेजमेंट के लिए आपका AI-संचालित वित्तीय कोच।', gu: 'સ્માર્ટ મની મૅનેજમેન્ટ માટે તમારો AI-સંચાલિત નાણાંકીય કોચ.' },
  'footer.quickLinks': { en: 'Quick Links', hi: 'त्वरित लिंक', gu: 'ઝડપી લિંક' },
  'footer.features': { en: 'Features', hi: 'विशेषताएं', gu: 'સુવિધાઓ' },
  'footer.legal': { en: 'Legal', hi: 'कानूनी', gu: 'કાયદેસર' },
  'footer.privacy': { en: 'Privacy Policy', hi: 'गोपनीयता नीति', gu: 'ગોપનીયતા નીતિ' },
  'footer.terms': { en: 'Terms of Service', hi: 'सेवा की शर्तें', gu: 'સેવાની શરતો' },
  'footer.disclaimer': { en: 'Disclaimer', hi: 'अस्वीकरण', gu: 'અસ્વીકાર' },
  'footer.copyright': { en: '2024 PocketSathi. All rights reserved.', hi: '2024 PocketSathi. सर्वाधिकार सुरक्षित।', gu: '2024 PocketSathi. બધા અધિકારો અરક્ષિત.' },

  // Auth Modal
  'auth.login.title': { en: 'Welcome Back', hi: 'वापस स्वागत है', gu: 'પાછા આવો' },
  'auth.login.subtitle': { en: 'Manage your finances with confidence', hi: 'विश्वास के साथ अपने वित्त का प्रबंधन करें', gu: 'વિશ્વાસ સાથે તમારા નાણાંનું સંચાલન કરો' },
  'auth.signup.title': { en: 'Join PocketSathi', hi: 'PocketSathi में शामिल हों', gu: 'PocketSathi માં જોડાઓ' },
  'auth.signup.subtitle': { en: 'Your journey to financial freedom starts here', hi: 'आपकी वित्तीय स्वतंत्रता की यात्रा यहाँ से शुरू होती है', gu: 'તમારી નાણાંકીય સ્વતંત્રતાની યાત્રા અહીંથી શરૂ થાય છે' },
  'auth.loginBtn': { en: 'Login Now', hi: 'अभी लॉगिन करें', gu: 'હવે લોગિન કરો' },
  'auth.signupBtn': { en: 'Create Account', hi: 'खाता बनाएं', gu: 'ખાતું બનાવો' },
  'auth.forgotPassword': { en: 'Forgot Password?', hi: 'पासवर्ड भूल गए?', gu: 'પાસવર્ડ ભૂલી ગયા?' },
  'auth.noAccount': { en: "Don't have an account?", hi: 'खाता नहीं है?', gu: 'ખાતું નથી?' },
  'auth.haveAccount': { en: 'Already have an account?', hi: 'पहले से खाता है?', gu: 'પહેલાથી ખાતું છે?' },
  'auth.signupLink': { en: 'Sign up', hi: 'साइन अप', gu: 'સાઇન અપ' },
  'auth.loginLink': { en: 'Log in', hi: 'लॉगिन', gu: 'લોગિન' },
  'auth.googleBtn': { en: 'Continue with Google', hi: 'Google से जारी रखें', gu: 'Google સાથે ચાલુ રાખો' },
  'auth.googleSignin': { en: 'Sign in with Google', hi: 'Google से साइन इन करें', gu: 'Google થી સાઇન ઇન કરો' },
  'auth.name': { en: 'Full Name', hi: 'पूरा नाम', gu: 'પૂર્ણ નામ' },
  'auth.email': { en: 'Email Address', hi: 'ईमेल पता', gu: 'ઈમેલ સરનામું' },
  'auth.password': { en: 'Password', hi: 'पासवर्ड', gu: 'પાસવર્ડ' },
  'auth.phone': { en: 'Phone Number', hi: 'फ़ोन नंबर', gu: 'ફોન નંબર' },
  'auth.county': { en: 'County', hi: 'जिला', gu: 'જિલ્લો' },
  'auth.city': { en: 'City', hi: 'शहर', gu: 'શહેર' },
  'auth.continue': { en: 'Continue', hi: 'जारी रखें', gu: 'ચાલુ રાખો' },
  'auth.back': { en: 'Back', hi: 'वापस', gu: 'પાછળ' },
  'auth.welcomeMsg': { en: 'Welcome, {name}! Add your details to continue.', hi: 'स्वागत है, {name}! अपना विवरण जोड़ें।', gu: 'સ્વાગત, {name}! તમારી વિગતો ઉમેરો.' },
  'auth.edit': { en: 'Edit', hi: 'संपादित करें', gu: 'સંપાદન' },

  // Onboarding
  'onboarding.step': { en: 'Step {current} of {total}', hi: 'चरण {current} में से {total}', gu: 'પગલું {current} માંથી {total}' },
  'onboarding.salary': { en: 'Monthly Income', hi: 'मासिक आय', gu: 'માસિક આવક' },
  'onboarding.salaryDesc': { en: 'What is your monthly take-home salary after taxes?', hi: 'करों के बाद आपका मासिक घर ले जाने वाला वेतन क्या है?', gu: 'કરો પછી તમારી માસિક ઘર લઈ જવાની સેલરી શું છે?' },
  'onboarding.categories': { en: 'Top Spending Categories', hi: 'शीर्ष खर्च श्रेणियां', gu: 'ટોચના ખર્ચ શ્રેણીઓ' },
  'onboarding.categoriesDesc': { en: 'Select the categories you spend on most frequently.', hi: 'वे श्रेणियां चुनें जिन पर आप सबसे अधिक खर्च करते हैं।', gu: 'તમે જે શ્રેણીઓમાં સૌથી વધુ ખર્ચ કરો તે પસંદ કરો.' },
  'onboarding.savingsGoal': { en: 'Monthly Savings Goal', hi: 'मासिक बचत लक्ष्य', gu: 'માસિક બચત લક્ષ્ય' },
  'onboarding.savingsGoalDesc': { en: 'How much do you realistically want to save each month?', hi: 'आप प्रत्येक मास कितनी यथार्थवादी रूप से बचत करना चाहते हैं?', gu: 'તમે દર માસ કેટલું યોગ્ય રીતે બચત કરવા માંગો છો?' },
  'onboarding.yourGoal': { en: 'Your Goal', hi: 'आपका लक्ष्य', gu: 'તમારું લક્ષ્ય' },
  'onboarding.budget': { en: 'Budget Allocation', hi: 'बजट आवंटन', gu: 'બજટ ફાળવણી' },
  'onboarding.budgetDesc': { en: 'Use the 50/30/20 rule or customize your split', hi: '50/30/20 नियम का उपयोग करें या अपना विभाजन अनुकूलित करें', gu: '50/30/20 નિયમનો ઉપયોગ કરો અથવા તમારું વિભાજન કસ્ટમાઈઝ કરો' },
  'onboarding.needs': { en: 'Needs', hi: 'जरूरतें', gu: 'જરૂરિયાત' },
  'onboarding.wants': { en: 'Wants', hi: 'इच्छाएं', gu: 'ઇચ્છાઓ' },
  'onboarding.savings': { en: 'Savings', hi: 'बचत', gu: 'બચત' },
  'onboarding.allSet': { en: "You're all set! 🎉", hi: 'आप पूरी तरह तैयार हैं! 🎉', gu: 'તમે સંપૂર્ણ તૈયાર છો! 🎉' },
  'onboarding.allSetDesc': { en: "PocketSathi is ready to help you hit your goal of {goal} this month.", hi: 'PocketSathi इस महीने आपके {goal} के लक्ष्य को हिट करने में मदद के लिए तैयार है।', gu: 'PocketSathi આ મહિને તમારા {goal} ના લક્ષ્યને હિટ કરવા માટે તૈયાર છે.' },
  'onboarding.topFocus': { en: 'Top Focus', hi: 'शीर्ष फोकस', gu: 'ટોચનો ફોકસ' },
  'onboarding.goToDashboard': { en: 'Go to Dashboard', hi: 'डैशबोर्ड पर जाएं', gu: 'ડૅશબોર્ડ પર જાઓ' },

  // Coach Page
  'coach.title': { en: 'AI Financial Coach', hi: 'AI वित्तीय कोच', gu: 'AI નાણાંકીય કોચ' },
  'coach.subtitle': { en: 'Ask anything about personal finance', hi: 'व्यक्तिगत वित्त के बारे में कुछ भी पूछें', gu: 'વ્યક્તિગત નાણાંકીય વિશે કંઈ પણ પૂછો' },
  'coach.placeholder': { en: 'Type your question here...', hi: 'यहां अपना प्रश्न लिखें...', gu: 'તમારો પ્રશ્ન અહીં લખો...' },
  'coach.send': { en: 'Send', hi: 'भेजें', gu: 'મોકલો' },
  'coach.suggestions': { en: 'Try asking', hi: 'यह पूछने का प्रयास करें', gu: 'આ પૂછવાનો પ્રયત્ન કરો' },
  'coach.suggestion1': { en: 'How should I start investing?', hi: 'मैं निवेश कैसे शुरू करूं?', gu: 'હું રોકાણ કેવી રીતે શરૂ કરું?' },
  'coach.suggestion2': { en: 'Is this loan offer good?', hi: 'क्या यह ऋण ऑफर अच्छा है?', gu: 'શું આ લોન ઑફર સારું છે?' },
  'coach.suggestion3': { en: 'How to save tax legally?', hi: 'कानूनी रूप से कर कैसे बचाएं?', gu: 'કાયદેસર કર કેવી રીતે બચાવો?' },
  'coach.suggestion4': { en: 'Best investment for beginners', hi: 'शुरुआती के लिए सर्वश्रेष्ठ निवेश', gu: 'શરૂઆત માટે શ્રેષ્ઠ રોકાણ' },
  'coach.newChat': { en: 'New Chat', hi: 'नई चैट', gu: 'નવી ચૅટ' },
  'coach.history': { en: 'Chat History', hi: 'चैट इतिहास', gu: 'ચૅટ ઇતિહાસ' },
  'coach.noHistory': { en: 'No chat history yet', hi: 'अभी तक कोई चैट इतिहास नहीं', gu: 'હજુ સુધી કોઈ ચૅટ ઇતિહાસ નથી' },

  // UPI Analyzer
  'upi.title': { en: 'UPI Transaction Analyzer', hi: 'UPI लेनदेन विश्लेषक', gu: 'UPI ટ્રાંઝેક્શન વિશ્લેષક' },
  'upi.subtitle': { en: 'Upload your bank statement to analyze spending patterns', hi: 'खर्च पैटर्न विश्लेषण के लिए अपना बैंक स्टेटमेंट अपलोड करें', gu: 'ખર્ચ પૅટર્નનું વિશ્લેષણ કરવા માટે તમારું બૅંક સ્ટેટમેન્ટ અપલોડ કરો' },
  'upi.upload': { en: 'Upload Bank Statement', hi: 'बैंक स्टेटमेंट अपलोड करें', gu: 'બૅંક સ્ટેટમેન્ટ અપલોડ કરો' },
  'upi.uploadDesc': { en: 'Drag & drop CSV or PDF file here', hi: 'CSV या PDF फ़ाइल यहां खींचें और छोड़ें', gu: 'CSV અથવા PDF ફાઇલ અહીં ખેંચો અને મૂકો' },
  'upi.browse': { en: 'Browse Files', hi: 'फ़ाइलें ब्राउज़ करें', gu: 'ફાઇલો બ્રાઉઝ કરો' },
  'upi.transactions': { en: 'Transactions', hi: 'लेनदेन', gu: 'ટ્રાંઝેક્શન' },
  'upi.totalSpend': { en: 'Total Spending', hi: 'कुल खर्च', gu: 'કુલ ખર્ચ' },
  'upi.income': { en: 'Income', hi: 'आय', gu: 'આવક' },
  'upi.avgDaily': { en: 'Avg. Daily Spend', hi: 'औसत दैनिक खर्च', gu: 'સરેરાશ દૈનિક ખર્ચ' },
  'upi.topCategory': { en: 'Top Category', hi: 'शीर्ष श्रेणी', gu: 'ટોચની શ્રેણી' },
  'upi.noTransactions': { en: 'No transactions found', hi: 'कोई लेनदेन नहीं मिला', gu: 'કોઈ ટ્રાંઝેક્શન મળ્યું નથી' },
  'upi.clearData': { en: 'Clear All Data', hi: 'सभी डेटा साफ़ करें', gu: 'બધો ડેટા સાફ કરો' },

  // Debt Detector
  'debt.title': { en: 'Debt Detector', hi: 'ऋण डिटेक्टर', gu: 'દેવું ડિટેક્ટર' },
  'debt.subtitle': { en: 'Analyze your loans and detect potential risks', hi: 'अपने ऋणों का विश्लेषण करें और संभावित जोखिमों का पता लगाएं', gu: 'તમારા લોનનું વિશ્લેષણ કરો અને સંભવિત જોખમો શોધો' },
  'debt.addLoan': { en: 'Add Loan Details', hi: 'ऋण विवरण जोड़ें', gu: 'લોન વિગતો ઉમેરો' },
  'debt.loanAmount': { en: 'Loan Amount', hi: 'ऋण राशि', gu: 'લોન રકમ' },
  'debt.interestRate': { en: 'Interest Rate (%)', hi: 'ब्याज दर (%)', gu: 'વ્યાજ દર (%)' },
  'debt.tenure': { en: 'Tenure (months)', hi: 'अवधि (महीने)', gu: 'સમયગાળો (મહિનાઓ)' },
  'debt.processingFee': { en: 'Processing Fee', hi: 'प्रोसेसिंग फीस', gu: 'પ્રોસેસિંગ ફી' },
  'debt.analyze': { en: 'Analyze Loan', hi: 'ऋण का विश्लेषण करें', gu: 'લોનનું વિશ્લેષણ કરો' },
  'debt.emi': { en: 'Monthly EMI', hi: 'मासिक EMI', gu: 'માસિક EMI' },
  'debt.totalInterest': { en: 'Total Interest', hi: 'कुल ब्याज', gu: 'કુલ વ્યાજ' },
  'debt.totalPayment': { en: 'Total Payment', hi: 'कुल भुगतान', gu: 'કુલ ચુકવણી' },
  'debt.riskLevel': { en: 'Risk Level', hi: 'जोखिम स्तर', gu: 'જોખમ સ્તર' },
  'debt.low': { en: 'Low', hi: 'कम', gu: 'ઓછું' },
  'debt.medium': { en: 'Medium', hi: 'मध्यम', gu: 'મધ્યમ' },
  'debt.high': { en: 'High', hi: 'उच्च', gu: 'ઉચ્ચ' },
  'debt.critical': { en: 'Critical', hi: 'गंभीर', gu: 'ગંભીર' },
  'debt.riskWarning': { en: 'Risk Warning', hi: 'जोखिम चेतावनी', gu: 'જોખમ ચેતાવણી' },
  'debt.noDebts': { en: 'No loans analyzed yet', hi: 'अभी तक कोई ऋण विश्लेषित नहीं', gu: 'હજુ સુધી કોઈ લોન વિશ્લેષણ કર્યું નથી' },
  'debt.delete': { en: 'Delete', hi: 'हटाएं', gu: 'કઢી લો' },

  // Investment Calculators
  'invest.title': { en: 'Investment Calculators', hi: 'निवेश कैलकुलेटर', gu: 'રોકાણ કૅલ્કુલેટર' },
  'invest.subtitle': { en: 'Calculate your investment returns', hi: 'अपने निवेश रिटर्न की गणना करें', gu: 'તમારા રોકાણ રિટર્નની ગણતરી કરો' },
  'invest.sip': { en: 'SIP Calculator', hi: 'SIP कैलकुलेटर', gu: 'SIP કૅલ્કુલેટર' },
  'invest.sipDesc': { en: 'Calculate returns on Systematic Investment Plan', hi: 'व्यवस्थित निवेश योजना पर रिटर्न की गणना करें', gu: 'સિસ્ટેમેટિક ઇન્વેસ્ટમેન્ટ પ્લાન પર રિટર્નની ગણતરી કરો' },
  'invest.fd': { en: 'FD Calculator', hi: 'FD कैलकुलेटर', gu: 'FD કૅલ્કુલેટર' },
  'invest.fdDesc': { en: 'Calculate Fixed Deposit returns', hi: 'Fixed Deposit रिटर्न की गणना करें', gu: 'Fixed Deposit રિટર્નની ગણતરી કરો' },
  'invest.emi': { en: 'EMI Calculator', hi: 'EMI कैलकुलेटर', gu: 'EMI કૅલ્કુલેટર' },
  'invest.emiDesc': { en: 'Calculate Equated Monthly Installments', hi: 'समान मासिक किस्तों की गणना करें', gu: 'સમાન માસિક હપ્તાઓની ગણતરી કરો' },
  'invest.lumpsum': { en: 'Lumpsum Calculator', hi: 'Lumpsum कैलकुलेटर', gu: 'Lumpsum કૅલ્કુલેટર' },
  'invest.lumpsumDesc': { en: 'Calculate one-time investment returns', hi: 'एकमुश्त निवेश रिटर्न की गणना करें', gu: 'એક સમયના રોકાણના રિટર્નની ગણતરી કરો' },
  'invest.monthly': { en: 'Monthly Investment', hi: 'मासिक निवेश', gu: 'માસિક રોકાણ' },
  'invest.annual': { en: 'Annual Return (%)', hi: 'वार्षिक रिटर्न (%)', gu: 'વાર્ષિક રિટર્ન (%)' },
  'invest.years': { en: 'Investment Period (years)', hi: 'निवेश अवधि (वर्ष)', gu: 'રોકાણ ગાળો (વર્ષ)' },
  'invest.amount': { en: 'Investment Amount', hi: 'निवेश राशि', gu: 'રોકાણ રકમ' },
  'invest.rate': { en: 'Interest Rate (%)', hi: 'ब्याज दर (%)', gu: 'વ્યાજ દર (%)' },
  'invest.tenure': { en: 'Tenure (months)', hi: 'अवधि (महीने)', gu: 'સમયગાળો (મહિનાઓ)' },
  'invest.calculate': { en: 'Calculate', hi: 'गणना करें', gu: 'ગણતરી કરો' },
  'invest.result': { en: 'Result', hi: 'परिणाम', gu: 'પરિણામ' },
  'invest.invested': { en: 'Amount Invested', hi: 'निवेश की गई राशि', gu: 'રોકાણ કરેલી રકમ' },
  'invest.returns': { en: 'Est. Returns', hi: 'अनुमानित रिटर्न', gu: 'અંદાજિત રિટર્ન' },
  'invest.total': { en: 'Total Value', hi: 'कुल मूल्य', gu: 'કુલ મૂલ્ય' },
  'invest.save': { en: 'Save Calculation', hi: 'गणना सहेजें', gu: 'ગણતરી સંત્રપ્ત કરો' },
  'invest.saved': { en: 'Saved Calculations', hi: 'सहेजी गई गणनाएं', gu: 'સંત્રપ્ત ગણતરીઓ' },

  // Learn Hub
  'learn.title': { en: 'Learn Finance', hi: 'वित्त सीखें', gu: 'નાણાંકીય શીખો' },
  'learn.subtitle': { en: 'Boost your financial literacy with courses', hi: 'कोर्स के साथ अपनी वित्तीय साक्षरता बढ़ाएं', gu: 'કોર્સ સાથે તમારી નાણાંકીય સાક્ષરતા વધારો' },
  'learn.beginner': { en: 'Beginner', hi: 'शुरुआती', gu: 'શરૂઆત' },
  'learn.intermediate': { en: 'Intermediate', hi: 'मध्यवर्ती', gu: 'મધ્યમ' },
  'learn.advanced': { en: 'Advanced', hi: 'उन्नत', gu: 'અગ્ર' },
  'learn.lessons': { en: 'lessons', hi: 'पाठ', gu: 'પાઠ' },
  'learn.startCourse': { en: 'Start Course', hi: 'कोर्स शुरू करें', gu: 'કોર્સ શરૂ કરો' },
  'learn.continueCourse': { en: 'Continue', hi: 'जारी रखें', gu: 'ચાલુ રાખો' },
  'learn.completed': { en: 'Completed', hi: 'पूर्ण', gu: 'પૂર્ણ' },
  'learn.progress': { en: 'Progress', hi: 'प्रगति', gu: 'પ્રગતિ' },

  // Profile
  'profile.title': { en: 'Your Activity', hi: 'आपकी गतिविधि', gu: 'તમારી પ્રવૃત્તિ' },
  'profile.chatSessions': { en: 'Chat Sessions', hi: 'चैट सत्र', gu: 'ચૅટ સત્ર' },
  'profile.savedCalcs': { en: 'Saved Calculations', hi: 'सहेजी गई गणनाएं', gu: 'સંત્રપ્ત ગણતરીઓ' },
  'profile.courses': { en: 'Courses Progress', hi: 'कोर्स प्रगति', gu: 'કોર્સ પ્રગતિ' },
  'profile.transactions': { en: 'Transactions', hi: 'लेनदेन', gu: 'ટ્રાંઝેક્શન' },
  'profile.personalInfo': { en: 'Personal Information', hi: 'व्यक्तिगत जानकारी', gu: 'વ્યક્તિગત માહિતી' },
  'profile.phone': { en: 'Phone', hi: 'फ़ोन', gu: 'ફોન' },
  'profile.county': { en: 'County', hi: 'जिला', gu: 'જિલ્લો' },
  'profile.city': { en: 'City', hi: 'शहर', gu: 'શહેર' },
  'profile.notAdded': { en: 'Not added', hi: 'नहीं जोड़ा', gu: 'ઉમેર્યું નથી' },
  'profile.editPersonal': { en: 'Edit Personal Info', hi: 'व्यक्तिगत जानकारी संपादित करें', gu: 'વ્યક્તિગત માહિતી સંપાદન' },
  'profile.editFinancial': { en: 'Edit Financial Profile', hi: 'वित्तीय प्रोफ़ाइल संपादित करें', gu: 'નાણાંકીય પ્રોફાઈલ સંપાદન' },
  'profile.updateBudget': { en: 'Update your budget & goals', hi: 'अपने बजट और लक्ष्यों को अपडेट करें', gu: 'તમારા બજટ અને લક્ષ્યો અપડેટ કરો' },
  'profile.logout': { en: 'Logout', hi: 'लॉगआઉટ', gu: 'લોગઆઉટ' },
  'profile.logoutDesc': { en: 'Sign out of your account', hi: 'अपने खाते से साइन आउट करें', gu: 'તમારા ખાતામાંથી સાઇન આઉટ કરો' },
  'profile.delete': { en: 'Delete Account Permanently', hi: 'खाता स्थायी रूप से हटाएं', gu: 'ખાતું કાયમી રૂપે કઢી લો' },
  'profile.deleteData': { en: 'Remove all data & account', hi: 'सभी डेटा और खाता हटाएं', gu: 'બધો ડેટા અને ખાતું દૂર કરો' },
  'profile.monthlyIncome': { en: 'Monthly Income', hi: 'मासिक आय', gu: 'માસિક આવક' },
  'profile.savingsGoal': { en: 'Savings Goal', hi: 'बचत लक्ष्य', gu: 'બચત લક્ષ્ય' },
  'profile.monthlyTarget': { en: 'Monthly target', hi: 'मासिक लक्ष्य', gu: 'માસિક લક્ષ્ય' },
  'profile.needs': { en: 'Needs', hi: 'जरूरतें', gu: 'જરૂરિયાત' },
  'profile.wants': { en: 'Wants', hi: 'इच्छाएं', gu: 'ઇચ્છાઓ' },
  'profile.save': { en: 'Save', hi: 'बचत', gu: 'બચત' },
  'profile.trackedCategories': { en: 'Tracked Categories', hi: 'ट्रैक की गई श्रेणियां', gu: 'ટ્રૅક કરેલી શ્રેણીઓ' },
  'profile.premium': { en: 'Premium Member', hi: 'प्रीमियम सदस्य', gu: 'પ્રિમિયમ સભ્ય' },
  'profile.saveChanges': { en: 'Save Changes', hi: 'बदलाव सहेजें', gu: 'ફેરફારો સંત્રપ્ત કરો' },
  'profile.cancel': { en: 'Cancel', hi: 'रद्द करें', gu: 'રદ કરો' },
  'profile.deleteConfirm': { en: 'Delete Account?', hi: 'खाता हटाएं?', gu: 'ખાતું કઢી લો?' },
  'profile.deleteWarning': { en: 'This action cannot be undone. All your data, chat history, calculations, and progress will be permanently deleted.', hi: 'यह क्रिया पूर्ववत नहीं की जा सकती। आपका सारा डेटा, चैट इतिहास, गणनाएं और प्रगति स्थायी रूप से हटा दी जाएगी।', gu: 'આ કાર્ય પૂર્વવત્ કરી શકાતું નથી. તમારો બધો ડેટા, ચૅટ ઇતિહાસ, ગણતરીઓ અને પ્રગતિ કાયમી રૂપે કઢી નાખાશે.' },
  'profile.deleteBtn': { en: 'Yes, Delete Permanently', hi: 'हां, स्थायी रूप से हटाएं', gu: 'હા, કાયમી રૂપે કઢી લો' },
  'profile.phoneOptional': { en: 'Phone (Optional)', hi: 'फ़ोन (वैकल्पिक)', gu: 'ફોન (વૈકલ્પિક)' },

  // Common
  'common.loading': { en: 'Loading...', hi: 'लोड हो रहा है...', gu: 'લોડ થઈ રહ્યું છે...' },
  'common.error': { en: 'Error', hi: 'त्रुटि', gu: 'ત્રુટિ' },
  'common.success': { en: 'Success', hi: 'सफलता', gu: 'સફલતા' },
  'common.submit': { en: 'Submit', hi: 'जमा करें', gu: 'સબમિટ' },
  'common.close': { en: 'Close', hi: 'बंद करें', gu: 'બંધ કરો' },
  'common.save': { en: 'Save', hi: 'सहेजें', gu: 'સંત્રપ્ત કરો' },
  'common.delete': { en: 'Delete', hi: 'हटाएं', gu: 'કઢી લો' },
  'common.edit': { en: 'Edit', hi: 'संपादित करें', gu: 'સંપાદન' },
  'common.viewAll': { en: 'View All', hi: 'सभी देखें', gu: 'બધું જુઓ' },
  'common.search': { en: 'Search', hi: 'खोजें', gu: 'શોધો' },
  'common.noResults': { en: 'No results found', hi: 'कोई परिणाम नहीं मिला', gu: 'કોઈ પરિણામ મળ્યો નથી' },
  'common.required': { en: 'Required', hi: 'आवश्यक', gu: 'જરૂરી' },
  'common.optional': { en: 'Optional', hi: 'वैकल्पिक', gu: 'વૈકલ્પિક' },
  'common.total': { en: 'Total', hi: 'कुल', gu: 'કુલ' },
  'common.average': { en: 'Average', hi: 'औसत', gu: 'સરેરાશ' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('ps_language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('ps_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, params?: Record<string, string>): string => {
    const translation = translations[key];
    if (!translation) return key;
    
    let text = translation[language] || translation.en;
    
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}