import "@testing-library/jest-dom";

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));

// Mock window.scrollTo
window.scrollTo = jest.fn();

// Mocking URL.createObjectURL and URL.revokeObjectURL
if (typeof window !== "undefined") {
    window.URL.createObjectURL = jest.fn(() => "mock-url");
    window.URL.revokeObjectURL = jest.fn();
}

// Mocking canvas
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    drawImage: jest.fn(),
    fillRect: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    quadraticCurveTo: jest.fn(),
    closePath: jest.fn(),
    clip: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
    createLinearGradient: jest.fn(() => ({
        addColorStop: jest.fn(),
    })),
})) as unknown as typeof HTMLCanvasElement.prototype.getContext;

HTMLCanvasElement.prototype.toBlob = jest.fn((callback) => {
    callback(new Blob(["mock-blob"], { type: "image/png" }));
}) as unknown as (callback: BlobCallback, type?: string, quality?: number) => void;
