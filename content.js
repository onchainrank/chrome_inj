(function () {
  // Extract the "address" parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const address = urlParams.get("address");
  if (!address) {
    console.log("No address parameter found.");
    return;
  }

  // Build the OnChainRank website URL using the extracted address (updated domain)
  const onChainRankUrl = `https://app.onchainrank.com/single/${address}`;

  // Global variable for iframe height, defaulting to 200px.
  let iframeHeight = "200px";

  // Retrieve stored iframe height from chrome.storage (if available)
  chrome.storage.local.get(["iframeHeight"], function (result) {
    if (result.iframeHeight) {
      // Append "px" if necessary (assuming a numeric value was stored)
      iframeHeight = result.iframeHeight + "px";
    }
  });

  let currentIframe = null;
  let pollIntervalId = null;

  // Create a new iframe element configured with the target URL and stored height.
  function createIframe() {
    const iframe = document.createElement("iframe");
    iframe.src = onChainRankUrl;
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
      currentIframe = createIframe();
      firstDiv.parentNode.insertBefore(currentIframe, secondDiv);
      console.log("Iframe injected with height:", iframeHeight);
      clearInterval(pollIntervalId); // Stop polling once injected.
    }
  }

  // Start polling every 500ms until the target elements are available and the iframe is injected.
  pollIntervalId = setInterval(injectIframe, 500);
})();
