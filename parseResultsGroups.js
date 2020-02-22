const siteUrl = "https://www.uvponline.nl/uvponlineU/index.php/uitslag/toonuitslagcat/794/1168/T";
const axios = require("axios");
const cheerio = require("cheerio");
const functions = require("./functions");
const R = require('ramda');

const fetchData = async () => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

fetchData().then(value => {
  $ = value;
  const uitslagen = $('table.tbl-border');
  const runners = functions.tableToJson(uitslagen, {
    headers: [
      'place',
      'groupname',
      'name',
      'lastname',
      'residence',
      'startnum',
      'time',
      'missedOb',
      'points'
    ]
  });

  let groups = functions.splitOn(R.has('groupname'), runners);
  groups = R.map(participants => {
    group = R.pick(['place', 'groupname', 'startnum', 'time', 'missedOb', 'points'], participants[0])
    participants = R.map(R.pick(['name', 'lastname', 'residence']), participants);
    return R.assoc('participants', participants, group);
  }, groups)
  console.log(groups);
});
