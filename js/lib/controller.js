export function attach(Controller, view, ...otherParams) {
  Controller(view, ...otherParams);
  return view;
}