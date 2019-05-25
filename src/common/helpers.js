/**
 * Check if object is empty
 * @param obj
 * @returns {boolean}
 */
export const isEmpty = obj =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;
