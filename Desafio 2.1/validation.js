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

      if (!Array.isArray(dataSerializer)) {
        throw new Error("Erro: O arquivo de entrada não contém um Array.");
      } else {
        // Cria um array para armazenar os dados e os erros de validação
        const dataValidation = dataSerializer.map((client) => {
          const validationResult = {
            datas: client,
            erros: [],
          };
          // Validar se os campos obrigatórios estão presentes
          if (!client.nome) {
            validationResult.erros.push({
              campo: `nome`,
              mensagem: "Campo obrigatório ausente: Nome.",
            });
          }

          if (!client.cpf) {
            validationResult.erros.push({
              campo: `cpf`,
              mensagem: "Campo obrigatório ausente: CPF.",
            });
          }

          if (!client.dt_nascimento) {
            validationResult.erros.push({
              campo: `dt_nascimento`,
              mensagem: "Campo obrigatório ausente: Data de nascimento.",
            });
          }

          if (client.nome !== undefined && !this.validateName(client.nome)) {
            validationResult.erros.push({
              campo: `nome`,
              mensagem: "O campo 'nome' deve ter entre 5 à 60 caracteres.",
            });
          }

          if (client.cpf !== undefined && !this.validateCPF(client.cpf)) {
            validationResult.erros.push({
              campo: `cpf`,
              mensagem: "CPF é inválido.",
            });
          }

          if (
            client.dt_nascimento !== undefined &&
            !this.validateDateOfBirth(client.dt_nascimento)
          ) {
            validationResult.erros.push({
              campo: `dt_nascimento`,
              mensagem:
                "Data de nascimento inválida(DDMMAAAA): O cliente deve ter pelo menos 18 anos na data atual.",
            });
          }

          if (
            client.renda_mensal !== undefined &&
            !this.validateMonthlyIncome(client.renda_mensal)
          ) {
            validationResult.erros.push({
              campo: `renda_mensal`,
              mensagem:
                "Renda mensal inválida. Deve ser um valor maior ou igual a 0 com duas casas decimais.",
            });
          }

          if (
            client.estado_civil !== undefined &&
            !this.validateCivilStatus(client.estado_civil)
          ) {
            validationResult.erros.push({
              campo: `estado_civil`,
              mensagem:
                "Estado civil inválido. Deve ser 'C', 'S', 'V' ou 'D' (maiúsculo ou minúsculo).",
            });
          }

          return validationResult;
        });

        // Adiciona os dados e erros de validação ao objeto da classe OutputFile
        dataValidation.forEach((result) => {
          const { datas, erros } = result;
          this.#outputFile.addError(datas, erros);
        });

        // Retorna o resultado da validação
        return dataValidation;
      }
    } catch (error) {
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

  validateName(nome) {
    return nome.length >= 5 && nome.length <= 60;
  }

  validateCPF(cpf) {
    return /^\d{11}$/.test(cpf);
  }

  validateDateOfBirth(dt_nascimento) {
    const data = DateTime.fromFormat(dt_nascimento, "ddMMyyyy");

    const dataAtual = DateTime.local();

    return (
      data.isValid && data <= dataAtual && dataAtual.year - data.year >= 18
    );
  }

  validateMonthlyIncome(renda_mensal) {
    return /^\d+(\,\d{1,2})?$/.test(renda_mensal);
  }

  validateCivilStatus(estado_civil) {
    return /^[CSVD]$/.test(estado_civil.toUpperCase());
  }
}

export default Validation;
