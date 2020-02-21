const siteUrl = "https://www.uvponline.nl/uvponlineU/index.php/uvproot/wedstrijdschema/2019";
const axios = require("axios");
const cheerio = require("cheerio");
const functions = require("./tableToJson");

const fetchData = async () => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

fetchData().then(value => {
  $ = value;
  const wedstrijdagenda = $('table.wedstrijdagenda');
  const runs = functions.tableToJson(wedstrijdagenda, {
    headers: ['date', 'location', 'LSR', 'MSR', 'KSR', 'JSR', 'qualifier', 'distances', 'min_age', 'organiser', 'enroll_link', 'results_link']
  })

  console.log(runs);
});

