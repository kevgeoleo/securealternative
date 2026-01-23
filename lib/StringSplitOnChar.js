function StringSplitOnChar(str,c = '.') {
  var result = [];
  var current = "";
  var i = 0;

  // Validate first argument
  if (typeof str !== "string") {
    throw new TypeError("1st parameter must be a string");
  }

  // Validate second argument
  if (typeof c !== "string" || c.length !== 1) {
    throw new TypeError("2nd parameter must be a single character string");
  }

  while (i < str.length) {
    if (str[i] === c) {
      result[result.length] = current;
      current = "";
    } else {
      current = current + str[i];
    }
    i = i + 1;
  }

  result[result.length] = current;
  return result;
}

module.exports = StringSplitOnChar;