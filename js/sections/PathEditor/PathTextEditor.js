import { currentPath } from "../../state/app.js";

/**
 * 
 * @param {HTMLElement} view 
 */
export function PathTextEditor(view) {
  const [, setCurrentPath] = currentPath;

  const handlePathChange = (event) => {
    const newPath = event.target.value;

    setCurrentPath(newPath);
  }
  view.addEventListener('change', handlePathChange);
  view.addEventListener('click', e => e.stopPropagation());

  view.focus();
}