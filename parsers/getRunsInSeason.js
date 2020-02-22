const axios = require("axios");
const cheerio = require("cheerio");
const functions = require("../functions");
const R = require('ramda');

module.exports = async function getRunsInSeason(season){

  const siteUrl = `https://www.uvponline.nl/uvponlineU/index.php/uvproot/wedstrijdschema/${season}`

  return functions.getUrl(siteUrl).then($ => {
    const wedstrijdagenda = $('table.wedstrijdagenda');
    
    let runs = functions.tableToJson(wedstrijdagenda, {
      headers: ['date', 'location', 'LSR', 'MSR', 'KSR', 'JSR', 'qualifier', 'distances', 'min_age', 'organiser', 'enroll_link', 'results_link']
    });

    return R.filter(run => !R.test(/ALV/, R.prop('location', run)), runs);
  });
}

