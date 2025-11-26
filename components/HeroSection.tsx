import React from 'react';
import { CompositeData, UserSettings } from '../types';
import { ProgressCard } from './hero/ProgressCard';
import { StreakCard } from './hero/StreakCard';
import { CountdownCard } from './hero/CountdownCard';
import { WeightsEditor } from './hero/WeightsEditor';
import { CountdownEditModal } from './hero/CountdownEditModal';
import { useCountdown } from '../hooks/useCountdown';
import { useHeroLogic } from '../hooks/ui/useHeroLogic';

interface HeroSectionProps {
    compositeData: CompositeData;
    streak: number;
    settings: UserSettings;
    onUpdateWeights: (newWeights: any, subjectKey?: string) => void;
    onUpdateCountdown: (target: string, label: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ compositeData, streak, settings, onUpdateWeights, onUpdateCountdown }) => {
    const countdown = useCountdown(settings.countdownTarget);
    const logic = useHeroLogic(settings, onUpdateWeights);

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 print:hidden">
            <ProgressCard compositeData={compositeData} isEditing={logic.isEditingWeights} onToggleEdit={() => logic.setIsEditingWeights(!logic.isEditingWeights)}>
                <WeightsEditor 
                    settings={settings}
                    selectedSubject={logic.selectedSubject} setSelectedSubject={logic.setSelectedSubject}
                    weightTotal={logic.weightTotal} tempWeights={logic.tempWeights}
                    handleWeightChange={logic.handleWeightChange} saveWeights={logic.saveWeights}
                    currentConfigItems={logic.currentConfigItems} compositeData={compositeData}
                    isEditing={logic.isEditingWeights}
                />
            </ProgressCard>
            <div className="flex flex-col gap-4">
                <StreakCard streak={streak} />
                <CountdownCard countdown={countdown} label={settings.countdownLabel || 'Time Remaining'} onEdit={() => logic.setIsEditingCountdown(true)} />
            </div>
            <CountdownEditModal 
                isOpen={logic.isEditingCountdown} 
                onClose={() => logic.setIsEditingCountdown(false)} 
                initialTarget={settings.countdownTarget || '2025-12-12T00:00'} 
                initialLabel={settings.countdownLabel || 'Time Remaining'} 
                onSave={onUpdateCountdown} 
            />
        </section>
    );
};