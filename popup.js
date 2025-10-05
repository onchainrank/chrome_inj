document.addEventListener("DOMContentLoaded", function () {
  const apiKeyInput = document.getElementById("apiKey");
  const iframeHeightInput = document.getElementById("iframeHeight");
  const saveBtn = document.getElementById("saveBtn");
  const apiKeyStatusEl = document.getElementById("apiKeyStatus");
  const toggleButton = document.getElementById("toggleEnable");

  // Helper function to update API key status display
  function updateApiKeyStatus(apiKey) {
    if (apiKey) {
      apiKeyStatusEl.textContent = `Key: ${apiKey.substring(0, 4)}...`;
    } else {
      apiKeyStatusEl.textContent = "";
    }
  }

  // Helper function to update toggle button state
  function updateToggleButton(enabled) {
    if (enabled) {
      toggleButton.textContent = "Disable";
      toggleButton.className = "enabled";
    } else {
      toggleButton.textContent = "Enable";
      toggleButton.className = "disabled";
    }
  }

  // Load the saved API key, iframe height, and enabled state from storage
  chrome.storage.local.get(["apiKey", "iframeHeight", "extensionEnabled"], function (result) {
    if (result.apiKey) {
      updateApiKeyStatus(result.apiKey);
    }
    if (result.iframeHeight) {
      iframeHeightInput.value = result.iframeHeight;
    } else {
      iframeHeightInput.value = "200";
    }
    // Default to enabled if not set
    const enabled = result.extensionEnabled !== undefined ? result.extensionEnabled : true;
    updateToggleButton(enabled);
  });

  // Toggle enable/disable extension
  toggleButton.addEventListener("click", function () {
    chrome.storage.local.get(["extensionEnabled"], function (result) {
      const currentState = result.extensionEnabled !== undefined ? result.extensionEnabled : true;
      const newState = !currentState;
      chrome.storage.local.set({ extensionEnabled: newState }, function () {
        updateToggleButton(newState);
      });
    });
  });

  // Save the API key and iframe height to storage on button click.
  saveBtn.addEventListener("click", function () {
    const apiKey = apiKeyInput.value.trim();
    const iframeHeight = iframeHeightInput.value; // Expected as a numeric value (string)
    const saveMessage = document.getElementById("saveMessage");
    chrome.storage.local.set(
      { apiKey: apiKey, iframeHeight: iframeHeight },
      function () {
        updateApiKeyStatus(apiKey);
        apiKeyInput.value = "";
        saveMessage.textContent = "Settings saved!";
        setTimeout(() => {
          saveMessage.textContent = "";
        }, 2000);
      }
    );
  });
});
