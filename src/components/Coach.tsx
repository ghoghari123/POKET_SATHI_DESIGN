import React, { useState, useEffect, useRef } from 'react';
import { Send, Trash2, MessageSquare, Mic, X, Sparkles, TrendingUp, Shield, Lightbulb, BookOpen, Target, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ChatMessage, User, UserData } from '../types';
import { GoogleGenAI, Modality } from "@google/genai";

interface CoachProps {
  currentUser: User | null;
  userData: UserData;
  onUpdateUserData: (data: Partial<UserData>) => void;
  onLoginPrompt: () => void;
}

const quickTopics = [
  { icon: TrendingUp, label: 'SIP & Investing', desc: 'Learn about mutual funds & building wealth' },
  { icon: Shield, label: 'Loan Management', desc: 'Manage EMIs and avoid debt traps' },
  { icon: Lightbulb, label: 'Budgeting Tips', desc: '50:30:20 rule and expense tracking' },
  { icon: BookOpen, label: 'Tax Saving', desc: 'ELSS, 80C, and tax planning strategies' },
];

const coachingTips = [
  { title: 'Emergency Fund', desc: 'Keep 3-6 months of expenses as liquid savings', icon: '🏦' },
  { title: 'SIP Discipline', desc: 'Never stop a SIP once started, even during market dips', icon: '📈' },
  { title: 'Debt-Free Journey', desc: 'Use avalanche method - pay highest interest first', icon: '🔒' },
  { title: 'Financial Goals', desc: 'Set SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound', icon: '🎯' },
];

export default function Coach({ currentUser, userData, onUpdateUserData, onLoginPrompt }: CoachProps) {
  const [input, setInput] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const guestHistory: ChatMessage[] = [
    { id: '1', role: 'coach', text: 'Namaste! I am your PocketSathi AI Coach. How can I help you today?', timestamp: new Date().toISOString() },
    { id: '2', role: 'user', text: 'How do I start a SIP?', timestamp: new Date().toISOString() },
    { id: '3', role: 'coach', text: 'Starting a SIP is easy! You just need a KYC-compliant bank account and a demat account. I recommend starting with Index Funds as they are low-cost and diversified.', timestamp: new Date().toISOString() },
  ];

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const recognition = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = 'en-IN';

      recognition.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const fullText = `${input} ${finalTranscript || interimTranscript}`.trim();
        setInput(fullText);
      };

      recognition.current.onerror = () => setIsListening(false);
      recognition.current.onend = () => setIsListening(false);
    }
  }, []);

  useEffect(() => {
    const rec = recognition.current;
    if (!rec) return;

    try {
      if (isListening) {
        rec.start();
      } else {
        rec.stop();
      }
    } catch (error) {
      console.error('Speech recognition error:', error);
      setIsListening(false);
    }
  }, [isListening]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const currentHistory = currentUser ? userData.chatHistory : guestHistory;

  const playAudioData = async (base64Audio: string) => {
    try {
      if (!audioContext.current) {
        audioContext.current = new AudioContext({ sampleRate: 24000 });
      }

      const binaryString = atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const int16Array = new Int16Array(bytes.buffer);
      const float32Array = new Float32Array(int16Array.length);
      for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768.0;
      }

      const audioBuffer = audioContext.current.createBuffer(1, float32Array.length, 24000);
      audioBuffer.getChannelData(0).set(float32Array);

      const source = audioContext.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.current.destination);

      setIsSpeaking(true);
      source.onended = () => setIsSpeaking(false);
      source.start();
    } catch (error) {
      console.error("Audio playback failed:", error);
      setIsSpeaking(false);
    }
  };

  const generateTTS = async (text: string) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: `Say naturally: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Zephyr' }
            }
          }
        }
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        await playAudioData(base64Audio);
      }
    } catch (error) {
      console.error("TTS generation failed:", error);
    }
  };

  const handleTopicClick = (topic: string) => {
    if (!currentUser) {
      onLoginPrompt();
      return;
    }
    setInput(`Tell me about ${topic}`);
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentUser) {
      onLoginPrompt();
      return;
    }
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date().toISOString()
    };

    const coachText = getCoachResponse(input);
    const coachMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'coach',
      text: coachText,
      timestamp: new Date().toISOString()
    };

    onUpdateUserData({ chatHistory: [...userData.chatHistory, userMsg, coachMsg] });
    setInput('');
    generateTTS(coachText);
  };

  const getCoachResponse = (text: string) => {
    const low = text.toLowerCase();
    if (low.includes('sip')) return "SIPs are the secret to wealth creation in India. Even ₹500/month can grow significantly over 15-20 years thanks to compounding!";
    if (low.includes('budget')) return "A good budget follows the 50:30:20 rule. I've updated your budget chart below based on your onboarding data.";
    if (low.includes('loan')) return "Loans can be traps if the interest rate is above 15% (Personal/Credit Card). Always check the APR using the Debt Detector tool below!";
    if (low.includes('upi')) return "UPI is great for convenience but bad for tracking small spends. Use my UPI Analyzer to see where your money is leaking.";
    if (low.includes('save')) return "Saving is the first step. Aim to save at least 20% of your income. It's not about how much you earn, but how much you keep.";
    if (low.includes('emi')) return "Keep your total EMIs below 40% of your take-home pay to avoid financial stress.";
    if (low.includes('invest')) return "Investing is better than just saving. Look into ELSS for tax saving and Index Funds for long term growth.";
    if (low.includes('tax')) return "Under Section 80C, you can save up to ₹1.5 lakh in taxes through PPF, EPF, ELSS, and life insurance premiums.";
    if (low.includes('emergency')) return "Always keep 3-6 months of expenses as emergency fund in a liquid savings account. Don't invest this money in volatile assets!";
    return "I'm here to help you with all your financial queries. Ask me about investing, budgeting, taxes, loans, or any money topic!";
  };

  const clearChat = () => {
    if (confirm('Are you sure you want to clear your chat history?')) {
      onUpdateUserData({ chatHistory: [] });
    }
  };

  const toggleListening = () => {
    if (!currentUser) return onLoginPrompt();
    setIsListening(v => !v);
  };

  return (
    <section id="coach" className="flex-grow py-8 px-6 lg:px-8 bg-gray-50 dark:bg-brand-navy/50 min-h-screen">
      <div className="max-w-7xl mx-auto w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-brand-amber flex items-center justify-center text-brand-navy">
              <Sparkles size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-display font-extrabold text-brand-navy dark:text-white">AI Coach</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Your personal financial advisor</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column - Quick Topics & Tips */}
          <div className="space-y-6">

            {/* Quick Topics */}
            <div className="bg-white dark:bg-brand-navy rounded-2xl p-5 border border-gray-200 dark:border-white/10">
              <h3 className="font-bold text-brand-navy dark:text-white mb-4 flex items-center gap-2">
                <Target size={18} className="text-brand-amber" />
                Quick Topics
              </h3>
              <div className="space-y-2">
                {quickTopics.map((topic) => (
                  <button
                    key={topic.label}
                    onClick={() => handleTopicClick(topic.label)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-brand-amber/10 transition-colors text-left group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-amber/10 flex items-center justify-center">
                      <topic.icon size={18} className="text-brand-amber" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-brand-navy dark:text-white">{topic.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{topic.desc}</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400 group-hover:text-brand-amber transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Coaching Tips */}
            <div className="bg-gradient-to-br from-brand-navy to-brand-navy/90 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Lightbulb size={18} className="text-brand-amber" />
                Financial Wisdom
              </h3>
              <div className="space-y-4">
                {coachingTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-2xl">{tip.icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{tip.title}</p>
                      <p className="text-xs text-gray-300">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>

          {/* Middle Column - Chat Interface */}
          <div className="lg:col-span-2 flex flex-col bg-white dark:bg-brand-navy border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl h-[600px]">
            <div className="p-5 border-b border-gray-200 dark:border-white/10 flex items-center justify-between bg-brand-navy text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-amber flex items-center justify-center text-brand-navy">
                  <MessageSquare size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">PocketSathi Coach</h3>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
              {currentUser && currentHistory.length > 0 && (
                <button onClick={clearChat} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                  <Trash2 size={18} />
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {currentHistory.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'user'
                    ? 'bg-brand-amber text-brand-navy font-bold rounded-tr-none'
                    : 'bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200 rounded-tl-none'
                    }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <span className="text-[10px] opacity-50 mt-2 block">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  disabled={!currentUser}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={currentUser ? "Ask about finances, investments, budgeting..." : "Login to chat with your coach"}
                  className="flex-1 bg-white dark:bg-brand-navy border border-gray-200 dark:border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-brand-amber transition-all disabled:opacity-50 text-sm"
                />

                <button
                  type="button"
                  onClick={toggleListening}
                  disabled={!currentUser}
                  className={`p-4 rounded-2xl transition-all disabled:opacity-50 ${isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-white dark:bg-brand-navy border border-gray-200 dark:border-white/10 text-brand-amber hover:bg-brand-amber/10'
                    }`}
                >
                  {isListening ? <X size={20} /> : <Mic size={20} />}
                </button>

                <button
                  type="submit"
                  disabled={!currentUser || !input.trim()}
                  className="p-4 bg-brand-amber text-brand-navy rounded-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>

              {!currentUser && (
                <p className="text-center text-[10px] text-gray-500 mt-3 uppercase font-bold tracking-tight">
                  Logged-in users get personalized AI-powered financial guidance
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}