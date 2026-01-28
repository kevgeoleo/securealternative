// Run with bun test

"use strict";

const assert = require("assert");
const ObjectHasOwnProperty = require("../lib/ObjectHasOwnProperty");

describe("ObjectHasOwnProperty", () => {

  it("returns true for own string properties", () => {
    const obj = { a: 1 };
    assert.strictEqual(ObjectHasOwnProperty(obj, "a"), true);
  });

  it("returns false for missing properties", () => {
    const obj = { a: 1 };
    assert.strictEqual(ObjectHasOwnProperty(obj, "b"), false);
  });

  it("returns false for inherited properties", () => {
    const obj = {};
    assert.strictEqual(ObjectHasOwnProperty(obj, "toString"), false);
    assert.strictEqual(ObjectHasOwnProperty(obj, "constructor"), false);
    assert.strictEqual(ObjectHasOwnProperty(obj, "__proto__"), false);
  });

  it("handles null and undefined safely", () => {
    assert.strictEqual(ObjectHasOwnProperty(null, "a"), false);
    assert.strictEqual(ObjectHasOwnProperty(undefined, "a"), false);
  });

  /* -----------------------------
   * Symbol properties
   * ----------------------------- */
  it("detects own symbol properties", () => {
    const sym = Symbol("secret");
    const obj = { [sym]: 123 };
    assert.strictEqual(ObjectHasOwnProperty(obj, sym), true);
  });

  it("returns false for missing symbol properties", () => {
    const sym = Symbol("missing");
    const obj = {};
    assert.strictEqual(ObjectHasOwnProperty(obj, sym), false);
  });

  /* -----------------------------
   * Prototype pollution / global override tests
   * ----------------------------- */
  it("ignores polluted Object.prototype properties", () => {
    Object.prototype.polluted = "yes";

    const obj = {};
    assert.strictEqual(ObjectHasOwnProperty(obj, "polluted"), false);

    delete Object.prototype.polluted;
  });

  it("is safe if Object.getOwnPropertyNames is overridden", () => {
    const original = Object.getOwnPropertyNames;
    Object.getOwnPropertyNames = () => ["fake"];

    const obj = { real: 1 };
    assert.strictEqual(ObjectHasOwnProperty(obj, "real"), true);
    assert.strictEqual(ObjectHasOwnProperty(obj, "fake"), false);

    Object.getOwnPropertyNames = original;
  });

  it("is safe if Object.getOwnPropertySymbols is overridden", () => {
    const original = Object.getOwnPropertySymbols;
    Object.getOwnPropertySymbols = () => [Symbol("fake")];

    const obj = {};
    assert.strictEqual(ObjectHasOwnProperty(obj, Symbol("fake")), false);

    Object.getOwnPropertySymbols = original;
  });

});
