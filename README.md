# onchainrank Bullx NEO injector

## Overview

The **onchainrank Bullx NEO injector** is a Chrome extension that dynamically injects an iframe containing the onchainrank trading data into pages on `neo.bullx.io` based on an `address` query parameter. It also includes a settings GUI for entering an API key, which is automatically added as an `Authorization` header for HTTP requests sent to `http://localhost:3000/single/*`.

## Disclaimer

**Risk Warning:** Trading meme coins is highly speculative and involves significant risk.  
This extension is designed to provide general information about interesting meme coins only. It is not intended to be used as the sole signal for buying or selling coins. Users should perform their own due diligence and consider multiple sources of information before making any trading decisions.

## Features

- **Dynamic Iframe Injection:**  
  When a URL contains an `address` parameter, the extension injects an iframe that loads the URL `http://localhost:3000/single/{address}`. The iframe is styled to have a maximum height of 200px.

- **Tab Visibility Management:**  
  The extension monitors tab visibility. When the tab is hidden, the iframe is removed (to close any unnecessary WebSocket connections). When the tab is visible again, the iframe is re-injected.

- **API Key Settings:**  
  A settings popup allows users to enter and save an API key. This key is stored using Chrome's local storage.

- **Request Interception:**  
  A background service worker intercepts outgoing requests to `http://localhost:3000/single/*` and automatically appends an `Authorization` header with the stored API key.

## Requirements

- Google Chrome with support for Manifest V3.
- Developer mode enabled for loading unpacked extensions.

## Installation

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** (toggle switch in the top-right corner).
3. Click **Load unpacked** and select your extension’s folder.

4. Configure the extension:
   - Click the extension icon in the Chrome toolbar.
   - In the popup, enter your API key and click **Save**.

## Usage

1. **Iframe Injection:**  
    Navigate to a URL such as:
   `https://neo.bullx.io/terminal?address=YourAddressHere`

The extension will extract the `address` parameter and inject an iframe that loads:

2. **Request Authorization:**  
   The background service worker intercepts requests to `http://localhost:3000/single/*` and appends an `Authorization` header with the stored API key.

3. **Tab Visibility Management:**  
   When you switch to another tab, the extension removes the iframe to close WebSocket connections. When you return, the iframe is re-injected.

## Customization

- **Iframe Height:**  
  Adjust the height by modifying the `iframe.style.height` property in **content.js**.

- **API Key Storage:**  
  The API key is managed via Chrome's `storage.local` API. Update **popup.js** or **background.js** if you need to change the behavior.

- **Icon:**  
  The extension uses **icon.svg**. Replace or update this file to change the extension icon.

## Troubleshooting

- **Icon Visibility:**  
  Verify that **icon.svg** is in the extension folder and correctly referenced in **manifest.json**.

- **Iframe Injection Issues:**  
  Check the browser console for errors. Ensure the target elements on `neo.bullx.io` are present. The polling mechanism in **content.js** handles dynamic content.

- **Authorization Header Problems:**  
  Ensure the API key is saved correctly in the popup. The background service worker uses this key to set the `Authorization` header.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- Community feedback and support
