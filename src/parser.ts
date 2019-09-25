import { Token } from './tokenizer';

export interface File {
    type: 'File';
    body: Node[];
}
export interface Object {
    type: 'Object';
    name: string;
    body: Node[];
}
export interface Property {
    type: 'Property';
    name: string;
    value: string;
}

export type Node = Object | Property;

export default function parser(tokens: Token[]): File {
    let current = 0;

    function walk() {
        let token = tokens[current];

        switch (token.type) {
            case 'string': {
                const node: Property = {
                    type: 'Property',
                    name: token.value,
                    value: '',
                };

                token = tokens[++current];
                node.value = token.value;

                current++;
                return node;
            }

            case 'name': {
                const node: Object = {
                    type: 'Object',
                    name: token.value,
                    body: [],
                };

                token = tokens[(current += 2)];

                while (
                    token.type !== 'bracket' ||
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

    const ast: File = {
        type: 'File',
        body: [],
    };

    while (current < tokens.length) {
        ast.body.push(walk());
    }

    return ast;
}
