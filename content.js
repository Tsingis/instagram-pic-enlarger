chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
        
            var url = request.data.toString()
            if (url.startsWith("https://www.instagram.com/p/"))
            {   
                if (url.match(/\//g).length > 4)
                {
                    var url = url.substr(0, url.lastIndexOf("\/"))
                }
  
                var newUrl = url + "/media/?size=l"
                chrome.runtime.sendMessage({"message": "open_new_tab", "url": newUrl});
            }
        }
    }
);