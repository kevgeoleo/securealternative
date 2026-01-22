const assert = require("assert");
const { StringSplitOnChar } = require("./index");
const { ArraySafeIndexOf } = require("./index");
const { StringSafeIndexOf } = require("./index");

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

assert.strictEqual(
  ArraySafeIndexOf([1, 2, 3], 2),
  1,
  "Should find element in array"
);

assert.strictEqual(
  ArraySafeIndexOf(["a", "b", "c"], "c"),
  2,
  "Should find string element"
);

assert.strictEqual(
  ArraySafeIndexOf([true, false], false),
  1,
  "Should work with booleans"
);

assert.strictEqual(
  ArraySafeIndexOf([1, 2, 3], 4),
  -1,
  "Should return -1 if element not found"
);

assert.strictEqual(
  ArraySafeIndexOf([], 1),
  -1,
  "Should return -1 for empty array"
);

/* -----------------------------
 * Strict equality behavior
 * ----------------------------- */

assert.strictEqual(
  ArraySafeIndexOf([1, "1"], "1"),
  1,
  "Should use strict equality (===)"
);

assert.strictEqual(
  ArraySafeIndexOf([0, false], false),
  1,
  "Should not coerce values"
);

/* -----------------------------
 * Prototype pollution / override tests
 * ----------------------------- */

// Malicious override
Array.prototype.indexOf = function () {
  return 999;
};

assert.strictEqual(
  ArraySafeIndexOf([1, 2, 3], 2),
  1,
  "Should ignore overridden Array.prototype.indexOf"
);

// Polluted prototype property
Object.prototype[1] = "polluted";

assert.strictEqual(
  ArraySafeIndexOf([10, 20, 30], 20),
  1,
  "Should not be affected by Object.prototype pollution"
);

// Cleanup
delete Array.prototype.indexOf;
delete Object.prototype[1];

/* -----------------------------
 * Length pollution tests
 * ----------------------------- */

const arr = [1, 2, 3];
arr.length = "3"; // polluted length (string)

assert.strictEqual(
  ArraySafeIndexOf(arr, 3),
  2,
  "Should handle polluted length safely"
);

/* -----------------------------
 * Input validation tests
 * ----------------------------- */

assert.throws(
  () => ArraySafeIndexOf("not-an-array", 1),
  TypeError,
  "Should throw if first argument is not an array"
);

assert.throws(
  () => ArraySafeIndexOf(null, 1),
  TypeError,
  "Should throw if array is null"
);

assert.throws(
  () => ArraySafeIndexOf(undefined, 1),
  TypeError,
  "Should throw if array is undefined"
);

console.log("✅ All tests passed for ArraySafeIndexOf")




console.assert(StringSafeIndexOf("hello", "h") === 0);
console.assert(StringSafeIndexOf("hello", "e") === 1);
console.assert(StringSafeIndexOf("hello", "o") === 4);
console.assert(StringSafeIndexOf("hello", "lo") === 3);
console.assert(StringSafeIndexOf("hello", "ll") === 2);
console.assert(StringSafeIndexOf("hello", "world") === -1);

console.log("✅ All tests passed for StringSafeIndexOf")
