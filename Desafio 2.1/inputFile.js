import { promises as fs } from "fs";

import { FileNotFoundError, FileReadError } from "./returnErros.js";

class InputFile {
  #filePath;

  constructor(filePath) {
    this.#filePath = filePath;
  }

  async readInputFile() {
    try {
      // Lê o conteúdo do arquivo JSON de entrada
      const fileData = await fs.readFile(this.#filePath, "utf-8");

      if (!fileData) {
        throw new FileNotFoundError("O arquivo de entrada está vazio.");
      }

      return fileData; // Retornar o conteúdo do arquivo lido
    } catch (error) {
      /* Caso o arquivo de entrada não exista ou ocorra um erro de leitura,
         a aplicação deverá apresentar uma mensagem de erro. */
      if (error.code === "ENOENT") {
        throw new FileNotFoundError("Arquivo não encontrado.");
      }

      throw new FileReadError(
        "Erro ao ler o arquivo de entrada: " + error.message
      );
    }
  }
}

export default InputFile;
