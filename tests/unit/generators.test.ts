import { describe, it, expect } from "@jest/globals";
import { generateManifest } from "@/lib/generate/manifest";
import { generateHtmlSnippets, generateNextJsSnippets } from "@/lib/generate/snippets";
import { DEFAULT_SETTINGS } from "@/lib/validators";

describe("Generators", () => {
    describe("generateManifest", () => {
        it("should generate a valid JSON manifest with expected fields", () => {
            const manifestJson = generateManifest(DEFAULT_SETTINGS);
            const manifest = JSON.parse(manifestJson);

            expect(manifest.name).toBe(DEFAULT_SETTINGS.appName);
            expect(manifest.short_name).toBe(DEFAULT_SETTINGS.shortName);
            expect(manifest.icons).toHaveLength(2);
            expect(manifest.icons[0].src).toBe("/android-chrome-192x192.png");
            expect(manifest.theme_color).toBe(DEFAULT_SETTINGS.themeColor);
        });

        it("should handle maskable icon purpose correctly", () => {
            const manifestMaskable = JSON.parse(generateManifest({ ...DEFAULT_SETTINGS, generateMaskable: true }));
            expect(manifestMaskable.icons[0].purpose).toBe("any maskable");

            const manifestNotMaskable = JSON.parse(generateManifest({ ...DEFAULT_SETTINGS, generateMaskable: false }));
            expect(manifestNotMaskable.icons[0].purpose).toBe("any");
        });
    });

    describe("Snippet Generators", () => {
        it("should generate HTML snippets containing canonical icon names", () => {
            const snippets = generateHtmlSnippets(DEFAULT_SETTINGS);
            expect(snippets).toContain('rel="apple-touch-icon"');
            expect(snippets).toContain("/apple-touch-icon.png");
            expect(snippets).toContain('rel="manifest"');
        });

        it("should generate Next.js metadata snippets", () => {
            const snippets = generateNextJsSnippets(DEFAULT_SETTINGS);
            expect(snippets).toContain('export const metadata = {');
            expect(snippets).toContain('manifest: "/site.webmanifest"');
        });
    });
});
