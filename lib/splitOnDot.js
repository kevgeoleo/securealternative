function splitOnDot(str) {
  var result = [];
  var current = "";
  var i = 0;

  while (i < str.length) {
    if (str[i] === ".") {
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