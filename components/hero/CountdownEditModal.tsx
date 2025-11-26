import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    initialTarget: string;
    initialLabel: string;
    onSave: (target: string, label: string) => void;
}

export const CountdownEditModal: React.FC<Props> = ({ isOpen, onClose, initialTarget, initialLabel, onSave }) => {
    const [tempTarget, setTempTarget] = useState(initialTarget);
    const [tempLabel, setTempLabel] = useState(initialLabel);

    const handleSave = () => {
        onSave(tempTarget, tempLabel);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Countdown Settings">
            <div className="flex flex-col gap-4">
                <input 
                    type="text" 
                    value={tempLabel} 
                    onChange={(e) => setTempLabel(e.target.value)} 
                    className="bg-transparent border border-slate-300 dark:border-white/20 rounded-xl p-3 text-sm dark:text-white" 
                    placeholder="Event Name" 
                />
                <input 
                    type="datetime-local" 
                    value={tempTarget.substring(0, 16)} 
                    onChange={(e) => setTempTarget(e.target.value)} 
                    className="bg-transparent border border-slate-300 dark:border-white/20 rounded-xl p-3 text-sm dark:text-white" 
                />
                <div className="flex justify-end gap-3">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </div>
            </div>
        </Modal>
    );
};