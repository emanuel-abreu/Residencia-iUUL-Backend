import { promises as fs } from "fs";
import { DateTime } from "luxon";

class OutputFile {
  #errors = [];

  addError(dados, erros) {
    this.#errors.push({ dados, erros });
  }

  // Escreve o arquivo de saída com os erros de validação em formato JSON
  async writeOutputFile() {
    try {
      // Filtre clientes com array de erros não vazias
      const nonEmptyErrors = this.#errors.filter(
        (error) => error.erros.length > 0
      );

      if (nonEmptyErrors) {
        // Transforma o array de erros em JSON
        const dataSerializer = JSON.stringify(nonEmptyErrors);

        // Obtém a data e hora atual usando o Luxon
        const currentDate = DateTime.now().toFormat("ddLLyyyy-HHmmss");

        // Escreve o array de erros no arquivo de saída erros-DDMMAAAA-HHMMSS.json
        await fs.writeFile(`erros-${currentDate}.json`, dataSerializer);
      }
    } catch (error) {
      throw new Error("Erro ao gerar o arquivo de saída: " + error.message);
    }
  }
}

export default OutputFile;
