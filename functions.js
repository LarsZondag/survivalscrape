const R = require('ramda');
const $ = require('cheerio');

// plural of findIndex
function findIndices(fn, list) {
  var acc = [];
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (fn(list[idx])) {
      acc.push(idx);
    }
    idx += 1;
  }
  return acc;
}

// plural of splitWhen
function splitIndices(indices, list) {
  var acc = [];
  var len = indices.length + 1;
  var idx0 = 0;
  var idx1 = indices[0];
  var cnt = 0;
  while (cnt < len) {
    acc.push(R.slice(idx0, idx1, list))
    idx0 = indices[cnt];
    cnt++;
    idx1 = indices[cnt];
  }
  return acc;
}

module.exports = {
  tableToJson: function (table, options = {}) {
    const default_options = {
      skip_first_row: true,
      links_as_objects: true,
    }

    options = R.merge(default_options, options);
    let rows = table.find('tr');
    if (options.skip_first_row) rows = R.drop(1, rows);

    
    return $(rows).map((i, row) => {
      const cells = $(row).find('td');
      values = {};
      cells.each((index, el) => {
        el = $(el);
        let value;
        if (options.links_as_objects && el.find('a').length != 0) {
          el = el.find('a').first()
          value = {
            href: el.attr('href'),
            text: el.text().trim()
          }
        } else {
          value = el.text().trim();
        }
        const property = R.has('headers', options) ? options.headers[index] : index;
        if (value !== '') values[property] = value;
      });
      return values;
    }).get();
  },

  splitOn: function(fn, list) {
    let indices = findIndices(fn, list);
    indices = R.drop(1, indices);
    return splitIndices(indices, list);
  }
  
}