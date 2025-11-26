
import React, { useState } from 'react';
import { CompositeData } from '../../types';

interface Props {
    compositeData: CompositeData;
    isEditing: boolean;
    onToggleEdit: () => void;
    children?: React.ReactNode; 
}

export const ProgressCard: React.FC<Props> = ({ compositeData, isEditing, onToggleEdit, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="glass-card relative overflow-hidden group p-5 rounded-3xl transition-all duration-300">
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">Weighted Progress</h2>
                        <div className="text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 drop-shadow-sm">
                            {compositeData.composite.toFixed(1)}%
                        </div>
                    </div>
                    {/* Settings Button - Only visible when expanded or we can keep it always */}
                    {isExpanded && (
                        <button 
                            onClick={onToggleEdit} 
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-blue-500 hover:text-white transition-all shadow-sm border border-white/20"
                            title="Configure Weights"
                        >
                            {isEditing ? '✕' : '⚙️'}
                        </button>
                    )}
                </div>

                <div className="w-full h-8 bg-slate-200/50 dark:bg-slate-900/50 rounded-full overflow-hidden mb-4 border border-white/50 dark:border-white/5 shadow-inner relative">
                    <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transition-all duration-1000 relative shadow-[0_0_20px_rgba(99,102,241,0.6)]" style={{ width: `${Math.max(compositeData.composite, 2)}%` }}>
                        <div className="absolute inset-x-0 top-0 h-[50%] bg-white/30 rounded-t-full"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>
                </div>
                
                {/* Collapsible Content */}
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    {children}
                </div>

                {/* Expand/Collapse Control */}
                <div className="flex justify-center mt-2">
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)} 
                        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-blue-500 hover:text-white text-slate-500 dark:text-slate-400 text-xs font-bold transition-all border border-slate-200 dark:border-white/10 group/btn"
                    >
                         {isExpanded ? (
                             <>
                                <span>Collapse Details</span>
                                <span className="text-sm group-hover/btn:-translate-y-0.5 transition-transform">▲</span>
                             </>
                         ) : (
                             <>
                                <span>View Breakdown</span>
                                <span className="text-sm group-hover/btn:translate-y-0.5 transition-transform">▼</span>
                             </>
                         )}
                    </button>
                </div>
            </div>
        </div>
    );
};