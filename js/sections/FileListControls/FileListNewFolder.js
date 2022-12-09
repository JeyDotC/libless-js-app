import { create, FileType } from "../../api/fileSystem.js";
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
  const [getCurrentPath, setCurrentPath] = currentPath;
  const [, setEditingEntry] = editingEntry;

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

    setEditingEntry({ name: newFolderName, type: FileType.Directory })
    setCurrentPath(getCurrentPath());
  }
  newFolderButton.addEventListener('click', handleCreateNewFolder);
}