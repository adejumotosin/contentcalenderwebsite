import React from 'react';
import { motion } from 'framer-motion';

export default function WeekSelector({ weeks, activeWeek, onSelect }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">Content Schedule</h2>
                <div className="text-sm text-slate-500 font-medium">
                    {weeks.find(w => w.id === activeWeek)?.dates}
                </div>
            </div>

            <div className="flex gap-2 p-1 bg-slate-200/50 rounded-2xl w-full sm:w-fit overflow-x-auto no-scrollbar">
                {weeks.map((week) => (
                    <button
                        key={week.id}
                        onClick={() => onSelect(week.id)}
                        className={`relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${activeWeek === week.id
                                ? 'text-white'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                    >
                        {activeWeek === week.id && (
                            <motion.div
                                layoutId="week-pill"
                                className="absolute inset-0 brand-gradient rounded-xl shadow-md"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">Week {week.id}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
