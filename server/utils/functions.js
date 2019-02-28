const puppeteer = require('puppeteer');

const collect = async url => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000 });
  await page.goto(url);
  await page.waitForSelector(`#js-descriptifBien`);
  const datas = await page.evaluate(() => {
    const desc = document.querySelector(`#js-descriptifBien`).innerText;
    const title = document.querySelector(`.detail-title.title1`).innerText;
    return { desc, title };
  });
  await browser.close();
  return datas;
};

const navigateAndCollect = async (data, results = []) => {
  if (data.length === 0) {
    return results;
  }
  const descAndTitle = await collect(data[0].url);
  return navigateAndCollect(data.slice(1), [
    ...results,
    { ...data[0], ...descAndTitle },
  ]);
};

module.exports = { collect, navigateAndCollect };
