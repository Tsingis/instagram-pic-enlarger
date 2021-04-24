// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(() => {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        var activeTab = tabs[0];
        msg = {
            "message": "clicked_browser_action",
            "data": activeTab.url
        }
        chrome.tabs.sendMessage(activeTab.id, msg);
    });
});
 
chrome.runtime.onMessage.addListener(
    (request, sender, response) => {
        if (request.message === "open_new_tab") {
            var url = {
                "url": request.url
            }
            chrome.tabs.create(url)
        }
});