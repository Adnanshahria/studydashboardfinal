import React from 'react';
import { calculateProgress } from '../../utils/calculations';
import { SubjectData, UserData, UserSettings } from '../../types';

interface Props {
    subKey: string;
    data: SubjectData;
    isActive: boolean;
    isEditing: boolean;
    userData: UserData;
    settings: UserSettings;
    onChangeSubject: (key: string) => void;
    onRename: () => void;
    onDelete: () => void;
}

export const SubjectItem: React.FC<Props> = ({ subKey, data, isActive, isEditing, userData, settings, onChangeSubject, onRename, onDelete }) => {
    const items = settings.subjectConfigs?.[subKey] || settings.trackableItems;
    const progress = calculateProgress(subKey, items.map(i => i.key), userData, settings.subjectProgressWeights, items, settings.syllabus);
    const displayName = settings.customNames?.[subKey] || data.name;

    let styles = { bar: 'bg-indigo-500', border: 'border-transparent', bg: 'bg-transparent', text: 'text-slate-600 dark:text-slate-400', icon: 'bg-slate-100 dark:bg-white/5' };
    if (data.color === 'emerald') { styles.bar = 'bg-emerald-500'; if (isActive) { styles.border = 'border-emerald-500/50'; styles.bg = 'bg-emerald-500/10'; styles.text = 'text-emerald-700 dark:text-emerald-300'; } }
    else if (data.color === 'amber') { styles.bar = 'bg-amber-500'; if (isActive) { styles.border = 'border-amber-500/50'; styles.bg = 'bg-amber-500/10'; styles.text = 'text-amber-700 dark:text-amber-300'; } }
    else if (data.color === 'blue') { styles.bar = 'bg-blue-500'; if (isActive) { styles.border = 'border-blue-500/50'; styles.bg = 'bg-blue-500/10'; styles.text = 'text-blue-700 dark:text-blue-300'; } }
    else if (data.color === 'rose') { styles.bar = 'bg-rose-500'; if (isActive) { styles.border = 'border-rose-500/50'; styles.bg = 'bg-rose-500/10'; styles.text = 'text-rose-700 dark:text-rose-300'; } }
    
    return (
        <div onClick={() => onChangeSubject(subKey)} className={`group flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-colors relative overflow-hidden ${isActive ? `${styles.bg} ${styles.border}` : `hover:bg-white/50 dark:hover:bg-white/5 border-transparent`}`}>
            {isActive && <div className={`absolute left-0 top-0 bottom-0 w-1 ${styles.bar}`}></div>}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-colors ${styles.icon}`}>{data.icon}</div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm truncate max-w-[120px] ${isActive ? 'text-slate-800 dark:text-white' : styles.text}`}>{displayName}</span>
                        {isEditing && <button onClick={(e) => { e.stopPropagation(); onRename(); }} className="text-[10px] text-slate-400 hover:text-blue-500 p-1">✏️</button>}
                    </div>
                    <span className={`text-xs font-mono font-bold ${styles.text}`}>{progress.overall.toFixed(0)}%</span>
                </div>
                <div className="h-1.5 bg-slate-200 dark:bg-black/20 rounded-full overflow-hidden"><div className={`h-full rounded-full ${styles.bar}`} style={{ width: `${progress.overall}%` }}></div></div>
            </div>
            {isEditing && <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs hover:scale-110 ml-2">✕</button>}
        </div>
    );
};
