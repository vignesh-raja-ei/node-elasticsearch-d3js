var esClient = require ('./client');
var json2csv = require('json2csv');
var fs = require('fs');

(function () {
  'use strict';

  const indices = function indices() {
    return esClient.cat.indices({v: true})
    .then(function (resp) {
            console.log(resp);
})
    .catch(err => console.error(`Error connecting to the es client: ${err}`));
};

  // only for testing purposes
  // all calls should be initiated through the module
  const test = function test() {
    console.log(`elasticsearch indices information:`);
    indices();
  };

  test();

  module.exports = {
    indices
  };
} ());
