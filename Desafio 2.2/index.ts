import CurrencyConverter from "./currencyConverter.js";

class App {
  async startConversion() {
    const currencyConverter = new CurrencyConverter();
    try {
      await currencyConverter.currencyConvert();
    } catch (error) {
      console.error(error);
    }
  }
}

const app = new App();
app.startConversion();
