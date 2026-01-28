const assert = require("assert");
const { StringSplitOnChar } = require("../index");
const { ArraySafeIndexOf } = require("../index");
const { StringSafeIndexOf } = require("../index");
const RegexSafeTest = require("../lib/RegexSafeTest");

// Test 1: default character (.)
assert.deepStrictEqual(
  StringSplitOnChar("a.b.c"),
  ["a", "b", "c"],
  "Should split on dot by default"
);

// Test 2: custom character
assert.deepStrictEqual(
  StringSplitOnChar("a-b-c", "-"),
  ["a", "b", "c"],
  "Should split on custom character"
);

// Test 3: no delimiter
assert.deepStrictEqual(
  StringSplitOnChar("abc"),
  ["abc"],
  "Should return full string if delimiter not found"
);

// Test 4: empty string
assert.deepStrictEqual(
  StringSplitOnChar(""),
  [""],
  "Should handle empty string"
);

// Test 5: invalid delimiter (should throw)
assert.throws(
  () => StringSplitOnChar("a.b.c", ".."),
  /single character/,
  "Should throw error if delimiter is longer than one char"
);

console.log("✅ All tests passed for StringSplitOnChar");

