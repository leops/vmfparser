function addProp(obj, key, value) {
    const currentValue = obj[key];
    if(typeof currentValue !== 'undefined') {
        if(currentValue instanceof Array) {
            currentValue.push(value);
        } else {
            obj[key] = [currentValue, value];
        }
    } else {
        obj[key] = value;
    }
}

function reduce(obj, prop) {
    if (prop.type === 'Property') {
        addProp(obj, prop.name, prop.value);
    }

    if (prop.type === 'Object') {
        addProp(obj, prop.name, prop.body.reduce(reduce, {}));
    }

    return obj;
}

module.export = function(ast) {
    return ast.body.reduce(reduce, {});
}
