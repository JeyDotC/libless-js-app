/**
 * 
 * @param {(view: HTMLElement, ...otherParams: any) => void} Controller 
 * @param {HTMLElement} view 
 * @param  {...any} otherParams 
 * @returns {HTMLElement}
 */
export function attach(Controller, view, ...otherParams) {
  Controller(view, ...otherParams);
  return view;
}