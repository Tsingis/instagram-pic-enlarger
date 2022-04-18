const ALERTBOX_TEXT = "This is not an Instagram post!";
const ALERTBOX_AUTOCLOSE_DELAY = 2000;
const INSTAGRAM_BASE_URL = "https://www.instagram.com/p/";

class AlertBox {
  constructor(text, autocloseDelay = 0)
  {
    this.id = "enlarger-alert-box";
    this.text = text;
    this.autocloseDelay = autocloseDelay;
    this.element = this.#create();
  }

  show() {
    if (this.element == null) return;
    this.element.style.display = "inline";
    if (this.autocloseDelay > 0) {
      this.#autoclose();
    }
  }

  close() {
    if (this.element == null) return;
    this.element.style.display = "none";
  }

  #autoclose() {
    setTimeout(() => {
      this.close();
    }, this.autocloseDelay);
  }

  #create() {
    const alertBoxElem = document.createElement("div");
    alertBoxElem.id = this.id;
    alertBoxElem.innerText = this.text;
    alertBoxElem.style.display = "none";
    alertBoxElem.style.boxSizing = "border-box";
    alertBoxElem.style.font = "25px Verdana, sans-serif";
    alertBoxElem.style.position = "fixed";
    alertBoxElem.style.top = "1em";
    alertBoxElem.style.right = "1em";
    alertBoxElem.style.zIndex = 9999999;
    alertBoxElem.style.padding = "10px";
    alertBoxElem.style.borderRadius = "5px"
    alertBoxElem.style.color = "white";
    alertBoxElem.style.backgroundColor = "#ff9800";
  
    const closeBtn = this.#createCloseButton()
    alertBoxElem.appendChild(closeBtn);
    document.body.appendChild(alertBoxElem);
    return alertBoxElem;
  };
  
  #createCloseButton() {
    const closeBtn = document.createElement("span");
    closeBtn.innerText = "×";
    closeBtn.style.marginLeft = "10px";
    closeBtn.style.marginRight = "5px";
    closeBtn.style.fontWeight = "bold";
    closeBtn.style.cursor = "pointer";
    closeBtn.onclick = () => this.close();
    return closeBtn;
  }
}

let alertBox = new AlertBox(ALERTBOX_TEXT, ALERTBOX_AUTOCLOSE_DELAY);

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


chrome.runtime.onMessage.addListener(handleMessage);