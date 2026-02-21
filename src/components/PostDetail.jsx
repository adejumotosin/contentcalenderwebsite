import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Hash, MessageSquare, Video, Lightbulb, Type, Send, Save, Plus, Trash2 } from 'lucide-react';

export default function PostDetail({ post, isAdmin, pillars, onSave, onClose }) {
    const [editedPost, setEditedPost] = useState(JSON.parse(JSON.stringify(post)));

    const handleSave = () => {
        onSave(editedPost);
    };

    const updateContent = (key, value) => {
        setEditedPost(prev => ({
            ...prev,
            content: { ...prev.content, [key]: value }
        }));
    };

    const updateSlide = (index, value) => {
        const newSlides = [...editedPost.content.slides];
        newSlides[index].content = value;
        updateContent('slides', newSlides);
    };

    const addSlide = () => {
        const newSlides = [...(editedPost.content.slides || []), { title: `Slide ${(editedPost.content.slides?.length || 0) + 1}`, content: "" }];
        updateContent('slides', newSlides);
    };

    const removeSlide = (index) => {
        const newSlides = editedPost.content.slides.filter((_, i) => i !== index);
        updateContent('slides', newSlides);
    };

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
                    <div className="flex-1 mr-4">
                        {isAdmin ? (
                            <input
                                value={editedPost.topic}
                                onChange={(e) => setEditedPost({ ...editedPost, topic: e.target.value })}
                                className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 w-full text-xl font-extrabold focus:outline-none focus:bg-white/20"
                                placeholder="Post Topic"
                            />
                        ) : (
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">{post.day} {post.date}</span>
                                </div>
                                <h2 className="text-xl font-extrabold leading-tight">{post.topic}</h2>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {isAdmin && (
                            <button
                                onClick={handleSave}
                                className="p-2 bg-white text-brand-purple rounded-full hover:bg-brand-lavender transition-colors shadow-lg"
                                title="Save Changes"
                            >
                                <Save size={20} />
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 no-scrollbar">
                    {/* Day & Date (Admin Only Edit) */}
                    {isAdmin && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Day</label>
                                <input
                                    value={editedPost.day}
                                    onChange={(e) => setEditedPost({ ...editedPost, day: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Date</label>
                                <input
                                    value={editedPost.date}
                                    onChange={(e) => setEditedPost({ ...editedPost, date: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                                />
                            </div>
                        </div>
                    )}

                    {/* Format & Pillar */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Format</span>
                            {isAdmin ? (
                                <input
                                    value={editedPost.format}
                                    onChange={(e) => setEditedPost({ ...editedPost, format: e.target.value })}
                                    className="bg-transparent text-sm font-bold text-brand-purple w-full focus:outline-none"
                                />
                            ) : (
                                <p className="text-sm font-bold text-brand-purple flex items-center gap-2">
                                    {post.format.includes('Video') || post.format.includes('Reel') ? <Video size={14} /> : <Type size={14} />}
                                    {post.format}
                                </p>
                            )}
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Brand Pillar</span>
                            {isAdmin ? (
                                <select
                                    value={editedPost.pillar}
                                    onChange={(e) => setEditedPost({ ...editedPost, pillar: e.target.value })}
                                    className="bg-transparent text-sm font-bold text-brand-pink w-full focus:outline-none"
                                >
                                    {pillars.map(p => <option key={p.id} value={p.title}>{p.title}</option>)}
                                </select>
                            ) : (
                                <p className="text-sm font-bold text-brand-pink line-clamp-1">{post.pillar}</p>
                            )}
                        </div>
                    </div>

                    {/* Carousel Slots */}
                    <section>
                        <h3 className="flex items-center justify-between text-sm font-bold text-slate-800 mb-4 uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <Send size={16} className="text-brand-purple" />
                                Slide Breakdown
                            </div>
                            {isAdmin && (
                                <button onClick={addSlide} className="p-1 text-brand-purple hover:bg-brand-lavender rounded-full transition-all">
                                    <Plus size={16} />
                                </button>
                            )}
                        </h3>
                        <div className="space-y-3">
                            {(editedPost.content.slides || []).map((slide, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-brand-lavender/30 border border-brand-lavender/50 relative group/slide">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-purple text-white text-[10px] font-bold flex items-center justify-center">
                                        {i + 1}
                                    </span>
                                    <div className="flex-1">
                                        {isAdmin ? (
                                            <input
                                                value={slide.title}
                                                onChange={(e) => {
                                                    const newSlides = [...editedPost.content.slides];
                                                    newSlides[i].title = e.target.value;
                                                    updateContent('slides', newSlides);
                                                }}
                                                className="text-[10px] font-bold text-brand-purple uppercase mb-1 bg-transparent w-full focus:outline-none"
                                            />
                                        ) : (
                                            <p className="text-[10px] font-bold text-brand-purple uppercase mb-0.5">{slide.title}</p>
                                        )}

                                        {isAdmin ? (
                                            <textarea
                                                value={slide.content}
                                                onChange={(e) => updateSlide(i, e.target.value)}
                                                className="text-sm text-slate-700 bg-white/50 rounded-lg p-2 w-full focus:outline-none resize-none"
                                                rows={2}
                                            />
                                        ) : (
                                            <p className="text-sm text-slate-700">{slide.content}</p>
                                        )}
                                    </div>
                                    {isAdmin && (
                                        <button
                                            onClick={() => removeSlide(i)}
                                            className="absolute top-2 right-2 p-1 text-red-300 hover:text-red-500 opacity-0 group-hover/slide:opacity-100 transition-opacity"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Caption */}
                    <section>
                        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-4 uppercase tracking-widest">
                            <MessageSquare size={16} className="text-brand-purple" />
                            Caption & Hook
                        </h3>
                        {isAdmin ? (
                            <div className="space-y-4">
                                <textarea
                                    value={typeof editedPost.content.caption === 'string' ? editedPost.content.caption : editedPost.content.caption.hook}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (typeof editedPost.content.caption === 'string') {
                                            updateContent('caption', val);
                                        } else {
                                            updateContent('caption', { ...editedPost.content.caption, hook: val });
                                        }
                                    }}
                                    className="w-full bg-slate-900 text-brand-pink font-bold p-4 rounded-2xl focus:outline-none resize-none"
                                    placeholder="Hook"
                                    rows={2}
                                />
                                <textarea
                                    value={typeof editedPost.content.caption === 'string' ? "" : editedPost.content.caption.body}
                                    onChange={(e) => {
                                        if (typeof editedPost.content.caption !== 'string') {
                                            updateContent('caption', { ...editedPost.content.caption, body: e.target.value });
                                        }
                                    }}
                                    className="w-full bg-slate-900 text-slate-100 p-4 rounded-2xl focus:outline-none resize-none text-sm"
                                    placeholder="Body"
                                    rows={4}
                                />
                            </div>
                        ) : (
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
                        )}
                    </section>

                    {/* Hashtags */}
                    <section>
                        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-4 uppercase tracking-widest">
                            <Hash size={16} className="text-brand-purple" />
                            Hashtags
                        </h3>
                        {isAdmin ? (
                            <input
                                value={editedPost.content.hashtags.join(', ')}
                                onChange={(e) => updateContent('hashtags', e.target.value.split(',').map(s => s.trim()))}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm focus:outline-none"
                                placeholder="Tag1, Tag2 (no # needed)"
                            />
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {post.content.hashtags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold hover:bg-brand-lavender hover:text-brand-purple transition-colors cursor-default">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Design Notes */}
                    <section className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                        <h3 className="flex items-center gap-2 text-sm font-bold text-amber-800 mb-3 uppercase tracking-widest">
                            <Lightbulb size={16} />
                            Design Notes
                        </h3>
                        {isAdmin ? (
                            <textarea
                                value={editedPost.content.designNotes}
                                onChange={(e) => updateContent('designNotes', e.target.value)}
                                className="w-full bg-transparent text-sm text-amber-900/80 leading-relaxed font-medium focus:outline-none resize-none"
                                rows={2}
                            />
                        ) : (
                            <p className="text-sm text-amber-900/80 leading-relaxed font-medium">
                                {post.content.designNotes}
                            </p>
                        )}
                    </section>
                </div>
            </motion.div>
        </div>
    );
}
