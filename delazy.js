// A sketch of how I might tackle circular-references 
//
// The function `delazy` will walk a structure that may contain delayed values (represented as functions)
// forcing each delayed value and leaving each other value intact 
// 
// An Example
// -----------
//    > var a;
//    > a = { foo: function () { return a; } };
//    { foo: [Function] }
//    > delazy(a)
//    { foo: [Circular] }
//
function delazy(value, seen) {
    var i, k, _seen;
    
    // seen is an array of nodes delazy has visited 
    seen = seen || [];

    // we shouldn't visit any node more than once
    // so we bail out
    if (seen.indexOf(value) != -1) return;

    _seen = seen.concat(value);

    switch (type(value)) {
    case 'array':
        i = value.length;
        while (i--) {
            if (type(value[i]) == 'function') {
                value[i] = value[i].call(null);
            }

            delazy(value[i], _seen); 
        }
    break;

    case 'object':
        for (k in value) if (hasOwn(value, k)) {
            if (type(value[k]) == 'function') {
                value[k] = value[k].call(null);
            }

            delazy(value[k], _seen); 
        } 
    break;
    }

    return value;
}

function type(val) {
    // The internal property [[Class]] of a given javascript
    // object is a reliable way to identify various builtins
    //
    // ECMA-262 8.6.2 discusses the internal properties
    // common to all Ecmascript Objects including [[Class]]
    //
    // ECMA-262 15.2.4.2 discusses the use of
    // Object.prototype.toString to observe [[Class]]

    return val == (void 0)  ? String(val)
        :  toString.call(val).slice(8, -1).toLowerCase();
};

function hasOwn(o, k) {
    return Object.prototype.hasOwnProperty.call(o, k);
}

if (typeof module != 'undefined' && module.exports) {
    exports.delazy = delazy;
}
