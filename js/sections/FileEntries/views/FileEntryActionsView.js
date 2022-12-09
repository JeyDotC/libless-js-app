import { a, button, div, ul, li, i } from "../../../lib/dom.js";

export function FileEntryActionsView(){
  return (
    div({ className: "dropdown" })(
      button({ className: "file-entry-action-toggle btn btn-secondary btn-sm", type: "button" })(
        i({ className: "fa fa-ellipsis-vertical"})()
      ),
      ul({ className: "dropdown-menu", style: 'right: 0' })(
        li()(a({ className: "file-entry-action-delete dropdown-item text-danger", href: "#" })(
          'Delete'
        ))
      )
    )
  )
}