import { currentPath } from "../../state/app.js";

/**
 * 
 * @param {HTMLElement} view 
 */
export function PathUpPresenter(view) {

  const [getCurrentPath, setCurrentPath] = currentPath;

  const handleFileListUpButtonClicked = () => {
    /**
     * @type {string}
     */
    const parentPath = getCurrentPath();
    const pathParts = parentPath.split('/');
    pathParts.pop();
    return setCurrentPath(pathParts.join('/') || '/');
  };
  view.addEventListener('click', handleFileListUpButtonClicked);
}