import InputFile from "./inputFile.js";
import OutputFile from "./outputFile.js";
import Validation from "./validation.js";

// Para execução: node main.js <path do arquivo json>

// Cria uma instância da classe InputFile e passa o caminho do arquivo JSON como 3° argumento
const inputFile = new InputFile(process.argv[2]);

// Verifica se foi passado o caminho do arquivo JSON como argumento na linha de comando
if (process.argv.length < 3) {
  throw new Error(
    "Erro: Você precisa fornecer o caminho do arquivo de entrada. Ex : node validacao.js <path do arquivo JSON de entrada> "
  );
} else {
  // Cria o Validation, passando a instância do InputFile que já tem o caminho do arquivo JSON
  const validation = new Validation(inputFile);

  const validationResult = await validation.validationDatas();
  if (validationResult) {
    validation.generateOutputFile();
  }
}
