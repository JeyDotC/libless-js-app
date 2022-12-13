import { deleteEntry } from "../../api/fileSystem.js";
import { currentPath, editingEntry } from "../../state/app.js";

const [getCurrentPath, setCurrentPath] = currentPath;
const [ , setEditingEntry] = editingEntry;

/**
 * 
 * @param {HTMLElement} view 
 * @param {import("../../api/fileSystem").FileSystemEntryInfo}
 */
export function FileEntryActions(view, { type, name, extension }) {

  const toggleButton = view.querySelector('.file-entry-action-toggle');
  /**
   * @type {HTMLElement}
   */
  const menu = view.querySelector('ul.dropdown-menu');
  /**
   * @type {HTMLElement}
   */
  const renameButton = view.querySelector('.file-entry-action-rename');
  /**
   * @type {HTMLElement}
   */
  const deleteButton = view.querySelector('.file-entry-action-delete');

  /**
   * 
   * @param {Event} event 
   */
  const handleMenuOpen = (event) => {
    event.stopPropagation();

    document.querySelectorAll('ul.dropdown-menu').forEach(el => {
      if(el === menu) {
        return;
      }
      el.classList.remove('show');
    });
    menu.classList.toggle('show');
  }
  toggleButton.addEventListener('click', handleMenuOpen);

  const handleDeleteEntry = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    await deleteEntry({ path: getCurrentPath(), name, extension });

    setCurrentPath(getCurrentPath());
  }
  deleteButton.addEventListener('click', handleDeleteEntry);

  const handleRenameEntry = (event) => {
    event.stopPropagation();
    event.preventDefault();

    setEditingEntry({ name, extension, type });
    menu.classList.remove('show');
  };
  renameButton.addEventListener('click', handleRenameEntry);
}