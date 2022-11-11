import { Builder, Capabilities, By } from "selenium-webdriver";

require("chromedriver");

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeEach(async () => {
  driver.get("http://localhost:3000/");
});

afterAll(async () => {
  driver.quit();
});

test("Title shows up when page loads", async () => {
  const title = await driver.findElement(By.id("title"));
  const displayed = await title.isDisplayed();
  expect(displayed).toBe(true);
});

test("Clicking draw displays choices", async () => {
  const drawButton = await driver.findElement(By.id("draw"));
  await drawButton.click();

  const choices = await driver.findElement(By.id("choices"));
  const displayed = await choices.isDisplayed();
  expect(displayed).toBe(true);
});

test("Clicking draw displays choices", async () => {
  const drawButton = await driver.findElement(By.id("draw"));
  await drawButton.click();

  const addToDuoButton = await driver.findElement(By.className("bot-btn"));
  await addToDuoButton.click();

  const playerDuo = await driver.findElement(By.id("player-duo"));
  const displayed = await playerDuo.isDisplayed();
  expect(displayed).toBe(true);
});
