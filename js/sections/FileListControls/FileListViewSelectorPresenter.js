import { currentView } from "../../state/app.js";

/**
 * 
 * @param {HTMLElement} view 
 */
export function FileListViewSelectorPresenter(view) {
  
  const [getCurrentView, setCurrentView, onCurrentViewChanged] = currentView;

  const handleCurrentViewChanged = (newView) => {
    view
      .querySelectorAll('.view-selector-option')
      .forEach((el) => el.classList.remove('active'));

    view.querySelector(`.view-selector-option[value=${newView}]`)?.classList.add('active');
  };
  onCurrentViewChanged(handleCurrentViewChanged);

  view.addEventListener('click', (event) => {
    if(event.target.classList.contains('view-selector-option')){
      setCurrentView(event.target.value);
    }
  });

  handleCurrentViewChanged(
    getCurrentView()
  );
}