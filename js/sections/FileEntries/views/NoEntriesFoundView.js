import { div } from "../../../lib/dom.js";

export function NoEntriesFoundView(){
  return div({ className: 'text-muted text-center pt-3'})(
    'No entries found'
  );
}