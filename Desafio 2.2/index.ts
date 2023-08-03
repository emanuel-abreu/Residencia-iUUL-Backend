import InputHandler from "./inputDatas.js";
import InputValidator from "./validationDatas.js";
import ExchangeRate from "./api-clients.js";

class CurrencyConverter {
  private inputHandler: InputHandler;
  private exchangeRate: ExchangeRate;
  private inputValidator: InputValidator;

  constructor() {
    this.inputValidator = new InputValidator();
    this.inputHandler = new InputHandler();
    this.exchangeRate = new ExchangeRate();
  }

  async convertCurrency(): Promise<void> {
    while (true) {
      try {
        const from = this.inputHandler.getCurrencyCode(
          "Digite a moeda de origem (Ex: USD): "
        );

        const to = this.inputHandler.getCurrencyCode(
          "Digite a moeda de destino (Ex: BRL): "
        );

        if (to == "") {
          break;
        }

        if (from === to) {
          throw new Error(
            "Erro: A moeda de origem deve ser diferente da moeda de destino.\n"
          );
        }

        const amount = this.inputHandler.getAmount(
          "Digite o valor monetário a ser convertido: "
        );

        this.inputValidator.isCurrencyCodeValid(from);
        this.inputValidator.isCurrencyCodeValid(to);
        this.inputValidator.isAmountValid(amount);

        const response = await this.exchangeRate.fetchExchangeRate(
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
