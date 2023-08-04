import readlineSync from "readline-sync";

class InputHandler {
  getCurrencyCode(prompt: string): string {
    const currencyCode = readlineSync.question(prompt).toUpperCase();
    if (!/^[A-Z]{3}$/.test(currencyCode)) {
      throw new Error(
        " O código da moeda deve ser uma string com exatamente 3 caracteres. Tente novamente.\n "
      );
    }
    return currencyCode;
  }

  getAmount(prompt: string): number {
    const amount = readlineSync.questionFloat(prompt);
    if (Number(amount) <= 0) {
      throw new Error(
        " O valor de entrada deve ser um número positivo maior que zero. Tente novamente.\n"
      );
    }
    return Number(amount);
  }
}

export default InputHandler;
