import React from 'react';
import { calculateProgress } from '../utils/calculations';
import { UserData, UserSettings } from '../types';
import { SyllabusHeader } from './syllabus/SyllabusHeader';
import { PaperSection } from './syllabus/PaperSection';
import { SyllabusModals } from './syllabus/SyllabusModals';
import { useSyllabusUI } from '../hooks/ui/useSyllabusUI';

interface SyllabusProps {
    activeSubject: string;
    userData: UserData;
    settings: UserSettings;
    onUpdateStatus: (key: string) => void;
    onUpdateNote: (key: string, text: string) => void;
    onTogglePaper: (key: string) => void;
    onRenameColumn: (subject: string, key: string, newName: string) => void;
    onAddColumn: (subject: string, name: string, color: string) => void;
    onAddChapter: (subject: string, paper: 1 | 2, name: string) => void;
    onDeleteChapter: (subject: string, chapterId: number | string) => void;
    onDeleteColumn: (subject: string, itemKey: string) => void;
    onRenameChapter: (subject: string, chapterId: number | string, newName: string) => void;
}

export const Syllabus: React.FC<SyllabusProps> = ({ activeSubject, userData, settings, ...handlers }) => {
    const ui = useSyllabusUI();
    const subject = settings.syllabus[activeSubject];
    
    if (!subject) return <div className="p-10 text-center text-slate-500">Subject not found.</div>;

    const allItems = settings.subjectConfigs?.[activeSubject] || settings.trackableItems;
    const actions = { ...handlers, ...ui };

    return (
        <div className="flex flex-col gap-6 min-w-0">
            <SyllabusHeader subject={subject} handlePrint={() => window.print()} />
            <div className="flex flex-col gap-6 print-grid">
                {[1, 2].map(paper => {
                    const p = calculateProgress(activeSubject, allItems.map(i => i.key), userData, undefined, allItems, settings.syllabus);
                    return <PaperSection key={paper} paper={paper} activeSubject={activeSubject} userData={userData} settings={settings} allItems={allItems} allChapters={subject.chapters} pVal={paper === 1 ? p.p1 : p.p2} isOpen={settings.syllabusOpenState[`${activeSubject}-p${paper}`] !== false} editMode={ui.editMode} actions={actions} />;
                })}
            </div>
            <SyllabusModals modals={ui.modals} setModals={ui.setModals} handlers={handlers} ui={ui} activeSubject={activeSubject} />
        </div>
    );
};