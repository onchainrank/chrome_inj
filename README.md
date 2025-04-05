# onchainrank notifier

onchainrank notifier is a Chrome extension built with Manifest V3 that listens for notify events from the Socket.IO server at https://api.onchainrank.com. When an event is received, the extension opens:

- A new tab to the BullX Neo trading panel URL using the provided mint address:
  `https://neo.bullx.io/trading?address={mint}&chainId=1399811149`
- A second tab for an optional URL if it is provided in the event payload.

## Disclaimer

**Risk Warning:** Trading meme coins is highly speculative and involves significant risk.  
This extension is designed to provide general information about interesting meme coins only. It is not intended to be used as the sole signal for buying or selling coins. Users should perform their own due diligence and consider multiple sources of information before making any trading decisions.

## Features

**Real-Time Notifications:**

- Listens to `notify` events from `https://api.onchainrank.com` using a local copy of the Socket.IO client.

**API Key Support:**

- Configure your API key via the options page. The API key is appended to the connection query. An API key can be generated on the [onchainrank.com](https://onchainrank.com) website.

**Automatic Tab Opening:**

- Always opens the BullX Neo trading panel URL using the provided mint address.
- Optionally opens another URL if provided in the event payload.

**Connection Status Display:**

- The popup shows the current WebSocket connection status (Connected/Disconnected).

**Keep-Alive Mechanism:**

- Uses Chrome's Alarms API to check and re-establish the connection if it drops.

**Clean, Minimal UI:**

- Uses lowercase branding with a white background and a custom icon (`ocr128.png`).

## Installation

1. **Clone or Download the Repository:**

```bash
   git clone [https://github.com/yourusername/onchainrank-notifier.git](https://github.com/yourusername/onchainrank-notifier.git)
   cd onchainrank-notifier
```

2. **Load the Extension in Chrome:**

- Open Chrome and navigate to `chrome://extensions/`.
- Enable **Developer mode** (toggle in the top-right corner).
- Click **"Load unpacked"** and select the repository folder.

3. **Configure the Extension:**

- Click on the extension icon to open the popup.
- Click on **"Settings"** to open the options page.
- Enter your API key (which can be generated on [onchainrank.com](https://onchainrank.com)) and click **"Save"**.

## Usage

**Real-Time Notifications:**

When a `notify` event is received, the extension automatically opens:

- A new tab to:
  `https://neo.bullx.io/trading?address={mint}&chainId=1399811149`
- And, if provided, a second tab to the event's `url`.

**Connection Status:**

- The popup displays the current WebSocket connection status.

**Keep-Alive:**

- The extension uses the Chrome Alarms API to wake the service worker every minute and re-establish the Socket.IO connection if needed.

## Development

**Local Socket.IO Client**

The extension loads Socket.IO locally from `socket.io.min.js` (v4.8.1). Ensure that this file is included in the extension folder.

**Keep-Alive Mechanism**

Due to the ephemeral nature of Manifest V3 service workers, the extension uses Chrome's Alarms API to periodically check and reinitialize the Socket.IO connection if it becomes inactive.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
