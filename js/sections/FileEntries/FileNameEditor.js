import { FileType, rename } from "../../api/fileSystem.js";
import { input } from "../../lib/dom.js";
import { currentPath, editingEntry } from "../../state/app.js";

const [ getEditingEntry, setEditingEntry, onEditingEntryChanged] = editingEntry;
const [getCurrentPath, setCurrentPath] = currentPath;

const handleEditingEntryChanged = (editingEntry) => {
  if(editingEntry === undefined){
    return;
  }

  const { type, name, extension } = editingEntry;
  /**
   * @type {HTMLElement}
   */
  const nameEditor = document.querySelector(
    `.file-system-entry-name[data-entry-type='${type}'][data-entry-name='${name}'][data-entry-extension='${extension||''}']`
  );
  if(nameEditor === null){
    console.log('Editor not found.');
    return;
  }
  nameEditor.dispatchEvent(new CustomEvent('editEntry', { bubbles: false, }));
};
onEditingEntryChanged(handleEditingEntryChanged, { priority: 'low' });

/**
 * 
 * @param {HTMLElement} view 
 * @param {*} param1 
 * @returns {Function}
 */
export function FileNameEditor(view, { type, name, extension }){
  view.dataset.entryType = type;
  view.dataset.entryName = name;
  view.dataset.entryExtension = extension || '';
  view.textContent = `${name}${extension || ''}`;

  const handleEditEntry = () => {
    /**
     * @type {HTMLInputElement}
     */
    const fileNameEditorInput = input({
      type: 'text',
      className: 'form-control',
      value: `${name}${extension || ''}`
    })();

    view.replaceChildren(fileNameEditorInput);

    fileNameEditorInput.select();
    fileNameEditorInput.addEventListener('change', handleChangeName);
    fileNameEditorInput.addEventListener('blur', handleFinishEditEntry);
  }
  view.addEventListener('editEntry', handleEditEntry, false);

  /**
   * 
   * @param {Event} event 
   * @returns 
   */
  const handleChangeName = async (event) => {
    const entry = getEditingEntry();
    const path = getCurrentPath();
    if(entry === undefined) {
      return;
    }

    const { type, name, extension } = entry;
    /**
     * @type {string}
     */
    const rawValue = event.target.value;

    if(rawValue === undefined || rawValue.length === 0 || rawValue.includes('/')){
      return;
    }

    const parts = rawValue.split('.');
    const newExtension = type === FileType.File ? parts.pop() : undefined;
    const newName = type === FileType.File ? parts.join('.') : rawValue;

    await rename({ path, name, extension, newName, newExtension: `.${newExtension}`});

    setCurrentPath(path);
  };

  const handleFinishEditEntry = () => {
    setEditingEntry(undefined);
    view.textContent = `${name}${extension || ''}`;
  }
}