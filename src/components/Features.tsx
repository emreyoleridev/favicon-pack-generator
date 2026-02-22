import { Lock, Zap, Heart } from "lucide-react";

export default function Features() {
    return (
        <section className="py-24 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="flex flex-col items-center">
                        <div className="h-14 w-14 bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 rounded-2xl flex items-center justify-center mb-6 border border-red-100 dark:border-red-800">
                            <Lock className="w-6 h-6" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-[17px] font-bold text-slate-900 dark:text-white mb-3">Absolute Privacy</h3>
                        <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-[280px]">
                            Files never leave your device. Everything is processed locally in your browser.
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="h-14 w-14 bg-orange-50 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 rounded-2xl flex items-center justify-center mb-6 border border-orange-100 dark:border-orange-800">
                            <Zap className="w-6 h-6" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-[17px] font-bold text-slate-900 dark:text-white mb-3">Lightning Fast</h3>
                        <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-[280px]">
                            No waiting for servers to process or download. Compress files instantly.
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="h-14 w-14 bg-teal-50 dark:bg-teal-900/30 text-teal-500 dark:text-teal-400 rounded-2xl flex items-center justify-center mb-6 border border-teal-100 dark:border-teal-800">
                            <Heart className="w-6 h-6" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-[17px] font-bold text-slate-900 dark:text-white mb-3">Free Forever</h3>
                        <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-[280px]">
                            No premium tiers, no hidden costs, no watermarks. Every feature is entirely free.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
