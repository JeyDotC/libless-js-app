import { FileListEntriesPresenter } from "../sections/FileEntries/FileListEntriesPresenter.js";
import { FileListViewSelectorPresenter } from "../sections/FileListControls/FileListViewSelectorPresenter.js";
import { PathEditorPresenter } from "../sections/PathEditor/PathEditorPresenter.js";
import { attach } from "../lib/presenter.js";
import { PathUpPresenter } from "../sections/PathEditor/PathUpPresenter.js";
import { FileListNewFolderPresenter } from "../sections/FileListControls/FileListNewFolderPresenter.js";
import { FileListNewFilePresenter } from "../sections/FileListControls/FileListNewFilePresenter.js";

attach(PathEditorPresenter, document.querySelector("#path"));

attach(PathUpPresenter, document.querySelector("#path-up"));
attach(FileListViewSelectorPresenter, document.querySelector("#file-list-view-selector"));
attach(FileListNewFolderPresenter, document.querySelector("#file-list-new-folder"));
attach(FileListNewFilePresenter, document.querySelector("#file-list-new-file"));

attach(FileListEntriesPresenter, document.querySelector("#file-list-entries"));