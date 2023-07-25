import { promises as fs } from "fs";

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
        throw new Error("O arquivo de entrada está vazio.");
      }

      return fileData; // Retornar o conteúdo do arquivo lido
    } catch (error) {
      /* Caso o arquivo de entrada não exista ou ocorra um erro de leitura,
         a aplicação deverá apresentar uma mensagem de erro. */
      if (error.code === "ENOENT") {
        throw new Error(
          "Erro: Arquivo não encontrado, verifique se o path foi passado corretamente."
        );
      }

      throw new Error("Erro ao ler o arquivo de entrada: " + error.message);
    }
  }
}

export default InputFile;
