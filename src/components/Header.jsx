import React from 'react';
import { Calendar, Info, BarChart3, Lock, Unlock, Download } from 'lucide-react';

export default function Header({ onToggleStrategy, isAdmin, onToggleAdmin, onExport }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass-morphism h-16 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 brand-gradient rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Calendar size={24} />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gradient leading-tight">@theoyedolayo</h1>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Content Calendar 2026</p>
                </div>
            </div>

            <nav className="flex items-center gap-2">
                <button
                    onClick={onToggleAdmin}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isAdmin ? 'bg-slate-900 text-white shadow-lg' : 'hover:bg-slate-100 text-slate-600'
                        }`}
                >
                    {isAdmin ? <Unlock size={16} className="text-brand-pink" /> : <Lock size={16} />}
                    <span className="hidden sm:inline">{isAdmin ? 'Admin Mode' : 'Edit Mode'}</span>
                </button>

                {isAdmin && (
                    <button
                        onClick={onExport}
                        className="p-2 rounded-full hover:bg-slate-100 text-brand-purple transition-all"
                        title="Export Data"
                    >
                        <Download size={18} />
                    </button>
                )}

                <div className="w-px h-6 bg-slate-200 mx-2" />

                <button
                    onClick={onToggleStrategy}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition-colors"
                >
                    <BarChart3 size={18} className="text-brand-pink" />
                    <span className="hidden sm:inline">Strategy</span>
                </button>
            </nav>
        </header>
    );
}
