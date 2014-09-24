VMFParser
=============

Since VMF has a syntax similar to JSON, I decided to write a VMF parser in JSON.
I have no idea why.

The interesting thing is, it doesn't have to be a VMF. You can actually use it
to hold any kind of data, JSON like.

# Multiple values per-key
This if the functionnality VMF but JSON does not: the ability to have multiple
key with the same name. Here's an example :

```JSON
"someKey": 42,
"someKey": "someValue"
```

If you try to parse this, you'll obtain this JS object :

```JS
someKey: "someValue
```

But with VMF, you can do this:

```VMF
"someKey" "42"
"someKey" "someValue"
```

And you'll get this object instead :

```JS
someKey: ["42", "someValue"]
```
