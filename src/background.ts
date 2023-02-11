chrome.action.onClicked.addListener(handleClick);
chrome.runtime.onMessage.addListener(handleMessage);

async function handleClick(): Promise<void> {
  const activeTab = await getActiveTab();
  const msg = {
    command: "clicked_browser_action",
    data: activeTab
  };
  if (activeTab.id == null) return;
  chrome.tabs.sendMessage(activeTab.id, msg);
};

function handleMessage (message: any, sender: chrome.runtime.MessageSender, response: any): void {
  if (message.command === "open_new_tab") {
    chrome.tabs.create({ url: message.data });
  }
};

async function getActiveTab(): Promise<chrome.tabs.Tab> {
  const queryOptions = {
    active: true,
    currentWindow: true
  };
  const activeTabs = await chrome.tabs.query(queryOptions);
  return activeTabs[0];
};