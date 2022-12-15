import { create, FileType } from "../../api/fileSystem.js";
import { stateUnit } from "../../lib/stateUnit.js";
import { currentPath, editingEntry, entriesInCurrentPath } from "../../state/app.js";

/**
 * @typedef {import("../../api/fileSystem.js").FileSystemEntryInfo} FileSystemEntryInfo
 */

const newFolderNameFormat = /New Folder( [0-9]+)*/;

/**
 * 
 * @param {HTMLElement} newFolderButton 
 */
export function FileListNewFolderPresenter(newFolderButton) {

  const [getEntriesInCurrentPath, , onEntriesInCurrentPathChanged] = entriesInCurrentPath;
  const [getCurrentPath, setCurrentPath] = currentPath;
  const [, setEditingEntry] = editingEntry;
  const [getNewFolderName, setNewFolderName] = stateUnit();

  // Set state unit listeners.
  const handleEntriesInCurrentPathChanged = () => {
    const newFolderName = getNewFolderName();

    if(newFolderName === undefined){
      return;
    }
    
    setNewFolderName(undefined);
    setEditingEntry({ name: newFolderName, type: FileType.Directory });
  };
  onEntriesInCurrentPathChanged(handleEntriesInCurrentPathChanged, { priority: 'low' });

  // Add DOM Event Listeners.
  const handleCreateNewFolder = async () => {
    /**
     * @type {FileSystemEntryInfo[]|undefined}
     */
    const [lastNamelessFolder] = getEntriesInCurrentPath()
      .filter(
        /**
         * 
         * @param {FileSystemEntryInfo} entry
         * @returns {FileSystemEntryInfo[]}
         */
        ({ type, name }) => type === FileType.Directory && newFolderNameFormat.test(name))
      .sort()
      .reverse();

    const newFolderSuffix = lastNamelessFolder === undefined
      ? ''
      : ` ${(Number(lastNamelessFolder.name.match(newFolderNameFormat)[1]) || 1) + 1}`;

    const newFolderName = `New Folder${newFolderSuffix}`;

    await create({ path: getCurrentPath(), type: FileType.Directory, name: newFolderName });

    setNewFolderName(newFolderName);
    setCurrentPath(getCurrentPath());
  }
  newFolderButton.addEventListener('click', handleCreateNewFolder);
}