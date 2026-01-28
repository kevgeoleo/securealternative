const assert = require("assert");
const RegexSafeTest = require("../lib/RegexSafeTest");

// ---------- Normal usage ----------
assert.strictEqual(RegexSafeTest(/hello/, "hello world"), true, "Basic match failed");
assert.strictEqual(RegexSafeTest(/hello/, "hell world"), false, "Non-match failed");
assert.strictEqual(RegexSafeTest(/world$/, "hello world"), true, "Regex $ anchor failed");

// ---------- Malicious input ----------
const malicious = "hello');console.log('hacked');//";
assert.strictEqual(
  RegexSafeTest(/hello/, malicious),
  true,
  "Malicious string match failed"
);
assert.strictEqual(
  RegexSafeTest(/notfound/, malicious),
  false,
  "Malicious string non-match failed"
);


// ---------- Invalid inputs ----------
assert.strictEqual(RegexSafeTest("not a regex", "hello"), false, "Non-regex first param failed");
assert.strictEqual(RegexSafeTest(/hello/, 123), false, "Non-string second param failed");
assert.strictEqual(RegexSafeTest(null, null), false, "Both params invalid");

// ---------- Empty regex / string ----------
assert.strictEqual(RegexSafeTest(/.*/, ""), true, "Empty string match failed");
assert.strictEqual(RegexSafeTest(/^$/, ""), true, "Empty string exact match failed");


// ---------- Anchors ----------
assert.strictEqual(RegexSafeTest(/^hello/, "hello world"), true, "Regex ^ anchor failed");
assert.strictEqual(RegexSafeTest(/world$/, "hello world"), true, "Regex $ anchor failed");
assert.strictEqual(RegexSafeTest(/^world$/, "world"), true, "Exact match failed");

// ---------- Quantifiers ----------
assert.strictEqual(RegexSafeTest(/a*/, "aaa"), true, "Zero or more * failed");
assert.strictEqual(RegexSafeTest(/a+/, "aaa"), true, "One or more + failed");
assert.strictEqual(RegexSafeTest(/a{2,4}/, "aaa"), true, "{min,max} quantifier failed");
assert.strictEqual(RegexSafeTest(/a{5}/, "aaaa"), false, "Exact {n} quantifier failed");

// ---------- Character classes ----------
assert.strictEqual(RegexSafeTest(/[a-z]+/, "abcxyz"), true, "Character class failed");
assert.strictEqual(RegexSafeTest(/\d+/, "12345"), true, "Digit class failed");
assert.strictEqual(RegexSafeTest(/\D+/, "abc"), true, "Non-digit class failed");
assert.strictEqual(RegexSafeTest(/\w+/, "foo_bar123"), true, "Word class failed");
assert.strictEqual(RegexSafeTest(/\s+/, "   \t\n"), true, "Whitespace class failed");

// ---------- Alternation / groups ----------
assert.strictEqual(RegexSafeTest(/foo|bar/, "foo"), true, "Alternation match foo failed");
assert.strictEqual(RegexSafeTest(/foo|bar/, "bar"), true, "Alternation match bar failed");
assert.strictEqual(RegexSafeTest(/(foo|bar)/, "baz"), false, "Group non-match failed");

// ---------- Flags ----------
assert.strictEqual(RegexSafeTest(/hello/i, "HELLO"), true, "Case-insensitive flag failed");
assert.strictEqual(RegexSafeTest(/world/g, "world world"), true, "Global flag multiple match failed");
assert.strictEqual(RegexSafeTest(/hello/m, "line1\nhello\nline2"), true, "Multiline flag failed");

// ---------- Lookaheads and lookbehinds ----------
assert.strictEqual(RegexSafeTest(/foo(?=bar)/, "foobar"), true, "Positive lookahead failed");
assert.strictEqual(RegexSafeTest(/foo(?!bar)/, "foobaz"), true, "Negative lookahead failed");
assert.strictEqual(RegexSafeTest(/(?<=foo)bar/, "foobar"), true, "Positive lookbehind failed");
assert.strictEqual(RegexSafeTest(/(?<!foo)bar/, "bazbar"), true, "Negative lookbehind failed");

// ---------- Complex patterns ----------
assert.strictEqual(
  RegexSafeTest(/^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w.-]*)*\/?$/, "https://example.com/path/to/file"),
  true,
  "URL regex failed"
);
assert.strictEqual(
  RegexSafeTest(/^\d{4}-\d{2}-\d{2}$/, "2026-01-23"),
  true,
  "Date regex failed"
);
assert.strictEqual(
  RegexSafeTest(/^\w+@\w+\.\w{2,3}$/, "test@example.com"),
  true,
  "Email regex failed"
);

// ---------- Prototype pollution ----------
RegExp.prototype.test = () => "overridden!";
assert.strictEqual(
  RegexSafeTest(/hello/, "hello world"),
  true,
  "Prototype pollution not handled for match"
);
assert.strictEqual(
  RegexSafeTest(/hello/, "hell world"),
  false,
  "Prototype pollution not handled for non-match"
);

console.log("✅ All RegexSafeTest tests passed");