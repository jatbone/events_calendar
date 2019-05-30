/**
 * Check if object is empty
 * @param obj
 * @returns {boolean}
 */
export const isEmpty = obj =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;

/**
 * Get property
 * @param obj
 * @param path
 * @param defaultValue
 * @returns {string}
 */
export const getProp = (obj, path, defaultValue = null) =>
  String.prototype.split
    .call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce(
      (a, c) => (Object.hasOwnProperty.call(a, c) ? a[c] : defaultValue),
      obj
    );
