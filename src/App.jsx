import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calendarData } from './calendarData';
import Header from './components/Header';
import WeekSelector from './components/WeekSelector';
import PostCard from './components/PostCard';
import PostDetail from './components/PostDetail';
import StrategySection from './components/StrategySection';

function App() {
  const [activeWeek, setActiveWeek] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showStrategy, setShowStrategy] = useState(false);

  const currentWeek = calendarData.weeks.find(w => w.id === activeWeek);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-outfit pb-20">
      <Header onToggleStrategy={() => setShowStrategy(!showStrategy)} />

      <main className="max-w-6xl mx-auto px-4 pt-24">
        <AnimatePresence mode="wait">
          {showStrategy ? (
            <motion.div
              key="strategy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <StrategySection strategy={calendarData.strategy} onClose={() => setShowStrategy(false)} />
            </motion.div>
          ) : (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <WeekSelector
                weeks={calendarData.weeks}
                activeWeek={activeWeek}
                onSelect={setActiveWeek}
              />

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentWeek.posts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
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
            onClose={() => setSelectedPost(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
