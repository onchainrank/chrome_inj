# Privacy Policy for onchainrank Injector

**Last Updated:** October 6, 2025

## Overview

onchainrank Injector is a Chrome browser extension that embeds onchainrank trading data into the Bullx NEO terminal interface. This privacy policy explains what data we collect and how we use it.

## Data Collection

### Data We Store Locally

The extension stores the following data **locally on your device only** using Chrome's local storage API:

- **API Key**: Your onchainrank API key for authentication
- **Iframe Height**: Display preference for embedded content (numeric value in pixels)
- **Extension State**: Whether the extension is enabled or disabled

**Important:** All data is stored locally in your browser. We do NOT:
- Transmit your settings to any external servers
- Store your data on remote servers
- Access or collect any personal information beyond what you explicitly provide

### Data Transmitted to Third Parties

When the extension is active and you have configured an API key:

1. **onchainrank Service**: Your API key is included in iframe URLs to `https://app.onchainrank.com` for authentication purposes
2. **Bullx Terminal**: The extension reads the cryptocurrency address from the Bullx terminal URL to display relevant data

## How We Use Your Data

- **API Key**: Used solely to authenticate requests to the onchainrank service
- **Iframe Height**: Used to control the display size of embedded content
- **Extension State**: Controls whether the extension actively injects content

## Third-Party Services

This extension interacts with:

1. **onchainrank (app.onchainrank.com)**: Displays trading data in embedded iframes
2. **Bullx NEO Terminal (neo.bullx.io)**: The extension injects content into this platform

Please review the privacy policies of these third-party services for information on their data practices.

## Data Security

- All settings are stored locally using Chrome's secure storage API
- We do not collect, transmit, or store any data on external servers
- Your API key is transmitted to onchainrank via HTTPS encrypted connections

## Your Rights

You can:
- Delete all stored data by removing the extension
- Clear your API key and settings at any time through the extension popup
- Disable the extension without uninstalling it

## Changes to This Policy

We may update this privacy policy from time to time. Changes will be reflected in the "Last Updated" date above.

## Contact

For questions or concerns about this privacy policy, please contact us through:
- GitHub Issues: [Your repository URL]
- Email: [Your contact email]

## Permissions Explained

The extension requests the following Chrome permissions:

- **activeTab**: Allows the extension to interact with the currently active Bullx terminal tab
- **storage**: Stores your API key, iframe height preference, and extension state locally on your device

## Data Retention

Data is retained locally until you:
- Uninstall the extension
- Manually clear the settings via the popup
- Clear Chrome browser data

We do not retain any data on external servers.
