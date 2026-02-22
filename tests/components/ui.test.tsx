import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UploadDropzone from "@/components/UploadDropzone";
import SettingsPanel from "@/components/SettingsPanel";
import { DEFAULT_SETTINGS, Settings } from "@/lib/validators";

describe("Components", () => {
    describe("UploadDropzone", () => {
        it("should render upload instructions", () => {
            render(<UploadDropzone onFileSelect={jest.fn() as unknown as (file: File) => void} selectedFile={null} />);
            expect(screen.getByText(/Choose an image or drag & drop/i)).toBeInTheDocument();
        });

        it("should call onFileSelect when a valid file is uploaded", async () => {
            const onFileSelect = jest.fn();
            render(<UploadDropzone onFileSelect={onFileSelect as unknown as (file: File) => void} selectedFile={null} />);

            const file = new File(["hello"], "hello.png", { type: "image/png" });
            const input = document.querySelector('input[type="file"]') as HTMLInputElement;

            fireEvent.change(input, { target: { files: [file] } });

            // onFileSelect is called inside validateAndSelect
            expect(onFileSelect).toHaveBeenCalled();
        });
    });

    describe("SettingsPanel", () => {
        it("should render app name and short name inputs", () => {
            render(<SettingsPanel settings={DEFAULT_SETTINGS} onChange={jest.fn() as unknown as (settings: Settings) => void} />);
            expect(screen.getByLabelText(/App Name/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Short Name/i)).toBeInTheDocument();
        });

        it("should call onChange when input value changes", () => {
            const onChange = jest.fn();
            render(<SettingsPanel settings={DEFAULT_SETTINGS} onChange={onChange as unknown as (settings: Settings) => void} />);

            const input = screen.getByLabelText(/App Name/i);
            fireEvent.change(input, { target: { value: "New Name" } });

            expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ appName: "New Name" }));
        });
    });
});
