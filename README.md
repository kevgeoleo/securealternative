# securealternative

Provide secure alternatives for functions that can be effected by prototype pollution

## StringSplitOnChar

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

## ArraySafeIndexOf

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

## StringSafeIndexOf

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

number — the zero-based index of the first occurrence of string, or -1 if not found.

#### Throws

None
(Invalid inputs are handled safely and return -1.)
