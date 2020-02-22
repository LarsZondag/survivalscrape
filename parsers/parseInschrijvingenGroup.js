const siteUrl = "https://www.uvponline.nl/uvponlineF/inschrijven_overzicht/478/1231";
const axios = require("axios");
const cheerio = require("cheerio");
const functions = require("../functions");
const R = require('ramda');

const fetchData = async () => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

fetchData().then(value => {
  $ = value;
  const inschrijvingen = $('#overzicht_groep');
  const runners = functions.tableToJson(inschrijvingen, {
    headers: [
      'groupname',
      'lastname',
      'name',
      'residence',
      'gender'
    ]
  });
  
  let groups = functions.splitOn(R.has('groupname'), runners);
  groups = R.map(participants => {
    group = R.pick(['groupname'], participants[0])
    participants = R.map(R.pick(['lastname', 'name', 'residence']), participants);
    return R.assoc('participants', participants, group);
  }, groups)
  console.log(groups);
});
