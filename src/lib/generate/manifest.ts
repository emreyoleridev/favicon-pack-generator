import { Settings } from "../validators";

export function generateManifest(settings: Settings) {
    const manifest = {
        name: settings.appName,
        short_name: settings.shortName,
        icons: [
            {
                src: "/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: settings.generateMaskable ? "any maskable" : "any",
            },
            {
                src: "/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: settings.generateMaskable ? "any maskable" : "any",
            },
        ],
        theme_color: settings.themeColor,
        background_color: settings.backgroundColor,
        display: "standalone",
    };

    return JSON.stringify(manifest, null, 2);
}
