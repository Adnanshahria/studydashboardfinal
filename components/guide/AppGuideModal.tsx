import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface AppGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AppGuideModal: React.FC<AppGuideModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="অ্যাপ ইউজার গাইড (App Guide)">
            <div className="flex flex-col gap-6 text-slate-700 dark:text-slate-300 font-sans">
                
                {/* Intro */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-500/20">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2">স্বাগতম!</h4>
                    <p className="text-sm leading-relaxed">
                        <strong className="text-slate-900 dark:text-white">Master Your Potential</strong> হলো আপনার পার্সোনাল স্টাডি ট্র্যাকার। এটি শুধু সিলেবাস শেষ করার জন্য নয়, বরং প্রতিটি চ্যাপ্টার কতটা দক্ষতার সাথে শেষ করেছেন তা ট্র্যাক করার জন্য তৈরি।
                    </p>
                </div>

                {/* Getting Started / New User Guide */}
                <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-white/10 pb-1">🚀 নতুন ইউজারদের জন্য (Getting Started)</h4>
                    <div className="text-xs space-y-3 text-slate-600 dark:text-slate-300">
                        <div className="flex gap-3">
                            <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-[10px]">1</span>
                            <div>
                                <strong className="text-slate-900 dark:text-white">অ্যাকাউন্ট তৈরি করুন:</strong>
                                <p>প্রথমেই "Sign In" এ ক্লিক করে "Create Account" ট্যাবে যান এবং একটি ইউজার নেম ও পাসওয়ার্ড দিয়ে একাউন্ট খুলুন।</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-[10px]">2</span>
                            <div>
                                <strong className="text-slate-900 dark:text-white">সিলেবাস সেটআপ:</strong>
                                <p>বাম পাশের সাইডবারে আপনার প্রয়োজনীয় সাবজেক্টগুলো আছে কিনা দেখুন। নতুন সাবজেক্ট লাগলে <span className="font-bold">+</span> বাটনে ক্লিক করুন।</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-[10px]">3</span>
                            <div>
                                <strong className="text-slate-900 dark:text-white">ওয়েট (Weight) কনফিগারেশন:</strong>
                                <p>ড্যাশবোর্ডের উপরে "Weighted Progress" কার্ডে <span className="inline-block px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-[10px]">⚙️</span> আইকনে ক্লিক করুন। এখানে ঠিক করুন কোন কাজের (যেমন Main Book, Exam) গুরুত্ব কত পার্সেন্ট।</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-[10px]">4</span>
                            <div>
                                <strong className="text-slate-900 dark:text-white">ট্র্যাকিং শুরু করুন:</strong>
                                <p>ডান পাশের টেবিলে চ্যাপ্টারের নামের পাশে ছোট বক্সগুলোতে ক্লিক করে আপনার প্রোগ্রেস মার্ক করুন।</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 1: Tracking System */}
                <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-white/10 pb-1">১. ট্র্যাকিং সিস্টেম (কালার কোড)</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-white dark:bg-white/5 p-3 rounded-xl border border-slate-200 dark:border-white/10 flex items-center gap-3 shadow-sm">
                            <span className="w-8 h-6 rounded bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">✓</span>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-900 dark:text-white">সম্পন্ন (Done)</span>
                                <span className="text-[10px] text-slate-500">চ্যাপ্টারটি ১০০% শেষ।</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-white/5 p-3 rounded-xl border border-slate-200 dark:border-white/10 flex items-center gap-3 shadow-sm">
                            <span className="w-8 h-6 rounded bg-rose-500 text-white flex items-center justify-center text-xs font-bold">✕</span>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-900 dark:text-white">বাদ (Skip)</span>
                                <span className="text-[10px] text-slate-500">এই টপিক পড়বেন না (০%)।</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-white/5 p-3 rounded-xl border border-slate-200 dark:border-white/10 flex items-center gap-3 col-span-1 sm:col-span-2 shadow-sm">
                            <div className="w-16 h-4 bg-slate-200 dark:bg-slate-700 rounded overflow-hidden relative border border-slate-300 dark:border-slate-600">
                                <div className="absolute top-0 left-0 h-full w-[60%] bg-sky-500"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-900 dark:text-white">আংশিক অগ্রগতি (Progress)</span>
                                <span className="text-[10px] text-slate-500">বক্সে বারবার ক্লিক করলে ২০%, ৪০%, ৬০%... এভাবে বাড়বে।</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 3: Customization */}
                <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-white/10 pb-1">২. কাস্টমাইজেশন টুলস</h4>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                        <div className="flex gap-2 items-start">
                            <span className="font-bold text-blue-500 min-w-[80px]">সাবজেক্ট:</span>
                            <span>সাইডবারের <span className="font-bold">+</span> বাটনে নতুন সাবজেক্ট এড করুন। <span className="font-bold">✏️</span> বাটনে ক্লিক করে ডিলিট বা রিনেম করুন।</span>
                        </div>
                        <div className="flex gap-2 items-start">
                            <span className="font-bold text-blue-500 min-w-[80px]">কলাম (Items):</span>
                            <span>টেবিলের উপরে <span className="font-bold">✏️</span> আইকনে ক্লিক করে "Edit Mode" অন করুন। এরপর আপনি কলামের নাম পরিবর্তন বা নতুন কলাম যোগ করতে পারবেন।</span>
                        </div>
                        <div className="flex gap-2 items-start">
                            <span className="font-bold text-blue-500 min-w-[80px]">নোটস:</span>
                            <span>বক্সের কোণায় থাকা ছোট <span className="font-bold">+</span> আইকনে (বা মাউস হভার করলে) ক্লিক করে গুরুত্বপূর্ণ নোট সেভ করে রাখুন।</span>
                        </div>
                    </div>
                </div>

                 {/* Section 4: Extra Features */}
                 <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-white/10 pb-1">৩. এক্সট্রা ফিচার</h4>
                    <ul className="text-xs space-y-2 list-disc pl-4 text-slate-600 dark:text-slate-400">
                        <li><strong>Print Mode:</strong> সিলেবাসের উপরে "Print View" বাটনে চাপ দিলে একটি ক্লিন PDF ভার্সন জেনারেট হবে। (Landscape মোডে প্রিন্ট করার পরামর্শ দেওয়া হলো)</li>
                        <li><strong>Exam Countdown:</strong> পরীক্ষার ডেট সেট করতে টাইমারের উপরে <span className="inline-block px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-[10px]">⚙️</span> আইকনে ক্লিক করুন।</li>
                        <li><strong>Data Sync:</strong> ইন্টারনেট থাকলে ডাটা অটোমেটিক সেভ হবে। লগআউট করার আগে "Online" স্ট্যাটাস দেখে নিন।</li>
                    </ul>
                </div>

                <div className="pt-2">
                    <Button onClick={onClose} className="w-full py-3 shadow-lg shadow-blue-500/20 font-bold">ধন্যবাদ, শুরু করা যাক!</Button>
                </div>
            </div>
        </Modal>
    );
};