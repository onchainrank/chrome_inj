(function () {
  let currentAddress = null;
  let currentIframe = null;
  let observer = null;

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
        startObserving();
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
        // Extension disabled - remove iframe and stop observing
        removeIframe();
        if (observer) {
          observer.disconnect();
          observer = null;
        }
        console.log("onchainrank Injector: extension disabled, iframe removed.");
      } else {
        // Extension enabled - start observing if we have address and API key
        if (currentAddress && apiKey) {
          startObserving();
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
      if (observer) {
        observer.disconnect();
        observer = null;
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
      // Stop observing once injected
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    }
  }

  function removeIframe() {
    if (!currentIframe) return;
    currentIframe.remove();
    currentIframe = null;
    console.log("Iframe removed.");
  }

  function startObserving() {
    // Try immediate injection first
    injectIframe();

    // If iframe wasn't injected, start observing DOM changes
    if (!currentIframe) {
      observer = new MutationObserver(() => {
        injectIframe();
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }

  // 3) Watch for SPA-style navigation using navigation events
  let lastUrl = window.location.href;

  function checkUrlChange() {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      const newAddr = getAddressFromUrl();
      if (newAddr !== currentAddress) {
        currentAddress = newAddr;
        removeIframe();
        if (extensionEnabled && currentAddress && apiKey) {
          startObserving();
        }
      }
    }
  }

  // Listen for browser navigation events
  window.addEventListener('popstate', checkUrlChange);
  window.addEventListener('hashchange', checkUrlChange);

  // SPA navigation might not trigger standard events, use MutationObserver as fallback
  const urlObserver = new MutationObserver(checkUrlChange);
  urlObserver.observe(document.querySelector('title') || document.head, {
    childList: true,
    subtree: true
  });
})();
