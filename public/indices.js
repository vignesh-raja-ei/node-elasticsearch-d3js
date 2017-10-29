var esClient = require ('./client');
var d3 = require ('d3');
const jsDom = require('jsdom');

(function () {
  'use strict';

  const indices = function indices() {
    return esClient.cat.indices({v: true})
    .then(function (resp) {
            console.log(resp);
            /*------------*/
            var w = 400
var h = 400


function bars(resp)
{

    max = d3.max(resp)

    //nice breakdown of d3 scales
    //http://www.jeromecukier.net/blog/2011/08/11/d3-scales-and-color/
    x = d3.scale.linear()
        .domain([0, max])
        .range([0, w])

    y = d3.scale.ordinal()
        .domain(d3.range(data.length))
        .rangeBands([0, h], .2)


    var vis = d3.select("#barchart")
    
    //a good written tutorial of d3 selections coming from protovis
    //http://www.jeromecukier.net/blog/2011/08/09/d3-adding-stuff-and-oh-understanding-selections/
    var bars = vis.selectAll("rect.bar")
        .data(data)

    //update
    bars
        .attr("fill", "#0a0")
        .attr("stroke", "#050")

    //enter
    bars.enter()
        .append("svg:rect")
        .attr("class", "bar")
        .attr("fill", "#800")
        .attr("stroke", "#800")


    //exit 
    bars.exit()
    .transition()
    .duration(300)
    .ease("exp")
        .attr("width", 0)
        .remove()


    bars
        .attr("stroke-width", 4)
    .transition()
    .duration(300)
    .ease("quad")
        .attr("width", x)
        .attr("height", y.rangeBand())
        .attr("transform", function(d,i) {
            return "translate(" + [0, y(i)] + ")"
        })

}

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
