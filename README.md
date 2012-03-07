JSON + ANF
==

The semantics of ANF encoded with a subset of Javascript.  

[http://en.wikipedia.org/wiki/Administrative_normal_form](Administrative Normal Form on Wikipedia)

    EXP ::= VAL VAL
         |  let VAR = EXP in EXP

    VAL ::= λ VAR . EXP
         |  VAR

    the  grammar for `VAL VAL` is "$VAL1($VAL2)"
    the concrete grammar for `λ VAR . EXP` is "function ($VAR) { return $EXP; }"
    the concrete grammar for `let VAR = EXP in EXP` is "(function ($VAR) { return $EXP2; }($EXP1))" 

`EXP` is extended to include any JSON data, as a consequence any JSON document is a valid JSON+ANF document.

JSON compound data types are extended so that they may contain any JSON+ANF values.

Not every syntactically correct JSON+ANF document is legal. Additionally the document must not invoke/return any unbound VARs.
