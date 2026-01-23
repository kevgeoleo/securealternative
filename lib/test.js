var x = require("./RegexSafeTest")
console.log(x(/hello/,"hell world"))
console.log(x(/hello/, "hello');console.log('aaa');//"))
//console.log(x(/hello/, "hello')); console.log('aaa'); //"))
