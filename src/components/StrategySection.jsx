import React from 'react';
import { motion } from 'framer-motion';
import { Target, PieChart, Sparkles, X, CheckCircle2 } from 'lucide-react';

export default function StrategySection({ strategy, onClose }) {
    return (
        <div className="space-y-12 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Social Blueprint</h2>
                    <p className="text-slate-500 font-medium">Strategic foundation for @theoyedolayo</p>
                </div>
                <button
                    onClick={onClose}
                    className="p-3 rounded-full hover:bg-slate-200 transition-colors text-slate-500"
                >
                    <X size={24} />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Brand Pillars */}
                <div className="glass-morphism rounded-[2.5rem] p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-brand-purple rounded-2xl flex items-center justify-center text-white">
                            <Target size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Brand Pillars</h3>
                    </div>
                    <div className="space-y-4">
                        {strategy.pillars.map((pillar, i) => (
                            <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all">
                                <span className="font-bold text-slate-700">{pillar.title}</span>
                                <span className="text-sm font-black text-brand-pink bg-brand-pink/10 px-3 py-1 rounded-full">
                                    {pillar.weight * 100}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Mix */}
                <div className="glass-morphism rounded-[2.5rem] p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-brand-pink rounded-2xl flex items-center justify-center text-white">
                            <PieChart size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Content Mix</h3>
                    </div>
                    <div className="space-y-4">
                        {strategy.mix.map((item, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-sm font-bold text-slate-600">
                                    <span>{item.label}</span>
                                    <span>{item.percentage}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.percentage}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="h-full brand-gradient"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Key Principles */}
            <div className="glass-morphism rounded-[2.5rem] p-10 bg-slate-900 text-white relative overflow-hidden">
                <Sparkles className="absolute top-10 right-10 text-brand-pink opacity-20" size={120} />
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <CheckCircle2 className="text-brand-pink" />
                        Audit Principles
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {strategy.principles.map((principle, i) => (
                            <div key={i} className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 hover:border-brand-pink/50 transition-colors">
                                <p className="text-sm font-medium leading-relaxed opacity-90">{principle}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
