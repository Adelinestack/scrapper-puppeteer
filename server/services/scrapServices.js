const axios = require('axios');

const BASE_URL = `https://www.jsonstore.io/efbf987cc46a14bb64d3ed2cda1e6cc88cf28203da23a976817f0b2700bbf760`;

const importAdToBd = async dataAds => {
  return await axios.post(BASE_URL, dataAds, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
const getDatas = async () => {
  return await axios.get(BASE_URL);
};

module.exports = { importAdToBd, getDatas };
