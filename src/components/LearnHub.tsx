import React, { useState } from 'react';
import { Search, BookOpen, PlayCircle, ChevronRight, CheckCircle2, Lock, X, Sparkles, Wand2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { User, UserData } from '../types';
import { BLOGS, COURSES } from '../constants';

interface LearnHubProps {
  currentUser: User | null;
  userData: UserData;
  onUpdateUserData: (data: Partial<UserData>) => void;
  onUpdateCourseProgress: (courseId: string, lessonId: string) => void;
  onLoginPrompt: () => void;
}

export default function LearnHub({ currentUser, userData, onUpdateUserData, onUpdateCourseProgress, onLoginPrompt }: LearnHubProps) {
  const [search, setSearch] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

  // AI Generator state
  const [aiTopic, setAiTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<{ title: string; content: string } | null>(null);

  // Combine static and user-generated blogs
  const allBlogs = [
    ...BLOGS,
    ...(userData.savedAiBlogs || []).map(b => ({
      ...b,
      tag: 'AI Generated',
      description: b.content.substring(0, 150) + '...'
    }))
  ];

  const suggestedBlogs = aiTopic.length > 2
    ? allBlogs.filter(b => b.title.toLowerCase().includes(aiTopic.toLowerCase())).slice(0, 3)
    : [];

  const generateAIBlog = async () => {
    if (!aiTopic.trim()) return;
    if (!currentUser) return onLoginPrompt();

    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a short, engaging financial blog post about: ${aiTopic}. 
        Focus on the Indian context. 
        Format your response as a JSON object with 'title' and 'content' fields. 
        The content should be in markdown and around 150 words.`,
        config: {
          responseMimeType: "application/json"
        }
      });

      const result = JSON.parse(response.text || '{}');
      setAiResult(result);

      // Save to userData
      const newAiBlog = {
        id: Date.now().toString(),
        title: result.title,
        content: result.content,
        date: new Date().toISOString(),
        topic: aiTopic
      };

      onUpdateUserData({
        savedAiBlogs: [newAiBlog, ...(userData.savedAiBlogs || [])]
      });

    } catch (error) {
      console.error("AI Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredBlogs = allBlogs.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.tag.toLowerCase().includes(search.toLowerCase()));

  return (
    <section id="learn" className="flex-grow pt-8 pb-4 px-6 lg:px-8 bg-gray-50 dark:bg-brand-navy/50 h-[calc(100vh-80px)] overflow-hidden flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col overflow-y-auto pr-2 scrollbar-hide">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex items-center justify-center gap-3 text-brand-amber"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <BookOpen size={28} />
            </motion.div>
            <h2 className="text-4xl font-display font-extrabold">Learn Hub</h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 max-w-2xl mx-auto"
          >
            Master your money with our curated financial literacy guides and insights.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-xl mx-auto pt-6 relative"
          >
            <motion.div
              whileFocus-within={{ scale: 1.02 }}
              className="relative"
            >
              <Search className="absolute left-6 top-1/2 -translate-y-[10%] text-gray-400" size={20} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search: SIP, CIBIL, budgeting..."
                className="w-full bg-white dark:bg-brand-navy border-2 border-gray-100 dark:border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-brand-amber transition-all shadow-lg"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Blogs Section */}
        <div className="space-y-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-between items-end"
          >
            <h3 className="text-2xl font-display font-extrabold flex items-center gap-2">
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-brand-amber"
              >
                📖
              </motion.span>
              Articles & Insights
            </h3>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI Blog Maker Card */}
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => {
                window.location.href = "coach"
              }}
              className="glass-card card-glow flex flex-col items-start overflow-visible group bg-gradient-to-br from-brand-amber/5 to-transparent border-brand-amber/30 h-full cursor-pointer"
            >
              <div className="p-8 space-y-4 w-full flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 bg-brand-amber/10 text-brand-amber text-[10px] font-bold uppercase rounded-full tracking-wider border border-brand-amber/20 flex items-center gap-1.5"
                  >
                    <Sparkles size={10} /> AI Maker
                  </motion.span>
                </div>

                <h4 className="text-xl font-display font-extrabold leading-tight">Personalized Guide</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Type a topic and let AI generate a financial guide for you.</p>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-sm font-bold text-brand-amber pt-2"
                >
                  Chat Now! <ChevronRight size={16} />
                </motion.div>


                {aiResult && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedBlog({
                        ...aiResult,
                        tag: 'AI Generated',
                        id: 'temp-ai'
                      });
                      setAiResult(null);
                    }}
                    className="w-full py-2 bg-brand-amber text-brand-navy text-xs font-bold rounded-xl mt-2 flex items-center justify-center gap-2"
                  >
                    View Generated Insight <ChevronRight size={14} />
                  </motion.button>
                )}
              </div>
            </motion.div>

            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-card card-glow flex flex-col items-start overflow-hidden group cursor-pointer"
                onClick={() => setSelectedBlog(blog)}
              >
                <div className="p-8 space-y-4 w-full">
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 bg-brand-amber/10 text-brand-amber text-[10px] font-bold uppercase rounded-full tracking-wider border border-brand-amber/20"
                  >
                    {blog.tag}
                  </motion.span>
                  <h4 className="text-xl font-display font-extrabold leading-tight group-hover:text-brand-amber transition-colors">{blog.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{blog.description}</p>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-sm font-bold text-brand-amber pt-2"
                  >
                    Read Story <ChevronRight size={16} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedBlog(null)} 
              className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-2xl bg-white dark:bg-brand-navy rounded-3xl p-8 overflow-y-auto max-h-[80vh]"
            >
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedBlog(null)} 
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </motion.button>
              <div className="space-y-6 pt-4">
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="px-3 py-1 bg-brand-amber/10 text-brand-amber text-xs font-bold uppercase rounded-full"
                >
                  {selectedBlog.tag}
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-display font-extrabold"
                >
                  {selectedBlog.title}
                </motion.h2>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="prose dark:prose-invert max-w-none text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-wrap whitespace-normal"
                >
                  {selectedBlog.content}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
