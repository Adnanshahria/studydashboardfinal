import React from 'react';

interface Props {
    countdown: { d: number; h: number; m: number } | null;
    label: string;
    onEdit: () => void;
}

const Unit = ({ val, label }: { val: number; label: string }) => (
    <div className="flex flex-col items-center bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl px-3 py-3 min-w-[65px] shadow-lg shadow-black/5">
        <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-700 to-blue-600 dark:from-white dark:to-blue-300 leading-none mb-1">
            {/* UI FIX: Safeguard against NaN display */}
            {isNaN(val) ? '00' : val.toString().padStart(2, '0')}
        </div>
        <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">{label}</div>
    </div>
);

export const CountdownCard: React.FC<Props> = ({ countdown, label, onEdit }) => {
    return (
        <div className="glass-card flex-1 p-5 flex flex-col justify-center items-center relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border-blue-200 dark:border-white/10 group/timer hover:border-blue-400/30 transition-colors">
             <button onClick={onEdit} className="absolute top-3 right-3 opacity-0 group-hover/timer:opacity-100 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-slate-600 dark:text-slate-200 transition-all backdrop-blur-md">⚙️</button>
             <div className="relative z-10 text-center w-full">
                <div className="text-[10px] font-bold text-blue-600 dark:text-blue-300 uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                    <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-ping"></span>
                    {label}
                </div>
                <div className="flex justify-center gap-2 relative z-10 w-full">
                    {countdown ? (
                        <>
                            <Unit val={countdown.d} label="Days" />
                            <div className="py-2 text-2xl font-light text-slate-300">:</div>
                            <Unit val={countdown.h} label="Hrs" />
                            <div className="py-2 text-2xl font-light text-slate-300">:</div>
                            <Unit val={countdown.m} label="Mins" />
                        </>
                    ) : <div className="text-xl font-bold text-rose-500 animate-pulse">Target Reached!</div>}
                </div>
            </div>
        </div>
    );
};