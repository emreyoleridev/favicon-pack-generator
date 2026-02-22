import { Settings } from "../validators";

export async function renderIcon(
    img: HTMLImageElement,
    size: number,
    settings: Settings
): Promise<Blob> {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context");

    // Enable high-quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // 1. Draw Background
    if (settings.backgroundType !== "transparent") {
        ctx.save();
        if (settings.roundedness > 0) {
            const radius = (size * settings.roundedness) / 100;
            ctx.beginPath();
            ctx.moveTo(radius, 0);
            ctx.lineTo(size - radius, 0);
            ctx.quadraticCurveTo(size, 0, size, radius);
            ctx.lineTo(size, size - radius);
            ctx.quadraticCurveTo(size, size, size - radius, size);
            ctx.lineTo(radius, size);
            ctx.quadraticCurveTo(0, size, 0, size - radius);
            ctx.lineTo(0, radius);
            ctx.quadraticCurveTo(0, 0, radius, 0);
            ctx.closePath();
            ctx.clip();
        }

        if (settings.backgroundType === "solid") {
            ctx.fillStyle = settings.solidColor || "#ffffff";
            ctx.fillRect(0, 0, size, size);
        } else if (settings.backgroundType === "gradient") {
            const gradient = ctx.createLinearGradient(0, 0, size, size);
            gradient.addColorStop(0, settings.gradientStart || "#4f46e5");
            gradient.addColorStop(1, settings.gradientEnd || "#9333ea");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, size, size);
        }
        ctx.restore();
    }

    // 2. Draw Image with Padding and Rounding
    const paddingPx = (size * settings.padding) / 100;
    const innerSize = size - paddingPx * 2;

    ctx.save();

    // If transparent background but we have roundedness, we might want to clip the image itself
    if (settings.backgroundType === "transparent" && settings.roundedness > 0) {
        const radius = (size * settings.roundedness) / 100;
        ctx.beginPath();
        ctx.moveTo(radius, 0);
        ctx.lineTo(size - radius, 0);
        ctx.quadraticCurveTo(size, 0, size, radius);
        ctx.lineTo(size, size - radius);
        ctx.quadraticCurveTo(size, size, size - radius, size);
        ctx.lineTo(radius, size);
        ctx.quadraticCurveTo(0, size, 0, size - radius);
        ctx.lineTo(0, radius);
        ctx.quadraticCurveTo(0, 0, radius, 0);
        ctx.closePath();
        ctx.clip();
    }

    // Draw the image centered
    ctx.drawImage(
        img,
        paddingPx,
        paddingPx,
        innerSize,
        innerSize
    );

    ctx.restore();

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob!);
        }, "image/png");
    });
}
