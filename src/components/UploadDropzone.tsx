"use client";

import { useState, useCallback } from "react";
import { Upload, FileImage, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MAX_FILE_SIZE } from "@/lib/validators";
import { toast } from "sonner";

interface UploadDropzoneProps {
    onFileSelect: (file: File) => void;
    selectedFile: File | null;
}

export default function UploadDropzone({ onFileSelect, selectedFile }: UploadDropzoneProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const validateAndSelect = useCallback((file: File) => {
        if (!file.type.match(/image\/(png|jpeg|svg\+xml|webp)/)) {
            toast.error("Unsupported file format", {
                description: "Please upload a PNG, JPG, SVG, or WEBP image.",
            });
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            toast.error("File too large", {
                description: "Maximum file size is 10MB.",
            });
            return;
        }

        onFileSelect(file);
        toast.success("Image uploaded successfully!");
    }, [onFileSelect]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) validateAndSelect(file);
    }, [validateAndSelect]);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) validateAndSelect(file);
    }, [validateAndSelect]);

    return (
        <Card
            className={`relative group border-2 border-dashed transition-all duration-300 ${isDragging
                ? "border-red-500 bg-red-50/50 dark:bg-red-500/10"
                : selectedFile
                    ? "border-red-500/50 bg-red-50/10 dark:bg-red-500/5"
                    : "border-slate-200 dark:border-slate-800 hover:border-red-400 hover:bg-slate-50/50 dark:hover:bg-slate-900/50"
                }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="p-8 text-center">
                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    onChange={handleFileInput}
                />
                <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center cursor-pointer"
                >
                    <div className={`mb-4 p-4 rounded-full transition-colors duration-300 ${selectedFile ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" : "bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-500 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 group-hover:text-red-600 dark:group-hover:text-red-400"
                        }`}>
                        {selectedFile ? (
                            <CheckCircle2 className="w-8 h-8" />
                        ) : (
                            <Upload className="w-8 h-8" />
                        )}
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                            {selectedFile ? selectedFile.name : "Choose an image or drag & drop"}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            PNG, JPG, SVG, or WEBP (max. 10MB)
                        </p>
                    </div>

                    {!selectedFile && (
                        <Button variant="outline" className="mt-6 border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-800 dark:hover:text-red-300 pointer-events-none">
                            Select File
                        </Button>
                    )}
                </label>
            </div>

            {selectedFile && (
                <div className="absolute top-4 right-4 animate-in fade-in zoom-in duration-300">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-medium border border-red-200 dark:border-red-900/50">
                        <FileImage className="w-3.5 h-3.5" />
                        Ready
                    </div>
                </div>
            )}
        </Card>
    );
}
