function StringSafeIndexOf(haystack, needle) {
  if (typeof haystack !== "string" || typeof needle !== "string") {
    return -1;
  }

  var hLen = haystack.length;
  var nLen = needle.length;

  if (nLen === 0) return 0;
  if (nLen > hLen) return -1;

  var i = 0;
  while (i <= hLen - nLen) {
    var j = 0;
    while (j < nLen && haystack[i + j] === needle[j]) {
      j = j + 1;
    }
    if (j === nLen) {
      return i;
    }
    i = i + 1;
  }
  return -1;
}

//Object.freeze(String.prototype)
//const StringSafeIndexOf = Function.call.bind(String.prototype.indexOf);
module.exports = StringSafeIndexOf;