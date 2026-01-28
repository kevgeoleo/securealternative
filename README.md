# securealternative

Provide secure alternatives for functions that can be effected by prototype pollution

## StringSplitOnChar (Alternative for String.prototype.split)

#### Prototype

splitOnChar(str: string, delimiter?: string): string[]

#### Description

1. Splits a string into an array of substrings using a single-character delimiter.
2. Does not rely on String.prototype.split
3. Validates inputs strictly
4. Resistant to prototype pollution and method overrides

#### Parameters

| Name        | Type     | Required | Description                                 |
| ----------- | -------- | -------- | ------------------------------------------- |
| `str`       | `string` | yes      | The input string to split                   |
| `delimiter` | `string` | no       | Single character delimiter (default: `'.'`) |

#### Returns

string[] — array of substrings

#### Throws

1. TypeError if str is not a string
2. TypeError if delimiter is not a single-character string

## ArraySafeIndexOf (Alternative for Array.prototype.indexOf)

#### Prototype

safeIndexOf<T>(arr: T[], searchElement: T): number

#### Description

Secure alternative for Array.prototype.indexOf(<elem>) which gives index of element if it
is in array else returns -1

#### Parameters

| Name            | Type       | Required | Description       |
| --------------- | ---------- | -------- | ----------------- |
| `arr`           | `Array<T>` | yes      | Array to search   |
| `searchElement` | `T`        | yes      | Element to locate |

#### Returns

number — index of the element, or -1 if not found

#### Throws

TypeError if arr is not an array

## StringSafeIndexOf (Alternative for String.prototype.indexOf)

#### Prototype

StringSafeIndexOf(haystack: string, needle: string): number

#### Description

1. Searches for the first occurrence of a substring within a string.
2. Does not rely on String.prototype.indexOf or any other built-in string methods.
3. Performs a manual character-by-character comparison.
4. Avoids implicit type coercion.
5. Resistant to prototype pollution and method overrides.
6. Safe to use in hostile or partially polluted JavaScript runtimes.

#### Parameters

| Name       | Type     | Required | Description                 |
| ---------- | -------- | -------- | --------------------------- |
| `haystack` | `string` | yes      | The string to search within |
| `needle`   | `string` | yes      | The substring to search for |

#### Returns

number — the zero-based index of the first occurrence of needle, or -1 if not found.

#### Throws

None
(Invalid inputs are handled safely and return -1.)

## RegexSafeTest (Alternative for RegExp.prototype.test)

#### Prototype

RegexSafeTest(regex: RegExp, input: string): boolean

#### Description

1. Tests whether a regular expression matches a string.
2. Does not rely on `RegExp.prototype.test`, avoiding user-land overrides.
3. Executes the match using the native V8 RegExp engine via a compiled Node.js addon.
4. Validates inputs strictly before execution.
5. Resistant to prototype pollution, method overrides, and monkey-patching of RegExp.prototype.

#### Compatability info

Currently works only for Node v24 (Active LTS version)

#### Parameters

| Name    | Type     | Required | Description                                 |
| ------- | -------- | -------- | ------------------------------------------- |
| `regex` | `RegExp` | yes      | Regular expression to test                  |
| `input` | `string` | yes      | String against which the regex is evaluated |

#### Returns

boolean — true if the regular expression matches the input string, otherwise false.

#### Throws

1. TypeError if regex is not a RegExp object
2. TypeError if input is not a string
3. Error if the native addon is unavailable on the current platform

## ObjectHasOwnProperty (Safe alternative to Object.prototype.hasOwnProperty)

#### Prototype

ObjectHasOwnProperty(obj: object | null | undefined, prop: string | symbol): boolean

#### Description

1. Determines whether an object has a property as its own property, without checking inherited properties.
2. Does not rely on Object.prototype.hasOwnProperty, making it resistant to prototype pollution and method overrides.
3. Checks both string and symbol properties.
4. Safe to use on objects in hostile or partially polluted JavaScript runtimes.
5. Handles null and undefined safely, returning false instead of throwing.

#### Parameters

| Name   | Type                          | Required | Description                              |
| ------ | ----------------------------- | -------- | ---------------------------------------- |
| `obj`  | `object \| null \| undefined` | yes      | The object to inspect                    |
| `prop` | `string \| symbol`            | yes      | The property name or symbol to check for |

#### Returns

boolean — true if the object has the property as its own property; otherwise false.

#### Throws

None — invalid inputs such as null or undefined are handled safely.

#### Security Considerations

1. Resistant to prototype pollution attacks, such as modifying Object.prototype.hasOwnProperty.
2. Safe when globals like Object.getOwnPropertyNames or Object.getOwnPropertySymbols are overridden.
3. Can be safely used in environments where objects or globals may be partially polluted.
