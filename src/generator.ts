import { File, Object } from './parser';

function recurse(node: File | Object, indent = ''): string {
    return node.body
        .map(node => {
            switch (node.type) {
                case 'Object':
                    return (
                        `${indent}${node.name}\n` +
                        `${indent}{\n` +
                        `${recurse(node, '    ' + indent)}\n` +
                        `${indent}}`
                    );
                case 'Property':
                    return `${indent}"${node.name}" "${node.value}"`;
            }
        })
        .join('\n');
}

export function generate(ast: File) {
    return recurse(ast);
}
