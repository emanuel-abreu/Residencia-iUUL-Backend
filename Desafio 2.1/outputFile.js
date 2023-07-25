import { promises as fs } from "fs";
import { DateTime } from "luxon";

class OutputFile {
  #errors = [];

  addError(data, errors) {
    this.#errors.push({ dados: data, erros: errors });
  }

  async writeOutputFile() {
    try {
      // Transform the errors array to JSON
      const dataSerializer = JSON.stringify(this.#errors);

      // Get the current date and time using Luxon
      const currentDate = DateTime.now().toFormat("ddLLyyyy-HHmmss");

      // Write the errors array to the output file erros-DDMMAAAA-HHMMSS.json
      await fs.writeFile(`erros-${currentDate}.json`, dataSerializer);
    } catch (error) {
      // If there is an error generating the output file, throw a FileWriteError
      throw new Error("Erro ao gerar o arquivo de saída: " + error.message);
    }
  }
}

export default OutputFile;
