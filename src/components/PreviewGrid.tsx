"use client";

import { useEffect, useState } from "react";
import { Settings } from "@/lib/validators";
import { renderIcon } from "@/lib/image/render";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";

interface PreviewGridProps {
    image: HTMLImageElement | null;
    settings: Settings;
}

export default function PreviewGrid({ image, settings }: PreviewGridProps) {
    const [previews, setPreviews] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        if (!image) return;

        const sizes = [16, 32, 64, 180, 192, 512];

        let activeUrls: string[] = [];

        const updatePreviews = async () => {
            const newPreviews: { [key: number]: string } = {};
            for (const size of sizes) {
                const blob = await renderIcon(image, size, settings);
                newPreviews[size] = URL.createObjectURL(blob);
            }
            activeUrls = Object.values(newPreviews);
            setPreviews(newPreviews);
        };

        updatePreviews();

        // Cleanup URLs
        return () => {
            activeUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [image, settings]);

    if (!image) {
        return (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 rounded-xl bg-card dark:border-slate-800 text-slate-400">
                <p className="text-sm font-medium">Upload an image to see live previews</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Browser Tab Mock */}
            <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
                <div className="bg-slate-100 dark:bg-slate-900 px-3 py-2 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    </div>
                    <div className="flex-1 flex items-center bg-white dark:bg-slate-950 rounded-md px-3 py-1 gap-2 shadow-sm border border-slate-200 dark:border-slate-800 ml-4 max-w-xs">
                        {previews[16] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={previews[16]} alt="16x16 Favicon" className="w-4 h-4" />
                        ) : (
                            <Globe className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                        )}
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate">{settings.appName}</span>
                    </div>
                </div>
                <div className="h-12 bg-white dark:bg-slate-950" />
            </Card>

            {/* Preview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                    { size: 512, label: "512x512" },
                    { size: 192, label: "192x192" },
                    { size: 180, label: "Apple Icon" },
                    { size: 64, label: "64x64" },
                    { size: 32, label: "32x32" },
                    { size: 16, label: "16x16" },
                ].map((item) => (
                    <Card key={item.size} className="flex flex-col items-center justify-center p-4 border-slate-100 dark:border-slate-800 hover:border-red-200 dark:hover:border-red-900/50 transition-colors">
                        <div className={`relative mb-3 flex items-center justify-center rounded-lg overflow-hidden ${!previews[item.size] ? "border-2 border-dashed border-slate-200 dark:border-slate-700 bg-transparent" : "bg-slate-50 dark:bg-slate-900/50"} ${item.size > 100 ? "p-4" : "p-2"}`}>
                            {previews[item.size] ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={previews[item.size]}
                                    alt={item.label}
                                    className="shadow-sm max-w-full max-h-full object-contain"
                                    style={{ width: item.size > 64 ? 64 : item.size, height: item.size > 64 ? 64 : item.size }}
                                />
                            ) : (
                                <div className="text-slate-400 dark:text-slate-600 flex items-center justify-center text-xs text-center" style={{ width: 48, height: 48 }}>
                                    <span className="sr-only">No preview</span>
                                </div>
                            )}
                        </div>
                        <Badge variant="outline" className="text-[10px] font-mono py-0">{item.label}</Badge>
                    </Card>
                ))}
            </div>
        </div>
    );
}
