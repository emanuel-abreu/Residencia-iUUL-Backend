import readlineSync from "readline-sync";

class InputHandler {
  getCurrencyCode(prompt: string): string {
    const currencyCode = readlineSync.question(prompt).toUpperCase();
    return currencyCode;
  }

  getAmount(prompt: string): number {
    const amountStr = readlineSync.question(prompt);
    const amount = parseFloat(amountStr);
    return amount;
  }
}

export default InputHandler;
