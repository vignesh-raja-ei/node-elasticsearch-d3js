var express = require('express')
var app = express()
var path = require('path')
var indices = require('./src/indices')

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

