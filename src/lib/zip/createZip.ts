import JSZip from "jszip";
import { saveAs } from "file-saver";

export interface ZipFile {
    name: string;
    blob: Blob | string;
}

export async function createAndDownloadZip(files: ZipFile[], zipName: string = "favicon-pack.zip") {
    const zip = new JSZip();

    files.forEach((file) => {
        zip.file(file.name, file.blob);
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, zipName);
}
