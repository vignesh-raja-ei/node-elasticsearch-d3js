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
      aggs: {
        by_groupname: {
          terms: {
            field: 'groupname'
          }
        }
      }
    };

  console.log(`retrieving all documents (displaying ${body.size} at a time)...`);
  search('mapbook2', body)
  .then(results => {
      var fields = ['key','doc_count'];
      var data1=results.aggregations.by_groupname.buckets; 
      console.log(results.aggregations.by_groupname.buckets);
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
