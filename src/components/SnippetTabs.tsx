"use client";

import { useState } from "react";
import { Check, Copy, Code2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { generateHtmlSnippets, generateNextJsSnippets } from "@/lib/generate/snippets";
import { Settings } from "@/lib/validators";
import { toast } from "sonner";

interface SnippetTabsProps {
    settings: Settings;
}

export default function SnippetTabs({ settings }: SnippetTabsProps) {
    const [copied, setCopied] = useState<string | null>(null);

    const htmlCode = generateHtmlSnippets(settings);
    const nextJsCode = generateNextJsSnippets(settings);

    const handleCopy = (code: string, id: string) => {
        navigator.clipboard.writeText(code);
        setCopied(id);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 uppercase tracking-wider">
                <Code2 className="w-4 h-4 text-red-500" />
                Step 3: Implement
            </h3>
            <Tabs defaultValue="html" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-100 dark:bg-slate-800 p-1">
                    <TabsTrigger value="html" className="text-xs font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-red-600 shadow-none">
                        HTML Link Tags
                    </TabsTrigger>
                    <TabsTrigger value="nextjs" className="text-xs font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-red-600 shadow-none">
                        Next.js Metadata
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="html" className="relative mt-2">
                    <pre className="bg-slate-900 dark:bg-black text-slate-100 p-4 rounded-lg text-[10px] leading-relaxed overflow-x-auto font-mono">
                        {htmlCode}
                    </pre>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 text-slate-400 hover:text-white hover:bg-white/10"
                        onClick={() => handleCopy(htmlCode, "html")}
                    >
                        {copied === "html" ? <Check className="w-4 h-4 text-red-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                </TabsContent>

                <TabsContent value="nextjs" className="relative mt-2">
                    <pre className="bg-slate-900 dark:bg-black text-slate-100 p-4 rounded-lg text-[10px] leading-relaxed overflow-x-auto font-mono">
                        {nextJsCode}
                    </pre>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 text-slate-400 hover:text-white hover:bg-white/10"
                        onClick={() => handleCopy(nextJsCode, "nextjs")}
                    >
                        {copied === "nextjs" ? <Check className="w-4 h-4 text-red-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                </TabsContent>
            </Tabs>
        </div>
    );
}
