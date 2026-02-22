import Link from "next/link";
import { Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 max-w-[1400px] mx-auto w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-8 mx-auto">
                <div className="flex flex-1 items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="bg-[#ef4444] p-1.5 rounded-lg">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight flex items-center">
                            FaviconPack<span className="font-medium text-[#ef4444]">Generator</span>
                        </span>
                    </Link>
                    <div className="flex items-center justify-end space-x-4">
                        <Link href="https://github.com/emreyoleridev/favicon-pack-generator" target="_blank" rel="noreferrer">
                            <Button variant="ghost" size="icon" className="cursor-pointer">
                                <Github className="h-5 w-5 opacity-75 hover:opacity-100" />
                                <span className="sr-only">GitHub</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
