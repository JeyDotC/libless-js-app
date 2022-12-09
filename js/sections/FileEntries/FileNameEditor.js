import { input } from "../../lib/dom.js";
import { editingEntry } from "../../state/app.js";

/**
 * 
 * @param {HTMLElement} view 
 * @param {*} param1 
 * @returns {Function}
 */
export function FileNameEditor(view, { name, extension }){
  /*const [ , , onEditingEntryChanged, removeOnHandler] = editingEntry;

  const handleEditingEntryChanged = (newEntryToEdit) => {
    console.log('Editing', newEntryToEdit);

    view.replaceChildren(
      input({
        type: 'text',
        value: ``
      })()
    );
  };
  onEditingEntryChanged(handleEditingEntryChanged);*/

  view.textContent = `${name}${extension || ''}`;

  //return () => removeOnHandler(handleEditingEntryChanged);
}