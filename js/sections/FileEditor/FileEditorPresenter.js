import { getContents, rename, setContents } from "../../api/fileSystem.js";
import { currentPath } from "../../state/app.js";
import { editingFile } from "../../state/edit-file.js";

/**
 * 
 * @param {string} fileName
 * @returns {[string, string]}
 */
function getNameParts(fileName) {
  const parts = fileName.split('.');
  const extension = parts.pop();
  const name = parts.join('.');

  return [name, extension ? `.${extension}` : extension];
}

/**
 * 
 * @param {HTMLElement} view 
 */
export function FileEditorPresenter(view) {
  // Get relevant Elements
  /**
   * @type {HTMLInputElement}
   */
  const fileNameInput = view.querySelector("#file-name-input");

  /**
   * @type {HTMLTextAreaElement}
   */
  const fileContentsInput = view.querySelector("#file-contents-input");

  /**
   * @type {HTMLButtonElement}
   */
  const fileSaveButton = view.querySelector("#file-save-button");

  // Get state units
  const [getEditingFile, setEditingFile] = editingFile;
  const [getCurrentPath] = currentPath;

  // Handle DOM events
  const handleRename = async (event) => {
    /**
     * @type {string}
     */
    const rawValue = event.target.value;

    fileNameInput.classList.remove('is-invalid');

    if (rawValue === undefined || rawValue.length === 0 || rawValue.includes('/')) {
      fileNameInput.classList.add('is-invalid');
      return;
    }

    const [name, extension] = getNameParts(getEditingFile());
    const [newName, newExtension] = getNameParts(rawValue);
    const path = getCurrentPath();

    await rename({ path, name, extension, newName, newExtension });

    setEditingFile(rawValue);
  };
  fileNameInput.addEventListener('change', handleRename);

  const handleSaveFile = async () => {
    const path = getCurrentPath();
    const [ name, extension ] = getNameParts(getEditingFile());
    const contents = fileContentsInput.value;

    await setContents({ path, name, extension, contents });
  };
  fileSaveButton.addEventListener('click', handleSaveFile);

  // Init
  fileNameInput.value = getEditingFile();
  
  const loadFileContents = async () => {
    const path = getCurrentPath();
    const [ name, extension ] = getNameParts(getEditingFile());

    const contents = await getContents({ path, name, extension });

    fileContentsInput.value = contents;
  };
  loadFileContents();
}