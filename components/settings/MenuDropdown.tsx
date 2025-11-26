import React from 'react';
import { UserData } from '../../types';

interface MenuDropdownProps {
    userId: string | null;
    userData?: UserData;
    theme: 'dark' | 'light';
    onLogout: () => void;
    onToggleTheme: () => void;
    onOpenGuide: () => void;
    onOpenDevModal: () => void;
    onClose: () => void;
}

export const MenuDropdown: React.FC<MenuDropdownProps> = ({ userId, userData, theme, onLogout, onToggleTheme, onOpenGuide, onOpenDevModal, onClose }) => {
    const MenuItem = ({ onClick, icon, text, subtext, colorClass }: any) => (
        <button onClick={() => { onClick(); onClose(); }} className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-colors text-left group">
            <span className={`p-1.5 rounded-lg ${colorClass} transition-colors`}>{icon}</span>
            {text} {subtext && <span className="text-[10px] opacity-60 ml-1">{subtext}</span>}
        </button>
    );

    const displayName = userData?.username || (userId?.includes('@') ? userId.split('@')[0] : userId || 'Guest User');
    const displayInitial = displayName.charAt(0).toUpperCase();

    return (
        <div className="absolute right-0 mt-3 w-72 glass-panel rounded-2xl shadow-2xl shadow-black/40 overflow-hidden animate-fade-in z-50 border border-slate-200 dark:border-white/10 p-2 flex flex-col gap-1 origin-top-right backdrop-blur-xl">
            <div className="px-4 py-4 bg-slate-50/50 dark:bg-white/5 rounded-xl mb-1 border border-slate-200 dark:border-white/5">
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">{userId ? 'Signed in as' : 'Welcome'}</p>
                <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white font-bold ${userId ? 'bg-gradient-to-br from-blue-500 to-purple-500' : 'bg-slate-400'}`}>
                        {displayInitial}
                    </div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white truncate max-w-[180px]" title={displayName}>{displayName}</p>
                </div>
            </div>
            <MenuItem onClick={onOpenGuide} icon="📖" text="App Guide" subtext="(গাইড)" colorClass="bg-blue-100 dark:bg-blue-500/20 text-blue-600 group-hover:bg-blue-200 dark:group-hover:bg-blue-500/30" />
            <MenuItem onClick={onToggleTheme} icon={theme === 'dark' ? '☀️' : '🌙'} text={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'} colorClass="bg-amber-100 dark:bg-purple-500/20 text-amber-600 dark:text-purple-400 group-hover:bg-amber-200 dark:group-hover:bg-purple-500/30" />
            <MenuItem onClick={onOpenDevModal} icon="👨‍💻" text="Developer Info" colorClass="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-500/30" />
            {userId && (
                <>
                    <div className="h-px bg-slate-200 dark:bg-white/10 my-1 mx-2"></div>
                    <MenuItem onClick={onLogout} icon="🚪" text="Log Out" colorClass="bg-rose-100 dark:bg-rose-500/20 text-rose-600 group-hover:bg-rose-200 dark:group-hover:bg-rose-500/30" />
                </>
            )}
        </div>
    );
};