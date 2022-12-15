import { attach } from '../lib/presenter.js';
import { FileEditorPresenter } from '../sections/FileEditor/FileEditorPresenter.js';

attach(FileEditorPresenter, document.querySelector('#file-editor'));