import { test as base, chromium, type BrowserContext } from "@playwright/test"
import path from "node:path"

export const test = base.extend<{
  context: BrowserContext
  extensionId: string
}>({
  /* eslint-disable no-empty-pattern */
  context: async ({}, use: any) => {
    const pathToExtension = path.join(__dirname, "..", "release")
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: [
        `--headless=new`,
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    })
    await use(context)
    await context.close()
  },
  extensionId: async ({ context }: any, use: any) => {
    let [background] = context.serviceWorkers()
    background ??= await context.waitForEvent("serviceworker")
    const extensionId = background.url().split("/")[2]
    await use(extensionId)
  },
})
export const expect = test.expect
