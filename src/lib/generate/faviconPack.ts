import { Settings } from "../validators";
import { renderIcon } from "../image/render";
import { createIcoFromPng } from "./faviconIco";
import { generateManifest } from "./manifest";

export interface GeneratedIcon {
    name: string;
    blob: Blob;
    size: string;
    url: string;
}

export async function generateFaviconPack(
    img: HTMLImageElement,
    settings: Settings
): Promise<GeneratedIcon[]> {
    const icons: GeneratedIcon[] = [];

    // 1. Define standard sizes
    const pngSizes = [
        { name: "favicon-16x16.png", size: 16 },
        { name: "favicon-32x32.png", size: 32 },
        { name: "apple-touch-icon.png", size: 180 },
        { name: "android-chrome-192x192.png", size: 192 },
        { name: "android-chrome-512x512.png", size: 512 },
        { name: "mstile-150x150.png", size: 150 },
    ];

    // 2. Generate PNGs
    for (const s of pngSizes) {
        const blob = await renderIcon(img, s.size, settings);
        icons.push({
            name: s.name,
            blob,
            size: `${s.size}x${s.size}`,
            url: URL.createObjectURL(blob),
        });
    }

    // 3. Generate ICO (using 32x32)
    const icoBasePng = await renderIcon(img, 32, settings);
    const icoBlob = await createIcoFromPng(icoBasePng);
    icons.push({
        name: "favicon.ico",
        blob: icoBlob,
        size: "32x32",
        url: URL.createObjectURL(icoBlob),
    });

    // 4. Generate Manifest
    const manifestContent = generateManifest(settings);
    const manifestBlob = new Blob([manifestContent], { type: "application/json" });
    icons.push({
        name: "site.webmanifest",
        blob: manifestBlob,
        size: "-",
        url: URL.createObjectURL(manifestBlob),
    });

    return icons;
}
