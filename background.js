chrome.action.onClicked.addListener(async () => {
    chrome.action.setPopup({ popup: "" });
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

        if (request.command === "show_alert") {
            chrome.scripting.executeScript({ function: showAlert, target: { tabId: request.data.id } });
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

/* TODO: Show alert/popup without regular alert */
const showAlert = () => {
    alert("This is not an Instagram post!");
}