const R = require('ramda');
const $ = require('cheerio');

module.exports = {
  tableToJson: function (table, options = {}) {
    const default_options = {
      skip_first_row: true,
    }
    options = R.merge(default_options, options);
    let rows = table.find('tr');
    if (options.skip_first_row) rows = R.drop(1, rows);

    
    return $(rows).map((i, row) => {
      const cells = $(row).find('td');
      values = {};
      cells.each((index, el) => {
        const value = $(el).text().trim();
        const property = R.has('headers', options) ? options.headers[index] : index;
        values[property] = value;
      });
      return values;
    }).get();
  }
  
}