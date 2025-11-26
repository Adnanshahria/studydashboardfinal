import React from 'react';

interface Props {
    isEditing: boolean;
    setIsEditing: (v: boolean) => void;
    setModals: React.Dispatch<React.SetStateAction<any>>;
}

export const SidebarHeader: React.FC<Props> = ({ isEditing, setIsEditing, setModals }) => (
    <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2"><span className="w-1.5 h-4 bg-blue-500 rounded-full"></span> Subjects</h3>
        <div className="flex gap-2">
             <button onClick={() => setIsEditing(!isEditing)} className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all ${isEditing ? 'bg-blue-500 text-white' : 'text-slate-400 hover:bg-white/5'}`}>✏️</button>
             <button onClick={() => setModals((m: any) => ({ ...m, addSub: true }))} className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 font-bold">+</button>
            <button onClick={() => setModals((m: any) => ({ ...m, subConfig: true }))} className="w-8 h-8 text-slate-400 hover:text-blue-600 hover:bg-white/5 rounded-xl">⚙️</button>
        </div>
    </div>
);