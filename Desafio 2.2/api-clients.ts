import fetch from "node-fetch";

interface Converter {
  query: {
    from: string;
    to: string;
    amount: number;
  };
  info: {
    rate: number;
  };
  date: string;
  result: number;
}

class ApiClient {
  async fetchExchangeRate(
    from: string,
    to: string,
    amount: number
  ): Promise<Converter> {
    const urlApi: string = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
    const response = await fetch(urlApi);
    if (!response.ok) {
      const error = (await response.json()) as { error: string };
      throw new Error(`Erro na comunicação com a API: ${error.error}`);
    }

    const data = (await response.json()) as Converter;

    return data;
  }
}

export default ApiClient;
