import { attach } from "../../lib/presenter.js";
import { currentPath } from "../../state/app.js";
import { PathTextEditorPresenter } from "./PathTextEditorPresenter.js";
import { PathButtonsView } from "./views/PathButtonsView.js";
import { PathTextEditorView } from "./views/PathTextEditorView.js";

/**
 * 
 * @param {HTMLElement} view 
 */
export function PathEditorPresenter(view) {

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
        PathTextEditorPresenter,
        pathTextEditorView
      )
    );
    pathTextEditorView.select();
  };
  view.addEventListener('click', handlePartClicked);

  // Startup
  handleCurrentPathChanged(getCurrentPath());
}