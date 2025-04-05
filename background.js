// Load the local Socket.IO client library
importScripts("socket.io.min.js");

// Global connection status variable
let connectionStatus = "Disconnected";
let socket;

// Initialize the Socket.IO connection using the stored API key.
function initSocket(apiKey) {
  // If a socket exists and is already connected, do nothing.
  if (socket && socket.connected) {
    return;
  }
  // Connect using only WebSocket transport and include the API key as a query parameter.
  socket = io("https://api.onchainrank.com", {
    transports: ["websocket"],
    query: { apiKey: apiKey },
  });

  socket.on("connect", () => {
    connectionStatus = "Connected";
    console.log("Connected to Socket.IO server");
  });

  socket.on("disconnect", () => {
    connectionStatus = "Disconnected";
    console.log("Disconnected from Socket.IO server");
  });

  // Listen for 'notify' events
  socket.on("notify", (payload) => {
    console.log("Received notify event:", payload);
    const mintAddress = payload.mint;
    const optionalUrl = payload.url;

    // Always open the Neo Bullx terminal tab
    const terminalUrl = `https://neo.bullx.io/terminal?address=${mintAddress}&chainId=1399811149`;
    chrome.tabs.create({ url: terminalUrl });

    // Open the provided URL in a new tab if it exists and is not null
    if (optionalUrl) {
      chrome.tabs.create({ url: optionalUrl });
    }
  });
}

// Set an alarm to help keep the service worker active and check the connection every minute.
chrome.alarms.create("keepAlive", { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "keepAlive") {
    console.log("Keep-alive alarm triggered");
    // If socket is not defined or disconnected, reinitialize the connection.
    if (!socket || socket.disconnected) {
      console.log("Socket is not active, reinitializing connection.");
      chrome.storage.sync.get("apiKey", (data) => {
        const apiKey = data.apiKey || "";
        initSocket(apiKey);
      });
    }
  }
});

// Get the API key from storage and initialize the socket.
chrome.storage.sync.get("apiKey", (data) => {
  const apiKey = data.apiKey || "";
  initSocket(apiKey);
});

// Listen for messages (e.g. from the popup) requesting the connection status.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "getConnectionStatus") {
    sendResponse({ status: connectionStatus });
  }
});
