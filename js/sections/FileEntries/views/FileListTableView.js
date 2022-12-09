import { attach } from "../../../lib/controller.js";
import { table, tbody, td, th, thead, tr } from "../../../lib/dom.js";
import { FileEntry } from "../FileEntry.js";
import { FileEntryTableRowView } from "./FileEntryTableRowView.js";
import { NoEntriesFoundView } from "./NoEntriesFoundView.js";


export function FileListTableView({ files }) {
  return table({ className: 'table table-hover' })(
    thead()(
      tr()(
        td()(),
        th()('Name'),
        td()()
      )
    ),
    tbody({ id: 'file-system-list' })(
      ...files.map((entry) => attach(
        FileEntry,
        FileEntryTableRowView(entry),
        { entry }
      )),
      files.length === 0 ? td({ colspan: 2 })(
        NoEntriesFoundView()
      ) : ''
    )
  );
}