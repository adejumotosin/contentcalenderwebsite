import React from 'react';
import { motion } from 'framer-motion';
import { X, Hash, MessageSquare, Video, Lightbulb, Type, Send } from 'lucide-react';

export default function PostDetail({ post, onClose }) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-2xl max-h-[90vh] glass-morphism rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col bg-white"
            >
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between brand-gradient text-white">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">{post.day} {post.date}</span>
                        </div>
                        <h2 className="text-xl font-extrabold leading-tight">{post.topic}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 no-scrollbar">
                    {/* Format & Pillar */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Format</span>
                            <p className="text-sm font-bold text-brand-purple flex items-center gap-2">
                                {post.format.includes('Video') || post.format.includes('Reel') ? <Video size={14} /> : <Type size={14} />}
                                {post.format}
                            </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Brand Pillar</span>
                            <p className="text-sm font-bold text-brand-pink line-clamp-1">{post.pillar}</p>
                        </div>
                    </div>

                    {/* Carousel Slots / Video Script */}
                    {post.content.slides && (
                        <section>
                            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-4 uppercase tracking-widest">
                                <Send size={16} className="text-brand-purple" />
                                Slide Breakdown
                            </h3>
                            <div className="space-y-3">
                                {post.content.slides.map((slide, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-brand-lavender/30 border border-brand-lavender/50">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-purple text-white text-[10px] font-bold flex items-center justify-center">
                                            {i + 1}
                                        </span>
                                        <div>
                                            <p className="text-[10px] font-bold text-brand-purple uppercase mb-0.5">{slide.title}</p>
                                            <p className="text-sm text-slate-700">{slide.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {post.content.script && (
                        <section>
                            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-4 uppercase tracking-widest">
                                <Video size={16} className="text-brand-purple" />
                                Video Script
                            </h3>
                            <div className="space-y-4">
                                {post.content.script.map((beat, i) => (
                                    <div key={i} className="flex gap-4">
                                        <span className="text-[10px] font-bold text-brand-pink w-12 pt-1">{beat.time}</span>
                                        <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-xl flex-1">{beat.text}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Caption */}
                    <section>
                        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-4 uppercase tracking-widest">
                            <MessageSquare size={16} className="text-brand-purple" />
                            Caption & Hook
                        </h3>
                        <div className="p-6 rounded-3xl bg-slate-900 text-slate-100 font-mono text-sm leading-relaxed relative group">
                            <div className="whitespace-pre-wrap">
                                {typeof post.content.caption === 'string' ? (
                                    post.content.caption
                                ) : (
                                    <>
                                        <span className="text-brand-pink block mb-4 font-bold tracking-tight text-base">
                                            {post.content.caption.hook}
                                        </span>
                                        {post.content.caption.body}
                                        <span className="block mt-4 text-blue-400 font-bold">
                                            {post.content.caption.cta}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Hashtags */}
                    <section>
                        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-4 uppercase tracking-widest">
                            <Hash size={16} className="text-brand-purple" />
                            Hashtag Bank
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {post.content.hashtags.map((tag, i) => (
                                <span key={i} className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold hover:bg-brand-lavender hover:text-brand-purple transition-colors cursor-default">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* Design Notes */}
                    {post.content.designNotes && (
                        <section className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                            <h3 className="flex items-center gap-2 text-sm font-bold text-amber-800 mb-3 uppercase tracking-widest">
                                <Lightbulb size={16} />
                                Design Notes
                            </h3>
                            <p className="text-sm text-amber-900/80 leading-relaxed font-medium">
                                {post.content.designNotes}
                            </p>
                        </section>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
