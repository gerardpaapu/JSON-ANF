var TokenType, SimpleTokens, tokenize, _tokenize;

TokenType = {
    JSONSTRING: 'JSONSTRING',
    JSONNUMBER: 'JSONNUMBER',
    COMMA: 'COMMA',
    OPENBRACKET: 'OPENBRACKET',
    CLOSEBRACKET: 'CLOSEBRACKET',
    OPENBRACE: 'OPENBRACE',
    CLOSEBRACE: 'CLOSEBRACE',
    OPENPAREN: 'OPENPAREN',
    CLOSEPAREN: 'CLOSEPAREN',
    FUNCTION_KW: 'FUNCTION_KW',
    RETURN_KW: 'RETURN_KW',
    SEMICOLON: 'SEMICOLON'
};

SimpleTokens = {
    COMMA: ',',
    SEMICOLON: ';',
    OPENBRACKET: '[', CLOSEBRACKET: ']',
    OPENBRACE: '{', CLOSEBRACE: '}',
    OPENPAREN: '(', CLOSEPAREN: ')',
    FUNCTION_KW: /^function\b/,
    RETURN_KW: /^return\b/
};

tokenize = function (src) {
    var tokens = [],
        emit;

    emit = function (token) {
        token.push(token);
    };

    _tokenize(src, emit);

    return tokens;
};

_tokenize = function (src, emit) {
    
};
