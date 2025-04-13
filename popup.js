document.addEventListener("DOMContentLoaded", function () {
  const apiKeyInput = document.getElementById("apiKey");
  const iframeHeightInput = document.getElementById("iframeHeight");
  const saveBtn = document.getElementById("saveBtn");

  // Load the saved API key and iframe height from storage, if available.
  chrome.storage.local.get(["apiKey", "iframeHeight"], function (result) {
    if (result.apiKey) {
      apiKeyInput.value = result.apiKey;
    }
    if (result.iframeHeight) {
      iframeHeightInput.value = result.iframeHeight;
    } else {
      iframeHeightInput.value = "200";
    }
  });

  // Save the API key and iframe height to storage on button click.
  saveBtn.addEventListener("click", function () {
    const apiKey = apiKeyInput.value;
    const iframeHeight = iframeHeightInput.value; // Expected as a numeric value (string)
    chrome.storage.local.set(
      { apiKey: apiKey, iframeHeight: iframeHeight },
      function () {
        alert("Settings saved!");
      }
    );
  });
});
