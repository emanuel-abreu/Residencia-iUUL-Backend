import { promises as fs } from "fs";
import { DateTime } from "luxon";

class OutputFile {
  #errors = [];

  // Adiciona os dados e erros de validação ao objeto OutputFile
  addError(data, errors) {
    for (let i = 0; i < data.length; i++) {
      const errorObj = { data: data[i], erros: [] };

      if (errors[i]) {
        errorObj.erros.push(errors[i]);
        this.#errors.push(errorObj);
      }
    }
  }

  // Escreve o arquivo de saída com os erros de validação em formato JSON
  async writeOutputFile() {
    try {
      // Transforma o array de erros em JSON
      const dataSerializer = JSON.stringify(this.#errors);

      // Obtém a data e hora atual usando o Luxon
      const currentDate = DateTime.now().toFormat("ddLLyyyy-HHmmss");

      // Escreve o array de erros no arquivo de saída erros-DDMMAAAA-HHMMSS.json
      await fs.writeFile(`erros-${currentDate}.json`, dataSerializer);
    } catch (error) {
      // Se houver um erro ao gerar o arquivo de saída, lança um FileWriteError
      throw new Error("Erro ao gerar o arquivo de saída: " + error.message);
    }
  }
}

export default OutputFile;
