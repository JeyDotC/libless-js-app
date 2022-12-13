import { attach } from "../../lib/controller.js";
import { currentPath } from "../../state/app.js";
import { PathTextEditor } from "./PathTextEditor.js";
import { PathButtonsView } from "./views/PathButtonsView.js";
import { PathTextEditorView } from "./views/PathTextEditorView.js";

/**
 * 
 * @param {HTMLElement} view 
 */
export function PathEditor(view) {

  // Create state units.
  const [getCurrentPath, setCurrentPath, onCurrentPathChanged] = currentPath;

  // Handle state unit events
  const handleCurrentPathChanged = path => {
    view.replaceChildren(
      ...PathButtonsView({ path })
    );
  };
  onCurrentPathChanged(handleCurrentPathChanged);

  // Handle DOM events
  /**
   * 
   * @param {MouseEvent} event 
   */
  const handlePartClicked = (event) => {
    const { target } = event;
    if(target.classList.contains('path-button')) {
      const { value } = target;
      return setCurrentPath(value);
    }

    const path = getCurrentPath() || '/';
    const pathTextEditorView = PathTextEditorView({ path });
    view.replaceChildren(
      attach(
        PathTextEditor,
        pathTextEditorView
      )
    );
    pathTextEditorView.select();
  };
  view.addEventListener('click', handlePartClicked);

  // Startup
  handleCurrentPathChanged(getCurrentPath());
}