"use client";

import { useState, useEffect } from "react";
import HeroHeader from "@/components/HeroHeader";
import UploadDropzone from "@/components/UploadDropzone";
import SettingsPanel from "@/components/SettingsPanel";
import PreviewGrid from "@/components/PreviewGrid";
import OutputPanel from "@/components/OutputPanel";
import SnippetTabs from "@/components/SnippetTabs";
import { DEFAULT_SETTINGS, Settings } from "@/lib/validators";
import { loadImage } from "@/lib/image/loadImage";
import { generateFaviconPack, GeneratedIcon } from "@/lib/generate/faviconPack";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function FaviconGeneratorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [icons, setIcons] = useState<GeneratedIcon[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Load image when file changes
  useEffect(() => {
    if (file) {
      loadImage(file).then(setImage).catch(err => {
        toast.error("Failed to load image");
        console.error(err);
      });
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setImage(null);
    }
  }, [file]);

  // Handle generation
  useEffect(() => {
    if (image) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsGenerating(true);
      generateFaviconPack(image, settings)
        .then(setIcons)
        .catch(err => {
          toast.error("Generation failed");
          console.error(err);
        })
        .finally(() => setIsGenerating(false));
    } else {
      setIcons([]);
    }
  }, [image, settings]);

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    toast.info("Settings reset to defaults");
  };

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 flex flex-col transition-colors">
      <HeroHeader />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Upload & Settings */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Step 1: Upload</h2>
              </div>
              <UploadDropzone onFileSelect={setFile} selectedFile={file} />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Step 2: Customize</h2>
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  Reset Defaults
                </button>
              </div>
              <SettingsPanel settings={settings} onChange={setSettings} />
            </div>

            {icons.length > 0 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                <SnippetTabs settings={settings} />
              </div>
            )}
          </div>

          {/* Right Column: Preview & Output */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Preview</h2>
              <PreviewGrid image={image} settings={settings} />
            </div>

            {icons.length > 0 && (
              <div className="space-y-8 animate-in fade-in zoom-in duration-300">
                <Separator />
                <OutputPanel icons={icons} loading={isGenerating} />
              </div>
            )}
          </div>

        </div>
      </div>

      <Features />
      <Footer />
    </main>
  );
}
