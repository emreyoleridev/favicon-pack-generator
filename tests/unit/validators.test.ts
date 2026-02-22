import { describe, it, expect } from "@jest/globals";
import { SettingSchema } from "@/lib/validators";

describe("Validators", () => {
    it("should validate a correct settings object", () => {
        const validSettings = {
            appName: "Test App",
            shortName: "Test",
            themeColor: "#000000",
            backgroundColor: "#ffffff",
            padding: 10,
            roundedness: 5,
            backgroundType: "solid" as const,
            solidColor: "#ff0000",
            generateMaskable: true,
        };

        const result = SettingSchema.safeParse(validSettings);
        expect(result.success).toBe(true);
    });

    it("should fail validation for invalid hex colors", () => {
        const invalidSettings = {
            appName: "Test App",
            shortName: "Test",
            themeColor: "not-a-color",
            backgroundColor: "#ggg",
            padding: 10,
            roundedness: 5,
            backgroundType: "transparent" as const,
            generateMaskable: true,
        };

        const result = SettingSchema.safeParse(invalidSettings);
        expect(result.success).toBe(false);
    });

    it("should fail validation for out-of-range numbers", () => {
        const invalidSettings = {
            appName: "Test App",
            shortName: "Test",
            themeColor: "#000000",
            backgroundColor: "#ffffff",
            padding: 100, // Max is 40
            roundedness: 5,
            backgroundType: "transparent" as const,
            generateMaskable: true,
        };

        const result = SettingSchema.safeParse(invalidSettings);
        expect(result.success).toBe(false);
    });
});
