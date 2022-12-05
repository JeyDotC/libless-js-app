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
export function FileListNewFolder(newFolderButton) {

  const [getEntriesInCurrentPath] = entriesInCurrentPath;
  const [getCUrrentPath, setCurrentPath, onCurrentPathChanged] = currentPath;
  const [getFolderToEdit, setFolderToEdit] = stateUnit('');
  const [, setEditingEntry] = editingEntry;

  // Add State Unit Listeners.
  const handlePathChanged = () => {
    const folderToEdit = getFolderToEdit();
    if(!folderToEdit) {
      return;
    }
    setEditingEntry()
    setFolderToEdit(undefined);
  }
  onCurrentPathChanged(handlePathChanged);

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
      : (Number(lastNamelessFolder.name.match(newFolderNameFormat)[1]) || 1) + 1;

    const newFolderName = `New Folder ${newFolderSuffix}`;

    await create({ path: getCUrrentPath(), type: FileType.Directory, name: newFolderName });

    setFolderToEdit(newFolderName);
    setCurrentPath(getCUrrentPath());
  }
  newFolderButton.addEventListener('click', handleCreateNewFolder);
}