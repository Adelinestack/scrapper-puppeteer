const puppeteer = require('puppeteer');
const { navigateAndCollect } = require('./utils/functions');

const collectedDataAds = () =>
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 1000 });
    await page.goto('https://www.seloger.com/');

    await page.waitForSelector(`#agatha_quest0`);
    await page.evaluate(
      () => (document.querySelector('#agatha_quest0').style.display = 'block')
    );
    await page.click(`#agatha_quest0`);

    await page.waitForSelector(`#agatha_autocomplete_autocompleteUI__input`);
    await page.focus(`#agatha_autocomplete_autocompleteUI__input`);
    await page.keyboard.type(`Paris 20`);

    await page.waitForSelector(`.slam-aui-results-line.focus`);
    await page.click(`.slam-aui-results-line.focus`);

    await page.waitForSelector(`#agatha_budget>input`);
    await page.focus(`#agatha_budget>input`);
    await page.keyboard.type(`750`);

    await page.waitForSelector(`#agatha_biens0`);
    await page.evaluate(
      () => (document.querySelector('#agatha_biens0').style.display = 'block')
    );
    await page.click(`#agatha_biens0`);

    await page.waitForSelector(`.b-btn.b-prime.b-bow.c-quest-actions-search`);
    await page.click(`.b-btn.b-prime.b-bow.c-quest-actions-search`);

    await page.waitForSelector(`.c-lazy`);

    const data = await page.evaluate(() => {
      const dataTab = [];
      document.querySelectorAll(`.c-pa-list`).forEach(annonce => {
        const id = annonce.dataset.listingId;
        const room = annonce.querySelector(`.c-pa-criterion>em:first-child`)
          .innerText;
        const area = annonce.querySelector(`.c-pa-criterion>em:nth-child(2)`)
          .innerText;
        const price = annonce.querySelector(`.c-pa-cprice`).innerText;
        const city = annonce.querySelector(`.c-pa-city`).innerText;
        const img = JSON.parse(annonce.querySelector(`.c-lazy`).dataset.lazy)
          .url;
        const url = annonce.querySelector(`.c-pa-link`).href;
        const collectDate = Date.now();
        dataTab.push({ id, room, area, price, city, img, url, collectDate });
      });
      return dataTab;
    });

    const dataAds = await navigateAndCollect(data.slice(0, 5));

    await page.screenshot({ path: `./seloger.png` });
    await browser.close();
    return dataAds;
  })();

module.exports = { collectedDataAds };
