const ALERTBOX_ID = "enlarger-alert-box";
const ALERTBOX_TEXT = "This is not an Instagram post!";
const ALERTBOX_AUTOCLOSE_DELAY = 2000;
const INSTAGRAM_BASE_URL = "https://www.instagram.com/p/";

function handleMessage(message, sender, response) {
    if (message.command === "clicked_browser_action") {
      const url = message.data.url;
      if (url.startsWith(INSTAGRAM_BASE_URL)) {
        const msg = {
          command: "open_new_tab",
          data: getLargePictureUrl(url)
        };
        chrome.runtime.sendMessage(msg);
      } else {
        showAlertBox(ALERTBOX_AUTOCLOSE_DELAY);
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

function getAlertBox() {
  let alertBox = document.getElementById(ALERTBOX_ID);
  if (alertBox == null) {
    alertBox = createAlertBox(ALERTBOX_ID, ALERTBOX_TEXT);
  }
  return alertBox;
}

function showAlertBox(autocloseDelay = 1000) {
  const alertBox = getAlertBox();
  if (alertBox != null) {
    alertBox.style.display = "initial";
  }

  if (autocloseDelay > 0) {
    closeAlertBoxWithDelay(autocloseDelay);
  }
};

function closeAlertBox() {
  const alertBox = getAlertBox();
  if (alertBox != null) {
    alertBox.style.display = "none";
  }
};

function closeAlertBoxWithDelay(delay) {
  setTimeout(() => {
    closeAlertBox();
  }, delay);
};

function createAlertBox(id, text) {
  const alertBox = document.createElement("div");
  alertBox.id = id;
  alertBox.innerText = text;
  alertBox.style.boxSizing = "border-box";
  alertBox.style.font = "25px Verdana, sans-serif";
  alertBox.style.position = "fixed";
  alertBox.style.top = "1em";
  alertBox.style.right = "1em";
  alertBox.style.zIndex = 9999999;
  alertBox.style.padding = "10px";
  alertBox.style.borderRadius = "5px"
  alertBox.style.color = "white";
  alertBox.style.backgroundColor = "#ff9800";

  const closeBtn = createCloseButton(closeAlertBox)
  alertBox.appendChild(closeBtn);
  document.body.appendChild(alertBox);
};

function createCloseButton(handleClose) {
  const closeBtn = document.createElement("span");
  closeBtn.innerText = "×";
  closeBtn.style.marginLeft = "10px";
  closeBtn.style.marginRight = "5px";
  closeBtn.style.fontWeight = "bold";
  closeBtn.style.cursor = "pointer";
  closeBtn.onclick = () => handleClose();
  return closeBtn;
}

chrome.runtime.onMessage.addListener(handleMessage);