import { input } from "../../lib/dom.js";
import { editingEntry, entriesInCurrentPath } from "../../state/app.js";

const [ getEditingEntry, setEditingEntry, onEditingEntryChanged] = editingEntry;
const [ , , onFilesChanged] = entriesInCurrentPath;

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


const handleOnFilesChanged = () => {
  const entry = getEditingEntry();
  if(entry === undefined){
    return;
  }
  handleEditingEntryChanged(entry);
}
onFilesChanged(handleOnFilesChanged, { priority: 'low' });


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
    fileNameEditorInput.addEventListener('blur', handleFinishEditEntry);
  }
  view.addEventListener('editEntry', handleEditEntry, false);

  const handleFinishEditEntry = () => {
    setEditingEntry(undefined);
    view.textContent = `${name}${extension || ''}`;
  }
}