const siteUrl = "https://www.uvponline.nl/uvponlineU/index.php/uitslag/toonuitslagcat/794/1168/T";
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
    groupname: $(element).find('td:nth-of-type(2)').text().trim(),
    name: $(element).find('td:nth-of-type(3)').text().trim(),
    lastname: $(element).find('td:nth-of-type(4)').text().trim(),
    residence: $(element).find('td:nth-of-type(5)').text().trim(),
    startnum: $(element).find('td:nth-of-type(6)').text().trim(),
    time: $(element).find('td:nth-of-type(7)').text().trim(),
    missedOb: $(element).find('td:nth-of-type(8)').text().trim(),
    points: $(element).find('td:nth-of-type(9)').text().trim()
  })).get();

  // Group data per group
  var currentGroup = runners[0];
  for (const runner of runners) {
    
    // Find first group member
    if (runner.place != '') {
        runner.name = [runner.name];
        runner.lastname = [runner.lastname];
        runner.residence = [runner.residence];
        currentGroup = runner;
    }

    // Add other members to first member
    else {
        currentGroup.name.push(runner.name);
        currentGroup.lastname.push(runner.lastname);
        currentGroup.residence.push(runner.residence);
    }
  }

  // Remove other group members extra data
  for (i = 0; i < runners.length; i++) {
      if (runners[i].place == '') {
          runners.splice(i, 1);
          i--;
      }
  }

  console.log(runners);

});
