VMFParser
=============

VMF is the format used by the Hammer editor to store maps before their
compilation. Since VMF has a syntax similar to JSON, I decided to write a VMF
parser in JavaScript. I have no idea why.

The code is interesting because it's doesn't have to be a map you're parsing.
You can actually use the VMF format to store any kind of data, JSON like.

See `test/example.js` for an usage example.

## Usage
The module exports a single `parse(input, options)` function. The `input` is a
VMF source string, and `options` is an optional object with the following
properties:

- `ast`: If true, will return the Abstract Syntax Tree instead of the
transformed object.

## Multiple values per-key
This is a unique functionnality of VMF, non-existent in JSON: the ability to
have multiple key with the same name but different values. Here's an example :

```JSON
{
    "someKey": 42,
    "someKey": "someValue"
}
```

If you try to parse this, you'll obtain this JS object :

```JS
{
    someKey: "someValue"
}
```

But with VMF, you can do this:

```VMF
"someKey" "42"
"someKey" "someValue"
```

And you'll get this object instead :

```JS
{
    someKey: ["42", "someValue"]
}
```
