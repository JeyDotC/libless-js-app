import { attach } from "../../../lib/controller.js";
import { i, td, tr } from "../../../lib/dom.js";
import { FileEntryActions } from "../FileEntryActions.js";
import { FileNameEditor } from "../FileNameEditor.js";
import { FileEntryActionsView } from "./FileEntryActionsView.js";

export function FileEntryTableRowView({ type, name, extension, }) {
  return tr({ className: 'cursor-pointer' })(
    td({ className: 'file-system-entry-icon' })(
      i({ className: `fa ${type === 0 ? 'fa-folder' : 'fa-file' }`})()
    ),
    attach(FileNameEditor, td({ className: 'file-system-entry-name' })(), { type, name, extension }),
    td({ className: 'text-end' })(
      attach(FileEntryActions, FileEntryActionsView(), { type, name, extension })
    )
  );
}