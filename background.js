async function handleClick() {
  const activeTab = await getActiveTab();
  const msg = {
    command: "clicked_browser_action",
    data: activeTab
  };
  chrome.tabs.sendMessage(activeTab.id, msg);
};

async function getActiveTab() {
  const queryOptions = {
    active: true,
    currentWindow: true
  };
  const [activeTab] = await chrome.tabs.query(queryOptions);
  return activeTab;
};

function handleMessage (message, sender, response) {
  if (message.command === "open_new_tab") {
    chrome.tabs.create({ url: message.data });
  }
};

chrome.action.onClicked.addListener(handleClick);
chrome.runtime.onMessage.addListener(handleMessage);