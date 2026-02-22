"use client";

import { Download, FileDown, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GeneratedIcon } from "@/lib/generate/faviconPack";
import { createAndDownloadZip } from "@/lib/zip/createZip";
import { saveAs } from "file-saver";

interface OutputPanelProps {
    icons: GeneratedIcon[];
    loading: boolean;
}

export default function OutputPanel({ icons, loading }: OutputPanelProps) {
    const handleDownloadZip = async () => {
        const files = icons.map(icon => ({
            name: icon.name,
            blob: icon.blob
        }));
        await createAndDownloadZip(files, "favicon-pack.zip");
    };

    const handleDownloadOne = (icon: GeneratedIcon) => {
        saveAs(icon.blob, icon.name);
    };

    if (icons.length === 0) return null;

    return (
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 p-4">
                <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100">Generated Files</CardTitle>
                <Button
                    size="sm"
                    onClick={handleDownloadZip}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 text-white shadow-sm"
                >
                    <Archive className="w-4 h-4 mr-2" />
                    Download ZIP
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {icons.map((icon) => (
                        <div key={icon.name} className="flex items-center justify-between p-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-1 overflow-hidden">
                                    {icon.name.endsWith(".webmanifest") ? (
                                        <FileDown className="w-6 h-6 text-red-400" />
                                    ) : (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={icon.url} alt={icon.name} className="max-w-full max-h-full object-contain" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{icon.name}</p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{icon.size}</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                onClick={() => handleDownloadOne(icon)}
                            >
                                <Download className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
