(function () {
  let currentAddress = null;
  let currentIframe = null;
  let pollIntervalId = null;

  // Configurable values from storage
  let iframeHeight = "200px";
  let apiKey = "";
  let extensionEnabled = true;

  // 1) Fetch settings, then start everything
  chrome.storage.local.get(
    ["iframeHeight", "apiKey", "extensionEnabled"],
    ({ iframeHeight: h, apiKey: k, extensionEnabled: e }) => {
      if (h) iframeHeight = `${h}px`;
      if (k) apiKey = k;
      if (e !== undefined) extensionEnabled = e;

      // Only start if extension is enabled, we have an address, and an API key
      currentAddress = getAddressFromUrl();
      if (extensionEnabled && currentAddress && apiKey) {
        startPolling();
      } else if (!extensionEnabled) {
        console.warn("onchainrank Injector: extension is disabled.");
      } else if (!apiKey) {
        console.warn(
          "onchainrank Injector: no API key set, iframe will not be injected."
        );
      }
    }
  );

  // Listen for storage changes to enable/disable dynamically
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.extensionEnabled) {
      extensionEnabled = changes.extensionEnabled.newValue;
      if (!extensionEnabled) {
        // Extension disabled - remove iframe and stop polling
        removeIframe();
        if (pollIntervalId) {
          clearInterval(pollIntervalId);
          pollIntervalId = null;
        }
        console.log("onchainrank Injector: extension disabled, iframe removed.");
      } else {
        // Extension enabled - start polling if we have address and API key
        if (currentAddress && apiKey) {
          startPolling();
          console.log("onchainrank Injector: extension enabled.");
        }
      }
    }
  });

  function getAddressFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("address");
  }

  // 2) Include the API key in the path
  function buildOnChainRankUrl(address) {
    return `https://app.onchainrank.com/single/${address}/${apiKey}`;
  }

  function createIframe(address) {
    const iframe = document.createElement("iframe");
    iframe.src = buildOnChainRankUrl(address);
    iframe.style.width = "100%";
    iframe.style.height = iframeHeight;
    iframe.style.border = "none";
    iframe.style.display = "block";
    return iframe;
  }

  function injectIframe() {
    // Double-check extension is still enabled before injecting
    if (!extensionEnabled) {
      if (pollIntervalId) {
        clearInterval(pollIntervalId);
        pollIntervalId = null;
      }
      return;
    }
    if (currentIframe) return;
    const firstDiv = document.querySelector(
      ".not-tv-chart.bg-grey-900.rounded-\\[2px\\].border-t.border-grey-500.relative"
    );
    const secondDiv = document.querySelector(
      ".ant-tabs.ant-tabs-top.ant-tabs-middle.flex.flex-col.flex-1.terminal-tabs.bg-grey-900.overflow-hidden.md\\:h-full.md\\:max-h-full.pt-1.z-50"
    );
    if (firstDiv && secondDiv) {
      currentIframe = createIframe(currentAddress);
      firstDiv.parentNode.insertBefore(currentIframe, secondDiv);
      console.log("Iframe injected with height:", iframeHeight);
      clearInterval(pollIntervalId);
    }
  }

  function removeIframe() {
    if (!currentIframe) return;
    currentIframe.remove();
    currentIframe = null;
    console.log("Iframe removed.");
  }

  function startPolling() {
    pollIntervalId = setInterval(injectIframe, 500);
  }

  // 3) Watch for SPA-style navigation
  let lastUrl = window.location.href;
  setInterval(() => {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      const newAddr = getAddressFromUrl();
      if (newAddr !== currentAddress) {
        currentAddress = newAddr;
        removeIframe();
        if (extensionEnabled && currentAddress && apiKey) startPolling();
      }
    }
  }, 500);
})();
