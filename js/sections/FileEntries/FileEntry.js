import { FileType } from "../../api/fileSystem.js";
import { currentPath } from "../../state/app.js";

/**
 * 
 * @param {HTMLElement} view 
 */
export function FileEntry(view, { entry }) {
  const { type, name, } = entry;

  // Create state units
  const [getCurrentPath, setCurrentPath] = currentPath;

  const handleEntryClicked = () => {
    /**
     * @type {string}
     */
    const parentPath = getCurrentPath();

    if(type === FileType.Directory){
      setCurrentPath(`${parentPath !== '/' ? parentPath : ''}/${name}`);
    }
  };

  // Listen to dom events
  view.addEventListener('click', handleEntryClicked);
}