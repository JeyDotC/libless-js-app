import { input } from "../../../lib/dom.js";

export function PathTextEditorView({ path }) {
  return input({
    value: path,
    className: 'form-control',
    type: 'text'
  })();
}