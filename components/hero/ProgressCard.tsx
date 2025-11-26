import React from 'react';
import { CompositeData } from '../../types';

interface Props {
    compositeData: CompositeData;
    isEditing: boolean;
    onToggleEdit: () => void;
    children?: React.ReactNode; 
}

export const ProgressCard: React.FC<Props> = ({ compositeData, isEditing, onToggleEdit, children }) => {
    return (
        <div className="glass-card md:col-span-2 relative overflow-visible group p-6 rounded-3xl bg-white/40 dark:bg-slate-800/40">
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">Weighted Progress</h2>
                        <div className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 drop-shadow-sm">
                            {compositeData.composite.toFixed(1)}%
                        </div>
                    </div>
                    <button 
                        onClick={onToggleEdit} 
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-blue-500 hover:text-white transition-all shadow-sm border border-white/20 z-20"
                    >
                        {isEditing ? '✕' : '⚙️'}
                    </button>
                </div>
                <div className="w-full h-6 bg-slate-200/50 dark:bg-slate-900/50 rounded-full overflow-hidden mb-6 border border-white/50 dark:border-white/5 shadow-inner relative">
                    <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transition-all duration-1000 relative shadow-[0_0_15px_rgba(99,102,241,0.5)]" style={{ width: `${Math.max(compositeData.composite, 1.5)}%` }}>
                        <div className="absolute inset-x-0 top-0 h-[50%] bg-white/30 rounded-t-full"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};
