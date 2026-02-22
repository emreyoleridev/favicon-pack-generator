# Favicon Pack Generator

A modern, client-side web tool to generate a complete favicon pack from a single image. Built with Next.js, TypeScript, TailwindCSS, and shadcn/ui.

## Features

- **Client-Side Processing**: All image processing happens in your browser for maximum privacy.
- **Real-time Customization**: Adjust background color, padding, roundedness, and more with instant feedback.
- **Rich Icon Selection**: Generates all standard sizes (16x16, 32x32, 180x180, 192x192, 512x512) plus `mstile` and `apple-touch-icon`.
- **ICO & Manifest Generation**: Automatically creates `favicon.ico` and `site.webmanifest`.
- **Integration Snippets**: Provides copy-pasteable HTML and Next.js Metadata code for your projects.
- **One-Click Download**: Download the entire pack as a single ZIP archive.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS 4
- **UI Components**: shadcn/ui
- **Image Processing**: HTML Canvas API
- **Testing**: Jest & React Testing Library
- **Package Manager**: npm

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Testing

```bash
npm test
```

## Project Structure

- `src/app`: Next.js pages and layouts.
- `src/components`: UI components (Upload, Settings, Preview, Output).
- `src/lib`: Core logic for image processing, manifest generation, and ZIP creation.
- `tests`: Unit and component tests using Jest.

## Design Aesthetics

The application follows a premium, modern design with:
- **Glassmorphism**: Subtle backgrounds and blurs.
- **Dynamic Animations**: Smooth transitions and hover effects.
- **Harmonious Palette**: Professional indigo and slate colors.
- **Responsive Layout**: Two-column desktop view that collapses for mobile.

## 👤 Author

Built with ❤️ by **Emre Yoleri**
-   [GitHub](https://github.com/emreyoleridev)
-   [Buy Me A Coffee](https://buymeacoffee.com/emreyoleridev)

---
*Disclaimer: This tool is intended for legal and professional use only. Ensure you have the rights to the documents you are processing.*

## License
MIT
