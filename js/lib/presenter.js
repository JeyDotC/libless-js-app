/**
 * 
 * @param {(view: HTMLElement, ...otherParams: any) => void} Presenter 
 * @param {HTMLElement} view 
 * @param  {...any} otherParams 
 * @returns {HTMLElement}
 */
export function attach(Presenter, view, ...otherParams) {
  Presenter(view, ...otherParams);
  return view;
}