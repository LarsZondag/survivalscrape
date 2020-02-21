const siteUrl = "https://www.uvponline.nl/uvponlineU/index.php/uitslag/toonuitslagcat/741/489/H";
const axios = require("axios");
const cheerio = require("cheerio");
const functions = require("./tableToJson");

const fetchData = async () => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

fetchData().then(value => {
  $ = value;
  const uitslagen = $('table.tbl-border');
  const jsonResults = functions.tableToJson(uitslagen, {
    headers: ['place','name','lastname','residence','age','startnum','time','missedOb','points']
  });

  console.log(jsonResults);

});

