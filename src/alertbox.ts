class AlertBox {
  id: string;
  text: string;
  autocloseDelay?: number;
  element?: HTMLElement;

  constructor(text: string, autocloseDelay?: number)
  {
    this.id = "enlarger-alert-box";
    this.text = text;
    this.autocloseDelay = autocloseDelay;
    this.element = this.#create();
  }

  show(): void {
    if (this.element == null) return;
    this.element.style.display = "inline";
    if (this.autocloseDelay != null && this.autocloseDelay > 0) {
      this.#autoclose();
    }
  }

  close(): void {
    if (this.element == null) return;
    this.element.style.display = "none";
  }

  #autoclose(): void {
    setTimeout(() => {
      this.close();
    }, this.autocloseDelay);
  }

  #create(): HTMLElement {
    const alertBoxElem = document.createElement("div");
    alertBoxElem.id = this.id;
    alertBoxElem.innerText = this.text;
    alertBoxElem.style.display = "none";
    alertBoxElem.style.boxSizing = "border-box";
    alertBoxElem.style.font = "25px Verdana, sans-serif";
    alertBoxElem.style.position = "fixed";
    alertBoxElem.style.top = "1em";
    alertBoxElem.style.right = "1em";
    alertBoxElem.style.zIndex = "9999999";
    alertBoxElem.style.padding = "10px";
    alertBoxElem.style.borderRadius = "5px"
    alertBoxElem.style.color = "white";
    alertBoxElem.style.backgroundColor = "#ff9800";
  
    const closeBtn = this.#createCloseButton()
    alertBoxElem.appendChild(closeBtn);
    document.body.appendChild(alertBoxElem);
    return alertBoxElem;
  };
  
  #createCloseButton(): HTMLElement {
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