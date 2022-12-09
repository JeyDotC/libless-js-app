import { list } from "../../api/fileSystem.js";
import { currentPath, currentView, entriesInCurrentPath } from "../../state/app.js";
import { FileListCardsView } from "./views/FileListCardsView.js";
import { FileListTableView } from "./views/FileListTableView.js";

const viewsDictionary = {
  table: FileListTableView,
  cards: FileListCardsView,
}

/**
 * 
 * @param {HTMLElement} view 
 */
export function FileListEntries(view) {
  // Create state units.
  const [getCurrentPath, setCurrentPath, onCurrentPathChanged] = currentPath;
  const [getCurrentView, , onCurrentViewChanged] = currentView;
  const [getFiles, setFiles, onFilesChanged] = entriesInCurrentPath;


  // Listen to state units events.
  const handlePathChanged = async (path, oldPath) => {
    try {
      const files = await list({ path });
      setFiles(files);
    } catch (e) {
      console.log(e);
      setCurrentPath(oldPath);
    }
  }
  onCurrentPathChanged(handlePathChanged);

  const handleFilesChanged = (files) => {
    const currentView = getCurrentView();
    const ListView = viewsDictionary[currentView];

    view.replaceChildren(
      ListView({ files })
    );
  }
  onFilesChanged(handleFilesChanged);

  const handleCurrentViewChanged = () => {
    handleFilesChanged(getFiles());
  }
  onCurrentViewChanged(handleCurrentViewChanged);

  // Startup
  const initialPath = getCurrentPath();

  if (initialPath !== undefined) {
    handlePathChanged(initialPath);
  }
}


