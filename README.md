# Coffee-Break-For-YouTube

[![Manifest V3 Compatible](https://img.shields.io/badge/Manifest%20V3-Compatible-success)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Latest Release](https://img.shields.io/badge/Release-2025-blue)](https://github.com/realfishsam/Coffee-Break-For-YouTube)

Coffee-Break-For-YouTube is a Manifest V3 compliant Chrome extension that provides a unique approach to handling YouTube ads - instead of blocking them, it automatically speeds them up to 16x, making them practically unnoticeable.

## Features

- 🚀 Automatically detects and speeds up ads to 16x speed
- ⚡ Restores original playback speed when ads finish
- 📊 Tracks the number of ads skipped
- 🎯 Maintains your custom video playback speed settings
- ✅ Fully compliant with Chrome's Manifest V3
- 🛡️ No ad-blocking detection issues

## Installation

1. Download the latest release from the Chrome Web Store
2. Click "Add to Chrome"
3. Enjoy faster ad experiences!

## How It Works

Instead of traditional ad-blocking which can be detected by YouTube, Coffee-Break-For-YouTube uses a novel approach:

1. Continuously monitors the YouTube player for ad presence
2. When an ad is detected, automatically increases playback speed to 16x
3. Restores your original playback speed once the ad finishes
4. Keeps track of ads encountered for analytics

## Technical Implementation

The extension consists of several key components:

- **Video Speed Controller**: Manages video playback speed changes
- **Player Configuration**: Handles YouTube player setup and initialization
- **DOM Observer**: Monitors for video element changes and maintains functionality
- **Ad Detection & Speed Management**: Core logic for detecting and handling ads

## Privacy & Permissions

The extension requires minimal permissions:

- `tabs`: To interact with YouTube tabs
- `host_permissions`: ["*://*.youtube.com/*"]

No user data is collected or transmitted.

## Development

### Prerequisites

- Node.js 16+
- Chrome Browser

### Setup

1. Clone the repository
```bash
git clone https://github.com/realfishsam/Coffee-Break-For-YouTube.git
cd Coffee-Break-For-YouTube
```

2. Install dependencies
```bash
npm install
```

3. Load the extension in Chrome:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the extension directory

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

tbd

## Support

- Create an issue in the GitHub repository
- Visit our support page for common questions

## Disclaimer

This extension is not affiliated with YouTube or Google. Use at your own discretion.

---

Made with ☕ by Samuel Tinnerholm & RLabs
