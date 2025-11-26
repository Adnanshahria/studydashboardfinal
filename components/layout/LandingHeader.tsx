import React from 'react';
import { Button } from '../ui/Button';
import { SettingsMenu } from '../settings/SettingsMenu';

export const LandingHeader: React.FC<{ onDev: () => void, onLogin: () => void, onGuide: () => void, theme: any, onToggleTheme: () => void }> = ({ onDev, onLogin, onGuide, theme, onToggleTheme }) => (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-white/5 transition-colors duration-300 no-print">
        <div className="glass-card border-none rounded-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
             <div className="max-w-screen-xl mx-auto flex justify-between items-center py-3 px-4">
                <div className="flex items-center gap-3">
                    <div onClick={onDev} className="w-9 h-9 rounded-xl bg-black dark:bg-white flex items-center justify-center text-white dark:text-slate-900 font-black shadow-lg cursor-pointer hover:scale-105 transition-transform">AS</div>
                    <h1 className="text-lg font-bold tracking-tight text-slate-800 dark:text-slate-100">Master Your Potential <span className="text-[10px] align-top font-normal text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full border border-slate-200 bg-slate-100 dark:bg-white/5 animate-pulse">Prime</span></h1>
                </div>
                <div className="flex items-center gap-3">
                     <Button onClick={onLogin} className="px-4 py-1.5 text-xs animate-pulse">Sign In</Button>
                     <SettingsMenu userId={null} onLogout={() => {}} onToggleTheme={onToggleTheme} theme={theme} onOpenGuide={onGuide} onOpenDevModal={onDev} />
                </div>
             </div>
        </div>
    </header>
);
