import tokenizer from './tokenizer';
import parser from './parser';
import transformer from './transformer';

interface ParserOptions {
    ast?: boolean;
}

export default function(input: string, options: ParserOptions = {}) {
    const tokens = tokenizer(input);
    const ast = parser(tokens);
    return options.ast ? ast : transformer(ast);
}
