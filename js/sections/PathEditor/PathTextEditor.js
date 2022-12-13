import { currentPath } from "../../state/app.js";

const [getCurrentPath, setCurrentPath] = currentPath;

/**
 * 
 * @param {HTMLInputElement} view 
 */
export function PathTextEditor(view) {

  const handlePathChange = (event) => {
    const newPath = event.target.value;
    view.removeEventListener('blur', handleBlur);
    setCurrentPath(newPath);
  };
  view.addEventListener('change', handlePathChange);

  const handleClicked = e => {
    e.stopPropagation();
  };
  view.addEventListener('click', handleClicked);

  const handleBlur = () => {
    setCurrentPath(getCurrentPath());
  };
  view.addEventListener('blur', handleBlur, { once: true });
}