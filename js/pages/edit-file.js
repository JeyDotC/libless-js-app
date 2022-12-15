import { attach } from '../lib/controller.js';
import { FileEditor } from '../sections/FileEditor/FileEditor.js';

attach(FileEditor, document.querySelector('#file-editor'));