import InputHandler from "./inputDatas.js";
import ExchangeRate from "./apiClients.js";

class CurrencyConverter {
  private inputHandler: InputHandler;
  private exchangeRate: ExchangeRate;

  constructor() {
    this.inputHandler = new InputHandler();
    this.exchangeRate = new ExchangeRate();
  }

  async currencyConvert(): Promise<void> {
    while (true) {
      console.log(
        "------------------------------------------------------------\n"
      );
      console.log("Para encerrar, deixe vazio o campo da moeda de origem.\n");

      const from = this.inputHandler.getCurrencyCode(
        "Digite a moeda de origem (Ex: USD): "
      );

      if (from === "") {
        break;
      }

      const to = this.inputHandler.getCurrencyCode(
        "Digite a moeda de destino (Ex: BRL): "
      );
      const amount = this.inputHandler.getAmount(
        "Digite o valor monetário a ser convertido: "
      );

      if (from === to) {
        throw new Error(
          " A moeda de origem deve ser diferente da moeda de destino.\n"
        );
      }

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
      console.log(
        "------------------------------------------------------------\n"
      );
    }
  }
}

export default CurrencyConverter;
