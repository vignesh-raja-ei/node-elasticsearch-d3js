var esClient = require ('./client');

(function () {
  'use strict';

  const suggest = function search(index, body) {
    return esClient.suggest({index: index, body: body});
  };

  // only for testing purposes
  // all calls should be initiated through the module
  const test = function test() {
    let body = {
      text: 'dolo lore fugi',
      titleSuggester: {
        term: {
          field: 'title'
        }
      }
    };

    console.log(`retrieving term suggestions for "${body.text}"...`);
    suggest('library', body)
    .then(results => {
      console.log(`suggestions for each term are:`);
      results.titleSuggester.forEach((term, index) => {
        console.log(`term ${++index}: ${term.text}`);
        term.options.forEach((option, index) => console.log(`\t suggestion ${++index}: ${option.text}`));
      });
    })
    .catch(console.error);
  };

  test();

  module.exports = {
    suggest
  };
} ());
