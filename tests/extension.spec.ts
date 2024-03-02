import { test, expect } from "./fixtures";

test("extension loaded", async ({ page, extensionId }) => {
  await page.goto(`chrome://extensions/?id=${extensionId}`);
  await expect(page.locator("body")).toContainText("Enlarge Instagram Picture");
});

test("alarm shows", async ({ page }) => {
  await page.goto("https://example.com");
  await page.keyboard.press("Control+ShiftLeft+X");
  //TODO: Proper checks once supported https://github.com/microsoft/playwright/issues/22683
  await expect(page.locator("#enlarger-alert-box")).toHaveCount(0);
});