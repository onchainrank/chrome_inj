(function () {
  // Global variable to store the current "address" in the URL.
  let currentAddress = null;
  let currentIframe = null;
  let pollIntervalId = null;

  // Function to extract the address from the URL query parameters.
  function getAddressFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("address");
  }

  // Build the OnChainRank website URL using the given address.
  function buildOnChainRankUrl(address) {
    return `https://app.onchainrank.com/single/${address}`;
  }

  // Retrieve the stored iframe height; default to "200px" if not set.
  let iframeHeight = "200px";
  chrome.storage.local.get(["iframeHeight"], function (result) {
    if (result.iframeHeight) {
      iframeHeight = result.iframeHeight + "px";
    }
  });

  // Create a new iframe element configured with the target URL and height.
  function createIframe(address) {
    const iframe = document.createElement("iframe");
    iframe.src = buildOnChainRankUrl(address);
    iframe.style.width = "100%";
    iframe.style.height = iframeHeight; // Use the stored height value.
    iframe.style.border = "none";
    iframe.style.display = "block";
    return iframe;
  }

  // Inject the iframe between the two target divs if it is not already injected.
  function injectIframe() {
    if (currentIframe !== null) {
      return; // Already injected.
    }
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
      clearInterval(pollIntervalId); // Stop polling once injected.
    }
  }

  // Remove the iframe from the DOM and reset the reference.
  function removeIframe() {
    if (currentIframe) {
      currentIframe.remove();
      currentIframe = null;
      console.log("Iframe removed.");
    }
  }

  // Start polling every 500ms until the target elements are available and the iframe can be injected.
  function startPolling() {
    pollIntervalId = setInterval(injectIframe, 500);
  }

  // Check for URL changes periodically.
  let lastUrl = window.location.href;
  function monitorUrlChange() {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      console.log("URL changed:", currentUrl);
      handleUrlChange();
    }
  }

  // Handles URL changes by checking the "address" query parameter.
  function handleUrlChange() {
    const newAddress = getAddressFromUrl();
    if (newAddress !== currentAddress) {
      // Update the current address.
      currentAddress = newAddress;
      // Remove the iframe if it exists.
      removeIframe();
      // If there's a valid address, start polling to inject a new iframe.
      if (currentAddress) {
        startPolling();
      }
    }
  }

  // On initial load, get the address and inject the iframe if available.
  currentAddress = getAddressFromUrl();
  if (currentAddress) {
    startPolling();
  }

  // Monitor URL changes every 500ms.
  setInterval(monitorUrlChange, 500);
})();
