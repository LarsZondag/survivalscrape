const siteUrl = "https://www.uvponline.nl/uvponlineU/index.php/uitslag/toonuitslagcat/741/489/D";
const axios = require("axios");
const cheerio = require("cheerio");
const functions = require("../functions");

const fetchData = async () => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

fetchData().then(value => {
  $ = value;
  const uitslagen = $('table.tbl-border');
  const participants = functions.tableToJson(uitslagen, {
    headers: ['place','name','lastname','residence','age','startnum','time','missedOb','points']
  });
  const member_participants = functions.filterMembers(participants);
  console.log(member_participants);

});

