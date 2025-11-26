import React from 'react';

export const GuideIntro = () => (
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-500/20">
        <h4 className="text-sm font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2">স্বাগতম!</h4>
        <p className="text-sm leading-relaxed">
            <strong className="text-slate-900 dark:text-white">Master Your Potential</strong> হলো আপনার পার্সোনাল স্টাডি ট্র্যাকার। এটি শুধু সিলেবাস শেষ করার জন্য নয়, বরং প্রতিটি চ্যাপ্টার কতটা দক্ষতার সাথে শেষ করেছেন তা ট্র্যাক করার জন্য তৈরি।
        </p>
    </div>
);

export const GuideSteps = () => (
    <div className="space-y-3">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-white/10 pb-1">🚀 নতুন ইউজারদের জন্য (Getting Started)</h4>
        <div className="text-xs space-y-3 text-slate-600 dark:text-slate-300">
            {[
                { title: "অ্যাকাউন্ট তৈরি করুন:", text: 'প্রথমেই "Sign In" এ ক্লিক করে "Create Account" ট্যাবে যান এবং একটি ইউজার নেম ও পাসওয়ার্ড দিয়ে একাউন্ট খুলুন।' },
                { title: "সিলেবাস সেটআপ:", text: 'বাম পাশের সাইডবারে আপনার প্রয়োজনীয় সাবজেক্টগুলো আছে কিনা দেখুন। নতুন সাবজেক্ট লাগলে + বাটনে ক্লিক করুন।' },
                { title: "ওয়েট (Weight) কনফিগারেশন:", text: 'ড্যাশবোর্ডের উপরে "Weighted Progress" কার্ডে ⚙️ আইকনে ক্লিক করুন। এখানে ঠিক করুন কোন কাজের গুরুত্ব কত পার্সেন্ট।' },
                { title: "ট্র্যাকিং শুরু করুন:", text: 'ডান পাশের টেবিলে চ্যাপ্টারের নামের পাশে ছোট বক্সগুলোতে ক্লিক করে আপনার প্রোগ্রেস মার্ক করুন।' }
            ].map((step, i) => (
                <div key={i} className="flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-[10px]">{i + 1}</span>
                    <div><strong className="text-slate-900 dark:text-white">{step.title}</strong><p>{step.text}</p></div>
                </div>
            ))}
        </div>
    </div>
);

export const GuideLegend = () => (
    <div className="space-y-3">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-white/10 pb-1">১. ট্র্যাকিং সিস্টেম (কালার কোড)</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
                { icon: '✓', bg: 'bg-emerald-500', title: 'সম্পন্ন (Done)', desc: 'চ্যাপ্টারটি ১০০% শেষ।' },
                { icon: '✕', bg: 'bg-rose-500', title: 'বাদ (Skip)', desc: 'এই টপিক পড়বেন না (০%)।' }
            ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-white/5 p-3 rounded-xl border border-slate-200 dark:border-white/10 flex items-center gap-3 shadow-sm">
                    <span className={`w-8 h-6 rounded ${item.bg} text-white flex items-center justify-center text-xs font-bold`}>{item.icon}</span>
                    <div className="flex flex-col"><span className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</span><span className="text-[10px] text-slate-500">{item.desc}</span></div>
                </div>
            ))}
             <div className="bg-white dark:bg-white/5 p-3 rounded-xl border border-slate-200 dark:border-white/10 flex items-center gap-3 col-span-1 sm:col-span-2 shadow-sm">
                <div className="w-16 h-4 bg-slate-200 dark:bg-slate-700 rounded overflow-hidden relative border border-slate-300 dark:border-slate-600"><div className="absolute top-0 left-0 h-full w-[60%] bg-sky-500"></div></div>
                <div className="flex flex-col"><span className="text-xs font-bold text-slate-900 dark:text-white">আংশিক অগ্রগতি (Progress)</span><span className="text-[10px] text-slate-500">বক্সে বারবার ক্লিক করলে ২০%, ৪০%, ৬০%... এভাবে বাড়বে।</span></div>
            </div>
        </div>
    </div>
);