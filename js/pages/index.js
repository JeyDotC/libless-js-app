import { FileListEntries } from "../sections/FileEntries/FileListEntries.js";
import { FileListViewSelector } from "../sections/FileListControls/FileListViewSelector.js";
import { PathEditor } from "../sections/PathEditor/PathEditor.js";
import { attach } from "../lib/controller.js";
import { PathUp } from "../sections/PathEditor/PathUp.js";
import { FileListNewFolder } from "../sections/FileListControls/FileListNewFolder.js";

attach(PathEditor, document.querySelector("#path"));

attach(PathUp, document.querySelector("#path-up"));
attach(FileListViewSelector, document.querySelector("#file-list-view-selector"));
attach(FileListNewFolder, document.querySelector("#file-list-new-folder"));

attach(FileListEntries, document.querySelector("#file-list-entries"));