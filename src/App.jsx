import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calendarData as initialData } from './calendarData';
import { supabase } from './supabaseClient';
import Header from './components/Header';
import WeekSelector from './components/WeekSelector';
import PostCard from './components/PostCard';
import PostDetail from './components/PostDetail';
import StrategySection from './components/StrategySection';

function App() {
  const [data, setData] = useState(initialData);
  const [activeWeek, setActiveWeek] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showStrategy, setShowStrategy] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load data from Supabase on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const { data: dbData, error } = await supabase
          .from('content_calendar')
          .select('payload')
          .eq('id', 1)
          .single();

        if (error) {
          console.log('Using local fallback (Supabase not configured or row missing)');
          const saved = localStorage.getItem('calendar_data');
          if (saved) setData(JSON.parse(saved));
        } else if (dbData && dbData.payload) {
          setData(dbData.payload);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Save data to Supabase and localStorage on change
  useEffect(() => {
    async function persistData() {
      if (loading) return; // Don't overwrite with initial data before fetch completes

      localStorage.setItem('calendar_data', JSON.stringify(data));

      try {
        await supabase
          .from('content_calendar')
          .upsert({ id: 1, payload: data, updated_at: new Date() });
      } catch (err) {
        console.error('Supabase persistence error:', err);
      }
    }
    persistData();
  }, [data, loading]);

  const currentWeek = data.weeks.find(w => w.id === activeWeek);

  const handleUpdatePost = (updatedPost) => {
    setData(prev => ({
      ...prev,
      weeks: prev.weeks.map(w => ({
        ...w,
        posts: w.posts.map(p => p.id === updatedPost.id ? updatedPost : p)
      }))
    }));
    setSelectedPost(null);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setData(prev => ({
        ...prev,
        weeks: prev.weeks.map(w => ({
          ...w,
          posts: w.posts.filter(p => p.id !== postId)
        }))
      }));
    }
  };

  const handleAddPost = () => {
    const newPost = {
      id: `post-${Date.now()}`,
      day: "New Day",
      date: "New Date",
      pillar: data.strategy.pillars[0].title,
      format: "New Format",
      topic: "New Topic",
      content: {
        slides: [{ title: "Cover", content: "New content" }],
        caption: { hook: "Hook here", body: "Body here", cta: "CTA here" },
        hashtags: ["NewTag"],
        designNotes: ""
      }
    };

    setData(prev => ({
      ...prev,
      weeks: prev.weeks.map(w => w.id === activeWeek ? { ...w, posts: [...w.posts, newPost] } : w)
    }));
    setSelectedPost(newPost);
  };

  const handleExport = () => {
    const dataStr = "export const calendarData = " + JSON.stringify(data, null, 2) + ";";
    const blob = new Blob([dataStr], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calendarData.js';
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-lavender border-t-brand-purple rounded-full animate-spin" />
          <p className="text-slate-400 font-bold animate-pulse text-sm">Syncing with cloud...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-outfit pb-20">
      <Header
        onToggleStrategy={() => setShowStrategy(!showStrategy)}
        isAdmin={isAdmin}
        onToggleAdmin={() => setIsAdmin(!isAdmin)}
        onExport={handleExport}
      />

      <main className="max-w-6xl mx-auto px-4 pt-24">
        <AnimatePresence mode="wait">
          {showStrategy ? (
            <motion.div
              key="strategy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <StrategySection strategy={data.strategy} onClose={() => setShowStrategy(false)} />
            </motion.div>
          ) : (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center justify-between mb-8">
                <WeekSelector
                  weeks={data.weeks}
                  activeWeek={activeWeek}
                  onSelect={setActiveWeek}
                />
                {isAdmin && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddPost}
                    className="h-10 px-4 brand-gradient text-white rounded-xl text-sm font-bold shadow-lg"
                  >
                    + Add Post
                  </motion.button>
                )}
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentWeek.posts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    isAdmin={isAdmin}
                    onDelete={() => handleDeletePost(post.id)}
                    onClick={() => setSelectedPost(post)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedPost && (
          <PostDetail
            post={selectedPost}
            isAdmin={isAdmin}
            pillars={data.strategy.pillars}
            onSave={handleUpdatePost}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
