import { div, i } from "../../../lib/dom.js";
import { FileNameEditor } from "../FileNameEditor.js";
import { attach } from '../../../lib/controller.js';

export function FileEntryCardsView({ type, name, extension, }) {
  return (
    div({ className: 'mb-3 col-12 col-sm-6 col-md-3 col-lg-2'})(
      div({ className: 'card cursor-pointer box-shadow-hover' })(
        div({ className: 'file-system-entry-icon card-header' })(
          i({ className: `fa ${type === 0 ? 'fa-folder' : 'fa-file'} fa-2xl` })()
        ),
        attach(
          FileNameEditor, 
          div({ className: 'file-system-entry-name card-body' })(),
          { name, extension }
        ),
      )
    )
  );
}