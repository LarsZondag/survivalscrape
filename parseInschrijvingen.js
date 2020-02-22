const siteUrl = "https://www.uvponline.nl/uvponlineF/inschrijven_overzicht/440/1006";
const axios = require("axios");
const cheerio = require("cheerio");
const functions = require("./functions");

const fetchData = async () => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

fetchData().then(value => {
  $ = value;
  
  const inschrijvingen = $('#overzicht_indiv');
  const participants = functions.tableToJson(inschrijvingen, {
    headers: ['lastname','name','residence','gender','license']
  });
  const member_participants = functions.filterMembers(participants);
  console.log(member_participants);
});