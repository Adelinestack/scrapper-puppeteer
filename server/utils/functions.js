const puppeteer = require('puppeteer');

const collect = async url => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000 });
  await page.goto(url);
  await page.waitForSelector(`#js-descriptifBien`);
  const description = await page.evaluate(
    () => document.querySelector(`#js-descriptifBien`).innerText
  );
  await browser.close();
  return description;
};

const navigateAndCollect = async (data, results = []) => {
  if (data.length === 0) {
    return results;
  }
  const desc = await collect(data[0].url);
  return navigateAndCollect(data.slice(1), [...results, { ...data[0], desc }]);
};

module.exports = { collect, navigateAndCollect };
