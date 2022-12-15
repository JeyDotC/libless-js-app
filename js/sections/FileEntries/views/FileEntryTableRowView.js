import { attach } from "../../../lib/presenter.js";
import { i, td, tr } from "../../../lib/dom.js";
import { FileEntryActionsPresenter } from "../FileEntryActionsPresenter.js";
import { FileNameEditorPresenter } from "../FileNameEditorPresenter.js";
import { FileEntryActionsView } from "./FileEntryActionsView.js";

export function FileEntryTableRowView({ type, name, extension, }) {
  return tr({ className: 'cursor-pointer' })(
    td({ className: 'file-system-entry-icon' })(
      i({ className: `fa ${type === 0 ? 'fa-folder' : 'fa-file' }`})()
    ),
    attach(FileNameEditorPresenter, td({ className: 'file-system-entry-name' })(), { type, name, extension }),
    td({ className: 'text-end' })(
      attach(FileEntryActionsPresenter, FileEntryActionsView(), { type, name, extension })
    )
  );
}