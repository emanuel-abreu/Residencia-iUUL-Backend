import { DateTime } from "luxon";

import InputFile from "./inputFile.js";
import OutputFile from "./outputFile.js";

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
        throw new Error("Erro: O arquivo de entrada não contém um Array.");
      } else {
        // Valida cada cliente no array de dados
        dataSerializer.forEach((cliente) => {
          const { nome, cpf, dt_nascimento, renda_mensal, estado_civil } =
            cliente;

          // Validar se os campos obrigatórios estão presentes
          if (!nome) {
            validationResult.erros.push({
              campo: `nome`,
              mensagem: "Campo obrigatório ausente: Nome.",
            });
          }

          if (!cpf) {
            validationResult.erros.push({
              campo: `cpf`,
              mensagem: "Campo obrigatório ausente: CPF.",
            });
          }

          if (!dt_nascimento) {
            validationResult.erros.push({
              campo: `dt_nascimento`,
              mensagem: "Campo obrigatório ausente: Data de nascimento.",
            });
          }

          if (nome !== undefined && !this.validarNome(nome)) {
            validationResult.erros.push({
              campo: `nome`,
              mensagem: 'O campo "nome" deve ter entre 5 à 60 caracteres.',
            });
          }

          if (cpf !== undefined && !this.validarCPF(cpf)) {
            validationResult.erros.push({
              campo: `cpf`,
              mensagem: "CPF é inválido.",
            });
          }

          if (
            dt_nascimento !== undefined &&
            !this.validarDataNascimento(dt_nascimento)
          ) {
            validationResult.erros.push({
              campo: `dt_nascimento`,
              mensagem:
                "Deve está no formato DDMMAAAA. O cliente deve ter pelo menos 18 anos na data atual.",
            });
          }

          if (
            renda_mensal !== undefined &&
            !this.validarRendaMensal(renda_mensal)
          ) {
            validationResult.erros.push({
              campo: `renda_mensal`,
              mensagem:
                "Renda mensal inválida. Deve ser um valor maior ou igual a 0 com duas casas decimais.",
            });
          }

          if (
            estado_civil !== undefined &&
            !this.validarEstadoCivil(estado_civil)
          ) {
            validationResult.erros.push({
              campo: `estado_civil`,
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
      return console.error(error.message);
    }
  }

  async generateOutputFile() {
    try {
      await this.#outputFile.writeOutputFile();
    } catch (error) {
      console.error("Erro: ", error.message);
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
    if (validationResult) {
      validation.generateOutputFile();
    }
  });
}
