"use client";

import Link from "next/link";
import { Github, Coffee, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Footer() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    return (
        <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 relative">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
                <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                    Built with ❤️ by <span className="text-slate-900 dark:text-white font-bold">Emre Yoleri</span>
                </p>

                <div className="flex items-center gap-4">
                    <Link href="https://github.com/emreyoleridev" target="_blank" rel="noreferrer">
                        <Button variant="outline" className="rounded-full cursor-pointer shadow-sm hover:bg-slate-50 dark:hover:bg-slate-900 border-slate-200 dark:border-slate-800 h-9 px-4 text-[13px]">
                            <Github className="w-4 h-4 mr-2" />
                            GitHub
                        </Button>
                    </Link>
                    <Link href="https://buymeacoffee.com/emreyoleridev" target="_blank" rel="noreferrer">
                        <Button variant="outline" className="rounded-full cursor-pointer shadow-sm border-[#fcd34d] bg-[#fef3c7] hover:bg-[#fde68a] text-[#92400e] dark:bg-[#451a03]/40 dark:border-[#78350f] dark:text-[#fcd34d] dark:hover:bg-[#451a03]/60 h-9 px-4 text-[13px]">
                            <Coffee className="w-4 h-4 mr-2" />
                            Buy Me a Coffee
                        </Button>
                    </Link>
                </div>

                {mounted && (
                    <Button
                        variant="outline"
                        size="icon"
                        className="fixed bottom-6 right-6 z-50 rounded-full w-10 h-10 shadow-lg border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        {theme === "dark" ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                )}
            </div>
        </footer>
    );
}
