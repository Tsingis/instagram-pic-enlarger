import AlertBox from "./alertbox"
import { getLargePictureUrl } from "./utils"

const ALERTBOX_TEXT = "This is not an Instagram post!"
const INSTAGRAM_BASE_URL = "https://www.instagram.com/p/"
const AUTOCLOSE_DELAY = 2000

chrome.runtime.onMessage.addListener(handleMessage)

function handleMessage(
  message: any,
  sender: chrome.runtime.MessageSender,
  response: any
): void {
  const alertBox = new AlertBox(ALERTBOX_TEXT, AUTOCLOSE_DELAY)
  if (message.command === "toggle_extension") {
    const url = message.data.url
    if (url.startsWith(INSTAGRAM_BASE_URL)) {
      const msg = {
        command: "open_new_tab",
        data: getLargePictureUrl(url),
      }
      chrome.runtime.sendMessage(msg)
    } else {
      alertBox.show()
    }
  }
  response()
}
