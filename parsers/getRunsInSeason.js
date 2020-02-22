const axios = require("axios");
const cheerio = require("cheerio");
const functions = require("../functions");

module.exports = function getRunsInSeason(season){

  const siteUrl = `https://www.uvponline.nl/uvponlineU/index.php/uvproot/wedstrijdschema/${season}`

  return functions.getUrl(siteUrl).then($ => {
    const wedstrijdagenda = $('table.wedstrijdagenda');
    
    return functions.tableToJson(wedstrijdagenda, {
      headers: ['date', 'location', 'LSR', 'MSR', 'KSR', 'JSR', 'qualifier', 'distances', 'min_age', 'organiser', 'enroll_link', 'results_link']
    });
  });
}

