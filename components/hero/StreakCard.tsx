import React from 'react';

export const StreakCard: React.FC<{ streak: number }> = ({ streak }) => (
    <div className="glass-card flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-orange-500/10 to-red-500/5 border-orange-500/20 rounded-3xl p-4 hover:border-orange-500/40 transition-colors">
        <div className="text-center">
            <div className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-2">Current Streak</div>
            <div className="text-5xl font-black text-orange-500 dark:text-orange-400 flex items-center justify-center gap-2 drop-shadow-sm filter">
                <span className="animate-bounce text-4xl filter drop-shadow-md">🔥</span> <span>{streak}</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Consecutive Days</div>
        </div>
    </div>
);
