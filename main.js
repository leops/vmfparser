var _ = require('lodash'),
    XRegExp = require('XRegExp').XRegExp;

function pair(b, c) {
    var a = {};
    a[b] = c;
    return a;
}

function process(value) {
    return _.reduce(value.split('\n').filter(function(e) {
        return e && e !== '';
    }), function(result, line) {
        line = line.split('"').filter(function(e) {
            return e && e.match(/^\s*$/) === null;
        });
        if(line.length >= 2) {
            result = merge(result, pair(line[0], line[1]));
        }
        return result;
    }, {});
}

function merge(dest, src) {
    for(var i in src) {
        if(dest[i]) {
            if(dest[i] instanceof Array) {
                dest[i].push(src[i]);
            } else {
                dest[i] = [dest[i], src[i]];
            }
        } else {
            dest[i] = src[i];
        }
    }
    return dest;
}

module.exports = exports = function parse(code) {
    var ret = {},
        res = XRegExp.matchRecursive(code, '{', '}', 'g', {
            valueNames: ['key', null, 'value', null]
        });

    for(var i = 0; i < res.length - 1; i += 2) {
        var key = res[i].name.replace(/\n/g, ''),
            value = res[i + 1].name,
            spl = res[i].name.split('\n').filter(function(e) {
                return e && e.match(/^\s*$/) === null;
            });

        if(spl[spl.length - 1].match(/"/) === null) {
            key = spl.pop().replace(/[\s\n]/g, '');
            _.merge(ret, process(spl.join('\n')));
        }

        if(key.match(/^\w+$/)) {
            var val = null;
            if(value.match(/\{/)) {
                val = parse(value);
            } else {
                val = process(value);
            }
            ret = merge(ret, pair(key, val));
        } else {
            ret = merge(ret, process(res[i].name));
        }
    }

    return ret;
};
