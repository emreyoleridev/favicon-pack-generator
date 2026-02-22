/**
 * Extremely basic ICO generator that wraps a single PNG into an ICO container.
 * This is browser-safe and handles the most common case for favicons.
 */
export async function createIcoFromPng(pngBlob: Blob): Promise<Blob> {
    const pngArrayBuffer = await pngBlob.arrayBuffer();
    const pngUint8Array = new Uint8Array(pngArrayBuffer);

    const header = new Uint8Array([
        0, 0, // Reserved
        1, 0, // Type (1 for ICO)
        1, 0, // Number of images (1)
    ]);

    const directory = new Uint8Array(16);
    directory[0] = 32; // Width (32)
    directory[1] = 32; // Height (32)
    directory[2] = 0;  // Color count
    directory[3] = 0;  // Reserved
    directory[4] = 1;  // Color planes
    directory[5] = 0;
    directory[6] = 32; // Bits per pixel
    directory[7] = 0;

    // Size of PNG data (4 bytes, little endian)
    const size = pngUint8Array.length;
    directory[8] = size & 0xff;
    directory[9] = (size >> 8) & 0xff;
    directory[10] = (size >> 16) & 0xff;
    directory[11] = (size >> 24) & 0xff;

    // Offset of PNG data (header + directory = 6 + 16 = 22)
    const offset = 22;
    directory[12] = offset & 0xff;
    directory[13] = (offset >> 8) & 0xff;
    directory[14] = (offset >> 16) & 0xff;
    directory[15] = (offset >> 24) & 0xff;

    const icoData = new Uint8Array(header.length + directory.length + pngUint8Array.length);
    icoData.set(header, 0);
    icoData.set(directory, header.length);
    icoData.set(pngUint8Array, header.length + directory.length);

    return new Blob([icoData], { type: "image/x-icon" });
}
