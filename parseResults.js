const siteUrl = "https://www.uvponline.nl/uvponlineU/index.php/uitslag/toonuitslagcat/741/489/H";
const axios = require("axios");
const cheerio = require("cheerio");

const fetchData = async () => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

fetchData().then(value => {
  $ = value;
  const uitslagen = $('table.tbl-border');
  const runners = uitslagen.find('tr').slice(1).map((i, element) => ({
    place: $(element).find('td:nth-of-type(1)').text().trim(),
    name: $(element).find('td:nth-of-type(2)').text().trim(),
    lastname: $(element).find('td:nth-of-type(3)').text().trim(),
    residence: $(element).find('td:nth-of-type(4)').text().trim(),
    age: $(element).find('td:nth-of-type(5)').text().trim(),
    startnum: $(element).find('td:nth-of-type(6)').text().trim(),
    time: $(element).find('td:nth-of-type(7)').text().trim(),
    missedOb: $(element).find('td:nth-of-type(8)').text().trim(),
    points: $(element).find('td:nth-of-type(9)').text().trim()
  })).get();


  console.log(runners);
});

