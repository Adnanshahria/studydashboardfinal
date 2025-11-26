import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { GuideIntro, GuideSteps, GuideLegend } from './GuideContent';

interface AppGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AppGuideModal: React.FC<AppGuideModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="অ্যাপ ইউজার গাইড (App Guide)">
            <div className="flex flex-col gap-6 text-slate-700 dark:text-slate-300 font-sans">
                <GuideIntro />
                <GuideSteps />
                <GuideLegend />

                <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-white/10 pb-1">২. কাস্টমাইজেশন টুলস</h4>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                        <div className="flex gap-2 items-start"><span className="font-bold text-blue-500 min-w-[80px]">সাবজেক্ট:</span><span>সাইডবারের <span className="font-bold">+</span> বাটনে নতুন সাবজেক্ট এড করুন।</span></div>
                        <div className="flex gap-2 items-start"><span className="font-bold text-blue-500 min-w-[80px]">কলাম:</span><span>টেবিলের উপরে <span className="font-bold">✏️</span> আইকনে ক্লিক করে "Edit Mode" অন করুন।</span></div>
                        <div className="flex gap-2 items-start"><span className="font-bold text-blue-500 min-w-[80px]">নোটস:</span><span>বক্সের কোণায় থাকা ছোট <span className="font-bold">+</span> আইকনে ক্লিক করে নোট সেভ করুন।</span></div>
                    </div>
                </div>

                 <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-white/10 pb-1">৩. এক্সট্রা ফিচার</h4>
                    <ul className="text-xs space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-400">
                        <li><strong>Print Mode:</strong> "Print View" বাটনে চাপ দিলে একটি ক্লিন PDF ভার্সন জেনারেট হবে।</li>
                        <li><strong>Exam Countdown:</strong> পরীক্ষার ডেট সেট করতে টাইমারের উপরে <span className="inline-block px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-[10px]">⚙️</span> আইকনে ক্লিক করুন।</li>
                        <li><strong>Data Sync:</strong> অটোমেটিক সেভ হয়। লগআউট করার আগে "Online" স্ট্যাটাস দেখে নিন।</li>
                    </ul>
                </div>

                <div className="pt-2"><Button onClick={onClose} className="w-full py-3 shadow-lg shadow-blue-500/20 font-bold">ধন্যবাদ, শুরু করা যাক!</Button></div>
            </div>
        </Modal>
    );
};