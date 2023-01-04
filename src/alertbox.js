class AlertBox {
  constructor(text, autocloseDelay = 2000)
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

export default AlertBox;