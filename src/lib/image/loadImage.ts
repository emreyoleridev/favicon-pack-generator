export async function loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error("Failed to load image"));
            img.src = e.target?.result as string;
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
    });
}

export async function imageToCanvas(img: HTMLImageElement | SVGElement): Promise<HTMLCanvasElement> {
    const canvas = document.createElement("canvas");
    canvas.width = img instanceof HTMLImageElement ? img.naturalWidth : (img as SVGSVGElement).width.baseVal.value;
    canvas.height = img instanceof HTMLImageElement ? img.naturalHeight : (img as SVGSVGElement).height.baseVal.value;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context");

    if (img instanceof HTMLImageElement) {
        ctx.drawImage(img, 0, 0);
    } else {
        // Handle SVG if needed, but loadImage usually returns HTMLImageElement for SVGs too if loaded via data URL
        const xml = new XMLSerializer().serializeToString(img);
        const svg64 = btoa(xml);
        const b64Start = 'data:image/svg+xml;base64,';
        const image64 = b64Start + svg64;
        const svgImg = new Image();
        return new Promise((resolve, reject) => {
            svgImg.onload = () => {
                ctx.drawImage(svgImg, 0, 0);
                resolve(canvas);
            };
            svgImg.onerror = reject;
            svgImg.src = image64;
        });
    }
    return canvas;
}
