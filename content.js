chrome.runtime.onMessage.addListener(
    (request, sender, response) => {
        if (request.message === "clicked_browser_action") {
            var url = request.data.toString()
            if (url.startsWith("https://www.instagram.com/p/"))
            {   
                if (url.match(/\//g).length > 4) {
                    url = url.substr(0, url.lastIndexOf("\/"))
                }
                
                msg = {
                    "message": "open_new_tab",
                    "url": url + "/media/?size=l"
                }
                
                chrome.runtime.sendMessage(msg);
            }
        }
    }
);