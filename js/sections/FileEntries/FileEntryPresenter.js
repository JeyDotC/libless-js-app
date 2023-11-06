import { FileType } from "../../api/fileSystem.js";
import { currentPath } from "../../state/app.js";

/**
 * 
 * @param {HTMLElement} view 
 * @param {{ entry: import("../../api/fileSystem.js").FileSystemEntryInfo }} 
 */
export function FileEntryPresenter(view, { entry }) {
  const { type, name, extension } = entry;

  // Create state units
  const [getCurrentPath, setCurrentPath] = currentPath;

  const handleEntryClicked = () => {
    const parentPath = getCurrentPath();

    if(type === FileType.Directory){
      return setCurrentPath(`${parentPath !== '/' ? parentPath : ''}/${name}`);
    }

    if(type === FileType.File) {
      const url = new URL(location);
      url.searchParams.set('editingFile', `${name}${extension}`);
      url.pathname = 'libless-js-app/edit-file.html';
      location.href = url.toString();
    }
  };

  // Listen to dom events
  view.addEventListener('click', handleEntryClicked);
}
