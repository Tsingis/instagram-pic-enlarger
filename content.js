chrome.runtime.onMessage.addListener(
  (request, sender, response) => {
    if (request.command === "clicked_browser_action") {
      const url = request.data.url;
      if (url.startsWith("https://www.instagram.com/p/")) {
        msg = {
          command: "open_new_tab",
          data: getLargePictureUrl(url)
        };
        chrome.runtime.sendMessage(msg);
      } else {
        showAlertBox("This is not an Instagram post!");
        autoHideAlertBox(2);
      }
    }
  }
);

const getLargePictureUrl = (url) => {
  if (url.match(/\//g).length > 4) {
    url = url.substr(0, url.lastIndexOf("\/"));
  }
  return url + "/media/?size=l";
};

const createAlertBox = (text) => {
  const alertBox = document.createElement("div");
  alertBox.id = "enlarger-alert-box";
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

  const closeBtn = document.createElement("span");
  closeBtn.innerHTML = "&times;";
  closeBtn.style.marginLeft = "15px";
  closeBtn.style.marginRight = "5px";
  closeBtn.style.color = "white";
  closeBtn.style.fontWeight = "bold";
  closeBtn.style.cursor = "pointer";

  closeBtn.onclick = () => {
    hideAlertBox();
  };

  alertBox.appendChild(closeBtn);
  document.body.appendChild(alertBox);
};

const showAlertBox = (text) => {
  const alertBox = document.getElementById("enlarger-alert-box");
  if (alertBox != null) {
    alertBox.style.display = "initial";
    return;
  }
  createAlertBox(text);
};

const hideAlertBox = () => {
  const alertBox = document.getElementById("enlarger-alert-box");
  if (alertBox != null) {
    alertBox.style.display = "none";
  }
};

const autoHideAlertBox = (delayInSeconds) => {
  setTimeout(() => {
    hideAlertBox();
  }, delayInSeconds * 1000);
};