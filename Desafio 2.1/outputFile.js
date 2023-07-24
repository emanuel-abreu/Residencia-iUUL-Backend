import { promises as fs } from "fs";

import { FileWriteError } from "./returnErros.js";

class OutputFile {
  #errors = [];

  addError(data, errors) {
    this.#errors.push({ dados: data, erros: errors });
  }

  async writeOutputFile() {
    try {
      // Transform the errors array to JSON
      const dataSerializer = JSON.stringify(this.#errors);

      // Write the errors array to the output file erros-DDMMAAAA-HHMMSS.json
      await fs.writeFile("erros-DDMMAAAA-HHMMSS.json", dataSerializer);
    } catch (error) {
      // If there is an error generating the output file, throw a FileWriteError
      throw new FileWriteError(
        "Erro ao gerar o arquivo de saída: " + error.message
      );
    }
  }
}

export default OutputFile;
