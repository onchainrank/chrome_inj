# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Chrome Manifest V3 extension that injects onchainrank trading data iframes into the Bullx NEO terminal (`neo.bullx.io/terminal`). The extension provides a settings popup for API key management and dynamically embeds content based on URL parameters.

## Architecture

### Core Components

**Content Script (content.js)**
- Runs on `*://neo.bullx.io/terminal*` pages
- Extracts `address` parameter from URL query string
- Polls DOM every 500ms for specific target divs (chart container and tabs container)
- Injects iframe between these divs when both are found
- Monitors URL changes via 500ms interval to detect SPA navigation
- Builds iframe URL as: `https://app.onchainrank.com/single/{address}/{apiKey}`
- Reads `apiKey` and `iframeHeight` from Chrome storage on initialization
- Only injects if API key is configured

**Background Service Worker (background.js)**
- Loads API key from Chrome storage on startup
- Listens for storage changes to update API key in real-time
- Does NOT intercept requests (README is outdated on this point)

**Popup (popup.html + popup.js)**
- Settings UI with two fields: API key (text) and iframe height (number)
- Loads current values from Chrome storage on open
- Saves both settings to `chrome.storage.local` on button click

### Key Behaviors

1. **Iframe injection depends on API key** - content script checks for API key presence before starting polling
2. **URL changes trigger re-injection** - SPA navigation detection removes old iframe and re-injects with new address
3. **API key is embedded in URL path** - format: `/single/{address}/{apiKey}` (not in Authorization header)
4. **Polling for DOM elements** - targets specific Tailwind class combinations for Bullx terminal layout
5. **Height is configurable** - stored as number in settings, converted to `{value}px` in content script

## Development Commands

This is a vanilla JavaScript Chrome extension with no build process.

**Load extension in Chrome:**
1. Open `chrome://extensions/`
2. Enable Developer mode
3. Click "Load unpacked" and select this directory

**Test changes:**
1. Make code changes
2. Go to `chrome://extensions/`
3. Click reload icon on the extension card
4. Refresh target page (`neo.bullx.io/terminal?address=...`)

## File Structure

```
manifest.json       - Extension manifest (Manifest V3)
content.js          - Main injection logic
background.js       - Service worker for storage management
popup.html          - Settings UI structure
popup.js            - Settings UI logic
ocr16/48/128.png    - Extension icons
logo.png            - Logo for popup header
```

## Important Notes

- API key is stored in Chrome local storage (not sync storage)
- Iframe URL changed from localhost:3000 to app.onchainrank.com in recent commits
- Target selectors are brittle - depend on exact Tailwind classes from Bullx terminal
- No request interception happens (background.js only manages storage)
