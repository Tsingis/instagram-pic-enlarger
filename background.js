const getActiveTab = async () => {
  const queryOptions = {
    active: true,
    currentWindow: true
  };
  const [activeTab] = await chrome.tabs.query(queryOptions);
  return activeTab;
};

const onClick = async (tab) => {
  const activeTab = await getActiveTab();
  const msg = {
    command: "clicked_browser_action",
    data: activeTab
  };
  chrome.tabs.sendMessage(activeTab.id, msg);
};

const onMessage = (message, sender, response) => {
  if (message.command === "open_new_tab") {
    chrome.tabs.create({ url: message.data });
  }
};

chrome.action.onClicked.addListener(onClick);
chrome.runtime.onMessage.addListener(onMessage);