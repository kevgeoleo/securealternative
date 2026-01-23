function ArraySafeIndexOf(arr, searchElement) {
  if (!Array.isArray(arr)) {
    throw new TypeError("First argument must be an array");
  }

  var i = 0;
  var len = arr.length >>> 0; // force uint32, avoids weird length pollution

  while (i < len) {
    // Strict equality avoids coercion issues
    if (arr[i] === searchElement) {
      return i;
    }
    i++;
  }

  return -1;
}

module.exports = ArraySafeIndexOf;
