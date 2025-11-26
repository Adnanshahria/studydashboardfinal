
import React from 'react';
import { GuideSectionCard } from './GuideSectionCard';

export const GuideChangelog = () => (
    <GuideSectionCard title="🛠️ আপডেট লগ (Update Logs)" icon="📢">
        <div className="flex flex-col gap-3">
             {/* Newest Entry */}
             <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/10">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">v38.3.2 - Dev UI</span>
                    <span className="text-[10px] text-blue-500 border border-blue-200 dark:border-blue-900 px-1.5 rounded bg-blue-50 dark:bg-blue-900/20">Latest</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 list-disc pl-4">
                    <li><strong>Dev Info:</strong> Redesigned Developer Info with Neon Glow effects.</li>
                    <li><strong>Branding:</strong> Enhanced header card effect and inline status dot.</li>
                </ul>
            </div>

             {/* Previous Entries */}
             <div className="p-3 rounded-lg opacity-80 border border-slate-200 dark:border-white/5">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">v38.3.1 - Header UI</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 list-disc pl-4">
                    <li><strong>Card Effect:</strong> Header branding is now wrapped in a glass card style.</li>
                    <li><strong>Status Indicator:</strong> Online/Offline dot moved inline with the title.</li>
                </ul>
            </div>

             <div className="p-3 rounded-lg opacity-60 border border-slate-200 dark:border-white/5">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">v38.3.0 - Minimalist</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 list-disc pl-4">
                    <li><strong>Minimalist Header:</strong> Removed "Prime" badges and redundant Sign In buttons.</li>
                    <li><strong>Status Dot:</strong> Replaced status text with a clean indicator.</li>
                </ul>
            </div>
        </div>
    </GuideSectionCard>
);