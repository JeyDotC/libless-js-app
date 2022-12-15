import { div, i } from "../../../lib/dom.js";
import { FileNameEditorPresenter } from "../FileNameEditorPresenter.js";
import { attach } from '../../../lib/presenter.js';
import { FileEntryActionsPresenter } from "../FileEntryActionsPresenter.js";
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
              attach(FileEntryActionsPresenter, FileEntryActionsView(), { type, name, extension })
            )
          )
        ),
        attach(
          FileNameEditorPresenter,
          div({ className: 'file-system-entry-name card-body' })(),
          { type, name, extension }
        ),
      )
    )
  );
}