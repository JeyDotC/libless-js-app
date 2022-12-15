import { create, FileType } from "../../api/fileSystem.js";
import { stateUnit } from "../../lib/stateUnit.js";
import { currentPath, editingEntry, entriesInCurrentPath } from "../../state/app.js";

/**
 * @typedef {import("../../api/fileSystem.js").FileSystemEntryInfo} FileSystemEntryInfo
 */

const newFileNameFormat = /New File( [0-9]+)*/;

/**
 * 
 * @param {HTMLElement} newFileButton 
 */
export function FileListNewFilePresenter(newFileButton) {

  const [getEntriesInCurrentPath, , onEntriesInCurrentPathChanged] = entriesInCurrentPath;
  const [getCurrentPath, setCurrentPath] = currentPath;
  const [, setEditingEntry] = editingEntry;
  const [getNewFileName, setNewFileName] = stateUnit();

  // Set state unit listeners.
  const handleEntriesInCurrentPathChanged = () => {
    const newFileName = getNewFileName();

    if(newFileName === undefined){
      return;
    }
    
    setNewFileName(undefined);
    setEditingEntry({ name: newFileName, type: FileType.File, extension: '.txt' });
  };
  onEntriesInCurrentPathChanged(handleEntriesInCurrentPathChanged, { priority: 'low' });

  // Add DOM Event Listeners.
  const handleCreateNewFile = async () => {
    /**
     * @type {FileSystemEntryInfo[]|undefined}
     */
    const [lastNamelessFile] = getEntriesInCurrentPath()
      .filter(
        /**
         * 
         * @param {FileSystemEntryInfo} entry
         * @returns {FileSystemEntryInfo[]}
         */
        ({ type, name, extension }) => type === FileType.File && newFileNameFormat.test(name) && extension === '.txt')
      .sort()
      .reverse();

    const newFileSuffix = lastNamelessFile === undefined
      ? ''
      : ` ${(Number(lastNamelessFile.name.match(newFileNameFormat)[1]) || 1) + 1}`;

    const newFileName = `New File${newFileSuffix}`;

    await create({ path: getCurrentPath(), type: FileType.File, name: newFileName, extension: '.txt' });

    setNewFileName(newFileName);
    setCurrentPath(getCurrentPath());
  }
  newFileButton.addEventListener('click', handleCreateNewFile);
}