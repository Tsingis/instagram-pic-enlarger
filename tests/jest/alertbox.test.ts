import AlertBox from "../../src/alertbox"

describe("AlertBox", () => {
  beforeEach(() => {
    document.body.innerHTML = ""
  })

  it("Shows the alert when show() is called", () => {
    const alert = new AlertBox("Alert")
    alert.show()
    expect(alert.element?.style.display).toBe("inline")
    expect(alert.element?.textContent).toBe("Alert")
  })

  it("Hides the alert when close() is called", () => {
    const alert = new AlertBox("Alert")
    alert.show()
    alert.close()
    expect(alert.element?.style.display).toBe("none")
  })

  it("Auto closes after delay", async () => {
    jest.useFakeTimers()
    const alert = new AlertBox("Alert", 1000)
    alert.show()
    expect(alert.element?.style.display).toBe("inline")

    jest.advanceTimersByTime(1000)
    expect(alert.element?.style.display).toBe("none")
  })

  it("Closes when clicking the close button", () => {
    const alert = new AlertBox("Alert")
    alert.show()
    const closeBtn = alert.element?.querySelector("span") as HTMLElement
    closeBtn.click()
    expect(alert.element?.style.display).toBe("none")
  })
})
