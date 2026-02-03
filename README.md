# Email Reader View v2.0

Chrome extension for improved email readability.

## Features

- 3 customizable color profiles (Light, Dark, Sepia)
- Typography controls (font, size, spacing)
- Image blocking option
- Works on Gmail, Outlook, Yahoo, AOL

## Installation

```bash
npm install
```

## Development Workflows

### Option 1: Browser Testing (Recommended for UI Development)

Fast iteration for UI/styling changes with live preview in browser:

```bash
# Terminal 1: Auto-rebuild on file changes
npm run dev

# Terminal 2: Serve the built files
npm run serve
```

Then open in browser: **http://localhost:4173/popup.html**

- Chrome APIs are mocked (safe for browser testing)
- Refresh browser after each rebuild to see changes
- Use DevTools to inspect/debug
- Perfect for CSS, layout, and component work

### Option 2: Extension Testing (Real Environment)

Test actual functionality in Chrome/Arc with real email content:

```bash
npm run build
```

Then:

1. Open `arc://extensions` (or `chrome://extensions`)
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `dist/` folder
5. Click refresh (↻) after each build to reload changes

## Scripts

- `npm run dev` - Auto-rebuild on file changes (watch mode)
- `npm run serve` - Serve built files for browser testing
- `npm run build` - Production build
- `npm run clean` - Remove build artifacts
- `npm run lint` - Check code quality
- `npm run format` - Format code with Prettier

## Testing the Extension

1. Load extension in Chrome/Arc (`arc://extensions`)
2. Navigate to Gmail, Outlook, Yahoo, or AOL
3. Open an email
4. Click extension icon in toolbar
5. Click "Enable Reader View"
6. Email should transform to readable format!

## Project Structure

- `src/` - Source code (TypeScript + React)
  - `popup/` - Extension popup UI
  - `content/` - Reader view transformation logic
  - `shared/` - Types, constants, storage helpers
- `legacy/` - Original v1.x implementation (reference only)
- `legacy-v2/` - Verified working version (reference only)
- `dist/` - Built extension (generated, gitignored)
- `BUILD_GUIDE.md` - Detailed step-by-step rebuild guide

## Tech Stack

- **TypeScript** - Type safety
- **React 18** - UI framework
- **Vite** - Build tool
- **ESLint + Prettier** - Code quality
- **Chrome Extension Manifest V3** - Latest extension platform

## License

ISC
