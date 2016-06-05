// Parsing example using https://github.com/thorsummoner/vmf_demo
const fs = require('fs');
const parser = require('./index');

fs.readFile('./vmf_demo.vmf', (err, data) => {
    if(err) {
        return console.error(err);
    }

    const str = data.toString();
    const parsed = parser(str);
    const json = JSON.stringify(parsed, null, '\t');
    console.log(json);
});
