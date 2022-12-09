import { div, i } from "../../../lib/dom.js";
import { FileNameEditor } from "../FileNameEditor.js";
import { attach } from '../../../lib/controller.js';
import { FileEntryActions } from "../FileEntryActions.js";
import { FileEntryActionsView } from "./FileEntryActionsView.js";

export function FileEntryCardsView({ type, name, extension, }) {
  return (
    div({ className: 'mb-3 col-12 col-sm-6 col-md-3 col-lg-2' })(
      div({ className: 'card cursor-pointer box-shadow-hover' })(
        div({ className: 'file-system-entry-icon card-header' })(
          div({ className: 'd-flex' })(
            div()(
              i({ className: `fa ${type === 0 ? 'fa-folder' : 'fa-file'} fa-2xl` })()
            ),
            div({ className: 'ms-auto' })(
              attach(FileEntryActions, FileEntryActionsView(), { name, extension })
            )
          )
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