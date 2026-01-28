const safeGetOwnPropertyNames = Object.getOwnPropertyNames;
const safeGetOwnPropertySymbols = Object.getOwnPropertySymbols;

function ObjectHasOwnProperty(obj, prop) {
  if (obj == null) return false;

  const names = safeGetOwnPropertyNames(obj);
  for (let i = 0; i < names.length; i++) {
    if (names[i] === prop) {
      return true;
    }
  }

  const symbols = safeGetOwnPropertySymbols(obj);
  for (let i = 0; i < symbols.length; i++) {
    if (symbols[i] === prop) {
      return true;
    }
  }

  return false;
}

module.exports = ObjectHasOwnProperty;
