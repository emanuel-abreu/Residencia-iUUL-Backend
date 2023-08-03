class InputValidator {
  static isCurrencyCodeValid(currencyCode: string): boolean {
    return currencyCode.length === 3;
  }

  static isAmountValid(amount: number): boolean {
    return !isNaN(amount) && amount > 0;
  }
}

export default InputValidator;
