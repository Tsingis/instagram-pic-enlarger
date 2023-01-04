import AlertBox from "./alertbox.js";

const ALERTBOX_TEXT = "This is not an Instagram post!";
const INSTAGRAM_BASE_URL = "https://www.instagram.com/p/";

export function main() {
  chrome.runtime.onMessage.addListener(handleMessage);
}

function handleMessage(message, sender, response) {
  let alertBox = new AlertBox(ALERTBOX_TEXT);
  if (message.command === "clicked_browser_action") {
    const url = message.data.url;
    if (url.startsWith(INSTAGRAM_BASE_URL)) {
      const msg = {
        command: "open_new_tab",
        data: getLargePictureUrl(url)
      };
      chrome.runtime.sendMessage(msg);
    } else {
      alertBox.show();
    }
  }
  response();
};

function getLargePictureUrl(url) {
  if (url.match(/\//g).length > 4) {
    url = url.substr(0, url.lastIndexOf("\/"));
  }
  return url + "/media/?size=l";
};