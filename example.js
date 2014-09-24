// Parsing example using https://github.com/thorsummoner/vmf_demo
var fs = require('fs'),
    parser = require('./main.js');

fs.readFile('./vmf_demo.vmf', function(err, data) {
    if(err) return console.error(err);
    data = data.toString();
    data = parser(data);
    data = JSON.stringify(data, null, '\t');
    console.log(data);
});
