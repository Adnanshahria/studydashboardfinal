
import { UserSettings, Chapter } from '../../types';

export const useChapterActions = (settings: UserSettings, handleSettingsUpdate: (s: UserSettings) => void) => {
    
    // Removed window.confirm logic. Confirmation is now handled by the UI (Modal).
    const onDeleteChapter = (subjectKey: string, chapterId: number | string) => {
        const currentSub = settings.syllabus[subjectKey];
        if (!currentSub) return;

        const newSyllabus = { ...settings.syllabus };
        newSyllabus[subjectKey] = {
            ...newSyllabus[subjectKey],
            chapters: newSyllabus[subjectKey].chapters.filter((c: Chapter) => c.id !== chapterId)
        };
        handleSettingsUpdate({ ...settings, syllabus: newSyllabus });
    };

    const handleRenameChapter = (subjectKey: string, chapterId: number | string, newName: string) => {
        const currentSub = settings.syllabus[subjectKey];
        if (!currentSub) return;

        const chapterIndex = currentSub.chapters.findIndex((c: Chapter) => c.id === chapterId);

        if (chapterIndex !== -1) {
            const newChapters = [...currentSub.chapters];
            newChapters[chapterIndex] = { ...newChapters[chapterIndex], name: newName };
            const newSyllabus = { ...settings.syllabus };
            newSyllabus[subjectKey] = { ...currentSub, chapters: newChapters };
            handleSettingsUpdate({ ...settings, syllabus: newSyllabus });
        }
    };

    const onAddChapter = (subjectKey: string, paper: 1 | 2, name: string) => {
        const currentSub = settings.syllabus[subjectKey];
        if (!currentSub) return;
        const newChapter: Chapter = { id: `custom_${Date.now()}_${performance.now()}_${Math.random()}`, name, paper };
        const newSyllabus = { ...settings.syllabus };
        newSyllabus[subjectKey] = {
            ...currentSub,
            chapters: [...currentSub.chapters, newChapter]
        };
        handleSettingsUpdate({ ...settings, syllabus: newSyllabus });
    };

    return { onDeleteChapter, handleRenameChapter, onAddChapter };
};
