import { localStorageScope, searchParamsScope, stateUnit } from "../lib/stateUnit.js";
/**
 * @typedef {import("../api/fileSystem.js").FileSystemEntryInfo} FileSystemEntryInfo
 */

const currentPath = stateUnit('/', {
  scope: searchParamsScope("currentPath"),
  allowRefresh: true
});

/**
 * @type {FileSystemEntryInfo[]}
 */
const emptyEntries = [];

const entriesInCurrentPath = stateUnit(emptyEntries);

const currentView = stateUnit('table', {
  scope: localStorageScope("currentView"),
});

/**
 * @type {FileSystemEntryInfo}
 */
const editingEntryDefault = undefined;

const editingEntry = stateUnit(editingEntryDefault);

export {
  currentPath,
  currentView,
  entriesInCurrentPath,
  editingEntry,
}