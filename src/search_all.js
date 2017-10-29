var esClient = require ('./client');
var json2csv = require('json2csv');
var fs = require('fs');

(function () {
  'use strict';

  const search = function search(index, body) {
    return esClient.search({index: index, body: body});
  };

  // only for testing purposes
  // all calls should be initiated through the module
  const test = function test() {
    let body = {
      size: 5,
      from: 0,
      query: {
        match_all: {}
      }
    };

    console.log(`retrieving all documents (displaying ${body.size} at a time)...`);
    search('mapbook', body)
    .then(results => {
      // console.log(`found ${results.hits.total} items in ${results.took}ms`);
      // console.log(`returned article titles:`);
      // results.hits.hits.forEach((hit, index) => {
      //   console.log(`\t${body.from + ++index} - ${hit._source.locationName}`);
      //   console.log(`\t${body.from + ++index} - ${hit._source.groupName}`)
      // }); 
      
      var fields = ['_source.locationName','_source.groupName'];
      var data1=results.hits.hits; 
      // console.log(data1);
      var csv = json2csv({ data: data1, fields: fields });

      fs.writeFile('../public/file.csv', csv, function(err) {
        if (err) throw err;
        console.log('file saved');
      });
    })
    .catch(console.error);
  };

  test();

  module.exports = {
    search
  };
} ());
