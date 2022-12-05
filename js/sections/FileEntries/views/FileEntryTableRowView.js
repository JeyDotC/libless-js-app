import { i, td, tr } from "../../../lib/dom.js";

export function FileEntryTableRowView({ type, name, extension, }) {
  return tr({ className: 'cursor-pointer' })(
    td({ className: 'file-system-entry-icon' })(
      i({ className: `fa ${type === 0 ? 'fa-folder' : 'fa-file' }`})()
    ),
    td({ className: 'file-system-entry-name' })(
      `${name}${extension || ''}`
    ),
  );
}