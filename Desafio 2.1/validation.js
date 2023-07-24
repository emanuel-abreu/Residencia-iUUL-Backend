import InputFile from "./inputFile.js";
import OutputFile from "./outputFile.js";

import { FileHasNoArrayError } from "./returnErros.js";

class Validation {
  #inputFile;
  #outputFile;

  constructor(inputFile) {
    this.#inputFile = inputFile;
    this.#outputFile = new OutputFile();
  }

  async validationDatas() {
    try {
      // Chama o método readInputFile() da classe InputFile para ler o conteúdo JSON do arquivo de entrada
      const fileData = await this.#inputFile.readInputFile();

      // Faz o parsing do conteúdo JSON para um objeto JavaScript
      const dataSerializer = JSON.parse(fileData);

      // Cria um objeto para armazenar os dados e os erros de validação
      const validationResult = {
        dados: dataSerializer,
        erros: [],
      };

      if (!Array.isArray(dataSerializer)) {
        // Adiciona o erro ao objeto de validação
        validationResult.erros.push({
          campo: "FileHasNoArrayError",
          mensagem: "O arquivo de entrada não contém um Array.",
        });
      }

      // Adiciona os dados e erros de validação ao objeto OutputFile
      this.#outputFile.addError(validationResult.dados, validationResult.erros);

      // Retorna o resultado da validação
      return validationResult;
    } catch (error) {
      // Tratamento de erro caso o conteúdo do arquivo JSON não seja válido
      console.error(error.message);
      throw error;
    }
  }

  async generateOutputFile() {
    try {
      await this.#outputFile.writeOutputFile();
    } catch (error) {
      console.error(error.message);
    }
  }
}

// Cria uma instância da classe InputFile e passa o caminho do arquivo JSON como argumento
const inputFile = new InputFile(process.argv[2]);

// Verifica se foi passado o caminho do arquivo JSON como argumento na linha de comando
if (process.argv.length < 3) {
  console.log("Você precisa fornecer o caminho do arquivo JSON de entrada.");
} else {
  // Cria o Validation, passando a instância do InputFile que já tem o caminho do arquivo
  const validation = new Validation(inputFile);

  // Valida os dados assincronamente
  validation.validationDatas().then((validationResult) => {
    // Verifica se há erros de validação
    if (validationResult.erros.length > 0) {
      validation.generateOutputFile(); // Gera o arquivo de saída somente se houver erros
    } else {
      validation.generateOutputFile();
      console.log("Não foram encontrados erros de validação.");
    }
  });
}
