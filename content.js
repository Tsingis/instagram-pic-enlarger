chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
        
            var url = request.data.toString()
            if (url.startsWith("https://www.instagram.com/p/"))
            {
                var url = request.data + "media/?size=l";
                chrome.runtime.sendMessage({"message": "open_new_tab", "url": url});
            }
        }
    }
);