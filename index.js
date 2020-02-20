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
  const runs = wedstrijdagenda.find('tr').slice(1).map((i, element) => ({
    date: $(element).find('td:nth-of-type(1)').text().trim(),
    location: $(element).find('td:nth-of-type(2)').text().trim(),
    distances: $(element).find('td:nth-of-type(8)').text().trim()
  })).get();


  console.log(runs);
});

