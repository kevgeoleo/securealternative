const assert = require("assert");
const { splitOnChar } = require("./index");
const { safeIndexOf } = require("./index");

// Test 1: default character (.)
assert.deepStrictEqual(
  splitOnChar("a.b.c"),
  ["a", "b", "c"],
  "Should split on dot by default"
);

// Test 2: custom character
assert.deepStrictEqual(
  splitOnChar("a-b-c", "-"),
  ["a", "b", "c"],
  "Should split on custom character"
);

// Test 3: no delimiter
assert.deepStrictEqual(
  splitOnChar("abc"),
  ["abc"],
  "Should return full string if delimiter not found"
);

// Test 4: empty string
assert.deepStrictEqual(
  splitOnChar(""),
  [""],
  "Should handle empty string"
);

// Test 5: invalid delimiter (should throw)
assert.throws(
  () => splitOnChar("a.b.c", ".."),
  /single character/,
  "Should throw error if delimiter is longer than one char"
);

console.log("✅ All tests passed for splitOnChar");

assert.strictEqual(
  safeIndexOf([1, 2, 3], 2),
  1,
  "Should find element in array"
);

assert.strictEqual(
  safeIndexOf(["a", "b", "c"], "c"),
  2,
  "Should find string element"
);

assert.strictEqual(
  safeIndexOf([true, false], false),
  1,
  "Should work with booleans"
);

assert.strictEqual(
  safeIndexOf([1, 2, 3], 4),
  -1,
  "Should return -1 if element not found"
);

assert.strictEqual(
  safeIndexOf([], 1),
  -1,
  "Should return -1 for empty array"
);

/* -----------------------------
 * Strict equality behavior
 * ----------------------------- */

assert.strictEqual(
  safeIndexOf([1, "1"], "1"),
  1,
  "Should use strict equality (===)"
);

assert.strictEqual(
  safeIndexOf([0, false], false),
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
  safeIndexOf([1, 2, 3], 2),
  1,
  "Should ignore overridden Array.prototype.indexOf"
);

// Polluted prototype property
Object.prototype[1] = "polluted";

assert.strictEqual(
  safeIndexOf([10, 20, 30], 20),
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
  safeIndexOf(arr, 3),
  2,
  "Should handle polluted length safely"
);

/* -----------------------------
 * Input validation tests
 * ----------------------------- */

assert.throws(
  () => safeIndexOf("not-an-array", 1),
  TypeError,
  "Should throw if first argument is not an array"
);

assert.throws(
  () => safeIndexOf(null, 1),
  TypeError,
  "Should throw if array is null"
);

assert.throws(
  () => safeIndexOf(undefined, 1),
  TypeError,
  "Should throw if array is undefined"
);

console.log("✅ All tests passed for safeIndexOf")