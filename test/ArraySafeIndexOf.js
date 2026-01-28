const assert = require("assert");
const { ArraySafeIndexOf } = require("../index");


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


