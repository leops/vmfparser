function recurse(node, indent = '') {
    return node.body.map(node => {
        switch (node.type) {
            case 'Object':
                return `${indent}${node.name}\n` +
                    `${indent}{\n` +
                    `${recurse(node, '    ' + indent)}\n` +
                    `${indent}}`;
            case 'Property':
                return `${indent}"${node.name}" "${node.value}"`;
        }
    }).join('\n');
}

module.exports = function(ast) {
    return recurse(ast);
}
