import { button } from "../../../lib/dom.js";

function PathButton({ part, value }) {
  return button({ className: 'path-button btn btn-light', value })(part || '/');
}
/**
 * 
 * @param {{ path: string }} param0 
 * @returns 
 */
export function PathButtonsView({ path }) {
  if(path === '/') {
    return [ PathButton({ part: '/', value: '/'}) ];
  }
  return path.split('/').map(
    (part, index, allParts) => PathButton({ part, value: allParts.slice(0, index + 1).join('/') })
  );
}