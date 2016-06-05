const tokenizer = require('./tokenizer');
const parser = require('./parser');
const transformer = require('./transformer');

module.exports = function(input, options) {
    options = Object.assign({
        ast: false
    }, options);

    const tokens = tokenizer(input);
    const ast = parser(tokens);

    return options.ast ? ast : transformer(ast);
}
