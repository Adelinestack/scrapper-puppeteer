const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { importAdToBd, getDatas } = require('./services/scrapServices');
const { collectedDataAds } = require('./scrap');

app.post('/', async (req, res) => {
  const datas = await collectedDataAds();
  await importAdToBd(datas);
  res.sendStatus(201);
});

app.get('/', async (req, res) => {
  const {
    data: { result },
  } = await getDatas();
  res.json(result);
});

const server = app.listen(4000, (req, res) => {
  console.log(`server started on ${server.address().port}`);
});
