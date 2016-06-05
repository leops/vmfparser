module.export = function(tokens) {
    let current = 0;

    function walk() {
        let token = tokens[current];

        switch(token.type) {
            case 'string': {
                const node = {
                    type: 'Property',
                    name: token.value
                };

                token = tokens[++current];
                node.value = token.value;

                current++;
                return node;
            }

            case 'name': {
                const node = {
                    type: 'Object',
                    name: token.value,
                    body: []
                };

                token = tokens[current += 2];

                while (
                    (token.type !== 'bracket') ||
                    (token.type === 'bracket' && token.value !== '}')
                ) {
                    node.body.push(walk());
                    token = tokens[current];
                }

                current++;
                return node;
            }

            default:
                throw new TypeError(`Unknown token type: ${token.type}`);
        }
    }

    var ast = {
        type: 'File',
        body: []
    };

    while (current < tokens.length) {
        ast.body.push(walk());
    }

    return ast;
}
