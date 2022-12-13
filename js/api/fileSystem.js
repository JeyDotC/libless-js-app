const FileType = {
  get Directory() {
    return 0;
  },
  get File() {
    return 1;
  }
}

class FileSystemEntry {
  name = "";
  extension = undefined;
  /**
   * @type {number}
   */
  type = FileType.Directory;
  contents = undefined;
  /**
   * @type {Array<FileSystemEntry>}
   */
  children = [];
  /**
   * @type {FileSystemEntry}
   */
  parent = undefined;

  constructor(name, extension, type, contents = undefined) {
    this.name = name;
    this.extension = extension;
    this.type = type;
    this.contents = contents;
  }

  static createDirectory(name) {
    return new FileSystemEntry(name, undefined, FileType.Directory);
  }

  static createFile(name, extension, contents) {
    return new FileSystemEntry(name, extension, FileType.File, contents);
  }

  /**
   * 
   * @param {string} name 
   * @param {string} extension 
   * @returns {FileSystemEntry|undefined}
   */
  getChild(name, extension) {
    return this.children.find((entry) => entry.name === name && entry.extension === extension);
  }

  hasChild(name, extension) {
    return this.getChild(name, extension) !== undefined;
  }

  addChild(child) {
    this.children.push(child);
    child.parent = this;
  }

  remove() {
    this.parent.children = this.parent.children.filter(e => e !== this);
    this.parent = undefined;
  }
}

class FileSystem {
  rootDir = FileSystemEntry.createDirectory("");

  persist() {
    localStorage.setItem("fs", JSON.stringify(this.rootDir, (key, value) => key === 'parent' ? undefined : value));
  }

  load() {
    const fsData = localStorage.getItem("fs");
    const fsStructure = JSON.parse(fsData);

    if (fsStructure === null) {
      this.rootDir = FileSystemEntry.createDirectory("");
      return;
    }

    this.rootDir = this.loadEntry(fsStructure);
  }

  loadEntry({
    name,
    extension,
    type,
    contents,
    children,
  }) {
    const entry = new FileSystemEntry(name, extension, type, contents);
    children.forEach(child => {
      entry.addChild(this.loadEntry(child));
    });
    return entry;
  }

  findPath(path) {

    if (path === '/') {
      return this.rootDir;
    }

    const [, ...pathParts] = path.split('/');

    let currentDir = this.rootDir;

    for (const part of pathParts) {
      const nextCandidate = currentDir.children.find(c => c.type === FileType.Directory && c.name === part)
      if (nextCandidate === undefined) {
        return undefined;
      }
      currentDir = nextCandidate;
    }

    return currentDir;
  }
}

const fileSystem = new FileSystem();

fileSystem.load();

/**
 * @callback FileSystemOperation
 * @param {FileSystemEntry} parentDir
 * @param {Function} accept
 * @param {Function} reject
 */

/**
 * 
 * @param {string} path 
 * @param {FileSystemOperation} operation 
 * @returns {Promise}
 */
function startOperationAt(path, operation) {
  console.log(`Fetching path ${path}...`);
  return new Promise((accept, reject) => {
    const parentDir = fileSystem.findPath(path);

    if (parentDir === undefined) {
      return reject(`Path '${path}' does not exist.`);
    }

    return operation(parentDir, accept, reject);
  });
}

export { FileType };

export function create({ path, name, extension = undefined, type, contents }) {
  return startOperationAt(path, (parentDir, accept, reject) => {
    const entry = type === FileType.File
      ? FileSystemEntry.createFile(name, extension, contents)
      : FileSystemEntry.createDirectory(name);

    if (parentDir.hasChild(entry.name, entry.extension)) {
      return reject(`File or directory already exists.`);
    }

    parentDir.addChild(entry);
    fileSystem.persist();

    accept("File or directory added.");
  });
}

/**
 * @typedef {{
 *  name: string,
 *  extension: string | undefined,
 *  type: number,
 *  childCount: number,
 * }} FileSystemEntryInfo
 */

/**
 * 
 * @param {{ path: string }} listParams
 * @returns {Promise<FileSystemEntryInfo[]>}
 */
export function list({ path }) {
  return startOperationAt(path, (parentDir, accept) => {
    const result = parentDir.children.map(({ name, extension, type, children }) => ({
      name,
      extension,
      type,
      childCount: children.length,
    }))

    accept(result);
  });
}

export function getContents({ path, name, extension }) {
  return startOperationAt(path, (parentDir, accept, reject) => {
    const file = parentDir.getChild(name, extension);
    if (file === undefined || file.type !== FileType.File) {
      return reject(`File ${name}${extension} at ${path} not found`);
    }

    accept(file.contents);
  });
}


export function updateFile({ path, name, extension, contents }) {
  return startOperationAt(path, (parentDir, accept, reject) => {
    const file = parentDir.getChild(name, extension);
    if (file === undefined || file.type !== FileType.File) {
      return reject(`File ${name}${extension} at ${path} not found`);
    }
    file.contents = contents;

    fileSystem.persist();
    accept();
  });
}

export function rename({ path, name, extension, newName, newExtension }) {
  return startOperationAt(path, (parentDir, accept, reject) => {
    const entry = parentDir.getChild(name, extension);

    if (entry === undefined) {
      return reject(`File or Directory ${name}${extension} at ${path} not found`);
    }

    switch (entry.type) {
      case FileType.Directory:
        entry.name = newName;
        break;
      case FileType.File:
        entry.name = newName;
        entry.extension = newExtension;
        break;
    }

    fileSystem.persist();
    accept();
  });
}

export function deleteEntry({ path, name, extension }) {
  return startOperationAt(path, (parentDir, accept, reject) => {
    const entry = parentDir.getChild(name, extension);

    if (entry === undefined) {
      return reject(`File or Directory ${name}${extension} at ${path} not found`);
    }

    entry.remove();

    fileSystem.persist();
    accept();
  });
}