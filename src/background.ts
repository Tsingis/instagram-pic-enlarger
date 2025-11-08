chrome.action.onClicked.addListener(handleAction)
chrome.commands.onCommand.addListener(handleAction)
chrome.runtime.onMessage.addListener(handleMessage)

async function handleAction(): Promise<void> {
  const activeTab = await getActiveTab()
  const msg = {
    command: "toggle_extension",
    data: activeTab,
  }
  if (activeTab.id == null) return
  await chrome.tabs.sendMessage(activeTab.id, msg)
}

async function handleMessage(message: any): Promise<void> {
  if (message.command === "open_new_tab") {
    await chrome.tabs.create({ url: message.data })
  }
}

async function getActiveTab(): Promise<chrome.tabs.Tab> {
  const queryOptions = {
    active: true,
    currentWindow: true,
  }
  const activeTabs = await chrome.tabs.query(queryOptions)
  return activeTabs[0]
}
