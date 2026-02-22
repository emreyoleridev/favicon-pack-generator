import { z } from "zod";

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const RECOMMENDED_MIN_SIZE = 512;

export const SettingSchema = z.object({
  appName: z.string().min(1, "App name is required").max(50),
  shortName: z.string().min(1, "Short name is required").max(12),
  themeColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color"),
  backgroundColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color"),
  padding: z.number().min(0).max(40),
  roundedness: z.number().min(0).max(40),
  backgroundType: z.enum(["transparent", "solid", "gradient"]),
  solidColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color").optional(),
  gradientStart: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color").optional(),
  gradientEnd: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color").optional(),
  generateMaskable: z.boolean().default(false),
});

export type Settings = z.infer<typeof SettingSchema>;

export const DEFAULT_SETTINGS: Settings = {
  appName: "My App",
  shortName: "App",
  themeColor: "#ffffff",
  backgroundColor: "#ffffff",
  padding: 0,
  roundedness: 0,
  backgroundType: "transparent",
  solidColor: "#ffffff",
  gradientStart: "#4f46e5",
  gradientEnd: "#9333ea",
  generateMaskable: true,
};
