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
      bodySuggester: {
        phrase: {
          field: 'body'
        }
      }
    };

    console.log(`retrieving phrase suggestions for "${body.text}"...`);
    suggest('library', body)
    .then(results => {
      console.log(`suggestions for the phrase are:`);
      results.bodySuggester.forEach(phrase => {
        console.log(`phrase: ${phrase.text}`);
        phrase.options.forEach((option, index) => console.log(`\t suggestion ${++index}: ${option.text}`));
      });
    })
    .catch(console.error);
  };

  test();

  module.exports = {
    suggest
  };
} ());
