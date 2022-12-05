import { localStorageScope, stateUnit } from "../lib/stateUnit.js";
/**
 * @typedef {import("../api/fileSystem.js").FileSystemEntryInfo} FileSystemEntryInfo
 */

const currentPath = stateUnit('/', {
  scope: localStorageScope("currentPath"),
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
 * @type {FileSystemEntryInfo|undefined}
 */
const editingEntryDefault = undefined;

const editingEntry = stateUnit(editingEntryDefault);

export {
  currentPath,
  currentView,
  entriesInCurrentPath,
  editingEntry,
}