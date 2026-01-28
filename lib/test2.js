const hasOwn = require("./ObjectHasOwnProperty") 

Object.getOwnPropertyNames = () => "foo"
var obj = {}
obj.polluted = "foo"
console.log(hasOwn(obj,"polluted"))
console.log(hasOwn(obj,"constructor"))