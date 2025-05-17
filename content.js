(function () {
  let currentAddress = null;
  let currentIframe = null;
  let pollIntervalId = null;

  // Configurable values from storage
  let iframeHeight = "200px";
  let apiKey = "";

  // 1) Fetch both settings, then start everything
  chrome.storage.local.get(
    ["iframeHeight", "apiKey"],
    ({ iframeHeight: h, apiKey: k }) => {
      if (h) iframeHeight = `${h}px`;
      if (k) apiKey = k;

      // Only start if we have an address _and_ an API key
      currentAddress = getAddressFromUrl();
      if (currentAddress && apiKey) {
        startPolling();
      } else if (!apiKey) {
        console.warn(
          "OnChainRank Injector: no API key set, iframe will not be injected."
        );
      }
    }
  );

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
        if (currentAddress && apiKey) startPolling();
      }
    }
  }, 500);
})();
