const WHITESPACE = /\s/;
const NAME = /[a-z_]/i;

module.exports = function(input) {
    const tokens = [];
    let current = 0;

    while (current < input.length) {
        let char = input[current];

        switch(true) {
            case (char === '{' || char === '}'):
                tokens.push({
                    type: 'bracket',
                    value: char
                });

                current++;
                continue;

            case (char === '"'): {
                let value = '';
                char = input[++current];

                while (char !== '"') {
                    value += char;
                    char = input[++current];
                }

                tokens.push({
                    type: 'string',
                    value
                });

                current++;
                continue;
            }

            case WHITESPACE.test(char):
                current++;
                continue;

            case NAME.test(char): {
                let value = '';

                while (NAME.test(char)) {
                    value += char;
                    char = input[++current];
                }

                tokens.push({
                    type: 'name',
                    value
                });

                continue;
            }

            default:
                throw new TypeError(`Unknown character: ${char} at position ${current}`);
        }
    }

    return tokens;
}
