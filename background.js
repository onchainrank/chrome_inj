// background.js

let authKey = "";

chrome.storage.local.get(["apiKey"], (result) => {
  if (result.apiKey) {
    authKey = result.apiKey;
    console.log("Auth key loaded:", authKey);
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.apiKey) {
    authKey = changes.apiKey.newValue;
    console.log("Auth key updated:", authKey);
  }
});
