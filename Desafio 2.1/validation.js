import { DateTime } from "luxon";

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
      } else {
        // Valida cada cliente no array de dados
        dataSerializer.forEach((cliente, index) => {
          const { nome, cpf, dt_nascimento, renda_mensal, estado_civil } =
            cliente;

          if (!this.validarNome(nome)) {
            validationResult.erros.push({
              campo: `dados[${index}].nome`,
              mensagem: "O nome deve ter entre 5 e 60 caracteres.",
            });
          }

          if (!this.validarCPF(cpf)) {
            validationResult.erros.push({
              campo: `dados[${index}].cpf`,
              mensagem: "CPF inválido.",
            });
          }

          if (!this.validarDataNascimento(dt_nascimento)) {
            validationResult.erros.push({
              campo: `dados[${index}].dt_nascimento`,
              mensagem:
                "Data de nascimento inválida ou cliente menor de 18 anos.",
            });
          }

          if (
            renda_mensal !== undefined &&
            !this.validarRendaMensal(renda_mensal)
          ) {
            validationResult.erros.push({
              campo: `dados[${index}].renda_mensal`,
              mensagem:
                "Renda mensal inválida. Deve ser um valor maior ou igual a 0 com duas casas decimais.",
            });
          }

          if (
            estado_civil !== undefined &&
            !this.validarEstadoCivil(estado_civil)
          ) {
            validationResult.erros.push({
              campo: `dados[${index}].estado_civil`,
              mensagem:
                "Estado civil inválido. Deve ser 'C', 'S', 'V' ou 'D' (maiúsculo ou minúsculo).",
            });
          }
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

  validarNome(nome) {
    return nome.length >= 5 && nome.length <= 60;
  }

  validarCPF(cpf) {
    return /^\d{11}$/.test(cpf);
  }

  validarDataNascimento(dt_nascimento) {
    const data = DateTime.fromFormat(dt_nascimento, "ddMMyyyy");

    const dataAtual = DateTime.local();

    return (
      data.isValid && data <= dataAtual && dataAtual.year - data.year >= 18
    );
  }

  validarRendaMensal(renda_mensal) {
    return /^\d+(\,\d{1,2})?$/.test(renda_mensal);
  }

  validarEstadoCivil(estado_civil) {
    return /^[CSVD]$/.test(estado_civil.toUpperCase());
  }
}

// Restante do código permanece igual

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
