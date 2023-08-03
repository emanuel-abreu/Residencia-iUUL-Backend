class InputValidator {
  isCurrencyCodeValid(currencyCode: string): boolean {
    if (currencyCode.length !== 3) {
      throw new Error("Erro: Moeda deve ter exatamente 3 caracteres.");
    }
    return true;
  }

  isAmountValid(amount: number): boolean {
    if (isNaN(amount) || amount <= 0) {
      throw new Error(
        "Erro: O valor de entrada deve ser um número positivo maior que zero."
      );
    }
    return true;
  }
}

export default InputValidator;
