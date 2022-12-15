import { searchParamsScope, stateUnit } from "../lib/stateUnit.js";

/**
 * @type {string}
 */
const initialValue = undefined;
const editingFile = stateUnit(initialValue, { 
  scope: searchParamsScope('editingFile') 
});

export {
  editingFile
};