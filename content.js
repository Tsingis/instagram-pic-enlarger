chrome.runtime.onMessage.addListener(
    (request, sender, response) => {
        if (request.command === "clicked_browser_action") {
            let url = request.data.toString()
            if (url.startsWith("https://www.instagram.com/p/")) {
                msg = {
                    "command": "open_new_tab",
                    "data": getLargePictureUrl(url)
                }
                chrome.runtime.sendMessage(msg);
            }
        }
    }
)

const getLargePictureUrl = (url) => {
    if (url.match(/\//g).length > 4) {
        url = url.substr(0, url.lastIndexOf("\/"))
    }
    return url + "/media/?size=l"
}