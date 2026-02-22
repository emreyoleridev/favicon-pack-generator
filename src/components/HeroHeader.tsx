import { ShieldCheck } from "lucide-react";

export default function HeroHeader() {
    return (
        <div className="relative overflow-hidden py-24 px-6 sm:py-32 lg:px-8 bg-white dark:bg-[#0a0f0d] transition-colors">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-100/50 via-white to-white dark:from-red-900/20 dark:via-[#0a0f0d] dark:to-[#0a0f0d] transition-colors" />
            <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-bold tracking-wide text-red-500 uppercase animate-in fade-in slide-in-from-bottom-3 duration-300">
                    <ShieldCheck className="w-4 h-4" strokeWidth={2.5} />
                    100% Client-Side & Secure
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-7xl animate-in fade-in slide-in-from-bottom-4 duration-300 leading-tight">
                    The Ultimate<br />
                    <span className="text-red-500">Free Favicon Generator</span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-red-50/60 font-medium animate-in fade-in slide-in-from-bottom-5 duration-3000 delay-200">
                    Generate, optimize, and manage your icons directly from your<br className="hidden sm:block" />
                    browser. Zero uploads, zero subscriptions, maximum privacy.
                </p>
            </div>
        </div>
    );
}
