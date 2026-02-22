"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "@/lib/validators";
import { Separator } from "@/components/ui/separator";

interface SettingsPanelProps {
    settings: Settings;
    onChange: (settings: Settings) => void;
}

export default function SettingsPanel({ settings, onChange }: SettingsPanelProps) {
    const handleChange = <K extends keyof Settings>(key: K, value: Settings[K]) => {
        onChange({ ...settings, [key]: value });
    };

    return (
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100">Customization</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                {/* App Info */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="appName">App Name</Label>
                            <Input
                                id="appName"
                                value={settings.appName}
                                onChange={(e) => handleChange("appName", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="shortName">Short Name</Label>
                            <Input
                                id="shortName"
                                value={settings.shortName}
                                onChange={(e) => handleChange("shortName", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Visual Settings */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label>Background Type</Label>
                            <Select
                                value={settings.backgroundType}
                                onValueChange={(v) => handleChange("backgroundType", v as "transparent" | "solid" | "gradient")}
                            >
                                <SelectTrigger className="w-40">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="transparent">Transparent</SelectItem>
                                    <SelectItem value="solid">Solid Color</SelectItem>
                                    <SelectItem value="gradient">Gradient</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {settings.backgroundType === "solid" && (
                            <div className="flex justify-between items-center animate-in fade-in slide-in-from-top-2 duration-300">
                                <Label htmlFor="solidColor">Solid Color</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="solidColor"
                                        type="color"
                                        className="w-12 h-8 p-1 cursor-pointer"
                                        value={settings.solidColor}
                                        onChange={(e) => handleChange("solidColor", e.target.value)}
                                    />
                                    <Input
                                        value={settings.solidColor}
                                        className="w-24 h-8 text-xs font-mono"
                                        onChange={(e) => handleChange("solidColor", e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {settings.backgroundType === "gradient" && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="flex justify-between items-center">
                                    <Label>Gradient Colors</Label>
                                    <div className="flex gap-2">
                                        <Input type="color" className="w-8 h-8 p-1 cursor-pointer" value={settings.gradientStart} onChange={(e) => handleChange("gradientStart", e.target.value)} />
                                        <Input type="color" className="w-8 h-8 p-1 cursor-pointer" value={settings.gradientEnd} onChange={(e) => handleChange("gradientEnd", e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Padding</Label>
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{settings.padding}%</span>
                            </div>
                            <Slider
                                value={[settings.padding]}
                                min={0}
                                max={40}
                                step={1}
                                onValueChange={([v]) => handleChange("padding", v)}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Roundedness</Label>
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{settings.roundedness}%</span>
                            </div>
                            <Slider
                                value={[settings.roundedness]}
                                min={0}
                                max={50}
                                step={1}
                                onValueChange={([v]) => handleChange("roundedness", v)}
                            />
                        </div>
                    </div>
                </div>

                <Separator />

                {/* PWA Settings */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                            <Label>Maskable Icon</Label>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">Enable for PWA adaptive icons</p>
                        </div>
                        <Switch
                            checked={settings.generateMaskable}
                            onCheckedChange={(v) => handleChange("generateMaskable", v)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-2">
                            <Label htmlFor="themeColor" className="text-xs">Theme Color</Label>
                            <div className="flex gap-2">
                                <Input id="themeColor" type="color" className="w-8 h-8 p-1 cursor-pointer" value={settings.themeColor} onChange={(e) => handleChange("themeColor", e.target.value)} />
                                <Input value={settings.themeColor} className="h-8 text-[10px] font-mono" onChange={(e) => handleChange("themeColor", e.target.value)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="backgroundColor" className="text-xs">Manifest BG</Label>
                            <div className="flex gap-2">
                                <Input id="backgroundColor" type="color" className="w-8 h-8 p-1 cursor-pointer" value={settings.backgroundColor} onChange={(e) => handleChange("backgroundColor", e.target.value)} />
                                <Input value={settings.backgroundColor} className="h-8 text-[10px] font-mono" onChange={(e) => handleChange("backgroundColor", e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
