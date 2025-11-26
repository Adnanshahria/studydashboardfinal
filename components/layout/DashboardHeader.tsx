import React from 'react';
import { SettingsMenu } from '../settings/SettingsMenu';
import { UserData } from '../../types';

export const DashboardHeader: React.FC<{ onDev: () => void, status: string, userId: string, userData: UserData, onLogout: () => void, onToggleTheme: () => void, theme: any, onGuide: () => void }> = ({ onDev, status, userId, userData, onLogout, onToggleTheme, theme, onGuide }) => (
    <div className="flex flex-row justify-between items-center mb-6 no-print gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
            <div onClick={onDev} className="w-10 h-10 shrink-0 rounded-xl bg-black dark:bg-white flex items-center justify-center text-white dark:text-slate-900 font-black shadow-lg cursor-pointer hover:scale-105 transition-transform">AS</div>
            <div className="flex flex-col justify-center">
                <h1 className="text-lg md:text-xl font-bold tracking-tight text-slate-800 dark:text-white leading-tight truncate flex items-center flex-wrap gap-2">
                    Master Your Potential <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)] animate-pulse bg-blue-500/5">Prime</span>
                </h1>
                <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider mt-0.5 ${status === 'connected' ? 'text-emerald-500' : 'text-slate-400'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${status === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></div>
                    {status === 'connected' ? 'Online Sync Active' : 'Offline Mode'}
                </div>
            </div>
        </div>
        <div className="flex items-center gap-4 shrink-0">
            <SettingsMenu userId={userId} userData={userData} onLogout={onLogout} onToggleTheme={onToggleTheme} theme={theme} onOpenGuide={onGuide} onOpenDevModal={onDev} />
        </div>
    </div>
);