# Email Reader View v2.0

Chrome extension for improved email readability.

## Features

- 3 customizable color profiles (Light, Dark, Sepia)
- Typography controls (font, size, spacing)
- Image blocking option
- Works on Gmail, Outlook, Yahoo, AOL

## Development

```bash
npm install
npm run dev
```

Load `dist/` folder as unpacked extension in Chrome.

## Build

```bash
npm run build
```

## Testing

1. Load extension in Chrome (`chrome://extensions`)
2. Go to Gmail, Outlook, Yahoo, or AOL
3. Open an email
4. Click extension icon
5. Click "Enable Reader View"

## Project Structure

- `src/` - Source code (TypeScript + React)
- `legacy/` - Original v1.x implementation (reference only)
- `dist/` - Built extension (generated)
- `BUILD_GUIDE.md` - Step-by-step rebuild guide

## Legacy

Original v1.x implementation in `legacy/` folder (reference only).

## License

ISC
