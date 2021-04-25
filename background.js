chrome.action.onClicked.addListener(async () => {
    let activeTab = await getActiveTab();
    let msg = {
        command: "clicked_browser_action",
        data: activeTab
    };
    chrome.tabs.sendMessage(activeTab.id, msg);
});

chrome.runtime.onMessage.addListener(
    (request, sender, response) => {
        if (request.command === "open_new_tab") {
            chrome.tabs.create({ url: request.data });
        }
    });

const getActiveTab = async () => {
    let queryOptions = {
        active: true,
        currentWindow: true
    };
    let [activeTab] = await chrome.tabs.query(queryOptions);
    return activeTab;
};