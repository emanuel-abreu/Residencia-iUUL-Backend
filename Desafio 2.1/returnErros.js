class FileReadError extends Error {
  constructor(message) {
    super(message);
    this.name = "FileReadError";
  }
}

class FileNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "FileNotFoundError";
  }
}

class FileHasNoArrayError extends Error {
  constructor(message) {
    super(message);
    this.name = "FileHasNoArrayError";
  }
}

class FileWriteError extends Error {
  constructor(message) {
    super(message);
    this.name = "FileWriteError";
  }
}

export {
  FileNotFoundError,
  FileReadError,
  FileHasNoArrayError,
  FileWriteError,
};
