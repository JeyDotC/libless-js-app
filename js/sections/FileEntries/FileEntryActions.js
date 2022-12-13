import { deleteEntry } from "../../api/fileSystem.js";
import { currentPath } from "../../state/app.js";

/**
 * 
 * @param {HTMLElement} view 
 * @param {import("../../api/fileSystem").FileSystemEntryInfo}
 */
export function FileEntryActions(view, { name, extension }) {

  const [getCurrentPath, setCurrentPath] = currentPath;

  const toggleButton = view.querySelector('.file-entry-action-toggle');
  /**
   * @type {HTMLElement}
   */
  const menu = view.querySelector('ul.dropdown-menu');
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

    document.querySelectorAll('ul.dropdown-menu').forEach(el => el.classList.remove('show'));
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
}