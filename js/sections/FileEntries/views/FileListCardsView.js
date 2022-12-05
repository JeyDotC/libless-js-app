import { attach } from "../../../lib/controller.js";
import { div } from "../../../lib/dom.js";
import { FileEntry } from "../FileEntry.js";
import { FileEntryCardsView } from "./FileEntryCardsView.js";
import { NoEntriesFoundView } from "./NoEntriesFoundView.js";

export function FileListCardsView({ files }) {
  return div({ className: 'row pt-1' })(
    ...files.map(
      entry => attach(FileEntry, FileEntryCardsView(entry), { entry })
    ),
    files.length === 0 ? div({ className: 'flex-fill' })(
      NoEntriesFoundView()
    ) : ''
  );
}