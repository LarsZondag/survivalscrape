const siteUrl = "https://www.uvponline.nl/uvponlineF/inschrijven_overzicht/431"; // Inschrijflink
const axios = require("axios");
const cheerio = require("cheerio");

const fetchData = async () => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

fetchData().then(value => {
  $ = value;
  const inschrijflinks = $('#ingeschreven_cats a');
  
  console.log(inschrijflinks);
});