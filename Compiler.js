function Compiler () {}
Compiler.prototype.compile = function () {
    var src = this;

    return this.template.replace(/\$\{(.+)\}/g, function (_, key) {
        return Compiler.compile(src[key]);
    });
};

Compiler.compile = function (obj) {
    return obj instanceof Compiler ? obj.compile() : obj.toString();
};


function Application(operator, operand) {
    this.operator = operator;
    this.operand = operand;
}

Application.prototype = Object.create(Compiler.prototype);
Application.prototype.template = "${operator}(${operand})";

function Lambda(argument, body) {
    this.argument = argument;
    this.body = body;
}

Lambda.prototype = Object.create(Compiler.prototype);
Lambda.prototype.template = "function (${argument}) { return ${body}; }";

function LetExpression (symbol, value, body) {
    this.symbol = symbol;
    this.value = value;
    this.body = body;
}
LetExpression.prototype = Object.create(Compiler.prototype);
LetExpression.prototype.template = "(function (${symbol}) { return ${body}; }($value))";

function Dictionary(dict) {
    this.dict = dict;  
}
Dictionary.prototype = Object.create(Compiler.prototype);
Dictionary.compile = function () {
    var k, v, body, pair;

    body = [];

    for (k in this.dict) {
        if (Object.prototype.hasOwnProperty.call(this.dict, k)) {
            v = this.dict[k];
            body.push( JSON.stringify(k) + ':' + Compiler.compile(v) );
        }
    }

    return '{' + body.join(',') + '}';
};

function List(items) {
    this.items = items;
}

List.prototype = Object.create(Compiler.prototype);
List.compile = function () {
    return '[' + this.items.map(Compiler.compile).join(',') + ']';
};

function JSONValue(value) {
    this.value = value;
}

JSONValue.prototype = Object.create(Compiler.prototype);
JSONValue.prototype.compile = function () {
    return JSON.stringify(this.value);
};
