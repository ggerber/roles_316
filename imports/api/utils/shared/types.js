// Returns if a x is a string
export const isString = x => typeof x === 'string' || x instanceof String;

// Returns if a x is really a number
export const isNumber = x => typeof x === 'number' && isFinite(x);

// Returns if a x is an array
export const isArray = x => x && typeof x === 'object' && x.constructor === Array;

// Returns if a x is an empty array
export const populatedArray = x => isArray(x) && x.length > 0;

// Returns if a x is a const
export const isFunction = x => typeof x === 'function';

// Returns if a x is an object
export const isObject = x => x && typeof x === 'object' && x.constructor === Object;

// Returns if a x is an empty object
export const populatedObject = x => isObject(x) && Object.keys(x).length > 0;

export const populatedString = x => isString(x) && x.length > 0;

// Returns if a x is null
export const isNull = x => x === null;

// Returns if a x is undefined
export const isUndefined = x => typeof x === 'undefined';

// Returns if a x is a boolean
export const isBoolean = x => typeof x === 'boolean';

// Returns if a x is a regexp
export const isRegExp = x => x && typeof x === 'object' && x.constructor === RegExp;

// Returns if x is an error object
export const isError = x => x instanceof Error && typeof x.message !== 'undefined';

// Returns if x is a date object
export const isDate = x => x instanceof Date;

// Returns if a Symbol
export const isSymbol = x => typeof x === 'symbol';
