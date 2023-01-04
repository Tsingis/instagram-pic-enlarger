(async() => {
  const src = chrome.runtime.getURL("src/main.js");
  const content = await import(src);
  content.main();
})();
