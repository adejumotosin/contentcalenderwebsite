import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Video, MessageSquare, ChevronRight, Trash2 } from 'lucide-react';

const formatIcon = (format) => {
    if (format.includes('Carousel')) return <Layers size={18} />;
    if (format.includes('Reel') || format.includes('Video')) return <Video size={18} />;
    return <MessageSquare size={18} />;
};

export default function PostCard({ post, onClick, isAdmin, onDelete }) {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="glass-morphism rounded-3xl p-6 cursor-pointer group flex flex-col h-full relative overflow-hidden"
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-xl bg-slate-100 text-slate-600 group-hover:brand-gradient group-hover:text-white transition-all duration-500`}>
                    {formatIcon(post.format)}
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-brand-pink transition-colors">
                        {post.day} {post.date}
                    </span>
                    {isAdmin && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}
                            className="p-1 text-slate-300 hover:text-red-500 transition-colors z-10"
                            title="Delete Post"
                        >
                            <Trash2 size={14} />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-brand-purple transition-colors line-clamp-2">
                    {post.topic}
                </h3>
                <p className="text-xs font-medium text-slate-500 mb-4 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
                    {post.pillar}
                </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                    {post.format}
                </span>
                <div className="p-1.5 rounded-full bg-slate-50 text-slate-400 group-hover:bg-brand-lavender group-hover:text-brand-purple transition-all">
                    <ChevronRight size={16} />
                </div>
            </div>
        </motion.div>
    );
}
