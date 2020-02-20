const siteUrl = "https://www.uvponline.nl/uvponlineU/index.php/uvproot/wedstrijdschema/2019";
const axios = require("axios");
const cheerio = require("cheerio");

const fetchData = async () => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

fetchData().then(value => {
  $ = value;
  const wedstrijdagenda = $('table.wedstrijdagenda');
  console.log(wedstrijdagenda.text());
});


