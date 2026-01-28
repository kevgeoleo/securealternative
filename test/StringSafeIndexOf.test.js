// run with bun test

"use strict";

const assert = require("assert");
const { StringSafeIndexOf } = require("../index");

describe("StringSafeIndexOf", () => {

  it("finds characters and substrings correctly", () => {
    assert.strictEqual(StringSafeIndexOf("hello", "h"), 0);
    assert.strictEqual(StringSafeIndexOf("hello", "e"), 1);
    assert.strictEqual(StringSafeIndexOf("hello", "o"), 4);
    assert.strictEqual(StringSafeIndexOf("hello", "lo"), 3);
    assert.strictEqual(StringSafeIndexOf("hello", "ll"), 2);
    assert.strictEqual(StringSafeIndexOf("hello", "world"), -1);
  });

  it("ignores overridden String.prototype.indexOf", () => {
    // Save original
    const originalIndexOf = String.prototype.indexOf;
    // Override with malicious function
    String.prototype.indexOf = () => -1;

    assert.strictEqual(StringSafeIndexOf("hello", "h"), 0);
    assert.strictEqual(StringSafeIndexOf("hello", "lo"), 3);
    assert.strictEqual(StringSafeIndexOf("hello", "world"), -1);

    // Restore original
    String.prototype.indexOf = originalIndexOf;
  });

});
