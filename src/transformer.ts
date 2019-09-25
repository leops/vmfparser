import { File, Node } from './parser';

function addProp(obj: any, key: string, value: string) {
    const currentValue = obj[key];
    if (typeof currentValue !== 'undefined') {
        if (Array.isArray(currentValue)) {
            currentValue.push(value);
        } else {
            obj[key] = [currentValue, value];
        }
    } else {
        obj[key] = value;
    }
}

function reduce(obj: any, prop: Node) {
    if (prop.type === 'Property') {
        addProp(obj, prop.name, prop.value);
    }

    if (prop.type === 'Object') {
        addProp(obj, prop.name, prop.body.reduce(reduce, {}));
    }

    return obj;
}

export default function transformer(ast: File) {
    return ast.body.reduce(reduce, {});
}
