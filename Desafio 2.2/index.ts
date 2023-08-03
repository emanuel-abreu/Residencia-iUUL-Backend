import InputHandler from "./inputDatas.js";
import InputValidator from "./validationDatas.js";
import ApiClient from "./api-clients.js";

class CurrencyConverter {
  private inputHandler: InputHandler;
  private apiClient: ApiClient;

  constructor() {
    this.inputHandler = new InputHandler();
    this.apiClient = new ApiClient();
  }

  async convertCurrency(): Promise<void> {
    while (true) {
      try {
        const from = this.inputHandler.getCurrencyCode(
          "Digite a moeda de origem (Ex: USD): "
        );
        if (from === "") break;

        const to = this.inputHandler.getCurrencyCode(
          "Digite a moeda de destino (Ex: BRL): "
        );
        if (from === to) {
          console.log(
            "A moeda de origem deve ser diferente da moeda de destino.\n"
          );
          continue;
        }

        const amount = this.inputHandler.getAmount(
          "Digite o valor monetário: "
        );

        if (
          !InputValidator.isCurrencyCodeValid(from) ||
          !InputValidator.isCurrencyCodeValid(to)
        ) {
          console.log(
            "Moeda de origem e de destino devem ter exatamente 3 caracteres.\n"
          );
          continue;
        }

        if (!InputValidator.isAmountValid(amount)) {
          console.log(
            "O valor de entrada deve ser um número positivo maior que zero.\n"
          );
          continue;
        }

        const response = await this.apiClient.fetchExchangeRate(
          from,
          to,
          amount
        );
        const convertedAmount = response.result.toFixed(2);
        const rate = response.info.rate.toFixed(6);
        console.log(
          `\nValor convertido: ${from} ${amount.toFixed(
            2
          )} => ${to} ${convertedAmount}`
        );
        console.log(`Taxa de conversão: ${rate}\n`);
      } catch (error) {
        console.error("Erro desconhecido");
        break;
      }
    }
  }
}

const currencyConverter = new CurrencyConverter();
currencyConverter.convertCurrency();
