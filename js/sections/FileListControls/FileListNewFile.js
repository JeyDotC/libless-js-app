import { currentPath } from "../../state/app.js";

/**
 * 
 * @param {HTMLElement} newFileButton 
 */
export function FileListNewFile(newFileButton) {

  const [getCurrentPath] = currentPath;

  const handleCreateNewFile = () => {
    const path = getCurrentPath();
    location.href = `/edit-file.html?currentPath=${encodeURIComponent(path)}`;
  }
  newFileButton.addEventListener('click', handleCreateNewFile);
}