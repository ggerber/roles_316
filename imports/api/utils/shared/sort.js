export function sortAlphabetical(stringA, stringB) {
  const STRINGA = stringA.toUpperCase();
  const STRINGB = stringB.toUpperCase();
  let result = 0;
  if (STRINGA < STRINGB) result = -1;
  if (STRINGA > STRINGB) result = 1;
  return result;
}

export function sortbyProperty(propName, objectA, objectB) {
  const nameA = objectA.properties[propName];
  const nameB = objectB.properties[propName];
  return sortAlphabetical(nameA, nameB);
}

export function sortbyField(fieldName, objectA, objectB) {
  const nameA = objectA[fieldName];
  const nameB = objectB[fieldName];
  return sortAlphabetical(nameA, nameB);
}
